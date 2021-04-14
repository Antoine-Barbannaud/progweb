<?php
$idVote = $_GET["idVote"];

$jsonString = file_get_contents("../json/ballots/".$idVote."/".$idVote.".json");
$data = json_decode($jsonString, true);

$data["open"] = false;

$newJsonString = json_encode($data, JSON_PRETTY_PRINT);
file_put_contents("../json/ballots/".$idVote."/".$idVote.".json", $newJsonString);


?>