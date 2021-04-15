<?php

$aVote = $_GET["aVote"];
$id = $_GET["id"];
$option = array();
$jsonString = file_get_contents("../json/ballots/".$id."/".$id.".json");
$data = json_decode($jsonString, true);

foreach ($data["options"] as $key => $value) {
	if($value["option"] == $aVote){
		 $data["options"][$key]["compte"]++;
	}
}

$newJsonString = json_encode($data, JSON_PRETTY_PRINT);
file_put_contents("../json/ballots/".$id."/".$id.".json", $newJsonString);


?>