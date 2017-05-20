const makeparticle = require('./particle'),
    gerRandomLimit = require('../modules/LimitRandom'),
    lodash = require('lodash');

module.exports = function(req, fitness){
    let fishes = makeparticle.create_fss();
    const stepind_initial = 0.1;
    const stepvol_initial = 2 * individual_step;
    let step_ind = stepind_initial;
    let step_vol = stepvol_initial;
    let best_fish;
    let best_fish_fitness;
    let array_var_fitness = restartArray();
    let array_var_position = restartArray();
    
    lodash.forEach(fishes, fish => {
        fish.fitness = fitness(fish.position);
        if(!best_fish || best_fish_fitness > fish.fitness){
            best_fish = lodash.clone(fish);
            best_fish_fitness = fish.fitness;
        } 
    });
    aux_fishes = lodash.clone(fishes);
    lodash.forEach(aux_fishes, fish => {
        lodash.forEach(fish.position, x =>{
            x = x + Math.random() * (Math.random() <= 0.5 ? 1 : -1)*step_ind;
        });
        fish.fitness = fitness(fish.position);
    });

    for(let i = 0; i < aux_fishes.length; i++){
        if(aux_fishes[i].fitness > fishes[i].fitness){
            aux_fishes[i].position = lodash.clone(fishes[i].position);
        }
        array_var_fitness[i] += fishes[i].fitness - aux_fishes[i].fitness;
        for(let j = 0; j < 30; j++){
            array_var_position[j] += (fishes[i].position[j] - aux_fishes[i].position[j]) * array_var_fitness[j];
        }
        
    }
    fishes = lodash.clone(aux_fishes);
    let sum_var_fitness = 0;
    for(let i = 0; i< 30; i++){
       sum_var_fitness += array_var_fitness[i];
    }
    for(let i = 0; i < 30; i++){
        array_var_position /= sum_var_fitness;
    }
    lodash.forEach(fishes, fish=>{
        lodash.forEach(fish.position, (x,i) =>{
            x += x + array_var_position[i];
        });
    });
    
}

function restartArray(){
    let arr = []
    for(let i = 0; i < 30; i ++ ){
        arr.push(0);
    }
    return arr;
}