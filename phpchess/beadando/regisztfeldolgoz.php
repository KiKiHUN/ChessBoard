<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if($_POST['oldal']=='0')
    {
        echo("
            <!DOCTYPE html>
                <html>
                    <head>
                    <meta charset = 'UTF-8' />
                        <title>KiKi Sakk</title>
                        <link rel='stylesheet' href='fomenu.css'>
                    </head>
                    <body>
                    <div class='belsoresz'>
                        <form method='post' id='regi' action='./regisztfeldolgoz.php'>
                        
                        <H1 >Regisztráció</H1>
                        <div class='ketgomb'>
                            <div class='row'>
                                <div class='column'>
                                    <input type='hidden' name='oldal' value='1'>
                                    <p class='nevjelszo'>Név:</p>
                                    <input class='szoveg' type='text' id='elsojatekosN' name='nev' required />
                                </div>
                                <div class='column'>
                                    <p class='nevjelszo'>Jelszo:</p>
                                    <input class='szoveg' type='password' id='elsojatekosP' name='jelszo' required /><br>
                                    
                                </div>
                                </div>
                        </form>
                        <br>
                        <div class='button_slide slide_right ' id='regisztgomb'>
                            <p class='gombszoveg2'>Regisztrálás</p>
                        </div>  
                        </div>
                        
                        <script type='text/javascript'>
                        document.getElementById('regisztgomb').addEventListener('click', reg);
                        function reg()
                        {
                            document.getElementById('regi').submit();
                        }
                        </script>
                    </body>
                </html>");
    }else
    {
        if($_POST['nev']!=""&&$_POST['jelszo']!="")
        {
            var_dump("eljut4");
            $jatekosnev = $_POST['nev'];
            $jatekosjelszo = hash('sha256',$_POST['jelszo']);
            regisztral($jatekosnev,$jatekosjelszo);
            
        }
        else{
            echo("
            <!DOCTYPE html>
                <html>
                    <head>
                        <title>KiKi Sakk</title>
                    </head>
                    <body>
                        <form method='post' id='bekuld' action='./regisztfeldolgoz.php'>
                            <input type='hidden' name='oldal' value='0'>
                        </form>
                            <script>
                                alert('Szóval a required megint nem működik.. Valamit üresen hagytál..');
                                document.getElementById('bekuld').submit();
                            </script>
                    </body>
                </html>");
        }
    }
}
function regisztral($nev,$jelszo)
{
    var_dump("eljut5");
    $db = new SQLite3('sakk.db');
    $stm = $db->query("SELECT count(*) FROM Felhasznalok WHERE nickname = '$nev' ");
    $leker;
    while ($row = $stm->fetchArray()) {
        $leker=$row[0];
    }
    if($leker==0)
    {
        $stm = $db->exec("INSERT INTO Felhasznalok (nickname,jelszo) VALUES ('$nev','$jelszo')");
        $stm = $db->exec("INSERT INTO ranglista (playerID,ido) VALUES ((select ID from Felhasznalok WHERE nickname='$nev'),0);");
        if($stm)
        {
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
                                alert('Regisztráció sikeres.');
                                document.getElementById('bekuld').submit();
                            </script>
                    </body>
                </html>");
        }else
        {
            
            echo("
            <!DOCTYPE html>
                <html>
                    <head>
                        <title>KiKi Sakk</title>
                    </head>
                    <body>
                        <form method='post' id='bekuld' action='./regisztfeldolgoz.php'>
                            <input type='hidden' name='oldal' value='0'>
                        </form>
                            <script>
                                alert('Regisztráció sikertelen. Próbálja újra.');
                                document.getElementById('bekuld').submit();
                            </script>
                    </body>
                </html>");
        }
    }
    else{
       echo("
        <!DOCTYPE html>
            <html>
                <head>
                    <title>KiKi Sakk</title>
                </head>
                <body>
                    <form method='post' id='bekuld' action='./regisztfeldolgoz.php'>
                        <input type='hidden' name='oldal' value='0'>
                    </form>
                        <script>
                            alert('Ez a név foglalt.');
                            document.getElementById('bekuld').submit();
                        </script>
                </body>
            </html>");
    }
        
}