$(document).ready(attachListeners);


function attachListeners() {
  $(".leads_index").on("click", (e)=> leadsIndex(e));

  $("#sort").on("click", function(e){
    e.preventDefault();
    $("#ownerlist").empty();
    $("#ownerlist2").empty();
    //$("#ownerList2").innerHTML="";

    const url = this.href;
    $.get(url + ".json", function(lead) {
      let owners = lead.owners
      //let ownerNames = []
      //owners.forEach(function(owner){
        //if (owner.name.substring(0,1) === "H"){
      //    ownerNames.push(owner.name);
        //}
      //})
      //let sortOwners = ownerNames.sort();
      lead.owners.sort(function(a, b) {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });

      lead.owners.forEach(function(owner){
        let ownerHtml = '<li id="indOwner">' + owner.name + '</li>'
        $("#ownerlist2").append(ownerHtml);
      })
    });


  })
  //$("input[value='Create Owner']").on("click", function(e){
  //$(document).on("submit", "#new_owner_", function(e){
  //$("#new_owner").on("submit", function(e){
  //  e.preventDefault();
    //debugger;
  //  let url = this.action
  //  console.log(url);
  //  $.ajax({
  //    type: 'post',
  //    url: this.action,
  //    data: $(this).serialize(),
  //  success: function(response){
        //debugger;
  //      $("#owner_name").val("")
  //      let $ol = $("div.owners ol")
  //      $ol.append(response)
  //    }
  //  })
  //})

  $('.new_owner').submit(function(event) {
      event.preventDefault();
      //debugger;
      let url = this.action
      let values = $(this).serialize();
      let posting = $.post(url, values);

      posting.done(function(data) {
        //debugger;
        $("#owner_name").val("")
        let $ol = $("div.owners ol")
        //$ol.append(data)
        $ol.append(`<li>` + data.name  + `</li>`)
        $( "input[value='Create Owner']" ).prop('disabled',false);
      });
  });

  $(document).on("click", ".show_link", function(e){
    e.preventDefault();
    const lead = $(this).attr('data-id');
    $.get("/leads/" + lead + ".json", function(lead) {
      $(".js_leads_index").html('');
      $("#lead_table").html('');
      let newlead = new Lead(lead);
      let leadsHtml = newlead.formatShow();
      $(".js_leads_index").append(leadsHtml);
    });
  });

  $(document).on("click", ".next_lead", function(e){
    const lead = $(this).attr('data-id');
    $.get("/leads/" + lead + "/next", function(lead){
      //console.log(lead)
      $(".js_leads_index").html('');
      $("#lead_table").html('');
      let newlead = new Lead(lead);
      let leadsHtml = newlead.formatShow();
      $(".js_leads_index").append(leadsHtml);
    })
  })

}

function clearList() {
    var list = document.getElementById("#indOwner");
    list.removeChild(list.childNodes[0]);
}


function leadsIndex (e) {
  e.preventDefault();
  history.pushState(null,null,"leads");
  $.get("/leads", function(data) {
    //debugger;
    $(".js_leads_index").html('');
    $("#lead_table").html('');
    let leadslist = "";
    let leads = data;

    let tableHtml = `
      <th>Lead Name</th>
      <th>Lead Status</th>
      <th>Booked Loans</th>
      <th>Industry</th>
    `

    $("#lead_table").append(tableHtml)
    leads.forEach(function(lead){
      let newlead = new Lead(lead);
      //debugger;
      let leadsHtml = newlead.formatIndex();
      $("#lead_table").append(leadsHtml);

      //$(".js_leads_index").append(leadsHtml);
      //$("#leads").append(leadsHtml);
    });
  },"json");
};


//function Lead(lead){
//  this.id = lead.id;
//  this.name = lead.name;
//  this.status = lead.status;
//  this.bookedLoans = lead.booked_loans;
//  this.agent = lead.agent;
//  this.industry = lead.industry;
//}

class Lead {
  constructor(lead){
    this.id = lead.id;
    this.name = lead.name;
    this.status = lead.status;
    this.bookedLoans = lead.booked_loans;
    this.agent = lead.agent;
    this.industry = lead.industry;
  }
}

//function showLead (e) {
//  e.preventDefault();
//  const lead = $(this).attr('data-id');
//  $.get("/leads/" + lead + ".json", function(lead) {
//    $(".js_leads_index").html('');
//    $("#lead_table").html('');
//    let newlead = new Lead(lead);
//    let leadsHtml = newlead.formatShow();
    //debugger;
//    $(".js_leads_index").append(leadsHtml);
//  });

//}


Lead.prototype.formatIndex = function(){
  let postHtml = `
    <tr>
      <td><a href="/agents/${this.agent.id}/leads/${this.id}" data-id="${this.id}" class="show_link">${this.name}</a></td>
      <td>${this.status}</td>
      <td>${this.bookedLoans}</td>
      <td>${this.industry.name}</td>
    </tr>
  `
  return postHtml
}

Lead.prototype.formatShow = function(){
  let postHtml = `
    <h4>Name: ${this.name}</h4>
    <h4>Lead Id: ${this.id}</h4>
    <h4>Status: ${this.status}</h4>
    <h4>Booked Loans: ${this.bookedLoans}</h4>
    <h4>Industry: ${this.industry.name}</h4>
    <a href="/leads/${this.id}">Show more</a>
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
