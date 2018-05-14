Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    resources :artists, only: [:index, :show]
    resources :albums
    post 'search' => 'search#search'
  end
end
