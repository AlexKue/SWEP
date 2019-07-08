class Api::StaticPagesController < ApplicationController

    before_action :logged_in_user

    def playground
        @query = params[:query]
        result_table = get_result_table @query
        render json: result_table, status: :ok
    end

end
