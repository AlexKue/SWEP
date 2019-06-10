class Api::CategoriesController < ApplicationController
    def show
        @category = Category.find(params[:id])
        render json: @category, status: ok
    end

    def index
        offset = params[:offset].to_i
        limit = params[:limit].nil? ? 30 : params[:limit].to_i
        
        @categories = Category.offset(offset).limit(limit)
        render json: @categories, status: :ok
    end

    def create
        @category = Category.new(category_params)
        if @category.save
            render json: @category, status: :ok
        else
            render json: @category.errors, status: :unprocessable_entity
        end
    end

    def update
        #TODO
    end
    
    
    def destroy
        if category = Category.find_by(id: params[:id])
            category.destroy
        end
        head :no_content
    end 

    private

    def category_params
        params.require(:category).permit(:title, :text)
    end

end
