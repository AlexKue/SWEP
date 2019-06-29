class Api::ExercisesController < ApplicationController

    before_action :logged_in_user
    before_action :admin_user, only: [:create, :destroy, :update]

    def show
        solved = false
        @exercise = Exercise.find(params[:id])
        if(current_user.admin?)
            render json: { exercise: @exercise }, status: :ok
        @solution = ExerciseSolver.find_by(user_id: current_user.id, exercise_id: @exercise.id)
        if @solution.nil?
            solved = false
        else
            solved = @solution.solved
        end
        
        render json: {
            exercise: @exercise,
            solved: solved
        }, status: :ok

    end

    def index
        offset = params[:offset].to_i
        limit = params[:limit].nil? ? 30 : params[:limit].to_i

        @category = Category.find(params[:category_id])
        @exercises = @category.exercises.offset(offset).limit(limit)
        render json: {
            count: @category.exercises.count,
            data: @exercises.as_json
        }, status: :ok
    end

    def create
        @exercise = Category.find(params[:category_id]).exercises.build(exercise_params)
        if @exercise.save
            render json: @exercise, status: :created
        else
            render json: @exercise.errors.full_messages, status: :unprocessable_entity

        end
    end

    def destroy
        if @exercise = Exercise.find_by(id: params[:id])
            @exercise.destroy
        end
        head :no_content
    end

    def update
        @exercise = Exercise.find(params[:id])
        if @exercise.update_attributes(exercise_params)
            head :no_content
        else
            render json: @exercise.errors.full_messages, status: :unprocessable_entity
        end
    end

    def solve
        @checker = init_query_checker
        @exercise = Exercise.find(params[:id])
        query = params[:query]

        correct = true
        @exercise.queries.each do |reference|
            result = @checker.correct?(query, reference.query)
            if result.nil? && correct != false
                correct = nil
            elsif !result
                correct = false
            end
        end

        result = ExerciseSolver.where(user_id: current_user.id, exercise_id: @exercise.id).first_or_create(user_id: current_user.id, exercise_id: @exercise.id, solved: correct, query: query)
        render json: {solved: correct}, status: :ok
    end

    private
        def exercise_params
            params.require(:exercise).permit(:title, :text, :points)
        end 
end
