<?php
$username =  $_GET["username"];
$jsonString = file_get_contents('../json/ballots/users.json');
$data = json_decode($jsonString, true);
$result = array();
foreach ($data as $key => $value) {
		$truc = $value;
		$dat = $value["votant"];
		foreach ($dat as $key => $val) {
			if($val == $username){
				array_push($result,  $truc["ballot"]);
			}
		}
}
print_r($result);

$foundJsonString = json_encode($result);
//echo $foundJsonString;

?>