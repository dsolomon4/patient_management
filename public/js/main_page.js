 $(document).ready(function () {

    $.ajax({ url: "api/patients", method: "GET", })
    .then(function(data){
        console.log(data)
       

        for (var i = 0; i< data.length; i++){
            if (data[i].active === "active"){
                console.log(data[i].first_name)
                $("#data-print").text(data[i].first_name)
            }

        }
    })
  






     $(".patient-search").hide();

     $("#submit-search").on("click", function (event) {
         event.preventDefault();


         var searchPatient = {
             first_name: $("#firstName").val(),
             last_name: $("#lastName").val(),
             
         };

         $("#new-patient-form").hide();

         console.log(searchPatient.first_name + " has been searched")


         var currentURL = window.location.origin;

         $.get(currentURL + "/api/patients", searchPatient, function (data) {


             console.log(data.first_name)
             document.getElementById("patient-added").innerText = data.first_name + " " + data.last_name + " has succesfully be added";
             $("#return-home").show();

         });



     });






 })