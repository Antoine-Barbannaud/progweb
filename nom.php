<?php

$username = htmlspecialchars($_GET["username"]);
//$mdp = htmlspecialchars($_GET["mdp"]);
$jsonString = file_get_contents('mdp.json');
$data = json_decode($jsonString, true);


//print("$username");

foreach ($data as $i => $truc) {
	if($truc["mail"] === $username){
		 print("incorrect");
    }
    
}



?>