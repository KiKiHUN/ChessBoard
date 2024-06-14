<?php
echo("
<!DOCTYPE html>
    <html>
        <head>
            <title>KiKi Sakk</title>
            <link rel='stylesheet' href='scoreboard.css'>
        </head>
        <body>
            <div class='row'>");

            
        $db = new SQLite3('sakk.db');
        $stm = $db->query("SELECT ranglista.ido,Felhasznalok.nickname FROM ranglista INNER JOIN Felhasznalok ON ranglista.playerID=Felhasznalok.ID WHERE ranglista.ido != 0 ORDER BY ido,nickname DESC");
        $ido="";
        $szamlalo=1;
        while ($sor = $stm->fetchArray()) {
           echo("<div class='column'>
                    <div class='card ");
                    if($szamlalo==1){echo("elso");}
                        elseif($szamlalo==2){echo("masodik");}
                            elseif($szamlalo==3){echo("harmadik");}
                                else{echo("normal");};
                            echo("'>
                        <h3>$szamlalo.hely</h3>
                        <p>Név: $sor[1]</p>
                        <p>Eredmény:</p><p>");
                        orakiirat($sor[0]);
                        
                        echo("</p>
                    </div>
                </div>");
                $szamlalo++;
        }

echo("
        </body>
    </html>");
    function orakiirat($masodperc)
    {
        $ora=0;
        if($masodperc>3599)
        {
            while($masodperc>=3600)
            {
                $masodperc=$masodperc-3600;
                $ora++;
            }
            if($ora>0)
            {
                echo($ora."ó, ");
            }

        }
            perckiirat($masodperc);
        
    }
    function perckiirat($masodperc)
    {
        $perc=0;
        if($masodperc>59)
        {
            while($masodperc>=60)
            {
                $masodperc=$masodperc-60;
                $perc++;
            }
            if($perc>0)
            {
                echo($perc."p, ");
            }
        }
        masodperckiirat($masodperc);
    }
    function masodperckiirat($masodperc)
    {
        if($masodperc>0)
            {
                echo($masodperc."m");
            }
    }
?>