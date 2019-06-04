class Api::ExercisesController < ApplicationController

    def show
        @exercise = Exercise.find(params[:id])
        render json: @user, status: :ok
    end

    def index
    end

    def create
    end

    def destroy
    end

    def update
    end

end
