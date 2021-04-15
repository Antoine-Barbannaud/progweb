<?php

$username = htmlspecialchars($_GET["username"]);
//$mdp = htmlspecialchars($_GET["mdp"]);
$jsonString = file_get_contents('../json/mdp.json');
$data = json_decode($jsonString, true);



foreach ($data as $i => $truc) {
	if($truc["mail"] === $username){
		 print("incorrect");
    }
    
}



?>