<?php

$username = htmlspecialchars($_GET["username"]);
$mdp = htmlspecialchars($_GET["mdp"]);
$jsonString = file_get_contents('mdp.json');
$data = json_decode($jsonString, true);


//print("$username");

foreach ($data as $i => $truc) {
	if(strpos($truc["mail"], $username) !== FALSE and strpos($truc["mdp"], $mdp) !== FALSE){
		 print("yes");
    }
    
}


?>