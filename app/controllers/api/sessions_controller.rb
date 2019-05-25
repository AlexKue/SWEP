class Api::SessionsController < ApplicationController
    
    # POST /api/auth
    def create
        user = User.find_by(sessions[:user][:email].downcase)
        if user && user.authenticate(sessions[:user][:password])
            log_in user
        end
    end

    # DELETE /api/logout
    def destroy 
        log_out if logged_in?
    end
end
