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
}

function leadsIndex () {
  //debugger;
  $('#leads').empty();
  $.get('/leads', function(data){
    debugger;
    var leads = data["data"]
    var leadsList = "";
    leads.forEach(function(lead){
      //gamesList += '<button class="prevGames" data-id="' + game["id"]+ '">' + game["id"] + '</button></br>';
      leadsList += '<button class="prevgames" id="lead["id"] ">' + lead["id"] + '</button></br>';
      $("#leads").html(leadsList);
      //$('.prevgames').on('click', function(){showGame(this)});
      //debugger;
    });
	});
}
