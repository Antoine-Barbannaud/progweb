<?php
$id = $_GET["id"];
$jsonString = file_get_contents("../json/ballots/".$id."/".$id.".json");

echo $jsonString;
?>