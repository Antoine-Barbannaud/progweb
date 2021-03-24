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

                $counter = 0;
                foreach($data[$i]['choix'] as $j => $choix){
                    echo "<form action=\"updateVote.php\" method=\"post\">";
                    echo "- $choix ";
                    echo "<input type=\"submit\" name=\"".$counter."\" value=\"choisir\"> <br><br>";
                    echo "</form>";
                    $counter +=1;
                }
            }
        ?>

        <form action="main.php" id="form" method="post">
            <?php foreach($data[$i]['choix'] as $j => $choix) : ?>
                <?php echo "- $choix ";?>
                <input type="submit" name="" value="choisir"> <br><br>
            <?php endforeach; ?>
        </form>


    </body>


</html>