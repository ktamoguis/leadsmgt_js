var leadIds = [];

$(document).ready(attachListeners);

function attachListeners() {
  //$("td").click(function() {
  //  if (this.innerHTML === "" && checkWinner() === false ) {
  //    doTurn(this)
  //  }
  //})
  //$('#previous').on('click', () => showPreviousGames());
  //$('#save').on('click', ()=> saveGame());
  //$('#clear').on('click', ()=> clearGame());
  $(".js-next").on("click", (e)=> nextLead(e));
  $(".leads_index").on("click", (e)=> leadsIndex(e));
  //$(".js-index").on("click", (e)=> leadsIndex(e));
}

function leadsIndex (e) {
  e.preventDefault();
  $.get("/leads.json", function(data) {
    $(".leads_index").html('');
    var leadslist = "";
    var leads = data;
    //leadslist = "Lead Name" + ' ' + "Lead Status" + ' ' + "Booked Loans" + '</br>'
    //debugger;
    leads.forEach(function(lead){

      debugger;
      let newlead = new Lead(lead);
      let leadsHtml = newlead.formatIndex();
      $("#leads").append(leadsHtml);
    });
  });
};

function Lead(lead){
  this.id = lead.id;
  this.name = lead.name;
  this.status = lead.status;
  this.booked_loans = lead.booked_loans;
  this.agent = lead.agent;
  this.industry = lead.industry;
}

Lead.prototype.formatIndex = function(){
  let postHtml = `
    <h1>${this.name}</h1>
  `
  return postHtml
}

function leadsIndex_orig (e) {
  e.preventDefault();
  console.log("hello there");
  debugger;
  $.get("/leads.json", function(data) {
    var leadslist = "";
    var leads = data;
    //leadslist = "Lead Name" + ' ' + "Lead Status" + ' ' + "Booked Loans" + '</br>'
    debugger;
    leads.forEach(function(lead){
      leadslist += lead["name"] + ' ' + lead["status"] + ' ' + lead["booked_loans"] + '</br>'
      $("#leads").html(leadslist);
    });
  });
};

function nextLead(){
  debugger;
  let id = $(this).attr()
  fetch(`leads/${id}/next`)
}


function nextLead2(){
  //var leadIds = []
  //debugger;
  //leadIds = parseInt($(".js-next").attr("data-id"));
  var leadIds = $(".js-next").attr("lead-ids")
  var leadId = $(".js-next").attr("lead-id")
  var objleadId = JSON.parse(leadId)
  var objleadIds = JSON.parse(leadIds)
  var nextIndex = objleadIds.indexOf(objleadId) + 1
  var nextleadId = objleadIds[nextIndex]
  var leadName = "";
  //debugger;
  $.get("/leads/" + nextleadId +".json", function(data) {
    debugger;
    leadName += 'Lead Name: ' + data["name"];
    leadStatus += 'Status: ' + data["status"];
    $("#leadName").html(leadName)
    $("#leadStatus").html(leadStatus)
    $(".js-next").attr("data-id", data["id"]);
  });
}
