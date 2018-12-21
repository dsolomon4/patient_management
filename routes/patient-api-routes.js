var db = require("../models");

module.exports = function (app) {
    app.get("/api/patients", function (req, res) {
        db.Patient.findAll({
            include: [db.Post]
        }).then(function (dbPatient) {
            res.json(dbPatient);
        });
    });

    app.get("/api/patient/:id", function(req, res){
        db.Patient.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Post]
        }).then(function(dbPatient) {
            res.json(dbPatient);
        });
    });

    app.get("/api/patients/:first_name", function (req, res) {
        db.Patient.findOne({
            where: {
                first_name: req.params.first_name
            },
            include: [db.Post]
        }).then(function (dbPatient) {
            res.json(dbPatient);
        });
    });

    app.post("/api/patients", function (req, res) {
        db.Patient.create(req.body).then(function (dbPatient) {
            res.json(dbPatient);
        });
    });


    app.put("/api/patients/:id", function (req, res) {
        
        db.Patient.update({
            active: req.body.active
        }, {
            where: {
                id: req.body.id
            }
        }).then(function (dbPatient) {
            res.json(dbPatient);
        });
    });

};