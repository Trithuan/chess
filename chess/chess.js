var board = document.getElementById("board");
var brd = board.getContext("2d");
var piece = document.getElementById("piece");
var pc = piece.getContext("2d");
var moveoptions = document.getElementById("dot");
var dot = moveoptions.getContext("2d");
var numbercase = 8;
var marge = 8;
var whiteisplaying = true;
var click = false;
var mousex = 1;
var mousey = 1;
var prevposx = 0;
var prevposy = 0;
var playpiecex = -1;
var playpiecey = -1;
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
var chosenpiece;

var load = false;
var casesize = 500/numbercase;
function boardbase(){
	for(var i = 0; i < numbercase; i++){
		for (var j = 0; j < numbercase; j++) {
			if((i+j)%2 == 1){
			brd.fillStyle = "#095eff";
			}else{brd.fillStyle = "#d4c9a1";}
			brd.fillRect(casesize*i,casesize*j,casesize,casesize);
		}
	}
}
boardbase();
var pionNoir = {
	img: new Image(),
	color:'noir'
}
var fouNoir = {
	img: new Image(),
	color:'noir'
}
var chevalNoir = {
	img: new Image(),
	color:'noir'
}
var tourNoir = {
	img: new Image(),
	color:'noir'
}
var dameNoir = {
	img: new Image(),
	color:'noir'
}
var roiNoir = {
	img: new Image(),
	color:'noir'
}
var pionBlanc = {
	img: new Image(),
	color:'blanc'
}
var fouBlanc = {
	img: new Image(),
	color:'blanc'
}
var chevalBlanc = {
	img: new Image(),
	color:'blanc'
}
var tourBlanc = {
	img: new Image(),
	color:'blanc'
}
var dameBlanc = {
	img: new Image(),
	color:'blanc'
}
var roiBlanc = {
	img: new Image(),
	color:'blanc'
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
function play(){
	if(load == true){
		function afficherpiece(){
			pc.clearRect(0, 0, 500,500);
			dot.clearRect(0, 0, 500,500);
			for(var i = 1; i <= numbercase; i++){
				for (var j = 1; j <= numbercase; j++) {
					if(piecein[i][j] != 'rien'){
						pc.drawImage(piecein[i][j].img, (i-1) * casesize, (j-1) * casesize, casesize, casesize);
						if(piecein[i][j].color == 'blanc' && whiteisplaying == true){
							if(mousex+1 == i && mousey+1 == j){
								piecechoose(i,j);
								playpiecex = i;
								playpiecey = j;
							}
						}
						if(piecein[i][j].color == 'noir' && whiteisplaying == false){
							if(mousex+1 == i && mousey+1 == j){
								piecechoose(i,j);
								playpiecex = i;
								playpiecey = j;
							}
						}
					}
				}	
			}
		}
		afficherpiece();
		//afficher dot
		for(var i = 1; i <= 8 ;i++){
			for (var j = 1; j <= 8; j++) {
				if(posmove[i][j] == 'possiblemove'){
					drawdot(i,j);
				}
			}
		}
	}else{setTimeout(function(){play();},1);}
}
	play();
	function reversecolor(color){
		if (color == 'noir'){return 'blanc';}
			else{return 'noir';}
	}
	function drawdot(x,y){
		dot.fillStyle ="#aa0000";
		dot.beginPath();
		dot.arc(casesize*(x-1) + (casesize/2),casesize*(y-1) + (casesize/2), 10, 0, 360);
		dot.fill();
	}
function posattack(posx, addx,posy,addy,parlas){
	if(posx + addx > 0 && posx + addx <= 8 && posy + addy > 0 && posy + addy <= 8 && direction[parlas] > 0){
		var dotpos = piecein[posx + addx][posy + addy];
		var initpos = piecein[posx][posy];
		if(dotpos.color == initpos.color){
			direction[parlas] = 0;
		}else if(dotpos.color == 'rien'){
			direction[parlas] = 1;
			posmove[posx+addx][posy+addy] = 'possiblemove';
		}else if(dotpos.color == reversecolor(initpos.color)){
			direction[parlas] = 2;
			posmove[posx+addx][posy+addy] = 'possiblemove';
		}else{posmove[posx+addx][posy+addy] = 'possiblemove';}
		if(direction[parlas] == 2){
			direction[parlas] = 0;
		}
	}
}
	function casechoose(event){
		var x = event.clientX - marge;
		var y = event.clientY - marge;
		mousex = Math.trunc(x/casesize);
		mousey = Math.trunc(y/casesize);
		if(posmove[mousex+1][mousey+1] == 'possiblemove'){
			piecein [mousex+1][mousey+1] = piecein[playpiecex][playpiecey];
			piecein [prevposx+1][prevposy+1] = 'rien';
			whiteisplaying = (whiteisplaying+1)%2;
			console.log(whiteisplaying);
			cleararray(posmove);
		}else if(piecein[mousex+1][mousey+1].color != piecein [prevposx+1][prevposy+1].color){
			cleararray(posmove);
		}
		prevposx = mousex;
		prevposy = mousey;
		boardbase();
		brd.fillStyle = "#aa0000";
		brd.fillRect(casesize*mousex, casesize*mousey, casesize, casesize);
		play();
	}
	function piecechoose(x,y){
		cleararray(posmove);
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
		pc.beginPath();
		pc.fillStyle = "#aa0000";
		switch(piecein[x][y]){
			case pionNoir:
			posattack(x,0,y,1,'down');
			if(y == 2){
			posattack(x,0,y,2,'down');
			}
			break;
			case pionBlanc:
			posattack(x,0,y,-1,'up');
			if(y == 7){
				posattack(x,0,y,-2,'up');
			}
			break;
			case fouNoir:
			case fouBlanc:
			for(var i = 1; i < 8; i++){
			posattack(x,i,y,i,'downright');
			posattack(x,-i,y,i,'upleft');
			posattack(x,i,y,-i,'upright');
			posattack(x,-i,y,-i,'downleft');
			}
			break;
			case chevalNoir:
			case chevalBlanc:
			posattack(x,1,y,2,'downright');
			posattack(x,1,y,-2,'upright');
			posattack(x,-1,y,2, 'downleft');
			posattack(x,-1,y,-2, 'upleft');
			posattack(x,-2,y,1, 'up');
			posattack(x,-2,y,-1, 'down');
			posattack(x,2,y,1, 'left');
			posattack(x,2,y,-1, 'right');
			break;
			case tourNoir:
			case tourBlanc:
			for(var i = 1; i < 8; i++){
				posattack(x,i,y,0,'right');
				posattack(x,-i,y,0,'left');
				posattack(x,0,y,i,'down');
				posattack(x,0,y,-i,'up');
			}
			break;
			case dameNoir:
			case dameBlanc:
			for(var i = 1; i < 8; i++){
			posattack(x,i,y,i,'downright');
			posattack(x,-i,y,i,'upleft');
			posattack(x,i,y,-i,'upright');
			posattack(x,-i,y,-i,'downleft');
			}
			for(var i = 1; i < 8; i++){
				posattack(x,i,y,0,'right');
				posattack(x,-i,y,0,'left');
				posattack(x,0,y,i,'down');
				posattack(x,0,y,-i,'up');
			}
			break;
			case roiNoir:
			case roiBlanc:
			posattack(x,1,y,1, 'downright')
			posattack(x,1,y,-1, 'upright')
			posattack(x,-1,y,1, 'downleft')
			posattack(x,-1,y,-1, 'upleft')
			posattack(x,0,y,1, 'down')
			posattack(x,1,y,0,'right')
			posattack(x,0,y,-1,'up')
			posattack(x,-1,y,0,'left')
		}
	}
	var	piecein = [];
	var posmove = [];
	cleararray(piecein);
	cleararray(posmove);
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
	//déplacement/attaque//transformation pion
	//roque
	//echec/clouer
