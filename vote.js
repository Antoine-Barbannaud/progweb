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
var aVote = "";
var result;
var procOwner;

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
            if(voteur[i].value == user){
              procOwner = pro;
            }

          }
          else{
            i = i - ownervote;
            ballot.push(voteur[i].value);
            i = i + ownervote;
            var proc =  document.getElementById("pro_"+i+"");
            var pro = proc.options[proc.selectedIndex].value;
            ballot.push(pro);
            if(voteur[i].value == user){
              procOwner = pro;
            }
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
      document.getElementById("detruire").disabled = false;
    }).fail(function(e){
      console.log(e);
      $("#message").html("<span class='ko'> Error: problème utilisateur</span>");
    });
}


function destroyBallot(){
  $.ajax({
    method: "GET",
    dataType: "",
    url: "php/deleteDirectory.php",
    data : {"idVote" : idVote}
  }).done(function(obj){
  }).fail(function(e){
    console.log(e);
    $("#message").html("<span class='ko'> Error: problème utilisateur</span>");
  });
}



function voteMyself(){
    var t = 2+nbOption
    for(var i = t; i < t*2; i++){
      if(ballot[i] == user){
         $("#createVote").hide();
        document.getElementById("voterID").value = user;
        document.getElementById("voteCode").value = idVote;
        document.getElementById("questionID").value = ballot[1];
        for(var j = 2; j < nbOption+2;j++){
          var addDiv = document.getElementById('OptionList');
          var newDiv = document.createElement('div');
          newDiv.innerHTML += "<input class='radioBtn' type='radio' name='persvote' value='"+ ballot[j] + "'/> "+ballot[j]+"";
          addDiv.appendChild(newDiv);
          canIVote = true;
          document.getElementById("voteProcuration").value = procOwner;
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
    procOwner--;
  if(procOwner == -1){
    document.getElementById("voteProcuration").value = procOwner;
    document.getElementById("voter").disabled = true;
  }
  else{
    document.getElementById("voteProcuration").value = procOwner; 
  }
  var btns = document.getElementsByClassName('radioBtn');
  for(var i = 0; i < btns.length; i++){
    if(btns[i].checked){
      aVote = btns[i].value;
      console.log(aVote);
      }
  }
  $.ajax({
    method: "GET",
    dataType: "",
    url: "php/ajoutVote.php",
    data: {"aVote": aVote, "id" : idVote}
    }).done(function(obj) {
    }).fail(function(e){
      console.log(e);
      $("#message").html("<span class='ko'> Error: problème utilisateur</span>");
  }); 
}


function retourMainPage(){
  $("#createVote").show();
  $("#votingPage").hide();
  document.getElementById("stat").disabled = false;
  document.getElementById("myself").disabled = true;
}

function updateBallot(){
  document.getElementById("fermerscrut").disabled = false;
  $.ajax({
    method: "GET",
    dataType: "json",
    url: "php/result.php",
    data: {"id" : idVote}
    }).done(function(obj) {
      result = obj;
      for(option of result){
        calc = (option["compte"] / nbVoteur) * 100 ;
        var addDiv = document.getElementById('showstat');
        var newDiv = document.createElement('div');
        newDiv.innerHTML += "<h>l'option "+ option['option']+" a reçu "+calc+"% des voix </h>";
        addDiv.appendChild(newDiv);
          console.log(option["option"])
      } 
    }).fail(function(e){
      console.log(e);
      $("#message").html("<span class='ko'> Error: problème utilisateur</span>");
  }); 

}
