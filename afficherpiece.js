function afficherpiece(){
	//effacer les 2 calques ou ya les pièces et ou ya les points de déplacement
	pc.clearRect(0, 0, 500,500);
	dot.clearRect(0, 0, 500,500);
	for(var i = 1; i <= numbercase; i++){
		for (var j = 1; j <= numbercase; j++) {
			if(piecein[i][j] != 'rien'){
				//afficher les pièces à leurs positions
				pc.drawImage(piecein[i][j].img, (i-1) * casesize, (j-1) * casesize, casesize, casesize);
				//verification de la couleur de la pièce cliqué par rapport à c'est à qui de jouer
				selectpiece(i,j,'blanc');
				selectpiece(i,j,'noir');
			}
		}	
	}
}