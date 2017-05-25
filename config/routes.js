const ABC = require('../controllers/ABC'),
    FFA = require('../controllers/FFA'),
    FSS = require('../controllers/FSS'),
    fitness= require('../modules/fitness'),
    analyse = require('../controllers/analyse');

module.exports = function(app){
    app.get("/", function(req,res){
        res.send(200);
    });

    app.get("/abc", function(req,res){
        ABC(fitness._rosenbrock);
    });
    
    app.get("/ffa", function(req,res){
        FFA(fitness._rosenbrock);
    });

    app.get("/fss", function(req,res){
        FSS(fitness._rosenbrock);
    });

    app.get("/analyse_sphere", function(req,res){
        analyse.analyse_sphere(res);
    });
}