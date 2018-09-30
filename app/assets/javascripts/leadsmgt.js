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
  $(".js-index").on("click", ()=> leadsIndex());
}

function leadsIndex () {
  $.get("/leads.json", function(data) {
    var leadslist = "";
    var leads = data;
    leadslist = "Lead Name" + ' ' + "Lead Status" + ' ' + "Booked Loans" + '</br>'
    //debugger;
    leads.forEach(function(lead){
      leadslist += lead["name"] + ' ' + lead["status"] + ' ' + lead["booked_loans"] + '</br>'
      $("#leads").html(leadslist);
    });
  });
};
