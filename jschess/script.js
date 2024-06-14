$(function () {

    var tablatomb = [
        /*8*/['bBASTYA1', 'bLO1', 'bFUTO1', 'bQUEEN', 'bKING', 'bFUTO2', 'bLO2', 'bBASTYA2'],
        /*7*/['bP1',       'bP2',   'bP3',   'bP4',   'bP5',   'bP6',    'bP7',    'bP8'],
        /*6*/['X',          'X',     'X',     'X',     'X',     'X',      'X',      'X'],
        /*5*/['X',           'X',    'X',     'X',     'X',     'X',      'X',      'X'],
        /*4*/['X',           'X',    'X',     'X',     'X',     'X',      'X',      'X'],
        /*3*/['X',           'X',    'X',     'X',     'X',     'X',      'X',      'X'],
        /*2*/['wP8',        'wP7',   'wP6',  'wP5',    'wP4',   'wP3',   'wP2',    'wP1'],
        /*1*/['wBASTYA2', 'wLO2', 'wFUTO2', 'wKING', 'wQUEEN', 'wFUTO1', 'wLO1', 'wBASTYA1'],
        /*      A           B         C         D       E          F       G          H */
    ]
    var feherkore=true;

    $('div[name*="pos"]').click(function () {
        var babu = $(this).attr('class').split(' ');
        var babuid = $(this).attr('id');
        console.log("Jelenlegi bábu mezo: " + babu[2]);
        $('div[name*="jeloles"]').remove();
        switch (babu[0]) {
            case "Bfuto":
                if (!feherkore) {
                futohighlight(babu[2], babuid);
                }
                break;
            case "Wfuto":
                if (feherkore) {
                futohighlight(babu[2], babuid);
                }
                break;
            case "Bbastya":
                if (!feherkore) {
                bastyahighlight(babu[2], babuid);
                }
                break;
            case "Wbastya":
                if (feherkore) {
                bastyahighlight(babu[2], babuid);
                }
                break;
            case "Blo":
                if (!feherkore) {
                lohighlight(babu[2], babuid);
                }
                break;
            case "Wlo":
                if (feherkore) {
                lohighlight(babu[2], babuid);
                }
                break;
            case "Bkiraly":
                if (!feherkore) {
                kiralyhighlight(babu[2], babuid);
                }
                break;
            case "Wkiraly":
                if (feherkore) {
                kiralyhighlight(babu[2], babuid);
                }
                break;
            case "Bkiralyno":
                if (!feherkore) {
                kiralynohighlight(babu[2], babuid);
                }
                break;
            case "Wkiralyno":
                if (feherkore) {
                kiralynohighlight(babu[2], babuid);
                }
                break;
            case "Bparaszt":
                if (!feherkore) {
                paraszthighlight(babu[2], babuid);
                }
                break;
            case "Wparaszt":
                if (feherkore) {
                paraszthighlight(babu[2], babuid);
                }
                break;
            
        }
        

    });
    $(document).on('click', 'div[name*="jeloles"]', function() {
        //0=k/H 1=babumezo 2=highligghtmezo 3=babuid
        var highlightid = $(this).attr('id').split('_');
        var babu = $('#'+highlightid[3]).attr('class').split(' ');
        console.log("Jelenlegi highlight mezo: " + highlightid[1]);
        var honnan=helytokoordinata(highlightid[1]);
        var hova=helytokoordinata(highlightid[2]);
        switch (highlightid[0]) {
            case "K":
                parasztvaltozas(highlightid[3],hova,babu);
                $("#"+highlightid[3]).removeClass(highlightid[1]);
                $("#"+highlightid[3]).addClass(highlightid[2]);
                $("#"+tablatomb[hova[0]][hova[1]]).remove();
                if (tablatomb[hova[0]][hova[1]]=="wKING") {
                    if (confirm('Fekete játékos nyert. Visszavágó?')) {
                        location.reload();
                    }else
                    {
                        window.close();
                    }
                }
                if (tablatomb[hova[0]][hova[1]]=="bKING") {
                    if (confirm('Fehér játékos nyert. Visszavágó?')) {
                        window.location.href = "./chess.html";
                    }else
                    {
                        window.close();
                    }    
                }
                tablatomb[honnan[0]][honnan[1]]="X";
                tablatomb[hova[0]][hova[1]]=highlightid[3];
                
                $('div[name*="jeloles"]').remove();
                feherkore=!feherkore;
                if (feherkore) {
                    $("#kinekkore").text("Fehér köre");
                }else
                {
                    $("#kinekkore").text("Fekete köre");
                }
                break;
            case "H":
                tablatomb[honnan[0]][honnan[1]]="X";
                tablatomb[hova[0]][hova[1]]=highlightid[3];
               
                parasztvaltozas(highlightid[3],hova,babu);
                $("#"+highlightid[3]).removeClass(highlightid[1]);
                $("#"+highlightid[3]).addClass(highlightid[2]);
                $('div[name*="jeloles"]').remove();
                feherkore=!feherkore;
                if (feherkore) {
                    $("#kinekkore").text("Fehér köre");
                }else
                {
                    $("#kinekkore").text("Fekete köre");
                }
                
                break;
          
            default:
                break;
        }

    });
   
    function paraszthighlight(hely, nev1) {
        var koordinata = helytokoordinata(hely);
        var jelolo;
        var nev2=nev1.split('P');
        switch (nev2[0]) {
            case "w":
            //feher
            //fel 1-et lepes
                if (koordinata[0] - 1>=0)
                {
                    if(tablatomb[koordinata[0] - 1][koordinata[1]] == 'X') {
                        jelolo=koordinatatohely(koordinata[0] - 1,koordinata[1]);
                        $("#tabla").append("<div name='jeloles' id='H_"+hely+"_"+jelolo+"_"+nev1+"' class='highlight babu "+jelolo+"'></div>");
                //fel 2-t lepes
                        if (koordinata[0] - 2>=0&&tablatomb[koordinata[0] - 2][koordinata[1]] == "X") {
                            jelolo=koordinatatohely(koordinata[0] - 2,koordinata[1]);
                            $("#tabla").append("<div name='jeloles' id='H_"+hely+"_"+jelolo+"_"+nev1+"' class='highlight babu "+jelolo+"'></div>");
                        }
                    }
                }
                

            //bal fel oles
                if (koordinata[0] - 1>=0&&koordinata[1]-1>=0&&tablatomb[koordinata[0] - 1][koordinata[1]-1] != 'X'&& tablatomb[koordinata[0] - 1][koordinata[1]-1].includes("b"))
                {
                    jelolo=koordinatatohely(koordinata[0] - 1,koordinata[1]-1);
                    $("#tabla").append("<div name='jeloles' id='K_"+hely+"_"+jelolo+"_"+nev1+"' class='killhighlights babu "+jelolo+"'></div>");
                }

            //jobb fel oles
                if (koordinata[0] - 1>=0&&koordinata[1]+1<8&&tablatomb[koordinata[0] - 1][koordinata[1]+1] != 'X'&&tablatomb[koordinata[0] - 1][koordinata[1]+1].includes("b"))
                {
                    jelolo=koordinatatohely(koordinata[0] - 1,koordinata[1]+1);
                    $("#tabla").append("<div name='jeloles' id='K_"+hely+"_"+jelolo+"_"+nev1+"' class='killhighlights babu "+jelolo+"'></div>");
                }
                
                break;
            
            case "b":
            //fekete
            //1-et le
                if (koordinata[0] + 1<8&&tablatomb[koordinata[0] + 1][koordinata[1]] == "X") {
                    var jelolo;
                    jelolo=koordinatatohely(koordinata[0] + 1,koordinata[1]);
                    $("#tabla").append("<div name='jeloles' id='H_"+hely+"_"+jelolo+"_"+nev1+"' class='highlight babu "+jelolo+"'></div>");
                //2-t le
                    if (koordinata[0] + 2<8&&tablatomb[koordinata[0] + 2][koordinata[1]] == "X") {
                        jelolo=koordinatatohely(koordinata[0] + 2,koordinata[1]);
                        $("#tabla").append("<div name='jeloles' id='H_"+hely+"_"+jelolo+"_"+nev1+"' class='highlight babu "+jelolo+"'></div>");
                    }
                }
               
            //bal le oles
                if (koordinata[0] + 1<8&&koordinata[1]-1>=0&&tablatomb[koordinata[0] + 1][koordinata[1]-1] != 'X'&&tablatomb[koordinata[0] + 1][koordinata[1]-1].includes("w"))
                {
                    jelolo=koordinatatohely(koordinata[0] + 1,koordinata[1]-1);
                    $("#tabla").append("<div name='jeloles' id='K_"+hely+"_"+jelolo+"_"+nev1+"' class='killhighlights babu "+jelolo+"'></div>");
                }
                
            //jobb le oles
                if (koordinata[0] + 1<8&&koordinata[1]+1<8&&tablatomb[koordinata[0] + 1][koordinata[1]+1]!= 'X'&&tablatomb[koordinata[0] +1][koordinata[1]+1].includes("w"))
                {
                    jelolo=koordinatatohely(koordinata[0] + 1,koordinata[1]+1);
                    $("#tabla").append("<div name='jeloles' id='K_"+hely+"_"+jelolo+"_"+nev1+"' class='killhighlights babu "+jelolo+"'></div>");
                }
                
                break;

        }

    }
    function futohighlight(hely, nev) {
        var koordinata = helytokoordinata(hely);
        var jelolo;
    //balfel
        var balfel=1;
        while (koordinata[0] - balfel>=0&&koordinata[1]-1>=0&&tablatomb[koordinata[0] - balfel][koordinata[1]-balfel] == 'X') {
                jelolo=koordinatatohely(koordinata[0] - balfel,koordinata[1]-balfel);
                $("#tabla").append("<div name='jeloles' id='H_"+hely+"_"+jelolo+"_"+nev+"' class='highlight babu "+jelolo+"'></div>");
                balfel++;
        }
        //akadaly kill
        if (koordinata[0] - balfel>=0&&koordinata[1]-balfel>=0)
        {
            if(nev.includes("w")&&tablatomb[koordinata[0] - balfel][koordinata[1]-balfel].includes("b")||nev.includes("b")&&tablatomb[koordinata[0] - balfel][koordinata[1]-balfel].includes("w")) {
            jelolo=koordinatatohely(koordinata[0] - balfel,koordinata[1]-balfel);
                $("#tabla").append("<div name='jeloles' id='K_"+hely+"_"+jelolo+"_"+nev+"' class='killhighlights babu "+jelolo+"'></div>");
            }
        }

    //bal le
        var balle=1;
        while (koordinata[0] + balle<8&&koordinata[1]-balle>=0&&tablatomb[koordinata[0] +balle][koordinata[1]-balle] == 'X') {
                jelolo=koordinatatohely(koordinata[0] + balle,koordinata[1]-balle);
                $("#tabla").append("<div name='jeloles' id='H_"+hely+"_"+jelolo+"_"+nev+"' class='highlight babu "+jelolo+"'></div>");
                balle++;
        }
        //akadaly kill
        if (koordinata[0] + balle<8)
        {
            if(koordinata[1]-balle>=0&&nev.includes("w")&&tablatomb[koordinata[0] +balle][koordinata[1]-balle].includes("b")||nev.includes("b")&&tablatomb[koordinata[0] + balle][koordinata[1]-balle].includes("w")) {
            jelolo=koordinatatohely(koordinata[0] +balle,koordinata[1]-balle);
                $("#tabla").append("<div name='jeloles' id='K_"+hely+"_"+jelolo+"_"+nev+"'  class='killhighlights babu "+jelolo+"'></div>");
            }
        }

    //jobb fel
         var jobbfel=1;
         while (koordinata[0] - jobbfel>=0&&koordinata[1]+jobbfel<8&&tablatomb[koordinata[0] -jobbfel][koordinata[1]+jobbfel] == 'X') {
                 jelolo=koordinatatohely(koordinata[0] - jobbfel,koordinata[1]+jobbfel);
                 $("#tabla").append("<div name='jeloles' id='H_"+hely+"_"+jelolo+"_"+nev+"' class='highlight babu "+jelolo+"'></div>");
                 jobbfel++;
         }
        //akadaly kill
         if (koordinata[0] - jobbfel>=0&&koordinata[1]+jobbfel<8)
         {
             if(nev.includes("w")&&tablatomb[koordinata[0] -jobbfel][koordinata[1]+jobbfel].includes("b")||nev.includes("b")&&tablatomb[koordinata[0] -jobbfel][koordinata[1]+jobbfel].includes("w")) {
             jelolo=koordinatatohely(koordinata[0] -jobbfel,koordinata[1]+jobbfel);
                 $("#tabla").append("<div name='jeloles' id='K_"+hely+"_"+jelolo+"_"+nev+"' class='killhighlights babu "+jelolo+"'></div>");
             }
         }

    //jobb le
        var jobble=1;
        while (koordinata[0] + jobble<8&&koordinata[1]+jobble<8&&tablatomb[koordinata[0] +jobble][koordinata[1]+jobble] == 'X') {
                jelolo=koordinatatohely(koordinata[0] + jobble,koordinata[1]+jobble);
                $("#tabla").append("<div name='jeloles' id='H_"+hely+"_"+jelolo+"_"+nev+"' class='highlight babu "+jelolo+"'></div>");
                jobble++;
        }
        //akadaly kill
        if (koordinata[0] + jobble<8&&koordinata[1]+jobble<8)
        {
            if(nev.includes("w")&&tablatomb[koordinata[0] +jobble][koordinata[1]+jobble].includes("b")||nev.includes("b")&&tablatomb[koordinata[0] + jobble][koordinata[1]+jobble].includes("w")) {
            jelolo=koordinatatohely(koordinata[0] +jobble,koordinata[1]+jobble);
                $("#tabla").append("<div name='jeloles' id='K_"+hely+"_"+jelolo+"_"+nev+"' class='killhighlights babu "+jelolo+"'></div>");
            }
        }

    }
    function lohighlight(hely, nev) {
        var koordinata = helytokoordinata(hely);
        var jelolo;
    //bal fel L
        if (koordinata[0]-1>=0&&koordinata[1]-2>=0) {
            if (tablatomb[koordinata[0] - 1][koordinata[1]-2] == 'X') {
                jelolo=koordinatatohely(koordinata[0] - 1,koordinata[1]-2);
                $("#tabla").append("<div name='jeloles' id='H_"+hely+"_"+jelolo+"_"+nev+"' class='highlight babu "+jelolo+"'></div>");
            }
            if (nev.includes("w")&&tablatomb[koordinata[0] - 1][koordinata[1]-2].includes("b")||nev.includes("b")&&tablatomb[koordinata[0] - 1][koordinata[1]-2].includes("w")) {
                jelolo=koordinatatohely(koordinata[0] - 1,koordinata[1]-2);
                $("#tabla").append("<div name='jeloles' id='K_"+hely+"_"+jelolo+"_"+nev+"' class='killhighlights babu "+jelolo+"'></div>");
            }
        }
    //bal le L
        if (koordinata[0]+1<8&&koordinata[1]-2>=0) {
            if (tablatomb[koordinata[0] + 1][koordinata[1]-2] == 'X') {
                jelolo=koordinatatohely(koordinata[0] + 1,koordinata[1]-2);
                $("#tabla").append("<div name='jeloles' id='H_"+hely+"_"+jelolo+"_"+nev+"' class='highlight babu "+jelolo+"'></div>");
            }
            if (nev.includes("wa")&&tablatomb[koordinata[0] + 1][koordinata[1]-2].includes("b")||nev.includes("b")&&tablatomb[koordinata[0] + 1][koordinata[1]-2].includes("w")) {
                jelolo=koordinatatohely(koordinata[0] + 1,koordinata[1]-2);
                $("#tabla").append("<div name='jeloles' id='K_"+hely+"_"+jelolo+"_"+nev+"' class='killhighlights babu "+jelolo+"'></div>");
            }
        }


    //jobb fel L
        if (koordinata[0]-1>=0&&koordinata[1]+2<8) {
            if (tablatomb[koordinata[0] - 1][koordinata[1]+2] == 'X') {
                jelolo=koordinatatohely(koordinata[0] - 1,koordinata[1]+2);
                $("#tabla").append("<div name='jeloles' id='H_"+hely+"_"+jelolo+"_"+nev+"' class='highlight babu "+jelolo+"'></div>");
            }
            if (nev.includes("w")&&tablatomb[koordinata[0] - 1][koordinata[1]+2].includes("b")||nev.includes("b")&&tablatomb[koordinata[0] - 1][koordinata[1]+2].includes("w")) {
                jelolo=koordinatatohely(koordinata[0] - 1,koordinata[1]+2);
                $("#tabla").append("<div name='jeloles' id='K_"+hely+"_"+jelolo+"_"+nev+"' class='killhighlights babu "+jelolo+"'></div>");
            }
        }
    //jobb le L
        if (koordinata[0]+1<8&&koordinata[1]+2<8) {
            if (tablatomb[koordinata[0] + 1][koordinata[1]+2] == 'X') {
                jelolo=koordinatatohely(koordinata[0] + 1,koordinata[1]+2);
                $("#tabla").append("<div name='jeloles' id='H_"+hely+"_"+jelolo+"_"+nev+"' class='highlight babu "+jelolo+"'></div>");
            }
            if (nev.includes("w")&&tablatomb[koordinata[0] + 1][koordinata[1]+2].includes("b")||nev.includes("b")&&tablatomb[koordinata[0] + 1][koordinata[1]+2].includes("w")) {
                jelolo=koordinatatohely(koordinata[0] + 1,koordinata[1]+2);
                $("#tabla").append("<div name='jeloles' id='K_"+hely+"_"+jelolo+"_"+nev+"' class='killhighlights babu "+jelolo+"'></div>");
            }
        }


    //le bal L
        if (koordinata[0]+2<8&&koordinata[1]-1>=0) {
            if (tablatomb[koordinata[0] + 2][koordinata[1]-1] == 'X') {
                jelolo=koordinatatohely(koordinata[0] + 2,koordinata[1]-1);
                $("#tabla").append("<div name='jeloles' id='H_"+hely+"_"+jelolo+"_"+nev+"' class='highlight babu "+jelolo+"'></div>");
            }
            if (nev.includes("w")&&tablatomb[koordinata[0] + 2][koordinata[1]-1].includes("b")||nev.includes("b")&&tablatomb[koordinata[0] + 2][koordinata[1]-1].includes("w")) {
                jelolo=koordinatatohely(koordinata[0] + 2,koordinata[1]-1);
                $("#tabla").append("<div name='jeloles' id='K_"+hely+"_"+jelolo+"_"+nev+"' class='killhighlights babu "+jelolo+"'></div>");
            }
        }
    //le jobb L
        if (koordinata[0]+2<8&&koordinata[1]+1<8) {
            if (tablatomb[koordinata[0] + 2][koordinata[1]+1] == 'X') {
                jelolo=koordinatatohely(koordinata[0] + 2,koordinata[1]+1);
                $("#tabla").append("<div name='jeloles' id='H_"+hely+"_"+jelolo+"_"+nev+"' class='highlight babu "+jelolo+"'></div>");
            }
            if (nev.includes("w")&&tablatomb[koordinata[0] + 2][koordinata[1]+1].includes("b")||nev.includes("b")&&tablatomb[koordinata[0] + 2][koordinata[1]+1].includes("w")) {
                jelolo=koordinatatohely(koordinata[0] + 2,koordinata[1]+1);
                $("#tabla").append("<div name='jeloles' id='K_"+hely+"_"+jelolo+"_"+nev+"' class='killhighlights babu "+jelolo+"'></div>");
            }
        }


    //fel bal L
        if (koordinata[0]-2>=0&&koordinata[1]-1>=0) {
            if (tablatomb[koordinata[0] - 2][koordinata[1]-1] == 'X') {
                jelolo=koordinatatohely(koordinata[0] - 2,koordinata[1]-1);
                $("#tabla").append("<div name='jeloles' id='H_"+hely+"_"+jelolo+"_"+nev+"' class='highlight babu "+jelolo+"'></div>");
            }
            if (nev.includes("w")&&tablatomb[koordinata[0] - 2][koordinata[1]-1].includes("b")||nev.includes("b")&&tablatomb[koordinata[0] - 2][koordinata[1]-1].includes("w")) {
                jelolo=koordinatatohely(koordinata[0] - 2,koordinata[1]-1);
                $("#tabla").append("<div name='jeloles' id='K_"+hely+"_"+jelolo+"_"+nev+"' class='killhighlights babu "+jelolo+"'></div>");
            }
        }
    //fel jobb L
        if (koordinata[0]-2>=0&&koordinata[1]+1<8) {
            if (tablatomb[koordinata[0] - 2][koordinata[1]+1] == 'X') {
                jelolo=koordinatatohely(koordinata[0] - 2,koordinata[1]+1);
                $("#tabla").append("<div name='jeloles' id='H_"+hely+"_"+jelolo+"_"+nev+"' class='highlight babu "+jelolo+"'></div>");
            }
            if (nev.includes("w")&&tablatomb[koordinata[0] - 2][koordinata[1]+1].includes("b")||nev.includes("b")&&tablatomb[koordinata[0] - 2][koordinata[1]+1].includes("w")) {
                jelolo=koordinatatohely(koordinata[0] - 2,koordinata[1]+1);
                $("#tabla").append("<div name='jeloles' id='K_"+hely+"_"+jelolo+"_"+nev+"' class='killhighlights babu "+jelolo+"'></div>");
            }
        }

    }
    function bastyahighlight(hely, nev) {
        var koordinata = helytokoordinata(hely);
        var jelolo;

        //fel jeloles
        var fel=1;
        while (koordinata[0] - fel>=0&&tablatomb[koordinata[0] - fel][koordinata[1]] == 'X') {
                jelolo=koordinatatohely(koordinata[0] - fel,koordinata[1]);
                $("#tabla").append("<div name='jeloles' id='H_"+hely+"_"+jelolo+"_"+nev+"' class='highlight babu "+jelolo+"'></div>");
                fel++;
        }
        //akadaly kill
        if (koordinata[0] - fel>=0)
        {
            if(nev.includes("w")&&tablatomb[koordinata[0] - fel][koordinata[1]].includes("b")||nev.includes("b")&&tablatomb[koordinata[0] - fel][koordinata[1]].includes("w")) {
            jelolo=koordinatatohely(koordinata[0] - fel,koordinata[1]);
                $("#tabla").append("<div name='jeloles' id='K_"+hely+"_"+jelolo+"_"+nev+"' class='killhighlights babu "+jelolo+"'></div>");
            }
        }

        //le jeloles
        var le=1;
        while (koordinata[0] + le<8&&tablatomb[koordinata[0] +le][koordinata[1]] == 'X') {
                jelolo=koordinatatohely(koordinata[0] +le,koordinata[1]);
                $("#tabla").append("<div name='jeloles' id='H_"+hely+"_"+jelolo+"_"+nev+"' class='highlight babu "+jelolo+"'></div>");
                le++;
        }
        //akadaly kill
        if (koordinata[0] +le<8)
        {
            if(nev.includes("w")&&tablatomb[koordinata[0] +le][koordinata[1]].includes("b")||nev.includes("b")&&tablatomb[koordinata[0] +le][koordinata[1]].includes("w")) {
            jelolo=koordinatatohely(koordinata[0] +le,koordinata[1]);
                $("#tabla").append("<div name='jeloles' id='K_"+hely+"_"+jelolo+"_"+nev+"' class='killhighlights babu "+jelolo+"'></div>");
            }
        }

        //balra jeloles
        var balra=1;
        while (koordinata[1] - balra>=0&&tablatomb[koordinata[0]][koordinata[1]-balra] == 'X') {
                jelolo=koordinatatohely(koordinata[0],koordinata[1]-balra);
                $("#tabla").append("<div name='jeloles' id='H_"+hely+"_"+jelolo+"_"+nev+"' class='highlight babu "+jelolo+"'></div>");
                balra++;
        }
        //akadaly kill
        if (koordinata[1] -balra>=0)
        {
            if(nev.includes("w")&&tablatomb[koordinata[0]][koordinata[1]-balra].includes("b")||nev.includes("b")&&tablatomb[koordinata[0]][koordinata[1]-balra].includes("w")) {
            jelolo=koordinatatohely(koordinata[0],koordinata[1]-balra);
                $("#tabla").append("<div name='jeloles' id='K_"+hely+"_"+jelolo+"_"+nev+"' class='killhighlights babu "+jelolo+"'></div>");
            }
        }

        //jobbra jeloles
        var jobbra=1;
        while (koordinata[1] + jobbra<8&&tablatomb[koordinata[0]][koordinata[1]+jobbra] == 'X') {
                jelolo=koordinatatohely(koordinata[0],koordinata[1]+jobbra);
                $("#tabla").append("<div name='jeloles' id='H_"+hely+"_"+jelolo+"_"+nev+"' class='highlight babu "+jelolo+"'></div>");
                jobbra++;
        }
        //akadaly kill
        if (koordinata[1] +jobbra<8)
        {
            if(nev.includes("w")&&tablatomb[koordinata[0]][koordinata[1]+jobbra].includes("b")||nev.includes("b")&&tablatomb[koordinata[0]][koordinata[1]+jobbra].includes("w")) {
                jelolo=koordinatatohely(koordinata[0],koordinata[1]+jobbra);
                $("#tabla").append("<div name='jeloles' id='K_"+hely+"_"+jelolo+"_"+nev+"' class='killhighlights babu "+jelolo+"'></div>");
            }
        }
    }
    function kiralyhighlight(hely, nev) {
       
        var koordinata = helytokoordinata(hely);
        var jelolo;
        //fel
        if (koordinata[0]-1>=0) {
            if (tablatomb[koordinata[0] - 1][koordinata[1]] == 'X') {
                jelolo=koordinatatohely(koordinata[0] - 1,koordinata[1]);
                $("#tabla").append("<div name='jeloles' id='H_"+hely+"_"+jelolo+"_"+nev+"' class='highlight babu "+jelolo+"'></div>");
            }
            if (nev.includes("w")&&tablatomb[koordinata[0] - 1][koordinata[1]].includes("b")||nev.includes("b")&&tablatomb[koordinata[0] - 1][koordinata[1]].includes("w")) {
                jelolo=koordinatatohely(koordinata[0] - 1,koordinata[1]);
                $("#tabla").append("<div name='jeloles' id='K_"+hely+"_"+jelolo+"_"+nev+"' class='killhighlights babu "+jelolo+"'></div>");
            }
        }
        //bel fel
        if (koordinata[0]-1>=0&&koordinata[1]-1>=0) {
            if (tablatomb[koordinata[0] - 1][koordinata[1]-1] == 'X') {
                jelolo=koordinatatohely(koordinata[0] - 1,koordinata[1]-1);
                $("#tabla").append("<div name='jeloles' id='H_"+hely+"_"+jelolo+"_"+nev+"' class='highlight babu "+jelolo+"'></div>");
            }
            if (nev.includes("w")&&tablatomb[koordinata[0] - 1][koordinata[1]-1].includes("b")||nev.includes("b")&&tablatomb[koordinata[0] - 1][koordinata[1]-1].includes("w")) {
                jelolo=koordinatatohely(koordinata[0] - 1,koordinata[1]-1);
                $("#tabla").append("<div name='jeloles' id='K_"+hely+"_"+jelolo+"_"+nev+"' class='killhighlights babu "+jelolo+"'></div>");
            }
        }
        //bal
        if (koordinata[1]-1>=0) {
            if (tablatomb[koordinata[0]][koordinata[1]-1] == 'X') {
                jelolo=koordinatatohely(koordinata[0] ,koordinata[1]-1);
                $("#tabla").append("<div name='jeloles' id='H_"+hely+"_"+jelolo+"_"+nev+"' class='highlight babu "+jelolo+"'></div>");
            }
            if (nev.includes("w")&&tablatomb[koordinata[0]][koordinata[1]-1].includes("b")||nev.includes("b")&&tablatomb[koordinata[0]][koordinata[1]-1].includes("w")) {
                jelolo=koordinatatohely(koordinata[0],koordinata[1]-1);
                $("#tabla").append("<div name='jeloles' id='K_"+hely+"_"+jelolo+"_"+nev+"' class='killhighlights babu "+jelolo+"'></div>");
            }
        }
        //bal le
        if (koordinata[0]+1<8&&koordinata[1]-1>=0) {
            if (tablatomb[koordinata[0]+1][koordinata[1]-1] == 'X') {
                jelolo=koordinatatohely(koordinata[0]+1 ,koordinata[1]-1);
                $("#tabla").append("<div name='jeloles' id='H_"+hely+"_"+jelolo+"_"+nev+"' class='highlight babu "+jelolo+"'></div>");
            }
            if (nev.includes("w")&&tablatomb[koordinata[0]+1][koordinata[1]-1].includes("b")||nev.includes("b")&&tablatomb[koordinata[0]+1][koordinata[1]-1].includes("w")) {
                jelolo=koordinatatohely(koordinata[0]+1,koordinata[1]-1);
                $("#tabla").append("<div name='jeloles' id='K_"+hely+"_"+jelolo+"_"+nev+"' class='killhighlights babu "+jelolo+"'></div>");
            }
        }
        //le
        if (koordinata[0]+1<8) {
            if (tablatomb[koordinata[0]+1][koordinata[1]] == 'X') {
                jelolo=koordinatatohely(koordinata[0]+1 ,koordinata[1]);
                $("#tabla").append("<div name='jeloles' id='H_"+hely+"_"+jelolo+"_"+nev+"' class='highlight babu "+jelolo+"'></div>");
            }
            if (nev.includes("w")&&tablatomb[koordinata[0]+1][koordinata[1]].includes("b")||nev.includes("b")&&tablatomb[koordinata[0]+1][koordinata[1]].includes("w")) {
                jelolo=koordinatatohely(koordinata[0]+1,koordinata[1]);
                $("#tabla").append("<div name='jeloles' id='K_"+hely+"_"+jelolo+"_"+nev+"' class='killhighlights babu "+jelolo+"'></div>");
            }
        }
        //le jobb
        if (koordinata[0]+1<8&&koordinata[1]+1<8) {
            if (tablatomb[koordinata[0]+1][koordinata[1]+1] == 'X') {
                jelolo=koordinatatohely(koordinata[0]+1,koordinata[1]+1);
                $("#tabla").append("<div name='jeloles' id='H_"+hely+"_"+jelolo+"_"+nev+"' class='highlight babu "+jelolo+"'></div>");
            }
            if (nev.includes("w")&&tablatomb[koordinata[0]+1][koordinata[1]+1].includes("b")||nev.includes("b")&&tablatomb[koordinata[0]+1][koordinata[1]+1].includes("w")) {
                jelolo=koordinatatohely(koordinata[0]+1,koordinata[1]+1);
                $("#tabla").append("<div name='jeloles' id='K_"+hely+"_"+jelolo+"_"+nev+"' class='killhighlights babu "+jelolo+"'></div>");
            }
        }
        //jobb
        if (koordinata[1]+1<8) {
            if (tablatomb[koordinata[0]][koordinata[1]+1] == 'X') {
                jelolo=koordinatatohely(koordinata[0] ,koordinata[1]+1);
                $("#tabla").append("<div name='jeloles' id='H_"+hely+"_"+jelolo+"_"+nev+"' class='highlight babu "+jelolo+"'></div>");
            }
            if (nev.includes("w")&&tablatomb[koordinata[0]][koordinata[1]+1].includes("b")||nev.includes("b")&&tablatomb[koordinata[0]][koordinata[1]+1].includes("w")) {
                jelolo=koordinatatohely(koordinata[0],koordinata[1]+1);
                $("#tabla").append("<div name='jeloles' id='K_"+hely+"_"+jelolo+"_"+nev+"' class='killhighlights babu "+jelolo+"'></div>");
            }
        }
        //jobb fel
        if (koordinata[0]-1>=0&&koordinata[1]+1<8) {
            if (tablatomb[koordinata[0]-1][koordinata[1]+1] == 'X') {
                jelolo=koordinatatohely(koordinata[0]-1 ,koordinata[1]+1);
                $("#tabla").append("<div name='jeloles' id='H_"+hely+"_"+jelolo+"_"+nev+"' class='highlight babu "+jelolo+"'></div>");
            }
            if (nev.includes("w")&&tablatomb[koordinata[0]-1][koordinata[1]+1].includes("b")||nev.includes("b")&&tablatomb[koordinata[0]-1][koordinata[1]+1].includes("w")) {
                jelolo=koordinatatohely(koordinata[0]-1,koordinata[1]+1);
                $("#tabla").append("<div name='jeloles' id='K_"+hely+"_"+jelolo+"_"+nev+"' class='killhighlights babu "+jelolo+"'></div>");
            }
        }
        
    }
    function kiralynohighlight(hely, nev) {
        var koordinata = helytokoordinata(hely);
        var jelolo;

        //fel jeloles
        var fel=1;
        while (koordinata[0] - fel>=0&&tablatomb[koordinata[0] - fel][koordinata[1]] == 'X') {
                jelolo=koordinatatohely(koordinata[0] - fel,koordinata[1]);
                $("#tabla").append("<div name='jeloles' id='H_"+hely+"_"+jelolo+"_"+nev+"' class='highlight babu "+jelolo+"'></div>");
                fel++;
        }
        //akadaly kill
        if (koordinata[0] - fel>=0)
        {
            if(nev.includes("w")&&tablatomb[koordinata[0] - fel][koordinata[1]].includes("b")||nev.includes("b")&&tablatomb[koordinata[0] - fel][koordinata[1]].includes("w")) {
            jelolo=koordinatatohely(koordinata[0] - fel,koordinata[1]);
                $("#tabla").append("<div name='jeloles' id='K_"+hely+"_"+jelolo+"_"+nev+"' class='killhighlights babu "+jelolo+"'></div>");
            }
        }

        //le jeloles
        var le=1;
        while (koordinata[0] + le<8&&tablatomb[koordinata[0] +le][koordinata[1]] == 'X') {
                jelolo=koordinatatohely(koordinata[0] +le,koordinata[1]);
                $("#tabla").append("<div name='jeloles' id='H_"+hely+"_"+jelolo+"_"+nev+"' class='highlight babu "+jelolo+"'></div>");
                le++;
        }
        //akadaly kill
        if (koordinata[0] +le<8)
        {
            if(nev.includes("w")&&tablatomb[koordinata[0] +le][koordinata[1]].includes("b")||nev.includes("b")&&tablatomb[koordinata[0] +le][koordinata[1]].includes("w")) {
            jelolo=koordinatatohely(koordinata[0] +le,koordinata[1]);
                $("#tabla").append("<div name='jeloles' id='K_"+hely+"_"+jelolo+"_"+nev+"' class='killhighlights babu "+jelolo+"'></div>");
            }
        }

        //balra jeloles
        var balra=1;
        while (koordinata[1] - balra>=0&&tablatomb[koordinata[0]][koordinata[1]-balra] == 'X') {
                jelolo=koordinatatohely(koordinata[0],koordinata[1]-balra);
                $("#tabla").append("<div name='jeloles' id='H_"+hely+"_"+jelolo+"_"+nev+"' class='highlight babu "+jelolo+"'></div>");
                balra++;
        }
        //akadaly kill
        if (koordinata[1] -balra>=0)
        {
            if(nev.includes("w")&&tablatomb[koordinata[0]][koordinata[1]-balra].includes("b")||nev.includes("b")&&tablatomb[koordinata[0]][koordinata[1]-balra].includes("w")) {
            jelolo=koordinatatohely(koordinata[0],koordinata[1]-balra);
                $("#tabla").append("<div name='jeloles' id='K_"+hely+"_"+jelolo+"_"+nev+"' class='killhighlights babu "+jelolo+"'></div>");
            }
        }

        //jobbra jeloles
        var jobbra=1;
        while (koordinata[1] + jobbra<8&&tablatomb[koordinata[0]][koordinata[1]+jobbra] == 'X') {
                jelolo=koordinatatohely(koordinata[0],koordinata[1]+jobbra);
                $("#tabla").append("<div name='jeloles' id='H_"+hely+"_"+jelolo+"_"+nev+"' class='highlight babu "+jelolo+"'></div>");
                jobbra++;
        }
        //akadaly kill
        if (koordinata[1] +jobbra<8)
        {
            if(nev.includes("w")&&tablatomb[koordinata[0]][koordinata[1]+jobbra].includes("b")||nev.includes("b")&&tablatomb[koordinata[0]][koordinata[1]+jobbra].includes("w")) {
            jelolo=koordinatatohely(koordinata[0],koordinata[1]+jobbra);
                $("#tabla").append("<div name='jeloles' id='K_"+hely+"_"+jelolo+"_"+nev+"' class='killhighlights babu "+jelolo+"'></div>");
            }
        }

        //////////////////////////////////átló//////////////////////////////////

        //bal fel jeloles
        var balfel=1;
        while (koordinata[0] - balfel>=0&&koordinata[1] - balfel>=0&&tablatomb[koordinata[0] - balfel][koordinata[1]-balfel] == 'X') {
                jelolo=koordinatatohely(koordinata[0] - balfel,koordinata[1]-balfel);
                $("#tabla").append("<div name='jeloles' id='H_"+hely+"_"+jelolo+"_"+nev+"' class='highlight babu "+jelolo+"'></div>");
                balfel++;
        }
        //akadaly kill
        if (koordinata[0] - balfel>=0&&koordinata[1] - balfel>=0)
        {
            if(nev.includes("w")&&tablatomb[koordinata[0] - balfel][koordinata[1]-balfel].includes("b")||nev.includes("b")&&tablatomb[koordinata[0] - balfel][koordinata[1]-balfel].includes("w")) {
            jelolo=koordinatatohely(koordinata[0] - balfel,koordinata[1]-balfel);
                $("#tabla").append("<div name='jeloles' id='K_"+hely+"_"+jelolo+"_"+nev+"' class='killhighlights babu "+jelolo+"'></div>");
            }
        }

        //bal le jeloles
        var balle=1;
        while (koordinata[0] + balle<8&&koordinata[1] - balle>=0&&tablatomb[koordinata[0] +balle][koordinata[1]-balle] == 'X') {
                jelolo=koordinatatohely(koordinata[0] +balle,koordinata[1]-balle);
                $("#tabla").append("<div name='jeloles' id='H_"+hely+"_"+jelolo+"_"+nev+"' class='highlight babu "+jelolo+"'></div>");
                balle++;
        }
        //akadaly kill
        if (koordinata[0] +le<8&&koordinata[1] - balle>=0)
        {
            if(nev.includes("w")&&tablatomb[koordinata[0] +le][koordinata[1]-balle].includes("b")||nev.includes("b")&&tablatomb[koordinata[0] +balle][koordinata[1]-balle].includes("w")) {
            jelolo=koordinatatohely(koordinata[0] +balle,koordinata[1]-balle);
                $("#tabla").append("<div name='jeloles' id='K_"+hely+"_"+jelolo+"_"+nev+"' class='killhighlights babu "+jelolo+"'></div>");
            }
        }


        //jobb fel jeloles
        var jobbfel=1;
        while (koordinata[0] - jobbfel>=0&&koordinata[1] + jobbfel<8&&tablatomb[koordinata[0]-jobbfel][koordinata[1]+jobbfel] == 'X') {
                jelolo=koordinatatohely(koordinata[0]-jobbfel,koordinata[1]+jobbfel);
                $("#tabla").append("<div name='jeloles' id='H_"+hely+"_"+jelolo+"_"+nev+"' class='highlight babu "+jelolo+"'></div>");
                jobbfel++;
        }
        //akadaly kill
        if (koordinata[0] -jobbfel>=0&&koordinata[1] + jobbfel<8)
        {
            if(nev.includes("w")&&tablatomb[koordinata[0]-jobbfel][koordinata[1]+jobbfel].includes("b")||nev.includes("b")&&tablatomb[koordinata[0]-jobbfel][koordinata[1]+jobbfel].includes("w")) {
            jelolo=koordinatatohely(koordinata[0]-jobbfel,koordinata[1]+jobbfel);
                $("#tabla").append("<div name='jeloles' id='K_"+hely+"_"+jelolo+"_"+nev+"' class='killhighlights babu "+jelolo+"'></div>");
            }
        }

        //jobb le jeloles
        var jobble=1;
        while (koordinata[0] + jobble<8&&koordinata[1] + jobble<8&&tablatomb[koordinata[0]+jobble][koordinata[1]+jobble] == 'X') {
                jelolo=koordinatatohely(koordinata[0]+jobble,koordinata[1]+jobble);
                $("#tabla").append("<div name='jeloles' id='H_"+hely+"_"+jelolo+"_"+nev+"' class='highlight babu "+jelolo+"'></div>");
                jobble++;
        }
        //akadaly kill
        if (koordinata[0] + jobble<8&&koordinata[1] + jobble<8)
        {
            if(nev.includes("w")&&tablatomb[koordinata[0] +jobble][koordinata[1]+jobble].includes("b")||nev.includes("b")&&tablatomb[koordinata[0] +jobble][koordinata[1]+jobble].includes("w")) {
            jelolo=koordinatatohely(koordinata[0]+jobble,koordinata[1]+jobble);
                $("#tabla").append("<div name='jeloles' id='K_"+hely+"_"+jelolo+"_"+nev+"' class='killhighlights babu "+jelolo+"'></div>");
            }
        }

    }
    function parasztvaltozas(id,hova,babuclass)
    {
        
        if (hova[0]==0) {
            for (let index1 = 0; index1 < 3; index1++) {
                $("#"+id).removeClass(babuclass[index1]); 
            }
            babuclass[0]="Wkiralyno";
            for (let index2 = 0; index2 < 3; index2++) {
                $("#"+id).addClass(babuclass[index2]);
            }
           
        }
        if (hova[0]==7) {
            for (let index1 = 0; index1 < 3; index1++) {
                $("#"+id).removeClass(babuclass[index1]); 
            }
            babuclass[0]="Bkiralyno";
            for (let index2 = 0; index2 < 3; index2++) {
                $("#"+id).addClass(babuclass[index2]);
            }
        }
    }
    function helytokoordinata(hely) {
        var koordinatak = [-1, -1];
        var be = hely.split("o");
        var jo = be[1].split("");
        switch (jo[0]) {
            case "A":
                koordinatak[1] = 0;
                break;
            case "B":
                koordinatak[1] = 1;
                break;
            case "C":
                koordinatak[1] = 2;
                break;
            case "D":
                koordinatak[1] = 3;
                break;
            case "E":
                koordinatak[1] = 4;
                break;
            case "F":
                koordinatak[1] = 5;
                break;
            case "G":
                koordinatak[1] = 6;
                break;
            case "H":
                koordinatak[1] = 7;
                break;

        }
        switch (jo[1]) {
            case "1":
                koordinatak[0] = 7;
                break;
            case "2":
                koordinatak[0] = 6;
                break;
            case "3":
                koordinatak[0] = 5;
                break;
            case "4":
                koordinatak[0] = 4;
                break;
            case "5":
                koordinatak[0] = 3;
                break;
            case "6":
                koordinatak[0] = 2;
                break;
            case "7":
                koordinatak[0] = 1;
                break;
            case "8":
                koordinatak[0] = 0;
                break;

        }


        return koordinatak;
    }
    function koordinatatohely(Y, X) {

        var ki = "mezo";
        switch (X) {
            case 0:
                ki+="A";
                break;
            case 1:
                ki+="B";
                break;
            case 2:
                ki+="C";
                break;
            case 3:
                ki+="D";
                break;
            case 4:
                ki+="E";
                break;
            case 5:
                ki+="F";
                break;
            case 6:
                ki+="G";
                break;
            case 7:
                ki+="H";
                break;

        }
        ki+=(8-Y);
       
        return ki;
    }
    


   


});