var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

var user = sessionStorage.getItem("username");
var addid = 3;
var addproc = 1;
var ballot = new Array(user);
var ownervote = 0;
var nbOption = 3;
var nbVoteur = 1;
var idVote = "";
var canIVote = false;
var test = 0;
var aVote = "";

window.onload = function () {
	document.getElementById("owner").value = user;
	document.getElementById("ownerVoter").value = user;
}


function removeOption(Node){
    Node.parentNode.removeChild(Node);
    nbOption--;
}

function addOption(){
    let text = document.getElementById("adOption").value;
    if(text != ""){
    	var addDiv = document.getElementById('newOption');
	    var newDiv = document.createElement('div');
	    newDiv.innerHTML += "<input type='text' id='additem_"+ addid +"' class='voteOption' readonly size='55' value='"+ text + "'/> <button onclick='removeOption(this.parentNode)' class='btn-addRmv'>-</button>";
	    addDiv.appendChild(newDiv);
	    document.getElementById("adOption").value = "";
	    addid++;
      nbOption++;
    }
    else {
    	document.getElementById("adOption").value = "veuillez renseigner une option";
    }
}


function removeVoter(Node){
	Node.parentNode.removeChild(Node);
  nbVoteur--;
}

function addVoter(){
	let text = document.getElementById("adVoter").value;
    if(text != ""){
    	var addDiv = document.getElementById('newVoter');
	    var newDiv = document.createElement('div');
	    newDiv.innerHTML += "<input type='text' class='voters' readonly size='55' value='"+ text + "'/>  <div class='custom-select' style='display: inline-block;'><select id='pro_"+ addproc +"'><option value='0'>0</option><option value='1'>1</option> <option value='2'>2</option></select></div> <button onclick='removeOption(this.parentNode)' class='btn-addRmv'>-</button> ";
	    addDiv.appendChild(newDiv);
	    document.getElementById("adVoter").value = "";
	    addproc++;
      nbVoteur++;
    }
    else {
    	document.getElementById("adVoter").value = "veuillez renseigner un voteur";
    }
}


function createBallot(){
	var question = document.getElementById("question").value;
	ballot.push(question);
	var x = document.getElementsByClassName("voteOption");
  	for (var i = 0; i < x.length-1; i++) {
  		  ballot.push(x[i].value);
  	} 
  	var voteur = document.getElementsByClassName("voters");
  	for (var i = 0; i < addproc; i++) {
      if(document.getElementById("pro_"+i+"") != null ){
          if(ownervote == 0){
            ballot.push(voteur[i].value);
            var proc =  document.getElementById("pro_"+i+"");
            var pro = proc.options[proc.selectedIndex].value;
            ballot.push(pro);
          }
          else{
            i = i - ownervote;
            console.log(voteur[i].value);
            ballot.push(voteur[i].value);
            i = i + ownervote;
            var proc =  document.getElementById("pro_"+i+"");
            var pro = proc.options[proc.selectedIndex].value;
            ballot.push(pro);
         }
      }
      else {
        ownervote++;
      }
  	}  		
  	$.ajax({
        method: "GET",
        dataType: "json",
        url: "php/createABallot.php",
        data: {"ballot": ballot, "nbOption" : nbOption, "nbVoteur" : nbVoteur}
        }).done(function(obj) {
           console.log(obj);
           idVote = obj;
           document.getElementById("myself").disabled = false;
           document.getElementById("creation").disabled = true;
        }).fail(function(e){
            console.log(e);
            $("#message").html("<span class='ko'> Error: problème utilisateur</span>");
        });  
}



function closeBallot(){
    $.ajax({
      method: "GET",
      dataType: "",
      url: "php/closeVote.php",
      data : {"idVote" : idVote}
    }).done(function(obj){
      console.log(obj);
      document.getElementById("detruire").disabled = false;
      //destroyBallot
    }).fail(function(e){
      console.log(e);
      $("#message").html("<span class='ko'> Error: problème utilisateur</span>");
    });
}


function destroyBallot(){
  console.log("coucou");
  $.ajax({
    method: "GET",
    dataType: "",
    url: "php/deleteDirectory.php",
    data : {"idVote" : idVote}
  }).done(function(obj){
    console.log(obj);
  }).fail(function(e){
    console.log(e);
    $("#message").html("<span class='ko'> Error: problème utilisateur</span>");
  });
}



function voteMyself(){
    var t = 2+nbOption
    for(var i = t; i < t*2; i++){
      if(ballot[i] == user){
         test = i;
         $("#createVote").hide();
        document.getElementById("voterID").value = user;
        document.getElementById("voteCode").value = idVote;
        document.getElementById("questionID").value = ballot[1];
        for(var i = 2; i < nbOption+2; i++){
          var addDiv = document.getElementById('OptionList');
          var newDiv = document.createElement('div');
          newDiv.innerHTML += "<input class='radioBtn' type='radio'name='persvote'  value='"+ ballot[i] + "'/> '"+ballot[i]+"'";
          addDiv.appendChild(newDiv);
          canIVote = true;
        }
        $("#votingPage").show();
      }
      i++;

    } 
    if(canIVote == false){
        window.alert("vous ne pouvez pas voter à ce scrutin");
    }   
}




function submitVote(){
  $("#createVote").show();
  $("#votingPage").hide();
  document.getElementById("fermerscrut").disabled = false;
  document.getElementById("myself").disabled = true;
  var btns = document.getElementsByClassName('radioBtn');
  for(var i = 0; i < btns.length; i++){
    if(btns[i].checked){
      aVote = btns[i].value;
      }
  }
  $.ajax({
    method: "GET",
    dataType: "",
    url: "php/ajoutVote.php",
    data: {"aVote": aVote, "id" : idVote}
    }).done(function(obj) {
      console.log(obj);
    }).fail(function(e){
      console.log(e);
      $("#message").html("<span class='ko'> Error: problème utilisateur</span>");
  }); 
}



function addProcuration(){

}





function updateBallot(){

}






function exitCreateBallot(){

}



function exitCreateBallot(){

}