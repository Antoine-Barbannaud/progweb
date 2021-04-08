<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <title>Vote en ligne</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <link rel="stylesheet" href="styles.css">
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
                        <td style="text-align:left;vertical-align:top">
                            <img class="logo" height="128" src="images/logoUnivPS.png" alt="hexagon logo"><br><br>

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
                                                <h1> Vote en ligne<br><small>Creer un scrutin</small></h1>
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
                                                    <span id="labele">Names</span>
                                                    
                                                    <div style="display:inline-block;width:260px"></div>
                                                    <span>Procuration</span>
                                                </div>

                                                <div>
                                                    <input class="voter" type="text" size="32" value="antoine.barbannaud" readonly="">
                                                    <span class="miniat">@universite-paris-saclay.fr</span>
                                                    <input onchange="updVoters()" type="checkbox" class="proxy1">
                                                    <input onchange="updVoters()" type="checkbox" class="proxy2">
                                                    <button onclick="removeVoter(this.parentNode)">-</button>
                                                </div>
                                                <div>
                                                    <input id="newvoter" size="32" onkeyup="checkMail(this)" type="text">
                                                    <span class="miniat">@universite-paris-saclay.fr</span>
                                                    <button style="width:58px" onclick="addVoter(this.parentNode)">+</button>
                                                </div>
                                                <br>
                                            </td>
                                        </tr>

                                        <!-- Resultats -->
                                        <tr>
                                            <td colspan="2" id="results">
                                            <span id="msgcreategen">...</span>
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
                <tbody><tr id="msg2header">
                <td rowspan="4" style="text-align:right;vertical-align:top">
                    <a href="."><img class="logo" height="128" src="images/Logo3.png" alt="hexagon logo"></a>
                </td>
                <td rowspan="4">
                     
                </td>
                <td colspan="1">
                    <h1> Ballotin.org <small>v2.01</small><br><small id="votetitle">Let's vote</small> </h1>
                </td>
                <td rowspan="4" style="text-align:right;vertical-align:top">
                    <a target="_blank" href="https://www.universite-paris-saclay.fr/"><img class="logo corplogo" src="images/Saclay-logo-rondTB.png" alt="UPSaclay logo"></a>
                </td>

                </tr>
                <tr><td rowspan="1">
                    <span id="labelg">Voter</span> : <br>
                    <input spellcheck="false" size="30" id="voterid" onkeyup="checkMail(this)" readonly=""><span class="miniat">@universite-paris-saclay.fr</span> <input type="password" size="18" id="voterpasswd" readonly=""><br><br><br>
                    <span id="labelh">Ballot code</span> :
                    <input spellcheck="false" size="9" id="ballotid" readonly="">   <br> <br>
                    <span id="labeli">Question</span> :<br>
                    <textarea rows="5" cols="50" id="questionid" readonly=""></textarea>   <br>
                    <br>
                </td>
                </tr>
                <tr>
                <td>
                    <span id="labelj">Choose your option then click Vote !</span> <br>
                    <div class="box" style="width:100%">
                    <div class="content">
                        <br>
                        <!--select id="optvote" onchange="updateOptVote(this)">
                        </select-->
                        <div id="rbvote"><label><input type="radio" onchange="updateRBVote()" name="persvote" value="Abstention" <="" input="">Abstention</label><br><label><input type="radio" onchange="updateRBVote()" name="persvote" value="No/Non" <="" input="">No/Non</label><br><label><input type="radio" onchange="updateRBVote()" name="persvote" value="Yes/Oui" <="" input="">Yes/Oui</label><br></div><br><br>
                        <button id="push" onclick="pushVote()" disabled="">Vote </button>
                        <button style="display: inline-block;" id="checkres" onclick="checkResults()">check results </button>
                        <button id="closevote" onclick="closeVote()" style="display: inline-block;">Leave</button><br><br>
                    </div>
                    </div>
                </td>
                </tr>
                <tr>
                <td>
                    <div id="msgvoting"><span><b>Results:</b></span><br><span class="vote">-2</span></div>
                </td>
                </tr>

                </tbody>
            </table>
        </div>
        
    </body>
</html>