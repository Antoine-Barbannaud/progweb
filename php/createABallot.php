<?php

$ballot = $_GET["ballot"];
$addid =  $_GET["addid"];
$result = array(
	"owner" => $ballot[0],
	"question" => $ballot[1],
	//"options"  => 
	);

$tac = array();

for($i = 0; $i < $addid + 3; $i++){
	$tac($ballot[$i+2])
	//print($ballot[$i+2]);
			//"option_'"+$i+"'" => $ballot[$i+2];
}

$tac;	

?>