<?php
$id = $_GET["id"];
$nbOption = $_GET["nbOption"];
$jsonString = file_get_contents("../json/ballots/".$id."/".$id.".json");
$data = json_decode($jsonString, true);
$result=array();
foreach ($data["options"] as $key => $value) {
	array_push($result, $data["options"][$key]);
	//print_r($value);
}


$newJsonString = json_encode($result, JSON_PRETTY_PRINT);

?>