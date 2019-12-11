//adapte le déplacement possible des pièces en cas de dépassement de terrain ou de pièces sur le chemin alliés ou ennemies
function possiblemove(posx, addx,posy,addy,parlas){
	var nextX = posx+addx;
	var nextY = posy+addy;
	//encadre la zone possible de déplacement au plateau
	if(nextX < 9 && nextX > 0 && nextY < 9 && nextY > 0){
		//si la pièce qui joue a un allié sur sa route on s'arrète avant pour ne pas avoir la possibilité de manger une pièce allié
		if(piecein[posx][posy].color == piecein[nextX][nextY].color){
			direction[parlas] = 0;
		}
		if(direction[parlas] == 1){
			if(doublepas == true){
				posdoublepas[nextX][nextY] = 'possible';
				doublepas = false;
			}
			if(processAdvmoves == false && processAllimoves == false){
				//empèche le roi d'aller sur des cases attaqué par l'ennemi
				if(roiplays == false){
					pospiecemove[nextX][nextY] = 'possible';
				}else{
					if(posAdvmove[nextX][nextY] != 'possible'){
						pospiecemove[nextX][nextY] = 'possible';
					}
					if(isroquing == true){
						if(addx == 2 || addx == -2) {
							posroque[nextX][nextY] = 'possible';
						}
						isroquing = false;
					}
				}
			}else{
				if(piecein[posx][posy].color != actualplayercolor){
					posAdvmove[nextX][nextY] = 'possible';
				}else{
					posAllimove[nextX][nextY] = 'possible';
				}
			}
			//si la pièce qui joue a un ennemi sur sa route on s'arrète après pour pouvoir manger la pièce mais pas pouvoir la traverser 
			if(piecein[posx][posy].color == reversecolor(piecein[nextX][nextY])){
				direction[parlas] = 0;
			}
		}
	}
}