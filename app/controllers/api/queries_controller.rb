class Api::QueriesController < ApplicationController
    def show
        @query = Queries.find(params[:id])
        render json: @query, status: ok
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
        if @query.save
            render json: @query, status: :created
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
        @query = Query.find(params[:id])
        if @query.update_attributes(query_params)
            head :no_content
        else
            render json: @query.errors.full_messages, status: :unprocessable_entity
        end
    end

    private
        def query_params
            params.require(:query).permit(:query)
        end


end
