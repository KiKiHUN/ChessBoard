<?php
session_start();
$adatok = $_GET['blabla'];
$darabok = explode(",", $adatok);
adatbazisfeltolt($darabok[1],$darabok[0]);
befejez();
        function adatbazisfeltolt($nev,$eredmeny)
        {
            $db = new SQLite3('sakk.db');
            $stm = $db->exec("UPDATE ranglista SET ido = $eredmeny WHERE playerID=(SELECT ID FROM Felhasznalok WHERE nickname='$nev')");
            echo("<script>alert('Mentés sikeres.')</script>");
        }
        function befejez()
        {
            session_destroy();
            header("Location: sakk.php");
        }
?>