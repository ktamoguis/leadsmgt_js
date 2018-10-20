class OwnersController < ApplicationController

  def new
    binding.pry
    @owner = Owner.new()
  end

  def create
    binding.pry
  end
end
