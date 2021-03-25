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
                $title = $data[$i]['title'];
                $description = $data[$i]['description'];

                echo "<h3> $title</h3>";
                echo "$description: <br>";

                foreach($data[$i]['choix'] as $j => $choix){
                    echo "<form action=\"main.php\" method=\"post\">";
                    echo "<input type=\"hidden\" name=\"key\" value=\"$j\">";
                    echo "- $choix ";
                    echo "<input type=\"submit\" name=\"value\" value=\"Submit\"> <br><br>";
                    echo "</form>";
                }
            }
        ?>

        <?php
        $list = file_get_contents('polls.json');
        $list = json_decode($list, true);
        $countElt = count($list);
        $case = $_POST['key'];
        $id = 0;

        if(isset($case) && $case <= ($countElt + 1)){
            $list[$id]['compte'][$case] += 1;
        }
        file_put_contents("polls.json", json_encode($list, JSON_PRETTY_PRINT));
        ?>

    </body>
</html>