$(document).ready(function () {

    loadPatient()
 

})

 function loadPatient(){
    var pId = window.location.href.split("patientview/")[1]
    $.ajax("/api/patient/" + pId,{
        type: "GET",
        
    }).then(function(data){
        console.log(data)
        var postFirst = $("#view_first").html("First Name: " + data.first_name)
        var postLast = $("#view_last").html("Last Name: " + data.last_name )
        var postId = $("#view_id").html("Patient ID: " + data.id)
    
    
        completePatient(data)
    
        submitPost(data)
    

        function submitPost(data){
            $("#complete").on("click", function(event){
                event.preventDefault();
                
                
                var postVisitNotes = {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    patient_id: data.id,
                    reason_for_visit: $("#reason-visit").val(),
                    body: $("#visit-description").val(),
                    employee: $("#employee").val(),
                    see_doctor: $("#doctor").val()
                };
                
                console.log(postVisitNotes)
    
                var currentURL = window.location.origin;
    
    
                 $.post(currentURL + "/api/posts", postVisitNotes, function (data) {
    
    
                    console.log( data.first_name + " visit has been posted")
                    
    
                });
    
            
            })
        }
    });
 }

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




$("#see-doctor").on("click", function(event){
    event.preventDefault();

    var updatePatient = {
        description: $("#visit-description").val()
    };

    var currentURL = window.location.origin;


             $.post(currentURL + "/api/posts", updatePatient, function (data) {


                console.log( data.first_name)
                location.href = "/";


            });
})



