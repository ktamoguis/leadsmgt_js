class OwnersController < ApplicationController

  def new
    binding.pry
    @owner = Owner.new()
  end

  def create
    #binding.pry
    @agent = current_user
    @lead = Lead.find_by(id: params[:format])
    #binding.pry
    @owner = @lead.owners.build(owners_params)
    if @owner.save
      binding.pry
      render 'owners/show', :layout => false
      #redirect_to @lead
    else
      #binding.pry
      render agent_lead_path(@agent, @lead)
    end
  end

  private
  def owners_params
    params.require(:owner).permit(:name)
  end

end
