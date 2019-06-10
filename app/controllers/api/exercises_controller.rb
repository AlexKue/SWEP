class Api::ExercisesController < ApplicationController

    def show
        @exercise = Exercise.find(params[:id])
        render json: @user, status: :ok
    end

    def index
        @category = Category.find(params[:category_id])
    end

    def create
        @exercise = Category.find(params[:category_id]).exercises.build(exercise_params)
        if @exercise.save
            render json: @exercise, status: :created
        else
            render json: @exercise.errors, status: :unprocessable_entity

        end
    end

    def destroy
        if @exercise = Exercise.find_by(id: params[:id])
            @exercise.destroy
        end
        head :no_content
    end

    def update
        # TODO
    end

    private
        def exercise_params
            params.require(:exercise).permit(:title, :text, :points)
        end

    

end
