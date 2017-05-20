const makeparticle = require('./particle'),
    gerRandomLimit = require('../modules/LimitRandom'),
    lodash = require('lodash');

module.exports = function(req, fitness){
    let fishes = makeparticle.create_fss();
    const stepind_initial = 1;
    const stepvol_initial = 2 * stepind_initial;
    let step_ind = stepind_initial;
    let step_vol = stepvol_initial;
    let best_fish;
    let best_fish_fitness;
    let array_var_fitness = restartArray();
    let array_var_position = restartArray();
    //evaluate fitness of each fish and save de best
    lodash.forEach(fishes, (fish,index) => {
        fishes[index].fitness = fitness(fish.position);
        if(!best_fish || best_fish_fitness > fish.fitness){
            best_fish = lodash.clone(fish);
            best_fish_fitness = fish.fitness;
        } 
    });
    for(let m = 0; m < 10000; m++){
        //create a copy of population of fishes
        aux_fishes = lodash.cloneDeep(fishes);
        //individual movement
        lodash.forEach(aux_fishes, (fish,index) => {
            lodash.forEach(fish.position, (x,i) =>{
                aux_fishes[index].position[i] = x + Math.random() * (Math.random() <= 0.5 ? 1 : -1)*step_ind;
            });
            aux_fishes[index].fitness = fitness(aux_fishes[index].position);
            if(aux_fishes[index].fitness < best_fish_fitness){
                best_fish = lodash.clone(aux_fishes[index]);
                best_fish_fitness = aux_fishes[index].fitness;
            }
        });



        //instint coletive movement
        for(let i = 0; i < aux_fishes.length; i++){
            //if previous position is better than actual, the position is restored
            array_var_fitness[i] += fishes[i].fitness - aux_fishes[i].fitness;
            
            // to keep the variation of fitness in a array  
            if(aux_fishes[i].fitness > fishes[i].fitness){
                aux_fishes[i] = lodash.clone(fishes[i]);
            }
            for(let j = 0; j < 30; j++){
                array_var_position[j] += (fishes[i].position[j] - aux_fishes[i].position[j]) * array_var_fitness[i];
            }
            
        }
        //feed fishes
        let max = 0;
        max = 0;
        //get max variation value
        for(let i = 0; i < array_var_fitness.length; i++){
            if(max < Math.abs(array_var_fitness[i]))
                max = Math.abs(array_var_fitness[i]);
        }
        for(let i = 0; i< aux_fishes.length; i++){
            aux_fishes[i].weight += array_var_fitness[i]/max
        }

        //return the value to the original population
        let sum_weight_prev = 0;
        sum_weight_prev = 0;
        lodash.forEach(fishes, fish => {
            sum_weight_prev += fish.weight;
        });
        fishes = lodash.clone(aux_fishes);
        let sum_var_fitness = 0;
        sum_var_fitness = 0;
        //uses the formula to change the position
        for(let i = 0; i< 30; i++){
             sum_var_fitness += array_var_fitness[i];
        }
        for(let i = 0; i < 30; i++){
            array_var_position[i] /= sum_var_fitness;
        }
        //uses the formula to change the position

        lodash.forEach(fishes, (fish,index)=>{
            lodash.forEach(fish.position, (x,i) =>{
                fishes[index].position[i] += array_var_position[i];
            });
        });
        
        // volitive movement
        //baricenter
        let baricenter = restartArray();
        let sum_weight = 0;
        sum_weight = 0;
        lodash.forEach(fishes, fish => {
            sum_weight += fish.weight;
        });
        lodash.forEach(fishes, fish => {
            for(let i = 0; i < baricenter.length; i++){
                baricenter[i] = fish.position[i]*fish.weight/sum_weight;
            }
        });
        lodash.forEach(fishes, (fish,index) =>{
            for(let i = 0; i < fish.position.length; i++){
                fishes[index].position[i] += step_vol*(fish.position[i] - baricenter[i])/Math.sqrt(Math.pow(fish.position[i] - baricenter[i],2)) * sum_weight > sum_weight_prev ? -1 : 1

            }
            fishes[index].fitness = fitness(fishes[index].position);
                if(fishes[index].fitness < best_fish_fitness){
                    best_fish_fitness = fishes[index].fitness;
                    best_fish = lodash.clone(fishes[index].position);
            }
        });
        array_var_position = restartArray();
        array_var_fitness = restartArray();
        baricenter = restartArray();
        console.log(best_fish_fitness);
    }
    
}

function restartArray(){
    let arr = []
    for(let i = 0; i < 30; i ++ ){
        arr.push(0);
    }
    return arr;
}