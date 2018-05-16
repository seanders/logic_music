Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    resources :artists, only: [:index, :show]
    resources :albums do
      collection do
        post 'create_by_discogs' => 'albums#create_by_discogs'
      end
    end
    post 'search' => 'search#search'
    get 'search' => 'search#find_album'
  end
end
