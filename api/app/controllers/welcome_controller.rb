class WelcomeController < ApplicationController
    def index
        # render a welcome page or do something else
        render plain: "Welcome to my app!"
      end
end
