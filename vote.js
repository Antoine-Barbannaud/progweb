var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

var user = sessionStorage.getItem("username");
var addid = 0;
//console.log(user);

window.onload = function () {
	document.getElementById("owner").value = user;
	document.getElementById("ownerVoter").value = user;
}


function removeOption(Node){
    Node.parentNode.removeChild(Node);
}

function addOption(){
    let text = document.getElementById("adOption").value;
    if(text != ""){
    	var addDiv = document.getElementById('newOption');
	    var newDiv = document.createElement('div');
	    newDiv.innerHTML += "<input type='text' id='additem_ "+ addid +"' class='voteOption' readonly size='55' value='"+ text + "'/> <button onclick='removeOption(this.parentNode)'>-</button>";
	    addDiv.appendChild(newDiv);
	    document.getElementById("adOption").value = "";

    }
    else {
    	document.getElementById("adOption").value = "veuillez renseigner une option";
    }
}


function removeVoter(Node){
	Node.parentNode.removeChild(Node);
}

function addVoter(){
	let text = document.getElementById("adVoter").value;
    if(text != ""){
    	var addDiv = document.getElementById('newVoter');
	    var newDiv = document.createElement('div');
	    newDiv.innerHTML += "<input type='text' class='voters' readonly size='55' value='"+ text + "'/> <input onchange='addProcuration()' type='checkbox' class='procuration'> <button onclick='removeOption(this.parentNode)'>-</button> ";
	    addDiv.appendChild(newDiv);
	    document.getElementById("adVoter").value = "";

    }
    else {
    	document.getElementById("adVoter").value = "veuillez renseigner un voteur";
    }
}


/*function createBallot(){
	var question = document.getElementById("question").value;
	console.log(question);
	var x = document.getElementsByClassName("voteOption");
  	for (var i = 0; i < x.length-1; i++) {
    	console.log(x[i].value);
  	} 
  	var voteur = document.getElementsByClassName("voters");
  	for (var i = 0; i < voteur.length-1; i++) {
    	console.log(voteur[i].value);
  	}
  	//var procuration = getSelectValue('proc');
  	//console.log(procuration.option[procuration.selectedIndex].value);
}
**/	

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