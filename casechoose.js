var change = true;
function casechoose(event){
	var action = 'rien';
	var afterpos;
	var x = event.clientX - marge;
	var y = event.clientY - marge;
	mousex = Math.trunc(x/casesize)+1;
	mousey = Math.trunc(y/casesize)+1;
	if(pospiecemove[mousex][mousey] == 'possible'){
		var prevclick = piecein[playpiecex][playpiecey];
		cleararray(prisepassant);
		cleararray(didDoublepas);
		if(posroque[mousex][mousey] != 'possible'){
			if(posdoublepas[mousex][mousey] == 'possible' &&(prevclick.name == 'pionNoir' || prevclick.name == 'pionBlanc')){
				posprisepassant(mousex,mousey);
			}
			piecein[playpiecex][playpiecey].didmove = true;
			eatenpiece = piecein [mousex][mousey];
			if(didprisepassant == true){
				eatenpiece = piecein[mousex][mousey - piondir(actualplayercolor)];
				console.log(piecein[mousex][mousey - piondir(actualplayercolor)],mousex,mousey - piondir(actualplayercolor));
				piecein[mousex][mousey - piondir(actualplayercolor)] = 'rien';
				didprisepassant = false;
			}
			piecein [mousex][mousey] = piecein[playpiecex][playpiecey];
			piecein [playpiecex][playpiecey] = 'rien';
			//transformation pion/dame
			if((mousey == 1 || mousey == 8) && (piecein[mousex][mousey] == pionNoir || piecein[mousex][mousey] == pionBlanc)){
				if(piecein[mousex][mousey].color == 'noir'){
					piecein[mousex][mousey] = dameNoir;
				}else{piecein[mousex][mousey] = dameBlanc;}
			}
			if(eatenpiece != 'rien'){
				action = ' prend : ';
				afterpos = eatenpiece.name+' en ['+lettre(mousex)+mousey+']';
			}else{
				action = ' va en ';
				afterpos = '['+lettre(mousex)+mousey+']';
			}
		}else{
			switchroque(2, 4, 1, 1);
			switchroque(3, 5, 1, 1);
			switchroque(6, 4, 8, -1);
			switchroque(7, 5, 8, -1);
			action = ' roque avec '
		}
			nbc++;
			histo[nbc*7] = nbc;
			histo[nbc*7+1] = eatenpiece;
			histo[nbc*7+2] = playpiecex;
			histo[nbc*7+3] = playpiecey;
			histo[nbc*7+4] = piecein[mousex][mousey];
			histo[nbc*7+5] = mousex;
			histo[nbc*7+6] = mousey;
			var beforepos = piecein[mousex][mousey].name+' en ['+lettre(playpiecex) + playpiecey+']';
			actualmove = nbc+' : '+beforepos+action+afterpos;
		actualplayercolor = reversecolor(actualplayercolor);
		change = true;
		console.log(actualmove); 
		cleararray(pospiecemove);
		cleararray(posAllimove);
		cleararray(posAdvmove);
		cleararray(posroque);
		cleararray(posdoublepas);
	}
	prevposx = mousex;
	prevposy = mousey;
	boardbase();
	brd.fillStyle = '#21bd20';
	brd.fillRect(casesize*(mousex-1), casesize*(mousey-1), casesize, casesize);
	play();
}
function switchroque(click,roi,tour,dir){
	if(mousex == click){
		eatenpiece = piecein[tour][mousey];
		piecein[click][mousey] = piecein[roi][mousey];
		piecein[roi][mousey] = 'rien';
		piecein[click+dir][mousey] = piecein[tour][mousey];
		piecein[tour][mousey] = 'rien';
	}
}
function posprisepassant(x,y){
	didDoublepas[x][y] = 'possible';
	if(x < 8){
		prisepassant[x+1][y] = 'possible';
	}
	if(x > 1){
		prisepassant[x-1][y] = 'possible';
	}
}