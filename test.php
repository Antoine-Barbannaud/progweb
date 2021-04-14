<?php

$result = array();
$option = array();
$voteurs = array();

for($i = 0; $i < 2 + 3; $i++){
	array_push($option, array("option".($i) => "tic"));
}

array_push($voteurs, array("voteurs".(0) => "tci")); //, "proc" => "tac"));
	

array_push($result, array("owner"=> "tr", "question" => "r", "options"=> $option, "voteur" => $voteurs));


//$foundJsonString = json_encode($result);
//echo $foundJsonString;
print_r($result);
?>