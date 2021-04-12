<?php

$username = htmlspecialchars($_GET["username"]);
$mdp = htmlspecialchars($_GET["mdp"]);
$jsonString = "mdp.json";
$result = array(
		"mail" => $username,
		"mdp" => $mdp

);

$fp = fopen($jsonString, 'a');
$stat = fstat($fp);
ftruncate($fp, $stat['size']-1);
fwrite($fp, ",");
fwrite($fp, json_encode($result, JSON_PRETTY_PRINT));
fwrite($fp, "]");
fclose($fp);
print("yes");

?>