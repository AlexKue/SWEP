Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'main#index'
  
  namespace :api, defaults: { format: 'json'} do
    post    "/playground",                         to: "static_pages#playground" 
    get     "/users/ranking",                      to: "users#ranking" 
    post    "/auth",                               to: "sessions#create"
    delete  "/logout",                             to: "sessions#destroy"
    get     'exercises/index-uncertain-solutions', to: 'exercises#index_uncertain'

    resources :users, except: [:new, :edit]
    resources :categories, except: [:new, :edit] do
      resources :exercises, except: [:new, :edit], shallow: true do
        post :solve, on: :member
        resources :queries, except: [:new, :edit], shallow: true
        patch 'uncertain-solutions', on: :member, to: 'exercises#update_uncertain'
        get 'uncertain-solutions', on: :member, to: 'exercises#show_uncertain'
      end
    end
  end

  get '*path', to: 'main#index', contraints: ->(req) do
    !req.xhr? && req.format.html?
  end
end