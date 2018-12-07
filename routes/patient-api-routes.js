
var db = require("../models");

module.exports = function(app){
    app.get("/api/patients", function(req, res){
        db.Patient.findAll({
            include: [db.Patient]
        }).then(function(dbPatient){
            res.json(dbPatient);
        });
    });

    app.get("/api/patients/:id", function(req, res){
        db.Patient.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Patient]
        }).then(function(dbPatient) {
            res.json(dbPatient);
        });
    });

    app.post("/api/patients", function(req, res) {
        db.Patient.create(req.body).then(function(dbPatient) {
            res.json(dbPatient);
        });
    });

    app.put("/api/patients", function(req, res) {
        db.Patient.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }
            }
        ).then(function(dbPatient){
            res.json(dbPatient);
        });
    });

};