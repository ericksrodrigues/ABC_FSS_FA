const lodash = require('lodash'),
    getRandomInt = require('../modules/LimitRandom');

exports.create_abc = function () {
    particles = [];
    for (let i = 0; i < 30; i++) {
        particles.push(lodash.clone(particula_abc(_position(-5,5))));
    }
    return(particles);
}

exports.create_ffa = function(){
    let fireflies = [];
    for (let i = 0; i < 30; i++) {
        fireflies.push(firefly(_position(-5,5)));
    }
    return(fireflies);
}

function firefly(position){
    return {
        "position": position,
        "intensit": false
    }
}

exports.create_fss = function(){
    let fishes = [];
    for(let i= 0; i < 30 ; i++){
        fishes.push(fish(_position(-5,5)));
    }
    return fishes;
}
function fish(position){
    return{
        "position": position,
        "weight": getRandomInt(300,600),
        "fitness": false
    }
}


exports.create_single_abc = function(){
    return lodash.clone(particula_abc(_position(-5,5)));  
}

function particula_abc(position) {
    return {
        "position": position,
        "probability": false,
        "fitness": false,
        "food": 15, // Dertermine de max number of iteractions to representes when resourses are finished
        "explore": function(){
            this.position = _position(-5,5);
            this.food = 15
        }
    }
}

function _position(min, max) {
    let position = [];
    for (let i = 0; i < 30; i++) {
        position.push(getRandomInt(min, max));
    }
    return position;
}

