
 $(document).ready(function () {

    $("#table-search").hide()

    $.ajax({ url: "api/patients", method: "GET" })
    .then(function(data){
        console.log(data)
       

        for (var i = 0; i< data.length; i++){
            if (data[i].active === true ){
                console.log(data[i].first_name)

                renderPatient(data)

 
                
                function renderPatient(data){


                    var waitList = $("<tr>");
                    waitList.append("<th>" + data[i].id + " " + "</th>")
                    waitList.append("<td>" + data[i].first_name+ "</td>")
                    waitList.append("<td>" + data[i].last_name + "</td>")
                    waitList.append('<td> <a role= button href="/patientview"> See Patient </a> </td>' )
                    
                    $("#data-print").append(waitList)
                
                }
            } 





        $.ajax({ url: "api/patients", method: "GET" })
        .then(function(data){
            for (var i = 0; i< data.length; i++){
                if (searchPatient === data[i].first_name && data[i].last_name === lastName && data[i].active === false){
                    console.log(data[i].first_name + " " + data[i].last_name)
                    searchId = data[i].id

               function renderPatient(data){


                   var div = $("<div>");
                   div.append("<p> Patient id:" + data[i].id + " " + "<p>")
                   div.append("<p> Name: " + data[i].first_name + " "  + data[i].last_name+ "<p>")
                   // i added an ID for see patient
                   div.append('<a role= button href="/patientview/' + data[i].id + '"> See Patient </a>' )


                    renderSearch(data)
 
                
                    function renderSearch(data){

                        $("#table-search").show()

                        var dateOb = data[i].dob
                        var viewDob = moment(dateOb).format('ll')

                        var seachActive = $("<tr>");
                        seachActive.append("<td>" + data[i].id + "</td>")
                        seachActive.append("<td>" + data[i].first_name + "</td>")
                        seachActive.append("<td>" + data[i].last_name + "</td>")
                        seachActive.append("<td>" + viewDob + "</td>")
                        seachActive.append('<td> <button id="activate"> Activate </button> </td>' )
                        
                        $("#search-print").append(seachActive)
                    

                    }

                    $("#activate").on("click", function (data){
                        // data[i].active = true;
                        console.log("this is the onclick id " + searchId)

                        var makeActice = $(this).data("true");

                        var activate = {
                            active : true
                        };

                        $.ajax("api/patients/" + searchId, {
                            type: "PUT",
                            data: activate,
                            where: searchId
                    }).then(function(){
                        console.log("==== update data")
                        
                        console.log(activate)
                        // location.reload()
                
                        // for (var i = 0; i< data.length; i++){
                        //     if (data.id === searchId){
                        //         console.log("==== search id" )
                        //         console.log(data)
                        //     //     console.log(data[i].first_name + " " + data[i].last_name)
                                
                        //     //     console.log("====  before update data")
                        //     //     console.log(data[i])
            
                        //     // data[i].active = true
                            
                        //     // console.log("==== after update data")
                        //     // console.log(data[i].active)
            
                        //     // // 
            
                               
                        //     }
                
                        // }
            
            
                    })

                     });
                     
                    //  $.put("/api/patients/" + searchId, function(req, res) {
                    //     db.Patient.update(
                    //         {active: req.body.active},
                    //         { where: { id: req.body.id}}
                    //     ).then(function(dbPatient){
                    //         res.json(dbPatient);
                    //         location.reload()
                    //     });
                    // });       
                    

                }
            }
        })

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