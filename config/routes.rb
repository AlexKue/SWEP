Rails.application.routes.draw do
  get 'main/index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'main#index'
  
  namespace :api, defaults: { format: 'json'} do
    resources :users, except: [:new, :edit]
    get       "/auth",    to: "sessions#create"
    delete    "/logout",  to: "sessions#destroy"
  end
end
