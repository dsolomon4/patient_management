
    $(document).ready(function () {

        $("#return-home").hide();

        $("#submit-new").on("click", function (event) {
            event.preventDefault();

                

                function createNewPatient() {
                var isValid = true;
                $('.form-control').each(function () {
                    if ($(this).val() === '')
                        isValid = false;
                });
                console.log("valid")
                return isValid;
            }

                var newPatient = {
                    first_name: $("#firstName").val(),
                    last_name: $("#lastName").val(),
                    email: $("#email").val(),
                    address: $("#address").val(),
                    address2: $("#address2").val(),
                    city: $("#city").val(),
                    state: $("#state").val(),
                    zip: $("#zipCode").val(),
                    phone_number: $("#phoneNumber").val(),
                    dob: $("#dob").val(),
                    sex: $("#sex").val(),
                    // reason_for_visit: $("#visit").val()
                };

                $("#new-patient-form").hide();

                console.log(newPatient.first_name + " has been created")


                var currentURL = window.location.origin;

                 $.post(currentURL + "/api/patients", newPatient, function (data) {


                    console.log( data.first_name)
                    document.getElementById("patient-added").innerText = data.first_name + " " + data.last_name + " has succesfully be added";
                    $("#return-home").show();

                });
            
                

        });






    })



