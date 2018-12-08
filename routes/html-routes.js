
var path = require("path");

module.exports = function(app) {

    app.get("/", function(req, res){
       res.render(path.join(__dirname, "../views/index")); 
    })

    app.get("/newpatient", function(req, res){
       res.render(path.join(__dirname, "../views/new_patient.handlebars")); 
    })
}