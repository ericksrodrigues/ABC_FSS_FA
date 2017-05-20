const ABC = require('../controllers/ABC'),
    FFA = require('../controllers/FFA'),
    FSS = require('../controllers/FSS'),
    fitness= require('../modules/fitness');

module.exports = function(app){
    app.get("/", function(req,res){
        res.send(200);
    });

    app.get("/abc", function(req,res){
        ABC(res,fitness._rosenbrock);
    });
    
    app.get("/ffa", function(req,res){
        FFA(res,fitness._rosenbrock);
    });

    app.get("/fss", function(req,res){
        FSS(res,fitness._rosenbrock);
    });
}