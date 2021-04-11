<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <title>Vote en ligne</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <link rel="stylesheet" href="css/styles.css">
        <script>
            if ( window.history.replaceState ) {
                window.history.replaceState( null, null, window.location.href );
            }
        </script>
    </head>
    <body>
        <div class="mainPage" id="createVote" style="display: block;">

            <table>
                <tbody>
                    <tr>
                        <td style="vertical-align:top">
                            <img class="logo" src="images/logoUnivPS.png" alt="logoUPSaclay"><br><br>

                            <button class="btnsOption" onclick="createBallot()">Créer un scrutin</button> <br><br>
                            <button class="btnsOption" onclick="sendInvitations()" disabled="">Invite les votants</button> <br><br>
                            <button class="btnsOption" onclick="voteMyself()" disabled="">Voter soi-même</button> <br><br>
                            <button class="btnsOption" onclick="updateBallot()" disabled="">Voir statistiques du scrutin</button> <br><br>
                            <button class="btnsOption" onclick="closeBallot()" disabled="">Fermer le scrutin</button> <br><br>
                            <button class="btnsOption" onclick="destroyBallot()" disabled="">Supprimer le scrutin</button> <br><br>
                            <button class="btnsOption" onclick="exitCreateBallot()">Fermer</button> <br><br>
                        </td>
                        <td>
                            <form onsubmit="return validatePoll()">
                                <table>
                                    <tbody>
                                        <!-- En tete de la page -->
                                        <tr>
                                            <td>
                                                <h1> Creer un vote</h1>
                                            </td>
                                        </tr>
                                    
                                        <!-- Description -->
                                        <tr>
                                            <td>
                                                <span id="prntOwnr">Organisateur:</span>
                                                <br>
                                                <input size="36" type="text" id="owner" readonly=""> 
                                                <br><br>
                                            </td>
                                        </tr>

                                        <!-- Question -->
                                        <tr>
                                            <td>
                                                <span id="prntQuestion">Question:</span>
                                                <br>
                                                <textarea id="question" rows="3" cols="60">Etes vous d'accord que...</textarea>
                                                <br><br>
                                            </td>
                                        </tr>

                                        <!-- Choix -->
                                        <tr>
                                            <td>
                                                <span id="prntOptions">Options: </span><br>
                                                <div>
                                                    <input type="text" size="55" class="voteOption" value="Yes" readOnly="">
                                                    <button onclick="removeOption(this.parentNode)">-</button>
                                                </div>
                                                <div>
                                                    <input type="text" size="55" class="voteOption" value="No" readOnly="">
                                                    <button onclick="removeOption(this.parentNode)">-</button>
                                                </div>
                                                <div>
                                                    <input type="text" size="55" class="voteOption" value="Abstention" readOnly="">
                                                    <button onclick="removeOption(this.parentNode)">-</button>
                                                </div>
                                                <div>
                                                    <input type="text" size="55" id="addOption" value="">
                                                    <button onclick="addOption(this.parentNode)">+</button>
                                                </div><br>
                                            </td>
                                        </tr>
                                        
                                        <!-- Voteurs -->
                                        <tr>
                                            <td>
                                                <span id="voterCount">1</span> Voteurs
                                                <div>
                                                    Adresses
                                                    <div style="display: inline-block; width: 80px"></div>
                                                    Procuration
                                                </div>

                                                <div>
                                                    <input class="voters" value="antoine.barbannaud" readonly="">
                                                    <input onchange="addProcuration()" type="checkbox" class="procuration">
                                                    <button onclick="removeVoter(this.parentNode)">-</button>
                                                </div>
                                                <div>
                                                    <input id="newvoter">
                                                    <button onclick="addVoter(this.parentNode)">+</button>
                                                </div>
                                                <br>
                                            </td>
                                        </tr>

                                        <!-- Resultats -->
                                        <tr>
                                            <td>
                                                <span id="result"></span>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </form>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="mainPage" id="votingPage" style="display: none;">
            <table>
                <tbody>
                    <!-- Header-->
                    <tr>
                        <td rowspan="4" style="vertical-align:top">
                            <img class="logo" height="128" src="images/logoUnivPS.png" alt="logoUPSaclay">
                        </td>
                        <td> 
                            <h1> Page de vote </h1>
                        </td>
                    </tr>

                    <!-- Voteur-->
                    <tr>
                        <td rowspan="1">
                            Voteur:
                            <div style="display: inline-block; width: 120px"></div>
                            Code du vote<br>
                            <input id="voterID" value="antoine.barbannaud@universite-paris-saclay.fr" readonly=""> 
                            <input id="voteCode" value="sD8dI" readonly="">
                            <br><br>
                            Question:<br>
                            <textarea id="questionID" rows="3" cols="30" readonly=""></textarea>   <br>
                            <br>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Choisis ton option puis clique sur vote !<br>
                            <br>
                            <div id="OptionList">
                                <input type="radio" name="persvote" value="Abstention">Abstention</input> <br>
                                <input type="radio" name="persvote" value="No/Non">No/Non</input> <br>
                                <input type="radio" name="persvote" value="Yes/Oui">Yes/Oui</input> <br>
                            </div>

                            <br><br>
                            <button id="voter" onclick="submitVote()" disabled="">Voter</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
    </body>
</html>