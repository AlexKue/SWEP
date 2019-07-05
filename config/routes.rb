Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'main#index'
  
  namespace :api, defaults: { format: 'json'} do
    get    "/users/ranking",  to: "users#ranking" 
    post   "/auth",           to: "sessions#create"
    delete "/logout",         to: "sessions#destroy"

    resources :users, except: [:new, :edit]
    resources :categories, except: [:new, :edit] do
      resources :exercises, except: [:new, :edit], shallow: true do
        post :solve, on: :member
        resources :queries, except: [:new, :edit], shallow: true
      end
    end
  end

  get '*path', to: 'main#index', contraints: ->(req) do
    !req.xhr? && req.format.html?
  end
end
