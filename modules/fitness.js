const lodash = require('lodash');
function _sphere(position){
	position = lodash.clone(position);
	var retorno =0;
	for(var i = 0; i < 30; i++){
		retorno += position[i]*position[i];
	}
	return retorno;
}

function _rotated(position){
	position = lodash.clone(position);
	var retorno = 10 * 30;
	for(var i = 0; i < 30; i++){
		retorno += position[i]*position[i] - 10*Math.cos(Math.PI*position[i]);
	}
	return retorno;
}

function _rosenbrock(x){
	x = lodash.clone(x);
	var retorno = 0;
	for(var i = 0; i < 29; i++){
		retorno += 100*(x[i+1] - x[i] * x[i])*(x[i+1] - x[i] * x[i]) + (x[i] - 1)*(x[i] - 1);
	}
	return retorno;
}

module.exports = {
    _sphere, _rotated, _rosenbrock
}