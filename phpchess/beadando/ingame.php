<?php
   $elsonev="";
   $masodiknev="";
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $elsojo=false;
        $masodikjo=false;
        if($_POST['elso']==1)
        {
            $elsojatekosN = $_POST['elsojatekosN'];
            $elsojatekosP = hash('sha256',$_POST['elsojatekosP']);
            $eredmeny=bejelentkez($elsojatekosN,$elsojatekosP);
            if($eredmeny)
            {
                $elsojo=true;
                $elsonev=$elsojatekosN;
            }else 
            {
                $elsojo=false;
                echo("
                    <!DOCTYPE html>
                        <html>
                            <head>
                                <title>KiKi Sakk</title>
                            </head>
                            <body>
                                <form method='post' id='bekuld' action='./sakk.php'>
                                    <input type='hidden' name='oldal' value='0'>
                                </form>
                                    <script>
                                        alert('Első játékos bejelentkezése sikertelen!');
                                        document.getElementById('bekuld').submit();
                                    </script>
                            </body>
                        </html>");
            }
        }
        else{
            $elsojo=true;
        }
        if($_POST['masodik']==1)
        {
            $masodikjatekosN = $_POST['masodikjatekosN'];
            $masodikjatekosP = hash('sha256',$_POST['masodikjatekosP']);
            $eredmeny=bejelentkez($masodikjatekosN,$masodikjatekosP);
            if($eredmeny)
            {
                $masodikjo=true;
                $masodiknev=$masodikjatekosN;
            }else 
            {
                $masodikjo=false;
                echo("
                    <!DOCTYPE html>
                        <html>
                            <head>
                                <title>KiKi Sakk</title>
                            </head>
                            <body>
                                <form method='post' id='bekuld' action='./sakk.php'>
                                    <input type='hidden' name='oldal' value='0'>
                                </form>
                                    <script>
                                        alert('Második játékos bejelentkezése sikertelen!');
                                        document.getElementById('bekuld').submit();
                                    </script>
                            </body>
                        </html>");
            }
        }
        else{
            $masodikjo=true;
        }
        if($elsojo&&$masodikjo)
        {
            session_start();
            $_SESSION["nev1"]=$elsonev;
            $_SESSION["nev2"]=$masodiknev;
            echo("<!DOCTYPE html>
            <html lang='en'>
            <head>
                <meta charset='UTF-8'>
                <meta http-equiv='X-UA-Compatible' content='IE=edge'>
                <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                <title>KiKi Sakk</title>
            </head>
            <body onload='indit();'>
                <script type='text/javascript' src='jquery-3.6.0.min.js'></script>
                <script type='text/javascript' src='script.js'></script>
               
                <link rel='stylesheet' href='sakk.css'>
                <div class='belsoresz'>
                    <h1>Egyedi sakk by:KiKi</h1>
                    <div class='row'>
                    <div class='column1'>
                        <h2 id='kinekkore'>Fehér Köre</h2>
                    </div>
                    <div class='column2'>
                    <sakk-tabla id='tabla'> 
                        <svg viewBox='0 0 100 100' class='coordinates'>
                            <text x='1' y='4'  font-size='2.8' >8</text>
                            <text x='1' y='16' font-size='2.8' >7</text>
                            <text x='1' y='28' font-size='2.8' >6</text>
                            <text x='1' y='41' font-size='2.8' >5</text>
                            <text x='1' y='54' font-size='2.8' >4</text>
                            <text x='1' y='66' font-size='2.8' >3</text>
                            <text x='1' y='78' font-size='2.8' >2</text>
                            <text x='1' y='91' font-size='2.8' >1</text>
                            <text x='10' y='99' font-size='2.8'>a</text>
                            <text x='22' y='99' font-size='2.8' >b</text>
                            <text x='35' y='99' font-size='2.8' >c</text>
                            <text x='47' y='99' font-size='2.8' >d</text>
                            <text x='60' y='99' font-size='2.8' >e</text>
                            <text x='72' y='99' font-size='2.8' >f</text>
                            <text x='85' y='99' font-size='2.8' >g</text>
                            <text x='97' y='99' font-size='2.8' >h</text>
                        </svg>
                        <div name='pos' id='bBASTYA1' class='Bbastya babu mezoA8'></div>
                        <div name='pos' id='bLO1' class='Blo babu mezoB8'></div>
                        <div  name='pos' id='bFUTO1' class='Bfuto babu mezoC8'></div>
                        <div name='pos'  id='bQUEEN' class='Bkiralyno babu mezoD8'></div>
                        <div name='pos'  id='bKING' class='Bkiraly babu mezoE8'></div>
                        <div  name='pos' id='bFUTO2' class='Bfuto babu mezoF8'></div>
                        <div  name='pos' id='bLO2' class='Blo babu mezoG8'></div>
                        <div  name='pos' id='bBASTYA2' class='Bbastya babu mezoH8'></div>
            
            
                        <div name='pos' id='bP1' class='Bparaszt babu mezoA7'></div>
                        <div name='pos' id='bP2' class='Bparaszt babu mezoB7'></div>
                        <div name='pos' id='bP3' class='Bparaszt babu mezoC7'></div>
                        <div name='pos' id='bP4' class='Bparaszt babu mezoD7'></div>
                        <div name='pos' id='bP5' class='Bparaszt babu mezoE7'></div>
                        <div name='pos' id='bP6' class='Bparaszt babu mezoF7'></div>
                        <div name='pos' id='bP7' class='Bparaszt babu mezoG7'></div>
                        <div name='pos' id='bP8' class='Bparaszt babu mezoH7'></div>
            
            
                        <div name='pos' id='wP8' class='Wparaszt babu mezoA2'></div>
                        <div name='pos' id='wP7' class='Wparaszt babu mezoB2'></div>
                        <div name='pos' id='wP6' class='Wparaszt babu mezoC2'></div>
                        <div name='pos' id='wP5' class='Wparaszt babu mezoD2'></div>
                        <div name='pos' id='wP4' class='Wparaszt babu mezoE2'></div>
                        <div name='pos' id='wP3' class='Wparaszt babu mezoF2'></div>
                        <div name='pos' id='wP2' class='Wparaszt babu mezoG2'></div>
                        <div name='pos' id='wP1' class='Wparaszt babu mezoH2'></div>
            
                        <div name='pos' id='wBASTYA2' class='Wbastya babu mezoA1'></div>
                        <div name='pos' id='wLO2' class='Wlo babu mezoB1'></div>
                        <div name='pos' id='wFUTO2' class='Wfuto babu mezoC1'></div>
                        <div name='pos' id='wKING' class='Wkiraly babu mezoD1'></div>
                        <div name='pos' id='wQUEEN' class='Wkiralyno babu mezoE1'></div>
                        <div name='pos' id='wFUTO1' class='Wfuto babu mezoF1'></div>
                        <div name='pos' id='wLO1' class='Wlo babu mezoG1'></div>
                        <div name='pos' id='wBASTYA1' class='Wbastya babu mezoH1'></div>
                    </sakk-tabla>
                    </div>
                </div>
                </div>
                <script>
                ");
                    
                    $random=rand(1,2);
                     if($random==1)
                     {
                        echo("var feherjatekos ='");
                        if($elsonev!="")
                        {
                            echo $elsonev;
                        }else
                        {
                            echo("");
                        }; 

                        echo("'; var feketejatekos ='");
                        if($masodiknev!="")
                        {
                            echo $masodiknev;
                        }
                        else
                        {
                            echo("");
                        }
                    }else
                    {
                        echo("var feketejatekos ='");
                        if($elsonev!="")
                        {
                            echo $elsonev;
                        }else
                        {
                            echo("");
                        }; 

                        echo("'; var feherjatekos ='");
                        if($masodiknev!="")
                        {
                            echo $masodiknev;
                        }
                        else
                        {
                            echo("");
                        }
                    }
                   
                    echo("';
                    var kezdet;
                    var veg;
                    var nyertes='';
                    function vege(nyert)
                    {
                        veg=new Date();
                        nyertes=nevkereso(nyert);
                        alert(nyertes+' nevü játékos nyert');
                        tovabbit();
                    }
                    function tovabbit()
                    {
                        
                        if(feherjatekos!=''&&feketejatekos!='')
                        {
                            var timeDiff = (veg - kezdet)/1000;
                            var eredmeny = Math.round(timeDiff);
                            window.location.href='vege.php'+'?blabla='+eredmeny+','+nyertes;
                        }else{
                            alert('Legalább egy játékos vendég. Nincs mit menteni.');
                            window.location.href='sakk.php';
                        }
                    }

                    function indit()
                    {
                        kezdet=new Date();
                        $('#kinekkore').text(nevkereso('feher')+' köre');
                    }
                    function nevkereso(szin)
                    {
                        if(szin=='feher')
                        {
                            if(feherjatekos!='')
                            {
                                return feherjatekos;
                            }else
                            {
                                return szin;
                            }
                        }
                        else
                        {
                            if(feketejatekos!='')
                            {
                                return feketejatekos;
                            }else
                            {
                                return szin;
                            }
                        }
                    }
                </script>
            </body>
            </html>
            ");
        }
      }
      function bejelentkez($nev,$jelszo)
      {
        $db = new SQLite3('sakk.db');
        $stm = $db->query("SELECT jelszo FROM Felhasznalok WHERE nickname = '$nev' ");
        $adatbazisjelszo="";
        while ($row = $stm->fetchArray()) {
            $adatbazisjelszo=$row['jelszo'];
        }
        if($adatbazisjelszo==$jelszo)
        {
            return true;
        }else
        {
            return false;
        }
      }
      
        
      
      
 ?>

