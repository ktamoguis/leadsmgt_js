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
  $(".js-next").on("click", ()=> nextLead());
  $(".js-index").on("click", ()=> leadsIndex());
}

function leadsIndex () {
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
  //var leadIds = []
  //debugger;
  //leadIds = parseInt($(".js-next").attr("data-id"));
  var leadIds = $(".js-next").attr("data-id")
  var objleadIds = JSON.parse(leadIds)
  debugger;
  //leadIds = leadIds.replace(/[\])}[{(]/g,'');
  //debugger;
  //var nextId = parseInt($(".js-next").attr("data-id"));
  var leadName = "";
  //debugger;
  $.get("/leads/" + ".json", function(data) {
    debugger;
    leadName += 'Lead Name: ' + data["name"];
    leadStatus += 'Status: ' + data["status"];
    $("#leadName").html(leadName)
    //$("#leadStatus").html(leadStatus)
    $(".js-next").attr("data-id", data["id"]);
  });
}
