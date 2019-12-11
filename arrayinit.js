var numbercase = 8;
var	piecein = [];
var posAdvmove = [];
var pospiecemove = [];
var posAllimove = [];
var posroque = [];
var prisepassant = [];
var posdoublepas = [];
var didDoublepas = [];
cleararray(piecein);
cleararray(posAdvmove);
cleararray(pospiecemove);
cleararray(posAllimove);
cleararray(posroque);
cleararray(prisepassant);
cleararray(posdoublepas);
cleararray(didDoublepas);
function cleararray(x){
	for(var i = 1; i <= numbercase; i++){
		x[i] = [];
		for(var j = 1; j <= numbercase; j++){
			x[i][j] = 'rien';
		}
	}
}