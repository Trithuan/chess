var piece = document.getElementById('piece');
var pc = piece.getContext('2d');
var moveoptions = document.getElementById('dot');
var dot = moveoptions.getContext('2d');
var marge = 8;
var actualplayercolor = 'blanc';
var mousex = 4;
var mousey = 4;
var ennemimove = true;
var actualmove;
var eatenpiece = 'rien';
var roiplays = false;
var prevposx = 0;
var prevposy = 0;
var echec = false;
var processAdvmoves = false;
var processAllimoves = false;
var playpiecex = -1;
var playpiecey = -1;
var histo = [];
var nbc = 0;

var load = false;
var casesize = 500/numbercase;
//affiche le plateau cadrié de l'échequier
function boardbase(){
	for(var i = 0; i < numbercase; i++){
		for (var j = 0; j < numbercase; j++) {
			if((i+j)%2 == 1){
			brd.fillStyle = '#5f1a09';
			}else{brd.fillStyle = '#aa0000';}
			brd.fillRect(casesize*i,casesize*j,casesize,casesize);
		}
	}
}
//lancer 2 fois le plateau pour pas voir les traits
var board = document.getElementById('board');
var brd = board.getContext('2d');
boardbase();
boardbase();
//lancer le script à condition que la dernière image ait été chargé
function play(){
	if(load == true){
		if(piecein[mousex][mousey].color != actualplayercolor){
			cleararray(pospiecemove);
		}
		if(change == true){
		console.log("Au " + actualplayercolor + " de jouer");
		change = false;
		}
		afficherpiece();
		possibleEnnemimove();
		afficherdot();
	}else{setTimeout(function(){play();},10);}
}
//lancer le jeu
play();
function selectpiece(x,y,pcolor){
	if(piecein[x][y].color == pcolor && actualplayercolor == pcolor){
		if(mousex == x && mousey == y){
			piecechoose(x,y);
			playpiecex = x;
			playpiecey = y;
		}
	}
}
//transforme le ascii en lettre
function lettre(x){
	var lettre = String.fromCharCode(64+x);
	return lettre;
}
//utile pour avoir la couleur de la pièce ennemie
function reversecolor(piece){
	if (piece == 'noir'){return 'blanc';}
		else if(piece == 'blanc'){return 'noir';}
		else if (piece.color == 'noir'){return 'blanc';}
		else if(piece.color == 'blanc'){return 'noir';}
}
function drawdot(x,y,color){
	dot.fillStyle = color;
	dot.beginPath();
	dot.arc(casesize*(x-1) + (casesize/2),casesize*(y-1) + (casesize/2), 10, 0, 360);
	dot.fill();
}
var cote = Math.random() >= 0.5; 
if(cote == true){

	//changer les pieces de côté
	for(var i = 1; i <= 8; i++){
		for (var j = 0; j <= 4; j++) {
					//inverser le roi et la dame
					var centre = 0;
					if(i == 4){centre = 1;}
					if(i == 5){centre = -1;}
			var enAttente = piecein[i][j];
			piecein[i][j] = piecein[i+centre][Math.abs(j-9)];
			piecein[i+centre][Math.abs(j-9)] = enAttente;
		}
	}
}