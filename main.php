<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <title>Vote en ligne</title>
    </head>
    <body>
        <?php  
            $FILE_POLLS = "polls.json";
            $FILE_USERS = "users.json";

            $stringPoll = file_get_contents($FILE_POLLS);
            $data = json_decode($stringPoll, true);

            foreach($data as $i => $id){
                $ID = $data[$i]['ID'];
                $title = $data[$i]['title'];
                $description = $data[$i]['description'];
                #$choix

                echo "<h3> $title</h3>";
                echo "<h6> $description </h6>";
                echo "$ID <br>";
            }

        ?>
    </body>


</html>