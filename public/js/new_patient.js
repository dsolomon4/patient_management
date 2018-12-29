
    $(document).ready(function () {

        $("#submit-new").on("click", function (event) {
            event.preventDefault();


                var newPatient = {
                    first_name: $("#firstName").val().toLowerCase(),
                    last_name: $("#lastName").val().toLowerCase(),
                    email: $("#email").val(),
                    address: $("#address").val(),
                    address2: $("#address2").val(),
                    city: $("#city").val(),
                    state: $("#state").val(),
                    zip: $("#zipCode").val(),
                    phone_number: $("#phoneNumber").val(),
                    dob: $("#dob").val(),
                    sex: $("#sex").val(),
                    active: $("#active").val()
                };

                

                console.log(newPatient.first_name + " has been created")


                var currentURL = window.location.origin;


                 $.post(currentURL + "/api/patients", newPatient, function (data) {


                    console.log( data.first_name)
                    location.href = "/";

                });
            
                

        });






    })



