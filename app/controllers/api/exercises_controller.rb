class Api::ExercisesController < ApplicationController

    before_action :logged_in_user
    before_action :admin_user, only: [:create, :destroy, :update]

    def show
        @exercise = Exercise.find(params[:id])
        render json: @exercise, status: :ok
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
        @exercise = Exercise.find(params[:id])
        @query = StudentQuery.create(query_params)
        if @query.valid?
            @query.save

            correct = QueryChecker.new.correct?(@query.query, @exercise.queries.first.query) ? true : false
            solution = ExerciseSolver.where(user_id: current_user.id, 
                                            exercise_id: @exercise.id).first_or_create( user_id: current_user.id, 
                                                                                        exercise_id: @exercise.id, 
                                                                                        student_query_id: @query.id, 
                                                                                        solved: correct, 
                                                                                        certainity: 1)
            render json: solution, status: :created 
        else 
            render json: @query.errors.full_messages, status: :unprocessable_entity
        end 
    end



    private
        def exercise_params
            params.require(:exercise).permit(:title, :text, :points)
        end

        def query_params
            params.require(:query).permit(:query)
        end


            
end
