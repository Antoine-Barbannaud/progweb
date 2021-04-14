<?php
	
$ballot = $_GET["ballot"];
$nbOption =  $_GET["nbOption"];
$nbVoteur =  $_GET["nbVoteur"];
$nomVoteur = array();
$option = array();
$voteurs = array();
$users = array();

for($i = 0; $i < $nbOption; $i++){
	array_push($option, array("option".($i) => $ballot[$i+2]));
}
for($i = 0; $i < $nbVoteur*2; $i++){
	array_push($voteurs, array("voteurs".($i) => $ballot[$i+2+$nbOption],"proc" =>$ballot[$i+3+$nbOption]));
	array_push($nomVoteur,$ballot[$i+2+$nbOption]);
	$i++;
}

$result = array(
    "owner" => $ballot[0],
    "question" => $ballot[1],
    "options" => $option,
    "voteurs" => $voteurs
);

$t = rand(1000,9999);
	while(is_dir("../json/ballots/".$t) == true){
		$t = rand(1000,9000);
}
mkdir("../json/ballots/".$t);
$JSONFILE = $t.".json";

$fp = fopen("../json/ballots/".$t."/".$JSONFILE, 'w');
fwrite($fp, "[");
fwrite($fp, json_encode($result, JSON_PRETTY_PRINT));
fwrite($fp, "]");
fclose($fp);


$json = "users.json";
$ballott = array();
array_push($ballott, array("ballot" => $t, "votant" => $nomVoteur));
$fp = fopen("../json/ballots/".$json, 'a');
$stat = fstat($fp);
ftruncate($fp, $stat['size']-1);
fwrite($fp, ",");
fwrite($fp, json_encode($ballott, JSON_PRETTY_PRINT));
fwrite($fp, "]");


$foundJsonString = json_encode($nomVoteur);
echo $foundJsonString;

?>