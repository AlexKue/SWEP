class Api::ExercisesController < ApplicationController

    def show
        @exercise = Exercise.find(params[:id])
        render json: @user, status: :ok
    end

    def index
    end

    def create
        @exercise = Exercise.new(exercise_params)
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
    end

    private
        def exercise_params
            params.require(:exercise).permit(:text, :points)
        end

    

end
