var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

let coOk = "no";
let test = "ok"
var scrutin;
// $("#utilisateur").val();

function connexion(){
    let username = $("#utilisateur").val();
    let mdp = $("#mdp").val();
        $.ajax({
        method: "GET",
        url: "php/verification.php",
        data: {"username": username, "mdp": mdp }
        }).done(function(obj) {
            //console.log(obj);
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
   // console.log(username);
        $.ajax({
        method: "GET",
        dataType: "",
        url: "php/ajoututilisateur.php",
        data: {"username": username, "mdp": mdp}
        }).done(function(obj) {
            //console.log(obj);
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
    console.log(username);
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
    console.log("ici");
    let mdp1 = $("#mdp1").val();
    let mdp2 = $("#mdp2").val();
    if(mdp1 == mdp2 && coOk == "yes"){
        ajoutUser(mdp1);
    }
   else if(test == "no") {
        //console.log(test);
        $("#wrongPwd").hide();
    }
    else {
        console.log(test);
         $("#wrongPwd").show();
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

<<<<<<< Updated upstream
function afficherVote(){
    
}
=======


function listeScrutin(){
  let username = $("#utilisateur").val();
  console.log("ici");
  $.ajax({
    method: "GET",
    dataType: "",
    url: "php/scrutin.php",
    data: {"username": username}
    }).done(function(obj) {
      //console.log(obj);
      scrutin = obj;
      ajoutScrutin();
    }).fail(function(e){
      console.log(e);
      $("#message").html("<span class='ko'> Error: problème utilisateur</span>");
  }); 
} 



function ajoutScrutin(){
  console.log(scrutin);
  for(var i = 0; i < scrutin.length; i++){
    console.log(scrutin[i]);
    /*var addDiv = document.getElementById('ballotListContainer');
    var newDiv = document.createElement('div');
    newDiv.innerHTML += "<button class='btn-vote-ID' onclick='launchVoteFromHome()''>'"+ scrutin[i] + "'</button> <br>";
    addDiv.appendChild(newDiv);*/
  }
}
>>>>>>> Stashed changes
