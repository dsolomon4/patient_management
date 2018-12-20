$(document).ready(function () {
    // $("#see-patient").on("click", function(event){

    // })

    var pId = window.location.href.split("patientview/")[1]
    $.ajax("/api/patient/" + pId,{
        type: "GET",
        
    }).then(function(data){
        console.log(data)
        $("#patient_name").html("First Name: " + data.first_name + "First Name: " + data.last_name)
    });

    $("#see-doctor").on("click", function(event){
        event.preventDefault();

        var updatePatient = {
            description: $("#visit-description").val()
        };

        var currentURL = window.location.origin;


                 $.post(currentURL + "/api/patients", updatePatient, function (data) {


                    console.log( data.first_name)
                    location.href = "/";

                });
    })





    // $("#submit-search").on("click", function (event) {
    //     event.preventDefault();


    //     var searchPatient = {
    //         first_name: $("#firstName").val(),
    //         last_name: $("#lastName").val(),
            
    //     };

    //     $("#new-patient-form").hide();

    //     console.log(searchPatient.first_name + " has been searched")


    //     var currentURL = window.location.origin;

    //     $.get(currentURL + "/api/patients", searchPatient, function (data) {


    //         console.log(data.first_name)
    //         document.getElementById("patient-added").innerText = data.first_name + " " + data.last_name + " has succesfully be added";
    //         $("#return-home").show();

    //     });



    // });






})