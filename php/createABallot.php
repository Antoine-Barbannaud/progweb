<?php
	
$ballot = $_GET["ballot"];
$nbOption =  $_GET["nbOption"];
$nbVoteur =  $_GET["nbVoteur"];
$option = array();
$voteurs = array();

for($i = 0; $i < $nbOption; $i++){
	array_push($option, array("option".($i) => $ballot[$i+2]));
}
for($i = 0; $i < $nbVoteur*2; $i++){
	array_push($voteurs, array("voteurs".($i) => $ballot[$i+2+$nbOption],"proc" =>$ballot[$i+3+$nbOption]));
	$i++;
}

$result = array(
    "owner" => $ballot[0],
    "question" => $ballot[1],
    "options" => $option,
    "voteurs" => $voteurs
);

$foundJsonString = json_encode($result);
echo $foundJsonString;

?>