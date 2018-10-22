class OwnersController < ApplicationController

  def new
    #binding.pry
    @owner = Owner.new()
  end

  def index
    #binding.pry
    @lead = Lead.find_by(id: params[:lead_id])
    @owners = @lead.owners
    binding.pry
  end


  def create
    #binding.pry
    @agent = current_user
    @lead = Lead.find_by(id: params[:lead_id])
    #binding.pry
    @owner = @lead.owners.build(owners_params)
    @owner.save
    #binding.pry

    #@product = Product.create(product_params)
    respond_to do |format|
      #format.html { render :show }
      format.json { render json: @owner, status: 201}
    end

    #render json: @owner, status: 201

    #if @owner.save
      #binding.pry
      #render 'owners/show', :layout => false
    #  redirect_to @lead
    #else
      #binding.pry
    #  render agent_lead_path(@agent, @lead)
    #end
  end

  def show
    binding.pry
    #@owner =

  end

  private
  def owners_params
    params.require(:owner).permit(:name)
  end

end
