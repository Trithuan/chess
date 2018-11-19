var board = document.getElementById("board");
var brd = board.getContext("2d");
var piece = document.getElementById("piece");
var pc = piece.getContext("2d");
var moveoptions = document.getElementById("dot");
var dot = moveoptions.getContext("2d");
var numbercase = 8;
var marge = 8;
var whiteisplaying = true;
var mousex = 4;
var actualmove;
var eatenpiece = 'rien';
var mousey = 4;
var roiplays = false;
var cote = Math.random() >= 0.5; 
var prevposx = 0;
var prevposy = 0;
var echec = false;
var testingallmoves = false;
var playpiecex = -1;
var playpiecey = -1;
var histo = [];
var nombrecoup = 0;
var direction = {
	left: 1,
	right: 1,
	up: 1,
	down: 1,
	upleft: 1,
	upright: 1,
	downleft: 1,
	downright: 1
};

var load = false;
var casesize = 500/numbercase;
function boardbase(){
	for(var i = 0; i < numbercase; i++){
		for (var j = 0; j < numbercase; j++) {
			if((i+j)%2 == 1){
			brd.fillStyle = "#5f1a09";
			}else{brd.fillStyle = "#aa0000";}
			brd.fillRect(casesize*i,casesize*j,casesize,casesize);
		}
	}
}
boardbase();
boardbase();
var pionNoir = {
	img: new Image(),
	name:'pionNoir',
	color:'noir'
}
var fouNoir = {
	img: new Image(),
	name:'fouNoir',
	color:'noir'
}
var chevalNoir = {
	img: new Image(),
	name:'chevalNoir',
	color:'noir'
}
var tourNoir = {
	img: new Image(),
	name:'tourNoir',
	color:'noir',
	didmove:false
}
var dameNoir = {
	img: new Image(),
	name:'dameNoir',
	color:'noir'
}
var roiNoir = {
	img: new Image(),
	name:'roiNoir',
	color:'noir',
	didmove:false
}
var pionBlanc = {
	img: new Image(),
	name:'pionBlanc',
	color:'blanc'
}
var fouBlanc = {
	img: new Image(),
	name:'fouBlanc',
	color:'blanc'
}
var chevalBlanc = {
	img: new Image(),
	name:'chevalBlanc',
	color:'blanc'
}
var tourBlanc = {
	img: new Image(),
	name:'tourBlanc',
	color:'blanc',
	didmove:false
}
var dameBlanc = {
	img: new Image(),
	name:'dameBlanc',
	color:'blanc'
}
var roiBlanc = {
	img: new Image(),
	name:'roiBlanc',
	color:'blanc',
	didmove:false,
	action:'still'
}
pionNoir.img.src = "chess_piece/pionNoir.png";
fouNoir.img.src = "chess_piece/fouNoir.png";
chevalNoir.img.src = "chess_piece/chevalNoir.png";
tourNoir.img.src = "chess_piece/tourNoir.png";
dameNoir.img.src = "chess_piece/dameNoir.png";
roiNoir.img.src = "chess_piece/roiNoir.png";
pionBlanc.img.src = "chess_piece/pionBlanc.png";
fouBlanc.img.src = "chess_piece/fouBlanc.png";
chevalBlanc.img.src = "chess_piece/chevalBlanc.png";
tourBlanc.img.src = "chess_piece/tourBlanc.png";
dameBlanc.img.src = "chess_piece/dameBlanc.png";
roiBlanc.img.src = "chess_piece/roiBlanc.png";

roiBlanc.img.onload = function(){
	load = true;
}
function afficherpiece(){
	pc.clearRect(0, 0, 500,500);
	dot.clearRect(0, 0, 500,500);
	for(var i = 1; i <= numbercase; i++){
		for (var j = 1; j <= numbercase; j++) {
			if(piecein[i][j] != 'rien'){
				pc.drawImage(piecein[i][j].img, (i-1) * casesize, (j-1) * casesize, casesize, casesize);
				if(piecein[i][j].color == 'blanc' && whiteisplaying == true){
					if(mousex == i && mousey == j){
						piecechoose(i,j);
						playpiecex = i;
						playpiecey = j;
					}
				}
				if(piecein[i][j].color == 'noir' && whiteisplaying == false){
					if(mousex == i && mousey == j){
						piecechoose(i,j);
						playpiecex = i;
						playpiecey = j;
					}
				}
			}
		}	
	}
}
function afficherdot(){
			for(var i = 1; i <= 8 ;i++){
			for (var j = 1; j <= 8; j++) {
				if(posAdvmove[i][j] == 'possible'){
					//echec
					if(piecein[i][j] == roiNoir || piecein[i][j] == roiBlanc){
						console.log('echec');
						echec = true;
						brd.fillStyle = '#ff9916';
						brd.fillRect(casesize*(i-1), casesize*(j-1), casesize, casesize);
					}
				}
				if(pospiecemove[i][j] == 'possible'){
					drawdot(i,j,"#21bd20");
				}
				
			}
		}
}
function play(){
	if(load == true){
		afficherpiece();
		possiblenextattaque();
		afficherdot();
	}else{setTimeout(function(){play();},1);}
}
play();
function reversecolor(piece){
	if (piece.color == 'noir'){return 'blanc';}
		else if(piece.color == 'blanc'){return 'noir';}
}
function drawdot(x,y,color){
	dot.fillStyle = color;
	dot.beginPath();
	dot.arc(casesize*(x-1) + (casesize/2),casesize*(y-1) + (casesize/2), 10, 0, 360);
	dot.fill();
}
function possiblemove(posx, addx,posy,addy,parlas){

	if(posx+addx < 9 && posx+addx > 0 && posy+addy < 9 && posy+addy > 0){
		if(piecein[posx][posy].color == piecein[posx+addx][posy+addy].color){
			direction[parlas] = 0;
		}
		if(direction[parlas] == 1){
			if(testingallmoves == false){
				if(roiplays == false){
					pospiecemove[posx+addx][posy+addy] = 'possible';
				}else if(posAdvmove[posx+addx][posy+addy] != 'possible'){
					pospiecemove[posx+addx][posy+addy] = 'possible';
				}
			}else{posAdvmove[posx+addx][posy+addy] = 'possible';}
		}
		if(piecein[posx][posy].color == reversecolor(piecein[posx+addx][posy+addy])){
			direction[parlas] = 0;
		}

	}
}
function casechoose(event){
	var x = event.clientX - marge;
	var y = event.clientY - marge;
	mousex = Math.trunc(x/casesize)+1;
	mousey = Math.trunc(y/casesize)+1;
	if(pospiecemove[mousex][mousey] == 'possible'){
		eatenpiece = piecein [mousex][mousey];
		console.log('vide');
		piecein [mousex][mousey] = piecein[playpiecex][playpiecey];
		piecein [playpiecex][playpiecey] = 'rien';
		whiteisplaying = (whiteisplaying+1)%2;
		//transformation
		if((mousey == 1 || mousey == 8) && (piecein[mousex][mousey] == pionNoir || piecein[mousex][mousey] == pionBlanc)){
			if(piecein[mousex][mousey].color == 'noir'){
				piecein[mousex][mousey] = dameNoir;
			}else{piecein[mousex][mousey] = dameBlanc;}
		}
		nombrecoup ++;
		histo[nombrecoup*7] = nombrecoup;
		histo[nombrecoup*7+1] = eatenpiece;
		histo[nombrecoup*7+2] = playpiecex;
		histo[nombrecoup*7+3] = playpiecey;
		histo[nombrecoup*7+4] = piecein[mousex][mousey];
		histo[nombrecoup*7+5] = mousex;
		histo[nombrecoup*7+6] = mousey;
		if(eatenpiece != 'rien'){
			eatenpiece = eatenpiece.name;
		}
		actualmove = nombrecoup + " : " + piecein[mousex][mousey].name +"["+ String.fromCharCode(64+playpiecex) + playpiecey+ "] mange : "+ eatenpiece + "[" + String.fromCharCode(64+mousex) + mousey +"]";

		console.log(actualmove); 
		cleararray(pospiecemove);
		cleararray(posAdvmove);
	}
	prevposx = mousex;
	prevposy = mousey;
	boardbase();
	brd.fillStyle = "#21bd20";
	brd.fillRect(casesize*(mousex-1), casesize*(mousey-1), casesize, casesize);
	play();
}
function resetdir(){
	direction = {
		left: 1,
		right: 1,
		up: 1,
		down: 1,
		upleft: 1,
		upright: 1,
		downleft: 1,
		downright: 1
	};
}
function movepion(x,y,vec,couleur){
	if(piecein[x][y+(piondir(couleur))] == 'rien'){
		possiblemove(x,0,y,piondir(couleur),'down');
		if((y == 7|| y == 2) && piecein[x][y+(piondir(couleur)*2)] == 'rien'){
			possiblemove(x,0,y,piondir(couleur)*2,'down');
		}
	}
	if(x > 0 && x < 9 && y+vec > 0 && y+vec < 9){
		if(x < 8 && piecein[x+1][y+vec].color == reversecolor(piecein[x][y])){
			possiblemove(x,1,y,vec,'right');
		}
		if(x > 1 && piecein[x-1][y+vec].color == reversecolor(piecein[x][y])){
			possiblemove(x,-1,y,vec,'left');
		}
	}
}
function foumove(x,y,i){
	possiblemove(x,i,y,i,'downright');
	possiblemove(x,-i,y,i,'upleft');
	possiblemove(x,i,y,-i,'upright');
	possiblemove(x,-i,y,-i,'downleft');
}
function chevalmove(x,y){
	possiblemove(x,1,y,2,'downright');
	possiblemove(x,1,y,-2,'upright');
	possiblemove(x,-1,y,2, 'downleft');
	possiblemove(x,-1,y,-2, 'upleft');
	possiblemove(x,-2,y,1, 'up');
	possiblemove(x,-2,y,-1, 'down');
	possiblemove(x,2,y,1, 'left');
	possiblemove(x,2,y,-1, 'right');
}
function tourmove(x,y,i){
	possiblemove(x,i,y,0,'right');
	possiblemove(x,-i,y,0,'left');
	possiblemove(x,0,y,i,'down');
	possiblemove(x,0,y,-i,'up');
}
function allmoves(x,y){
	switch(piecein[x][y]){
		case pionNoir:
		movepion(x,y,piondir('noir'),'noir');
		break;
		case pionBlanc:
		movepion(x,y,piondir('blanc'),'blanc')
		break;
		case fouNoir:
		case fouBlanc:
		for(var i = 1; i < 8; i++){
			foumove(x,y,i);
		}
		break;
		case chevalNoir:
		case chevalBlanc:
		chevalmove(x,y);
		break;
		case tourNoir:
		case tourBlanc:
		for(var i = 1; i < 8; i++){
			tourmove(x,y,i);
		}
		break;
		case dameNoir:
		case dameBlanc:
		for(var i = 1; i < 8; i++){
			tourmove(x,y,i);
			foumove(x,y,i);
		}
		break;
		case roiNoir:
		case roiBlanc:
		roiplays = true;
		var i = 1;
		tourmove(x,y,i);
		foumove(x,y,i);
		roiplays = false;
	}
}
function piecechoose(x,y){
	testingallmoves = false;
	cleararray(pospiecemove);
	resetdir();
	allmoves(x,y);
}
function possiblenextattaque(){
	testingallmoves = true;
	for(var i = 1; i <= 8; i++){
		for(var j = 1; j <= 8; j++){
			if(piecein[i][j].color == 'blanc' && whiteisplaying == false){
				resetdir();
				allmoves(i,j);
			}
			if(piecein[i][j].color == 'noir' && whiteisplaying == true){
				resetdir();
				allmoves(i,j);
			}
		}
	}
}
var	piecein = [];
var posAdvmove = [];
var pospiecemove = [];
cleararray(piecein);
cleararray(posAdvmove);
cleararray(pospiecemove);
function cleararray(x){
	for(var i = 1; i <= numbercase; i++){
		x[i] = [];
		for(var j = 1; j <= numbercase; j++){
			x[i][j] = 'rien';
		}
	}
}

//piecein initial
piecein[1][1] = tourNoir;
piecein[2][1] = chevalNoir;
piecein[3][1] = fouNoir;
piecein[4][1] = dameNoir;
piecein[5][1] = roiNoir;
piecein[6][1] = fouNoir;
piecein[7][1] = chevalNoir;
piecein[8][1] = tourNoir;

piecein[1][2] = pionNoir;
piecein[2][2] = pionNoir;
piecein[3][2] = pionNoir;
piecein[4][2] = pionNoir;
piecein[5][2] = pionNoir;
piecein[6][2] = pionNoir;
piecein[7][2] = pionNoir;
piecein[8][2] = pionNoir;

piecein[1][8] = tourBlanc;
piecein[2][8] = chevalBlanc;
piecein[3][8] = fouBlanc;
piecein[4][8] = dameBlanc;
piecein[5][8] = roiBlanc;
piecein[6][8] = fouBlanc;
piecein[7][8] = chevalBlanc;
piecein[8][8] = tourBlanc;

piecein[1][7] = pionBlanc;
piecein[2][7] = pionBlanc;
piecein[3][7] = pionBlanc;
piecein[4][7] = pionBlanc;
piecein[5][7] = pionBlanc;
piecein[6][7] = pionBlanc;
piecein[7][7] = pionBlanc;
piecein[8][7] = pionBlanc;
function piondir(x){
	if(cote == true){
		if(x == 'blanc'){return 1;}else{return -1}
	}else {if(x == 'blanc'){return -1;}else{return 1}}
}
var undo = true;
window.addEventListener("keydown",function(event){
	c = event.keyCode;
	if(undo == true && c == 66){
		previousmove();
		undo = false;
	}
})
window.addEventListener("keyup",function(event){
		undo = true;
})
function previousmove(){
	if(nombrecoup > 0){
		piecein[histo[nombrecoup*7+2]][histo[nombrecoup*7+3]] = histo[nombrecoup*7+4];
		piecein[histo[nombrecoup*7+5]][histo[nombrecoup*7+6]] = histo[nombrecoup*7+1];
		eatenpiece = 'rien';
		nombrecoup --;
		whiteisplaying = (whiteisplaying+1)%2;
		play();
	}
}
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

//fuite pion

//roque

// echec/pat/clouer
