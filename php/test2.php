<?php


$jsonString = file_get_contents("../json/ballots/users.json");
$data = json_decode($jsonString, true);
echo "truc";


foreach($data as $key => $value){
	echo $value["ballot"];
	/*if ($value["ballot"] === $idVote){
            unset($value["ballot"]);
        }*/
    }

?>