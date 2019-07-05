class Api::StaticPagesController < ApplicationController

    def playground
        @query = params[:query]
        result_table = get_result_table @query
        render json: result_table, status: :ok
    end

end
