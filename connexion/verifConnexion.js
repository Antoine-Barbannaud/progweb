var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);


function connexion(){
    let username = $("#utilisateur").val();
    let mdp = $("#mdp").val();
    //console.log(username);
    //console.log(mdp);
    $.ajax({
        method: "GET",
        url: "verification.php",
        data: {"username": username, "mdp": mdp }
        }).done(function(obj) {
            if(obj == "yes"){
                window.location.href = 'principale.php';	
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
    let username = $("#utilisateur").val();
        $.ajax({
        method: "GET",
        dataType: "",
        url: "ajoututilisateur.php",
        data: {"username": username, "mdp": mdp}
        }).done(function(obj) {
            if(obj == "yes"){
                window.location.href = 'connexion.html';	
        //console.log(obj)
        //console.log("coucou")
            }
        }).fail(function(e){
            console.log(e);
            $("#message").html("<span class='ko'> Error: problème utilisateur</span>");
        }); 
}
 
function TestUtilisateur(){
    let username = $("#utilisateur").val();
    $.ajax({
          method: "GET",
          dataType: "",
          url: "nom.php",
          data: {"username": username}
          }).done(function(obj) {
            //console.log(obj);
            if(obj == "incorrect"){
              $("#duplicatedUsername").show();
            }
          }).fail(function(e){
            console.log(e);
            $("#message").html("<span class='ko'> Error: problème utilisateur</span>");
          }); 
  }

function TestMdp(){
    let mdp1 = $("#mdp1").val();
    let mdp2 = $("#mdp2").val();
    if(mdp1 == mdp2){
        ajoutUser(mdp1);
    }
    else {
        $("#wrongPwd").show();
    }
}

function launchInscription(){
    $("#login").hide();
    $("#inscription").css("display", "block");
}