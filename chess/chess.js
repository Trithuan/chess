var board = document.getElementById("board");
var brd = board.getContext("2d");
var piece = document.getElementById("piece");
var pc = piece.getContext("2d");
var numbercase = 8;
var marge = 8;
var click = false;
var posx = -1;
var chosenpiece;
var posy = -1;
var load = false;
var casesize = 500/numbercase;
function boardbase(){
	for(var i = 0; i < numbercase; i++){
		for (var j = 0; j < numbercase; j++) {
			if((i+j)%2 == 1){
			brd.fillStyle = "#009900";
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
	color:'noir'
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
				for(var i = 1; i <= numbercase; i++){
					for (var j = 1; j <= numbercase; j++) {
						if(piecein[i][j] != 'rien'){
						pc.drawImage(piecein[i][j].img, (i-1) * casesize, (j-1) * casesize, casesize, casesize);
							if(posx+1 == i && posy+1 == j){
								piecechoose(i,j);
							}
						}
					}	
				}
			}
			afficherpiece();
		}else{setTimeout(function(){play();},1);}
	}
	play();
	function posattack(posx, addposx,posy,addposy){
		if(posx + addposx > 0 && posx + addposx <= 8 && posy + addposy > 0 && posy + addposy <= 8){
			pc.beginPath();
			pc.arc(casesize*(posx-1+addposx) + (casesize/2),casesize*(posy-1+addposy) + (casesize/2), 10, 0, 360);
			pc.fill();
			posmove[posx+addposx][posy+addposy] = 'possiblemove';
		}
	}
	function casechoose(event){
		var x = event.clientX - marge;
		var y = event.clientY - marge;
		posx = Math.trunc(x/casesize);
		posy = Math.trunc(y/casesize);
		boardbase();
		brd.fillStyle = "#aa0000";
		brd.fillRect(casesize*posx, casesize*posy, casesize, casesize);
		play();
	}
	function piecechoose(x,y){
		pc.beginPath();
		pc.fillStyle = "#aa0000";
		switch(piecein[x][y]){
			case pionNoir:
			posattack(x,0,y,1);
			posattack(x,0,y,2);
			break;
			case pionBlanc:
			posattack(x,0,y,-1);
			posattack(x,0,y,-2);
			break;
			case fouNoir:
			case fouBlanc:
			for(var i = 0; i < 8; i++){
			posattack(x,i,y,i)
			posattack(x,-i,y,i)
			posattack(x,i,y,-i)
			posattack(x,-i,y,-i)
			}
			break;
			case chevalNoir:
			case chevalBlanc:
			posattack(x,1,y,2);
			posattack(x,1,y,-2);
			posattack(x,-1,y,2);
			posattack(x,-1,y,-2);
			posattack(x,-2,y,1);
			posattack(x,-2,y,-1);
			posattack(x,2,y,1);
			posattack(x,2,y,-1);
			break;
			case tourNoir:
			case tourBlanc:
			for(var i = -8; i < 8; i++){
				posattack(x,i,y,0)
				posattack(x,0,y,i)
			}
			break;
			case dameNoir:
			case dameBlanc:
			for(var i = 0; i < 8; i++){
				posattack(x,i,y,i)
				posattack(x,-i,y,i)
				posattack(x,i,y,-i)
				posattack(x,-i,y,-i)
			}
			for(var i = -8; i < 8; i++){
				posattack(x,i,y,0)
				posattack(x,0,y,i)
			}
			break;
			case roiNoir:
			case roiBlanc:
			posattack(x,1,y,1)
			posattack(x,1,y,-1)
			posattack(x,-1,y,1)
			posattack(x,-1,y,-1)
			posattack(x,0,y,1)
			posattack(x,1,y,0)
			posattack(x,0,y,-1)
			posattack(x,-1,y,0)
		}
	}
	var	piecein = [];
	var posmove = [];
	for(var i = 1; i <= numbercase; i++){
		piecein[i] = [];
		posmove[i] = [];
		for(var j = 1; j <= numbercase; j++){
			piecein[i][j] = 'rien';
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