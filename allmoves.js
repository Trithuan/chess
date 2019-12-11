function allmoves(x,y){
	switch(piecein[x][y].name){
		case 'pionNoir':
		movepion(x,y,piondir('noir'),'noir');
		break;
		case 'pionBlanc':
		movepion(x,y,piondir('blanc'),'blanc')
		break;
		case 'fouNoir':
		case 'fouBlanc':
		for(var i = 1; i < 8; i++){
			foumove(x,y,i);
		}
		break;
		case 'chevalNoir':
		case 'chevalBlanc':
		chevalmove(x,y);
		break;
		case 'tourNoir1':
		case 'tourBlanc1':
		case 'tourNoir2':
		case 'tourBlanc2':
		for(var i = 1; i < 8; i++){
			tourmove(x,y,i);
		}
		break;
		case 'dameNoir':
		case 'dameBlanc':
		for(var i = 1; i < 8; i++){
			tourmove(x,y,i);
			foumove(x,y,i);
		}
		break;
		case 'roiNoir':
		case 'roiBlanc':
		roiplays = true;
		var i = 1;
		tourmove(x,y,i);
		foumove(x,y,i);
		roquemove(x,y);
		roiplays = false;
		break;
	}
}