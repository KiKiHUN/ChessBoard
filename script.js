$(function() {

    var tablatomb = [
        ['bBASTYA1','bLO1','bFUTO1','bQEEN','bKING','bFUTO2','bLO2','bBASTYA2'],
        ['bP1',     'bP2', 'bP3',   'bP4',  'bP5',   'bP6',   'bP7','bP8'],
        ['X',       'X',   'X',     'X',    'X',     'X',     'X',  'X'],
        ['X',       'X',   'X',     'X',    'X',     'X',     'X',  'X'],
        ['X',       'X',   'X',     'X',    'X',     'X',     'X',  'X'],
        ['X',       'X',   'X',     'X',    'X',     'X',     'X',  'X'],
        ['wP8',     'wP7', 'wP6',   'wP5',  'wP4',   'wP3',   'wP2','wP1'],
        ['wBASTYA2','wLO2', 'wFUTO2',   'wKING',  'wQUEEN',   'wFUTO1',   'wLO1','wBASTYA1'],
    ]


    $("#pos").click(function(){
        var babu =  $('#pos').attr('class').split(' ');
        console.log("Jelenlegi bábu stat: "+babu[2]);
switch (babu[0]) {
    case "Bfuto":
        
        break;
    case "Wfuto":

        break;
    case "Bbastya":
        break;
    case "Wbastya":
        break;
    case "Blo":
        break;
    case "Wlo":
        break;
    case "Bkiraly":
        break;
    case "Wkiraly":
        break;
    case "Bkiralyno":
        break;
    case "Wkiralyno":
        break;
    case "Bparaszt":
        break;
    case "Wparaszt":
        break;
    default:
        break;
}
        
    });

function parasztmove(hely,babu) {
    
}
});