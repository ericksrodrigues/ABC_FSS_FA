const makeparticle = require('./particle'),
    gerRandomLimit = require('../modules/LimitRandom'),
    lodash = require('lodash');

module.exports = function (res, fitness) {
    let fireflies = makeparticle.create_ffa();
    let best_position;
    let best_position_fitness;
    for(let i = 0; i < fireflies.length; i++){
        fireflies[i].intensit = fitness(fireflies[i].position);
        if(!best_position || fireflies[i].intensit < best_position_fitness){
            best_position = lodash.clone(fireflies[i].position);
            best_position_fitness = fireflies[i].intensit;
        }

    }
    for(let m = 0; m < 10000; m++){
        let y = 1;
        for(let i = 0; i< fireflies.length; i++){
            for(let j = 0; j< fireflies.length; j++){
                if(fireflies[j].intensit < fireflies[i].intensit){
                    let distance = 0; // value distance^2
                    for(k = 0; k < fireflies[i].position.length; k++){
                        distance += Math.pow((fireflies[j].position[k] - fireflies[i].position[k]),2);
                    }
                    let b0 = 0.1 + m*0.3 / 10000;
                    //let b0 = 5000;
                    let b = b0*Math.exp(-1*y*distance)
                        for(let z =0; z < fireflies[i].position.length; z++){
                            fireflies[i].position[z] = fireflies[i].position[z] + b*(fireflies[j].position[z] - fireflies[i].position[z]) + Math.random()*(Math.random() - 0.5);
                        }
                        fireflies[i].intensit = fitness(fireflies[i].position);

                }
            }
        }

        for(let i = 0; i < fireflies.length; i++){
            if(fireflies[i].intensit < best_position_fitness){
                best_position_fitness = fireflies[i].intensit;
                best_position = lodash.clone(fireflies[i].position);
            }
        }
        console.log(best_position_fitness);
    }
}