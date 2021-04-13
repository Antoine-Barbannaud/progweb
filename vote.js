var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

var user = sessionStorage.getItem("username");
var addid = 0;
//console.log(user);

window.onload = function () {
	document.getElementById("owner").value = user;
}


function removeOption(Node){
    Node.parentNode.removeChild(Node);
}

 function modifyOption(Node){
    $("button").each(function(){
        $(this).html("add");
    });
    
}

function addOption(Node){
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

function validatePoll(){
    $("input").each(function(index, value){
        //console.log($(value).val());
    });
}

function hide(){ 
    $('#myID').toggle();
}
