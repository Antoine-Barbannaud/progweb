<?php 

$idVote = $_GET["idVote"];

function deleteDir($path) {
    if (empty($path)) { 
        return false;
    }
    return is_file($path) ?
            @unlink($path) :
            array_map(__FUNCTION__, glob($path.'/*')) == @rmdir($path);
}

deleteDir("../json/ballots/".$idVote);

$jsonString = file_get_contents("../json/ballots/users.json");
$data = json_decode($jsonString, true);


foreach($data as $key => $value){
	if ($value["ballot"] === $idVote){
            unset($value["ballot"]);
    }
}

$newJsonString = json_encode($data, JSON_PRETTY_PRINT);
file_put_contents("../json/ballots/users.json", $newJsonString);







?>