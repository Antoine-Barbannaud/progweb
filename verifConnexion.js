var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

let coOk = "no";
let test = "ok"
var scrutin;
var vote;
var proc = 0;
var aVote = "";
var theId;

function connexion(){
    let username = $("#utilisateur").val();
    let mdp = $("#mdp").val();
        $.ajax({
        method: "GET",
        url: "php/verification.php",
        data: {"username": username, "mdp": mdp }
        }).done(function(obj) {
            if(obj == "yes"){
                listeScrutin();
                $("#login").hide();
                $("#userHome").show();
                user = username;  
            }
          else {
            $("#erreur").css("display", "block");
          }
        }).fail(function(e){
            console.log(e);
            $("#message").html("<span class='ko'> Error: problème utilisateur</span>");
        });   
}

function ajoutUser(mdp){
    let username = $("#user").val();
        $.ajax({
        method: "GET",
        dataType: "",
        url: "php/ajoututilisateur.php",
        data: {"username": username, "mdp": mdp}
        }).done(function(obj) {
            if(obj == "yes"){
                window.location.href = 'connexion.html';    
            }
        }).fail(function(e){
            console.log(e);
            $("#message").html("<span class='ko'> Error: problème utilisateur</span>");
        }); 
}
 

function TestUtilisateur(){
    let username = $("#user").val();
    $.ajax({
          method: "GET",
          dataType: "",
          url: "php/nom.php",
          data: {"username": username}
          }).done(function(obj) {
            if(obj == "incorrect"){
              $("#duplicatedUsername").show();
              test = "no";
            }
            else{
                $("#duplicatedUsername").hide();
                coOk = "yes";
                test = "ok";
            }

          }).fail(function(e){
            console.log(e);
            $("#message").html("<span class='ko'> Error: problème utilisateur</span>");
          }); 
  }

function TestMdp(){
  console.log("go");
    let mdp1 = $("#mdp1").val();
    let mdp2 = $("#mdp2").val();
    if(mdp1 == mdp2 && coOk == "yes" && mdp1 != "" ){
        ajoutUser(mdp1);
    }
   else if(test == "no") {
        $("#wrongPwd").hide();
        $("#noPwd").hide();
    }
    else {
        if(mdp1 == "" || mdp2 == ""){
           $("#noPwd").show();
           $("#wrongPwd").hide();
        }
        else{
          $("#wrongPwd").show();
           $("#noPwd").hide();
        }
    }
}

function launchInscription(){
    $("#login").hide();
    $("#inscription").css("display", "block");
}

function createVote(){
    window.location.href = 'main.html';  
    sessionStorage.setItem("username",user)  
   
}


function listeScrutin(){
  let username = $("#utilisateur").val();
  $.ajax({
    method: "GET",
    dataType: "json",
    url: "php/scrutin.php",
    data: {"username": username}
    }).done(function(obj) {
      scrutin = obj;
      ajoutScrutin();
    }).fail(function(e){
      console.log(e);
      $("#message").html("<span class='ko'> Error: problème utilisateur</span>");
  }); 
} 



function ajoutScrutin(){
  for(var i = 0; i < scrutin.length; i++){
    console.log(scrutin[i]);
    var addDiv = document.getElementById('ballotListContainer');
    var newDiv = document.createElement('div');
    newDiv.innerHTML += "<button class='btn-vote-ID' id='"+ scrutin[i] +"' onclick='launchVoteFromHome(id)'>"+ scrutin[i] + "</button> <br>";
    addDiv.appendChild(newDiv);
  }
}


function launchVoteFromHome(id){
  theId = id;
   $.ajax({
    method: "GET",
    dataType: "json",
    url: "php/findScrutin.php",
    data: {"id": id}
    }).done(function(obj) {
      vote = obj;
      if(vote["open"] == "true"){
        $("#userHome").hide();
        $("#votingPage").show();
        document.getElementById("voter").disabled = false;
        document.getElementById("voterID").value = vote["owner"];
        document.getElementById("voteCode").value = id;
        document.getElementById("questionID").value = vote["question"];
        for (options of vote["options"]){
          var x = options["option"]
          var addDiv = document.getElementById('OptionList');
          var newDiv = document.createElement('div');
          newDiv.innerHTML += "<input class='radioBtn' type='radio'name='persvote' value='"+ x + "'/> "+x+"";
          addDiv.appendChild(newDiv);
        }
        for(voteurs of vote["voteurs"]){
           var y = voteurs["voteurs"];
           if(y == $("#utilisateur").val()){
              proc = voteurs["proc"];
              document.getElementById("voteProcuration").value = proc;
           }
        }
      }
      else {
        window.alert("Ce scrutin a été fermé.");
      }
    }).fail(function(e){
      console.log(e);
      $("#message").html("<span class='ko'> Error: problème utilisateur</span>");
  }); 
  
}
function submitVote(){
  proc--;
  if(proc == -1){
    document.getElementById("voteProcuration").value = proc;
    document.getElementById("voter").disabled = true;
  }
  else{
    document.getElementById("voteProcuration").value = proc; 
  }
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
    data: {"aVote": aVote, "id" : theId}
    }).done(function(obj) {
      console.log(obj);
    }).fail(function(e){
      console.log(e);
      $("#message").html("<span class='ko'> Error: problème utilisateur</span>");
  }); 

}
