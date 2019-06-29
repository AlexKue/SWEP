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
        @query = Exercise.find(params[:exercise_id]).queries.build(query_params)
        checking_result = check_admin_query @query.query

        if checking_result[:debug].has_key? :error
            render json: [checking_result[:debug][:error]], status: :unprocessable_entity

        elsif checking_result[:debug][:query].empty?
            render json: ["Die Query lieferte ein leeres Ergebnis"], status: :unprocessable_entity

        elsif @query.save
            render json: {"id"=>@query.id, "result"=>checking_result[:debug][:query]}, status: :created

        else
            render json: @query.errors.full_messages, status: :unprocessable_entity
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
        checking_result = check_admin_query query_params[:query] # this is the newly entered query

        if checking_result[:debug].has_key? :error
            render json: [checking_result[:debug][:error]], status: :unprocessable_entity

        elsif checking_result[:debug][:query].empty?
            render json: ["Die Query lieferte ein leeres Ergebnis"], status: :unprocessable_entity

        elsif @query.update_attributes(query_params)
            render json: {"id"=>@query.id, "result"=>checking_result[:debug][:query]}, status: :ok
        else
            render json: @query.errors.full_messages, status: :unprocessable_entity
        end
    end

    private
        def query_params
            params.require(:query).permit(:query)
        end


end
