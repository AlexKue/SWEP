class Api::UsersController < ApplicationController

    before_action :logged_in_user, only: [:index]

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
        render json: @users, status: :ok
    end

    # POST /api/users
    def create
        @user = User.new(user_params)
        if @user.save
            log_in @user
            render json: @user, status: :created
        else
            render json: @user.errors, status: :unprocessable_entity
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
        # TODO
    end

    private
        def user_params
            params.require(:user).permit(:name, :email, :password, :password_confirmation)
        end

end
