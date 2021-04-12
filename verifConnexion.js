var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

let coOk = "no";
let test = "ok"
let user = "";

function connexion(){
    let username = $("#utilisateur").val();
    let mdp = $("#mdp").val();
        $.ajax({
        method: "GET",
        url: "verification.php",
        data: {"username": username, "mdp": mdp }
        }).done(function(obj) {
            console.log(obj);
            if(obj == "yes"){
                $("#login").hide();
                $("#userHome").show();
                user = username;
                //window.location.href = 'principale.php';    
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
        url: "ajoututilisateur.php",
        data: {"username": username, "mdp": mdp}
        }).done(function(obj) {
            console.log(obj);
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
          url: "nom.php",
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
        console.log(test);
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
    console.log(user);
    $("#owner").val("Glenn Quagmire");

}

