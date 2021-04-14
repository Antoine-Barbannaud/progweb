<?php
    function closeVote($file){
        $jsonString = file_get_contents($file);
        $data = json_decode($jsonString, true);

        $data[0][open] = false;

        $newJsonString = json_encode($data);
        file_put_contents($file, $newJsonString);
    }
    
?>