class OwnersController < ApplicationController

  def new
    binding.pry
    @owner = Owner.new()
  end
end
