class Api::ExercisesController < ApplicationController

    before_action :logged_in_user
    before_action :admin_user, only: [:create, :destroy, :update, :update_uncertain, :index_uncertain, :show_uncertain]

    def show
        solved = false
        @exercise = Exercise.find(params[:id])

        # Admins don't solve exercises
        if(current_user.admin?)
            render json: { exercise: @exercise }, status: :ok
        else 
            @solution = ExerciseSolver.find_by(user_id: current_user.id, exercise_id: @exercise.id)

            # No Entry means Student didn't try an exercise
            if @solution.nil?
                solved = false
            else
                solved = @solution.solved
            end

            if solved
                query = @solution.query
            else
                query = nil
            end

            render json: {
                exercise: @exercise,
                solved: solved,
                query: query
            }, status: :ok
        end
    end

    def index
        offset = params[:offset].to_i
        limit = params[:limit].nil? ? 30 : params[:limit].to_i

        @category = Category.find(params[:category_id])
        @exercises = @category.exercises.offset(offset).limit(limit)

        # Build response hash
        response = {data: []}
        @exercises.each do |ex|
            solved = false
            result = ExerciseSolver.find_by(user_id: current_user.id, exercise_id: ex.id)
            if !result.nil?
                solved = result.solved
            end

            response[:data] << {
                id: ex.id,
                text: ex.text,
                title: ex.title,
                category_id: ex.category_id,
                solved: solved,
                points: ex.points
            }
        end
        response[:count] = @category.exercises.count

        render json: response, status: :ok
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

        result_table = []
        
        # Always set solutions for exercises without references to uncertain
        if @exercise.queries.empty?
            correct = nil
        else
            correct = true
            
            result_table = get_result_table query

            # check each reference
            @exercise.queries.each do |reference|
                result = @checker.correct?(query, reference.query)
                # Only set to nil if previously not marked as false
                if result.nil? && correct
                    correct = nil
                elsif result == false
                    correct = false
                end
            end
        end

        result = ExerciseSolver.where(user_id: current_user.id, exercise_id: @exercise.id).first_or_create(user_id: current_user.id, exercise_id: @exercise.id, solved: correct, query: query)
        if correct
            result.update_attributes({query: query, solved: correct})
        # else ...
        end
        render json: {solved: correct, result: result_table}, status: :ok
    end

    # index of uncertain student-query solutions 
    def index_uncertain
        offset = params[:offset].to_i
        limit = params[:limit].nil? ? 30 : params[:limit].to_i

        # Returns (plucks) unique exercise_ids which are marked as uncertain
        uncertain_solutions = ExerciseSolver.where(solved: nil).offset(offset).limit(limit).pluck(:exercise_id).uniq

        response = {exercises: uncertain_solutions}
        render json: response, status: :ok
    end

    # Manually set a uncertain solution as (not) solved
    def update_uncertain
        @solution = ExerciseSolver.find_by(exercise_id: params[:id], user_id: params[:user_id])
        if  @solution.update(solved: params[:solved])
            head :no_content
        else
            render json: @solution.errors.full_messages, status: :unprocessable_entity
        end
    end

    # Show uncertain solutions of one exercise
    def show_uncertain
        offset = params[:offset].to_i
        limit = params[:limit].nil? ? 30 : params[:limit].to_i

        response = []
        @uncertain_solutions = ExerciseSolver.where(solved: nil, exercise_id: params[:id]).offset(offset).limit(limit)

        @uncertain_solutions.each do |solution|
            response << {
                user_id: solution.user_id,
                student_query: solution.query
            }
        end  
        render json: response, status: :ok 
    end



    private
        def exercise_params
            params.require(:exercise).permit(:title, :text, :points)
        end 
end
