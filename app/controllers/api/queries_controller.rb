require 'query_checker_helper'

class Api::QueriesController < ApplicationController
    include QueryCheckerHelper
    before_action :admin_user
    
    def show
        @query = Query.find(params[:id])
        render json: @query, status: :ok
    end

    def index
        offset = params[:offset].to_i
        limit = params[:limit].nil? ? 30 : params[:limit].to_i

        @exercise = Exercise.find(params[:exercise_id])
        @queries = @exercise.queries.offset(offset).limit(limit)
        render json: {
            count: @exercise.queries.count,
            data: @queries.as_json
        }, status: :ok
    end
 
    def create
        @exercise = Exercise.find(params[:exercise_id])
        @query = @exercise.queries.build(query_params)
        checker = init_query_checker()
        checking_result = check_admin_query @query.query

        answer = {"id"=>@query.id}
        
        if checking_result[:debug].has_key? :error
            render json: [checking_result[:debug][:error]], status: :unprocessable_entity

        elsif checking_result[:debug][:query].empty?
            answer["warning"] = "Die Query lieferte ein leeres Ergebnis."

        # warn if the currently entered query conflicts with previous reference queries
        elsif !(conflict_queries = @exercise.queries.filter do |prev_reference| (checker.correct?(prev_reference.query, query_params[:query])==false) end).empty?
            answer["warning"] = "Die eingebene Query verursacht einen Konflikt mit den bisherigen."
            answer["details"] = conflict_queries
        end

        if @query.update_attributes(query_params)
            answer["result"] = checking_result[:debug][:query]
            render json: answer, status: :ok
        end
    end

    def destroy
        if @query = Query.find_by(id: params[:id])
            @query.destroy
        end
        head :no_content
    end


    def update
        @query = Query.find(params[:id]) # this still contains the old query
        @exercise = Exercise.find(@query.exercise_id)
        checker = init_query_checker()
        checking_result = check_admin_query query_params[:query] # this is the newly entered query

        answer = {"id"=>@query.id}
        if checking_result[:debug].has_key? :error
            render json: [checking_result[:debug][:error]], status: :unprocessable_entity

        elsif checking_result[:debug][:query].empty?
            answer["warning"] = "Die Query lieferte ein leeres Ergebnis."

        # warn if the currently entered query conflicts with previous reference queries
        elsif !(conflict_queries = @exercise.queries.filter do |prev_reference| (checker.correct?(prev_reference.query, query_params[:query])==false) end).empty?
            answer["warning"] = "Die eingebene Query verursacht einen Konflikt mit den bisherigen."
            answer["details"] = conflict_queries
        end

        if @query.update_attributes(query_params)
            answer["result"] = checking_result[:debug][:query]
            render json: answer, status: :ok
        else
            render json: @query.errors.full_messages, status: :unprocessable_entity
        end
    end

    private
        def query_params
            params.require(:query).permit(:query)
        end


end
