<?php

$result = array(
	    "owner" => 'tic',
    "question" => 'tac'
);

$i = rand(1000,9999);
	while(is_dir("json/ballots/".$i) == true){
		$i = rand(1000,9000);
}
$dir = mkdir("json/ballots/".$i);
$JSONFILE = $i.".json";
print($dir);
$fp = fopen($dir."/".$JSONFILE, 'w');
fwrite($fp, json_encode($result, JSON_PRETTY_PRINT));
fclose($fp);
?>