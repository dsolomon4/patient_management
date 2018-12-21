
var path = require("path");

module.exports = function(app) {

    app.get("/", function(req, res){
       res.sendFile(path.join(__dirname, "../public/index.html")); 
    })

    app.get("/newpatient", function(req, res){
       res.sendFile(path.join(__dirname, "../public/new_patient.html")); 
    })

    app.get("/patientview/:id", function(req, res){
        res.sendFile(path.join(__dirname, "../public/patient_view.html")); 
     })
}