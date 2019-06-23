class Api::QueriesController < ApplicationController
    def show
        @query = Queries.find(params[:id])
        render json: @query, status: ok
    end
end
