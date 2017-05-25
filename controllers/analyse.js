const
    ABC = require('./ABC'),
    FFA = require('./FFA'),
    FSS = require('./FSS'),
    fitness = require('../modules/fitness'),
    json2csv = require('json2csv'),
    fs = require('fs');
    let fit = fitness._rosenbrock;
exports.analyse_sphere = function (res){
    let array_fss = FSS(fit);
    let array_fa = FFA(fit);
    let array_abc = ABC(fit);
    for(let i = 0; i < 29; i++){
        let aux_fss, aux_fa, aux_abc;
        aux_fss = FSS(fit);
        aux_fa = FFA(fit);
        aux_abc = ABC(fitness._sphere);
        for(let j = 0; j < array_fss.length; j++){
          array_fss[j].fitness += aux_fss[j].fitness;
          array_abc[j].fitness += aux_abc[j].fitness;
          array_fa[j].fitness += aux_fa[j].fitness;
        }
        console.log(i);
    }
    for(let j = 0; j < array_fss.length; j++){
            array_fss[j].fitness /= 30;
            array_abc[j].fitness /= 30;
            array_fa[j].fitness /= 30;
    }

    fs.writeFile('FSS.csv', json2csv({ 'data': array_fss, 'fields': ["iteration","fitness"]}), (err) =>{
        console.log(err);
    });
    fs.writeFile('ABC.csv', json2csv({ 'data': array_abc, 'fields': ["iteration","fitness"]}), (err) =>{
        console.log(err);
    });
    fs.writeFile('FFA.csv', json2csv({ 'data': array_fa, 'fields': ["iteration","fitness"]}), (err) =>{
        console.log(err);
    })
    
}