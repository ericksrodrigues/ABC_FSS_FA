const makeparticle = require('./particle'),
    gerRandomLimit = require('../modules/LimitRandom'),
    lodash = require('lodash');

module.exports = function (res, fitness) {
    /*initialization */
    let particles = makeparticle.create_abc();
    let sum_fitness = 0;
    let qtd_explorer = 15;
    let aux_probability = 0;
    let getProbability = 0;
    let best_position;
    let best_position_fitness;
    let setted_particles = 14
    /* selection exploration font */
    //console.log(particles);

    for (let m = 0; m < 500; m++) {
        sum_fitness = 0;
        for (let i = 0; i < qtd_explorer; i++) {
            particles[i].fitness = fitness(particles[i].position);
            if (!best_position || particles[i].fitness < best_position_fitness) {
                best_position = lodash.clone(particles[i].position);
                best_position_fitness = particles[i].fitness;
            }
            sum_fitness += 1.0 / particles[i].fitness;
           //console.log("sum_fitness", sum_fitness);
            //console.log(particles[i]);

        }
        for(let i = 0; i < 15; i++){
          //  console.log(1/sum_fitness * particles[i].fitness);

            particles[i].probability = 1.0 /(sum_fitness * particles[i].fitness);
           ///console.log("probabily",particles[i].probability);

        };
        for (let k = 15; k < 30; k++) {
            getProbability = Math.random();

            for (let i = 0; i < 15; i++) {
                if (particles[i].probability + aux_probability < getProbability) {
                    aux_probability += particles[i].probability;
                    continue;
                } else {
                    particles[k].position = lodash.clone(particles[i].position);
                    if (setted_particles < 29)
                        setted_particles++;
                    let rand_index = getRandomInt(0, setted_particles);
                    aux_probability = 0;

                    for (let j = 0; j < 30; j++) {
                        particles[k].position[j] = particles[i].position[j] +  Math.random()* (particles[i].position[j] - particles[rand_index].position[j]) * (Math.random() >= 0.5 ? 1 : -1)
                    }
                    let aux_fitness = fitness(particles[k].position);
                    let aux_fitness_2 = fitness(particles[i].position);
                    if (aux_fitness < aux_fitness_2) {
                        particles[i].position = lodash.clone(particles[k].position);
                        particles[i].fitness = aux_fitness;
                        if(aux_fitness < best_position_fitness){
                            best_position_fitness = aux_fitness;
                            best_position = lodash.clone(particles[i].position);
                        }
                    }else{
                        particles[i].food--;
                    }
                    break;
                }
            }

            for (i = 0; i < qtd_explorer; i++) {
                //particles[i].food--;
                if (particles[i].food == 0) {
                    particles[i].explore();
                }
            }
        }

        /* send explorer again if food == 0 */
        
        console.log(best_position_fitness);
    }
    //console.log(particles);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}