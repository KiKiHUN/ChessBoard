<!DOCTYPE html>
<html>
    <head>
        <title>KiKi Sakk</title>
        <link rel='stylesheet' href='fomenu.css'>
    </head>
    <body>
        <div class="belsoresz">
            <div class='row'>
                <form method="post" id="indit" action="./ingame.php">
                    <H1 >1. játékos:</H1>
                    <input type="hidden" id="elso" name="elso" value=1>
                    <div class='row'>
                        <div class="column">
                            <input class=" kozepre" type="radio" id="elso_felhasznalo" name="bejelentkez1" value="felhasznalo" checked>
                            <label for="elso_felhasznalo">Felhasználó</label><br>
                            <p class="nevjelszo kozepre">Név:</p>
                            <input class="szoveg kozepre" type="text" id="elsojatekosN" name="elsojatekosN" required />
                        </div>
                        <div class="column">
                            <input class=" kozepre" type="radio" id="elso_vendeg" name="bejelentkez1" value="vendeg">
                            <label for="elso_vendeg">Vendég</label><br> 
                            <p class="nevjelszo kozepre">Jelszo:</p>
                            <input class="szoveg kozepre" type="password" id="elsojatekosP" name="elsojatekosP" required /><br>
                        </div>
                    </div>
                    <br><br>
                    <H1 >2. játékos:</H1>
                    <input type="hidden" id="masodik" name="masodik" value=1>
                    <div class='row'>
                        <div class="column">
                            <input class=" kozepre" type="radio" id="masodik_felhasznalo" name="bejelentkez2" value="felhasznalo" checked>
                            <label for="masodik_felhasznalo">Felhasználó</label><br>
                            <p class="nevjelszo kozepre" >Név:</p>
                            <input class="szoveg kozepre" type="text" id="masodikjatekosN"  name="masodikjatekosN" required />
                        </div>
                        <div class="column">
                            <input class=" kozepre"type="radio" id="masodik_vendeg" name="bejelentkez2" value="vendeg">
                            <label for="masodik_vendeg">Vendég</label><br>
                            <p class="nevjelszo kozepre">Jelszo:</p>
                            <input class="szoveg kozepre" type="password" id="masodikjatekosP"  name="masodikjatekosP" required />
                        </div>
                    </div>
                    <br>
                    <div class='row'>
                        
                            <div class="button_slide slide_down kozepgomb" id="inditgomb">
                                <p class="gombszoveg">Indít</p>
                            </div>
                    </div>
                </form>
            </div>
            <br><br><br>
                <div class='row ketgomb'>
                    <div class="column regisztralas">
                        <form method="post" id="regi" action="./regisztfeldolgoz.php">
                            <input type="hidden" name="oldal" value='0'>
                            <div class="button_slide slide_right " id="regisztgomb">
                                <p class="gombszoveg2">Regisztrálás</p>
                            </div>
                        </form>
                    </div>
                    <div class="column ranglista">
                        <form method="post" id="score" action="./scoreboard.php">
                            <div class="button_slide slide_left ranglista" id="ranggomb">
                                <p class="gombszoveg2">Ranglista</p>
                            </div>
                        </form>
                    </div>
               
            </div>
        </div>
            
            
           
        
        <script type="text/javascript">
            document.getElementById("elso_felhasznalo").addEventListener("click", elso);
            document.getElementById("elso_vendeg").addEventListener("click", elso);
            document.getElementById("masodik_felhasznalo").addEventListener("click", masodik);
            document.getElementById("masodik_vendeg").addEventListener("click", masodik);
            document.getElementById("inditgomb").addEventListener("click", indit);
            document.getElementById("regisztgomb").addEventListener("click", reg);
            document.getElementById("ranggomb").addEventListener("click", score);
            function elso() {
               if(document.getElementById("elso_felhasznalo").checked)
               {
                document.getElementById("elsojatekosN").disabled=false;
                document.getElementById("elsojatekosP").disabled=false;
                document.getElementById("elso").value=1;
               }
               else
               {
                document.getElementById("elsojatekosN").disabled=true;
                document.getElementById("elsojatekosP").disabled=true;
                document.getElementById("elso").value=0;
               }
            }
            function masodik() {
                if(document.getElementById("masodik_felhasznalo").checked)
               {
                document.getElementById("masodikjatekosN").disabled=false;
                document.getElementById("masodikjatekosP").disabled=false;
                document.getElementById("masodik").value=1;
               }
               else
               {
                document.getElementById("masodikjatekosN").disabled=true;
                document.getElementById("masodikjatekosP").disabled=true;
                document.getElementById("masodik").value=0;
               }
            }
            function indit()
            {
                document.getElementById('indit').submit();
            }
            function reg()
            {
                document.getElementById('regi').submit();
            }
            function score()
            {
                document.getElementById('score').submit();
            }
            
        </script>
    </body>
</html>