$(document).ready(function(){




$("#submit-button").on("click", function (event) {
    event.preventDefault();


    function createNewPatient() {
        var isValid = true;
        $('.form-control').each(function () {
            if ($(this).val() === '')
                isValid = false;
        });
        return isValid;
    }
    // If all required fields are filled
    if (createNewPatient() == true) {
        console.log("valid");
        // Create an object 
        var newPatient = {
            first_name: $("#firstName").val().trim(),
            last_name: $("#lastName").val().trim(),
            email:  $("#email").val().trim(),
            address: $("#address").val().trim(),
            address2: $("#address2").val().trim(),
            city:  $("#city").val().trim(),
            state: $("#state").val().trim(),
            zip: $("#zipCode").val().trim(),
            phone_number:  $("#phoneNumber").val().trim(),
            dob: $("#dobnameInput").val().trim(),
            sex: $("#sex").val().trim(),
            reason_for_visit:  $("#visit").val().trim()
        }
        
        document.getElementById("survey-form").reset();

        console.log(newPatient.first_name + " has been created")

    } 

    

    $.post("/api/patients", newPatient)
    .then(
console.log("we have added " + newPatient.first_name + " to the database")
    );






});






})