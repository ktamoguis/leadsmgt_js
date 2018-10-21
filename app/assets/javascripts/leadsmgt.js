var leadIds = [];

$(document).ready(attachListeners);

function attachListeners() {
  $(".leads_index").on("click", (e)=> leadsIndex(e));
  $("#new_owner").on("submit", function(e){
    e.preventDefault();
    debugger;
    var url = this.action
    console.log(url);
    $.ajax({
      type: 'post',
      url: this.action,
      data: $(this).serialize(),
      success: function(response){
        $("#owner_name").val("")
        var $ol = $("div.owners ol")
        $ol.append(response)

      }
    })

  })

  $(document).on("click", ".show_link", function(e){
    e.preventDefault();
    var lead = $(this).attr('data-id');
    $.get("/leads/" + lead + ".json", function(lead) {
      //debugger;
      //var lead = data;
      //console.log(data);
      //debugger;
      $(".js_leads_index").html('');
      $("#lead_table").html('');
      let newlead = new Lead(lead);
      let leadsHtml = newlead.formatShow();
      $(".js_leads_index").append(leadsHtml);
      //var leadslist = "";
      //var leads = data;
      //leadslist = "Lead Name" + ' ' + "Lead Status" + ' ' + "Booked Loans" + '</br>'
    });
  });

  $(document).on("click", ".next_lead", function(e){
    //debugger;
    var lead = $(this).attr('data-id');
    //debugger;

    $.get("/leads/" + lead + "/next", function(lead){
      console.log(lead)
      $(".js_leads_index").html('');
      $("#lead_table").html('');
      let newlead = new Lead(lead);
      let leadsHtml = newlead.formatShow();
      $(".js_leads_index").append(leadsHtml);
    })
  })
  //$(".show_link").on("click", (e)=> showLead(e));
  //$(".js-index").on("click", (e)=> leadsIndex(e));
}


function leadsIndex (e) {
  e.preventDefault();
  history.pushState(null,null,"leads");
  $.get("/leads.json", function(data) {
    //debugger;
    $(".js_leads_index").html('');
    $("#lead_table").html('');
    var leadslist = "";
    var leads = data;
    //leadslist = "Lead Name" + ' ' + "Lead Status" + ' ' + "Booked Loans" + '</br>'
    //debugger;

    let tableHtml = `
      <th>Lead Name</th>
      <th>Lead Status</th>
      <th>Booked Loans</th>
      <th>Industry</th>
    `

    $("#lead_table").append(tableHtml)

    leads.forEach(function(lead){

      let newlead = new Lead(lead);
      let leadsHtml = newlead.formatIndex();

      $("#lead_table").append(leadsHtml);

      //$(".js_leads_index").append(leadsHtml);
      //$("#leads").append(leadsHtml);
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

function showLead (e) {
  e.preventDefault();
  var lead = $(this).attr('data-id');
  //var leadid = parseInt($(".show_link").attr("data-id"));
  //debugger;
  //$.ajax({
  //  method: 'get',
  //  url: '/leads/'
  //  success: function(data){
  //    console.log(data)
  //  }
//})

  $.get("/leads/" + lead + ".json", function(lead) {
    //debugger;
    //var lead = data;
    //console.log(lead);
    $(".js_leads_index").html('');
    $("#lead_table").html('');
    let newlead = new Lead(lead);
    let leadsHtml = newlead.formatShow();
    debugger;
    $(".js_leads_index").append(leadsHtml);
    //var leadslist = "";
    //var leads = data;
    //leadslist = "Lead Name" + ' ' + "Lead Status" + ' ' + "Booked Loans" + '</br>'
  });
  //debugger;

}

Lead.prototype.formatIndex = function(){
  let postHtml = `
    <tr>
      <td><a href="/agents/${this.agent.id}/leads/${this.id}" data-id="${this.id}" class="show_link">${this.name}</a></td>
      <td>${this.status}</td>
      <td>${this.booked_loans}</td>
      <td>${this.industry.name}</td>
    </tr>
  `
  return postHtml
}

Lead.prototype.formatShow = function(){
  let postHtml = `
    <h4>Name: ${this.name}</h4>
    <h4>Status: ${this.status}</h4>
    <h4>Booked Loans: ${this.booked_loans}</h4>
    <h4>Industry: ${this.industry.name}</h4>
    <p></p>
    <button class="next_lead" data-id="${this.id}">Next</button>
    <br><br>
  `
  return postHtml
}

//form
//1. hijack sumbit event of our form
//2. take form data and send it to the server as a ajax post
//3. how are we going to know the url of that post
//4. need actually take the data from AJAX post request and create the corresponding comments
//5. send back html/json/js of the comment that was added and inject that comment into the comment OL on the document


//<td><a href="/agents/${this.agent.id}/leads/${this.id}" class="show_lead">${this.name}</a></td>
//<td><a href="/leads/${this.id}" class="show_lead">${this.name}</a></td>

function nextLead(){
  debugger;
  let id = $(this).attr()
  fetch(`leads/${id}/next`)
}
