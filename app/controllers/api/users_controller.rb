class Api::UsersController < ApplicationController

    # GET /api/users/:id
    def show
        @user = User.find(user_params)
        render json: @user, status: :ok
    end

    # GET /api/users
    def index
        offset = 0 unless params[:offset].is_a INTEGER
        limit = 30 unless params[:limit].is_a INTEGER
        @users = User.offset(offset).limit(limit)
        render @users, status: :ok
    end

    # POST /api/users
    def create
        @user = User.new(user_params)
        if @user.save
            log_in @user
            render json: @user, status: :created
        else
            render json: @user.errors, status: :unproccessable_entity
        end
    end

    # DELETE /api/users/:id
    def destroy
        # TODO
    end 

    # PATCH /api/users/:id
    def update
        # TODO
    end

    private
        def user_params
            params.require(:user).permit(:name, :email, :password, :password_confirmation)
        end
end
