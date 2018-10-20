Rails.application.routes.draw do

  resources :owners
  get '/' => 'sessions#welcome'
  get '/signin' => 'sessions#new'
  post '/signin' => 'sessions#create'
  post '/signout' => 'sessions#destroy'
  get '/signup' => 'agents#new'
  get '/auth/facebook/callback' => 'sessions#create_with_facebook'
  get '/leads/:id/next', to: 'leads#next'

  resources :agents, only: [:show] do
    resources :leads, only: [:new, :edit, :show, :index]
    resources :regions, only: [:show]
    resources :industries, only: [:show]
  end

  resources :industries
  resources :regions
  resources :leads
  resources :agents
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
