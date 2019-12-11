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
var doublepas = false;
function movepion(x,y,vec,couleur){
	if(piecein[x][y+(piondir(couleur))] == 'rien' && piecein[x][y].color == actualplayercolor){
		possiblemove(x,0,y,piondir(couleur),'down');
		if((y == 7|| y == 2) && piecein[x][y+(piondir(couleur)*2)] == 'rien'){
			doublepas = true;
			possiblemove(x,0,y,piondir(couleur)*2,'down');
		}
	}
	pionmange(x,y,vec);
}
var didprisepassant = false;
function pionmange(x,y,vec){
	if(x > 0 && x < 9 && y+vec > 0 && y+vec < 9){
		if(piecein[x][y].color != actualplayercolor){
			possiblemove(x,1,y,vec,'right');
			possiblemove(x,-1,y,vec,'left');
		}
		if(prisepassant[x][y] == 'possible'){
		    if(didDoublepas[x+1][y] == 'possible') {
		    	didprisepassant = true;
                possiblemove(x, 1, y, vec, 'right');
            }
		    if(didDoublepas[x-1][y] == 'possible') {
		    	didprisepassant = true;
                possiblemove(x, -1, y, vec, 'left');
            }
		}
		if(x < 8 && piecein[x+1][y+vec].color == reversecolor(piecein[x][y])){
			possiblemove(x,1,y,vec,'right');
		}
		if(x > 1 && piecein[x-1][y+vec].color == reversecolor(piecein[x][y])){
			possiblemove(x,-1,y,vec,'left');
		}
	}
}
var tourb1abouger = false;
var tourb2abouger = false;
var tourn1abouger = false;
var tourn2abouger = false;
var roinabouger = false;
var roibabouger = false;
var geneRoque = 0;
var isroquing = false;
function roquemove(x,y) {
	if(piecein[x][y].didmove == false && (piecein[x][y].name == 'roiNoir' || piecein[x][y].name == 'roiBlanc')){
		if( piecein[1][y].didmove == false){
			geneRoque = 0;
			for(var i = x-1; i > 1; i--){
				if(piecein[i][y] != 'rien'){
					geneRoque++;
				}
			}
			if(geneRoque == 0){
				isroquing = true;
				possiblemove(x,-2,y,0,'left');
			}
		}
		if( piecein[8][y].didmove == false){
			geneRoque = 0;
			for(var i = x; i < 9; i++){
				if(posAdvmove[i][y] == 'possible'){
					geneRoque++;
				}
			}
			for(var i = x+1; i < 8; i++){
				if(piecein[i][y] != 'rien'){
					geneRoque++;
				}
			}
			if(geneRoque == 0){
				isroquing = true;
				possiblemove(x,2,y,0,'right');
			}
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
function piecechoose(x,y){
	processAdvmoves = false;
	processAllimoves = false;
	cleararray(pospiecemove);
	resetdir();
	allmoves(x,y);
}
function possibleEnnemimove(){
	for(var i = 1; i <= 8; i++){
		for(var j = 1; j <= 8; j++){
			if(actualplayercolor == reversecolor(piecein[i][j])){
				processAdvmoves = true;
			}else{
				processAllimoves = true;
			}
			resetdir();
			allmoves(i,j);
		}
	}
}
function piondir(x){
	if(cote == true){
		if(x == 'blanc'){return 1;}else{return -1}
	}else {if(x == 'blanc'){return -1;}else{return 1}}
}
//fuite pion

//roque

// echec/pat/clouer