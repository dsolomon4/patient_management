$(document).ready(function () {

   $.ajax({ url: "api/patients", method: "GET" })
   .then(function(data){
       console.log(data)


       for (var i = 0; i< data.length; i++){
           if (data[i].active === true ){
               console.log(data[i].first_name)

               renderPatient(data)



               function renderPatient(data){

                   var div = $("<div>");
                   div.append("<p> Patient id:" + data[i].id + " " + "<p>")
                   div.append("<p> Name: " + data[i].first_name + " "  + data[i].last_name+ "<p>")
                   div.append('<a role= button href="/patientview"> See Patient </a>' )

                   $("#data-print").append(div)

               }
           }

       }
   })


    $("#submit-search").on("click", function (event) {
        event.preventDefault();


        var searchPatient = $("#firstName").val();
        var lastName = $("#lastName").val();
        var searchId ;
        var tempId ;

        console.log( searchPatient + " has been searched")


       $.ajax({ url: "api/patients", method: "GET" })
       .then(function(data){
           for (var i = 0; i< data.length; i++){
               if (data[i].last_name === lastName){
                   console.log(data[i].first_name + " " + data[i].last_name)
                   searchId = data[i].id

                   console.log( "this is the id" + searchId)

                   renderSearch(data)


                   function renderSearch(data){

                       var div = $("<div>");
                       div.append("<p> Patient id:" + data[i].id + " " + "<p>")
                       div.append("<p> Name: " + data[i].first_name + " "  + data[i].last_name+ "<p>")
                       div.append('<button id="activate"> Activate </button>' )

                       $("#search-print").append(div)

                       $("#activate").on("click", function (event){
                           console.log("hello")
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
                   }



       // $.ajax("api/patients/" + searchId, {
       //         type: "PUT",
       //         data: searchId
       // }).then(function(data){
       //     console.log("==== update data")

       //     console.log(data)


       //     for (var i = 0; i< data.length; i++){
       //         if (data.id[searchId] === searchId){
       //             console.log(data[i].first_name + " " + data[i].last_name)

       //             console.log("====  before update data")
       //             console.log(data[i])

       //         data[i].active = true

       //         console.log("==== after update data")
       //         console.log(data[i].active)

       //         // location.reload()


       //         }

       //     }


       // })
               }
           }
       })






    });






})