class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception
    include Api::SessionsHelper

    def logged_in_user
        head :unauthorized unless logged_in? 
    end

    def admin_user
        head :forbidden unless current_user.admin?
    end
end
