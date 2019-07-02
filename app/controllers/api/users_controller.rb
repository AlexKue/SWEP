class Api::UsersController < ApplicationController

    before_action :logged_in_user, only: [:index, :show, :destroy, :update]
    before_action :correct_user, only: [:destroy, :update]

    # GET /api/users/:id
    def show
        @user = User.find(params[:id])
        render json: @user, status: :ok
    end

    # GET /api/users
    def index
        offset = params[:offset].to_i
        limit = params[:limit].nil? ? 30 : params[:limit].to_i
        
        @users = User.offset(offset).limit(limit)
        render json: {
            count: User.count,
            data: @users.as_json
        }, status: :ok
    end

    # POST /api/users
    def create
        @user = User.new(user_params)
        if @user.save
            render json: @user, status: :created
        else
            render json: @user.errors.full_messages, status: :unprocessable_entity
        end
    end

    # DELETE /api/users/:id
    def destroy
        if user = User.find_by(id: params[:id])
            user.destroy
        end
        head :no_content
    end 

    # PATCH /api/users/:id
    def update
        if !current_user.authenticate(params[:password])
            response = []

            if params[:password].blank?
                response << "Please provide your old password!"
            else
                response << "Your provided old password is invalid!"
            end

            render json: response, status: :unauthorized
        elsif @user.update_attributes(user_params)
            head :no_content
        else
            render json: @user.errors.full_messages, status: :unprocessable_entity
        end
    end

    private
        def user_params
            params.require(:user).permit(:name, :email, :password, :password_confirmation, :hide_in_ranking)
        end

        def correct_user
            @user = User.find(params[:id])
            head :forbidden unless current_user?(@user)
        end

end
