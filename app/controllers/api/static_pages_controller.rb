class Api::StaticPagesController < ApplicationController

    before_action :logged_in_user

    def playground
        @query = params[:query] 

        result = get_result_table @query, "unidb", indicate_error=true
        if result.has_key? :error
          render json: result[:error], status: :unprocessable_entity
        else
          render json: result[:result], status: :ok
        end

    end

end
