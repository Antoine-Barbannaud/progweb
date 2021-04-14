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
  	//var procuration = document.getElementsByClassName("custom-select");
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
            console.log(voteur[i].value)
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
    console.log(ballot);
  	$.ajax({
        method: "GET",
        dataType: "json",
        url: "php/createABallot.php",
        data: {"ballot": ballot, "nbOption" : nbOption, "nbVoteur" : nbVoteur}
        }).done(function(obj) {
           console.log(obj);
        }).fail(function(e){
            console.log(e);
            $("#message").html("<span class='ko'> Error: problème utilisateur</span>");
        });  
}


function validatePoll(){
    $("input").each(function(index, value){
        //console.log($(value).val());
    });
}

function hide(){ 
    $('#myID').toggle();
}


function addProcuration(){

}



function voteMyself(){

}

function updateBallot(){

}


function closeBallot(){

}


function destroyBallot(){

}

function exitCreateBallot(){

}

function submitVote(){

}

function exitCreateBallot(){

}