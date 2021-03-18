<?php
	$user = htmlspecialchars($_GET["user"]);
	$mdp = htmlspecialchars($_GET["mdp"]);
	$jsonString = file_get_contents('users.json');
	$data = json_decode($jsonString, true);
	$result = array();
	print_r($result)


?>
