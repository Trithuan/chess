function afficherdot(){
	for(var i = 1; i <= 8 ;i++){
		for (var j = 1; j <= 8; j++) {
			if(posAdvmove[i][j] == 'possible'){
				//bleu
				// drawdot(i,j,'#0000aa');
				//echec
				if(piecein[i][j].name == 'roiNoir' || piecein[i][j] == roiBlanc){
					console.log('echec');
					echec = true;
					//orange
					brd.fillStyle = '#ff9916';
					brd.fillRect(casesize*(i-1), casesize*(j-1), casesize, casesize);
				}
			}
			if(prisepassant[i][j] == 'possible'){
				// drawdot(i,j,'#0000aa');
			}
			if(posdoublepas[i][j] == 'possible'){
				// drawdot(i,j,'#aa00aa');
			}
			if(posroque[i][j] == 'possible'){
				drawdot(i,j,'#00aaaa');
			}
			if(posAllimove[i][j] == 'possible'){
				//rose
				// drawdot(i,j,'#ff86c3');
			}
			if(posAdvmove[i][j] == 'possible' ){
				//gris
				// drawdot(i,j,'#AAAAAA');
			}
			if(posAdvmove[i][j] == 'possible' && posAllimove[i][j] == 'possible'){
				//violet
				// drawdot(i,j,'#8A2BE2');
			}
			if(pospiecemove[i][j] == 'possible'){
				//vert
				if(piecein[i][j].color == reversecolor(actualplayercolor)){
					brd.fillStyle = '#ffff00';
					brd.fillRect(casesize*(i-1), casesize*(j-1), casesize, casesize);
				}
				drawdot(i,j,'#21bd20');
			}
		}
	}
}