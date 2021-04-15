<?php
$id = $_GET["id"];
$jsonString = file_get_contents("../json/ballots/".$id."/".$id.".json");
$data = json_decode($jsonString, true);
$newJsonString = json_encode($data["options"], JSON_PRETTY_PRINT);
echo $newJsonString;
?>