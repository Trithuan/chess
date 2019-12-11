function previousmove(){
	if(nbc > 0){
		piecein[histo[nbc*7+2]][histo[nbc*7+3]] = histo[nbc*7+4];
		piecein[histo[nbc*7+5]][histo[nbc*7+6]] = histo[nbc*7+1];
		eatenpiece = 'rien';
		nbc --;
		if(actualplayercolor =='blanc'){
			actualplayercolor = 'noir';
		}else if(actualplayercolor == 'noir'){
			actualplayercolor = 'blanc';
		}
		cleararray(pospiecemove);
		cleararray(posAllimove);
		cleararray(posAdvmove);
		cleararray(posroque);
		cleararray(prisepassant);
		play();
	}
}
var undo = true;
window.addEventListener('keydown',function(event){
	c = event.keyCode;
	if(undo == true && c == 66){
		previousmove();
		undo = false;
	}
})
window.addEventListener('keyup',function(event){
		undo = true;
})