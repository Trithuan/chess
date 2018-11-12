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
				if(posmove[i][j] == 'possible'){
					drawdot(i,j);
				}
			}
		}
	}else{setTimeout(function(){play();},1);}
}
	play();
	function reversecolor(piece){
		if (piece.color == 'noir'){return 'blanc';}
			else if(piece.color == 'blanc'){return 'noir';}
	}
	function drawdot(x,y){
		dot.fillStyle ="#21bd20";
		dot.beginPath();
		dot.arc(casesize*(x-1) + (casesize/2),casesize*(y-1) + (casesize/2), 10, 0, 360);
		dot.fill();
	}
function possiblemove(posx, addx,posy,addy,parlas){

	if(posx+addx < 9 && posx+addx > 0 && posy+addy < 9 && posy+addy > 0){
		if(piecein[posx][posy].color == piecein[posx+addx][posy+addy].color){
			console.log(posx,addx,posy,addy);
			direction[parlas] = 0;
		}
		if(direction[parlas] == 1){
			posmove[posx+addx][posy+addy] = 'possible';
		}
		if(piecein[posx][posy].color == reversecolor(piecein[posx+addx][posy+addy])){
			direction[parlas] = 0;
		}

	}
}
	function casechoose(event){
		var x = event.clientX - marge;
		var y = event.clientY - marge;
		mousex = Math.trunc(x/casesize);
		mousey = Math.trunc(y/casesize);
		if(posmove[mousex+1][mousey+1] == 'possible'){
			piecein [mousex+1][mousey+1] = piecein[playpiecex][playpiecey];
			piecein [prevposx+1][prevposy+1] = 'rien';
			whiteisplaying = (whiteisplaying+1)%2;
			cleararray(posmove);
		}
		prevposx = mousex;
		prevposy = mousey;
		boardbase();
		brd.fillStyle = "#21bd20";
		brd.fillRect(casesize*mousex, casesize*mousey, casesize, casesize);
		play();
	}
	function attaquepion(x, y, vec){
		if(x > 0 && x < 9 && y+vec > 0 && y+vec < 9){
			if(x < 8 && piecein[x+1][y+vec].color == reversecolor(piecein[x][y])){

				possiblemove(x,1,y,vec,'right');
			}
			if(x > 1 && piecein[x-1][y+vec].color == reversecolor(piecein[x][y])){
				possiblemove(x,-1,y,vec,'left');
			}
		}
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
		pc.fillStyle = "#21bd20";
		//possiblemove déplacement
		switch(piecein[x][y]){
			case pionNoir:
			if(piecein[x][y+1] == 'rien'){
				possiblemove(x,0,y,1,'down');
				if(y == 2 && piecein[x][y+2] == 'rien'){
					possiblemove(x,0,y,2,'down');
				}
			}
			//attaque pion
			attaquepion(x,y,1);
			break;
			case pionBlanc:
			if(piecein[x][y-1] == 'rien'){
			possiblemove(x,0,y,-1,'up');
				if(y == 7 && piecein[x][y-2] == 'rien'){
					possiblemove(x,0,y,-2,'up');
				}
			}
			attaquepion(x,y,-1);
			break;
			case fouNoir:
			case fouBlanc:
			for(var i = 1; i < 8; i++){
				possiblemove(x,i,y,i,'downright');
				possiblemove(x,-i,y,i,'upleft');
				possiblemove(x,i,y,-i,'upright');
				possiblemove(x,-i,y,-i,'downleft');
			}
			break;
			case chevalNoir:
			case chevalBlanc:
			possiblemove(x,1,y,2,'downright');
			possiblemove(x,1,y,-2,'upright');
			possiblemove(x,-1,y,2, 'downleft');
			possiblemove(x,-1,y,-2, 'upleft');
			possiblemove(x,-2,y,1, 'up');
			possiblemove(x,-2,y,-1, 'down');
			possiblemove(x,2,y,1, 'left');
			possiblemove(x,2,y,-1, 'right');
			break;
			case tourNoir:
			case tourBlanc:
			for(var i = 1; i < 8; i++){
				possiblemove(x,i,y,0,'right');
				possiblemove(x,-i,y,0,'left');
				possiblemove(x,0,y,i,'down');
				possiblemove(x,0,y,-i,'up');
			}
			break;
			case dameNoir:
			case dameBlanc:
			for(var i = 1; i < 8; i++){
				possiblemove(x,i,y,i,'downright');
				possiblemove(x,-i,y,i,'upleft');
				possiblemove(x,i,y,-i,'upright');
				possiblemove(x,-i,y,-i,'downleft');
			}
			for(var i = 1; i < 8; i++){
				possiblemove(x,i,y,0,'right');
				possiblemove(x,-i,y,0,'left');
				possiblemove(x,0,y,i,'down');
				possiblemove(x,0,y,-i,'up');
			}
			break;
			case roiNoir:
			case roiBlanc:
			possiblemove(x,1,y,1, 'downright')
			possiblemove(x,1,y,-1, 'upright')
			possiblemove(x,-1,y,1, 'downleft')
			possiblemove(x,-1,y,-1, 'upleft')
			possiblemove(x,0,y,1, 'down')
			possiblemove(x,1,y,0,'right')
			possiblemove(x,0,y,-1,'up')
			possiblemove(x,-1,y,0,'left')
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
	//transformation/fuite pion
	//roque
	//echec/pat/clouer
