class Api::CategoriesController < ApplicationController
    before_action :logged_in_user
    before_action :admin_user, only: [:create, :destroy, :update]
    
    def show
        @category = Category.find(params[:id])
        render json: @category, status: :ok
    end

    def index
        offset = params[:offset].to_i
        limit = params[:limit].nil? ? 30 : params[:limit].to_i
        
        @categories = Category.offset(offset).limit(limit)

        #Build response hash
        response = {data: []}
        @categories.each do |cat|
            solved_count =  ExerciseSolver.where(user_id: current_user.id, solved: true)
                            .joins("INNER JOIN exercises ON exercises.id = exercise_solvers.exercise_id 
                                    AND exercises.category_id = #{cat.id}").uniq.count
            response[:data] << {
                id: cat.id,
                title: cat.title,
                text: cat.text,
                max_count: cat.exercises.count,
                solved_count: solved_count
            }
        end
        response[:count] =  Category.count
        render json: response, status: :ok
    end

    def create
        @category = Category.new(category_params)
        if @category.save
            render json: @category, status: :created
        else
            render json: @category.errors.full_messages, status: :unprocessable_entity
        end
    end

    def update
        @category = Category.find(params[:id])
        if @category.update_attributes(category_params)
            head :no_content
        else
            render json: @category.errors.full_messages, status: :unprocessable_entity
        end
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
