$(document).ready(function () {
    // $("#see-patient").on("click", function(event){

    // })

  

    var pId = window.location.href.split("patientview/")[1]
    $.ajax("/api/patient/" + pId,{
        type: "GET",
        
    }).then(function(data){
        console.log(data)
        $("#patient_name").html("First Name: " + data.first_name + "First Name: " + data.last_name)


        completePatient(data)

        function completePatient(data){
            $("#complete").on("click", function(event){
                event.preventDefault();
            
                $.ajax({
                    method: 'PUT',
                    url: '/api/patients/' + data.id,
                    data: {
                        active: false
                    }
                }).then(result => {
                    console.log(result)
        
                    location.href = "/";
                })
        
            
            
            })
        }
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





})

