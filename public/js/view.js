$(document).ready(function () {

    loadPatient()

})

function loadPatient() {
    var pId = window.location.href.split("patientview/")[1]
    $.ajax("/api/patient/" + pId, {
        type: "GET",

    }).then(function (data) {
        console.log(data)

        var firstNameArr = data.first_name.split("")
        firstNameArr[0] = firstNameArr[0].toUpperCase()
        var firstName = firstNameArr.join("")

        var lastNameArr = data.last_name.split("")
        lastNameArr[0] = lastNameArr[0].toUpperCase()
        var lastName = lastNameArr.join("")

        var postFirst = $("#view_first").html(firstName + " " + lastName)
        var postId = $("#view_id").html("Patient ID: " + data.id)

        patientHistoryId = data.id

        console.log(patientHistoryId)

        completePatient(data)

        submitPost(data)

        viewHistory(patientHistoryId)


        function submitPost(data) {
            $("#submit-view").on("click", function (event) {
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


                    console.log(data.first_name + " visit has been posted")


                });

                
            })
        }
    });
}

function completePatient(data) {
    $("#submit-view").on("click", function (event) {
        event.preventDefault();

        var finishVisit = $("#doctor").val;

        var updatePost = {
            patient_id: data.id
        }

        $.ajax({
            method: 'PUT',
            url: '/api/patients/' + data.id,
            data: {
                active: false,
              
            }
        }).then(result => {
            console.log(result)

            location.href = "/";
        })

        if (finishVisit === false) {
            $.ajax({
                method: 'PUT',
                url: '/api/posts' + updatePost,
                data: {
                    see_doctor: false
                }
            }).then(result => {
                console.log(result)

            })

        }
    })
}


function viewHistory(patientHistoryId) {

    console.log(patientHistoryId + " this is the patient id number")

    $.ajax("/api/posts", {
        type: "GET",
    }).then(function (result) {
        console.log(result)

        for (var i = 0; i < result.length; i++) {
            console.log(result[i].patient_id)

            if (result[i].patient_id == patientHistoryId) {
                console.log(result[i].body)
                console.log(result[i].createdAt)

                printHistory(result)

                function printHistory(result) {

                    var visitDate = result[i].createdAt;
                    var formatDate = moment(visitDate).format('ll')

                    var history = $("<tr>");
                    history.append("<td>" + formatDate + "</td>")
                    history.append("<td>" + result[i].reason_for_visit + "</td>")
                    history.append("<td>" + result[i].body + "</td>")
                    history.append('<td>' + result[i].employee + '</td>')

                    $("#print-history").append(history)

                }
            }
        }

    })
}