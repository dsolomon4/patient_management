$(document).ready(function () {

    $("#table-search").hide()
    $("#holder").hide()

    getPatientsAndRender()

    searchPatients()

    searchClick()

    updateDoctorQue()

})

function searchClick() {
    $("#search-click").on("click", function (event) {
        event.preventDefault();
        $("#holder").show()
        $("#search-click").hide()
    })
}

function getPatientsAndRender() {

    $.ajax({
            url: "api/patients",
            method: "GET"
        })
        .then(function (data) {
            console.log(data)


            for (var i = 0; i < data.length; i++) {
                if (data[i].active === true) {

                    renderPatient(data)

                    function renderPatient(data) {
                       
                        var waitList = $("<tr>");
                        waitList.append("<td>" + data[i].id + " " + "</td>")
                        waitList.append("<td>" + data[i].first_name + "</td>")
                        waitList.append("<td>" + data[i].last_name + "</td>")
                        waitList.append('<td> <a role= button href="/patientview/' + data[i].id + '"> See Patient </a> </td>')

                        $("#data-print").append(waitList)

                    }
                }
            }
        })
}

function searchPatients() {

    $("#submit-search").on("click", function (event) {
        event.preventDefault();

        var searchPatient = $("#firstName").val().toLowerCase();
        var lastName = $("#lastName").val().toLowerCase();
        var searchId;

        console.log(lastName, "this is the last")
        console.log(searchPatient + " has been searched")

        $.ajax({
                url: "api/patients",
                method: "GET"
            })
            .then(function (data) {
                console.log(data, "this is the datat coming bank from the db")
                for (var i = 0; i < data.length; i++) {
                    if (data[i].last_name === lastName && data[i].first_name === searchPatient && data[i].active === false) {
                        console.log(data[i].first_name + " " + data[i].last_name)
                        searchId = data[i].id

                        console.log("this is the id" + searchId)

                        renderSearch(data)


                        function renderSearch(data) {

                            var dateOb = data[i].dob
                            var viewDob = moment(dateOb).format('ll')



                            var div = $("<tr>");
                            div.append("<td>" + data[i].id + " " + "</td>")
                            div.append("<td>" + data[i].first_name+ "</td>")
                            div.append("<td>" + data[i].last_name + "</td>")
                            div.append("<td>" + viewDob + "</td>")

                            div.append('<button  data-id=' + data[i].id + ' class="activate"> Activate </button>')

                            $("#search-print").append(div)

                            $("#table-search").show()

                            $(".activate").on("click", function (event) {

                                var id = $(this).attr('data-id');


                                $.ajax({
                                    method: 'PUT',
                                    url: '/api/patients/' + id,
                                    data: {
                                        active: true
                                    }
                                }).then(result => {
                                    console.log(result)

                                    location.reload()
                                })


                            });
                        }
                    }
                }
            })

    });
}

function updateDoctorQue(){
    $.ajax({
        url: "api/posts",
        method: "GET"
    }).then(result => {
        console.log("this will load doctor wait")
        console.log(result)
        
        for (var i = 0; i < result.length; i++) {
            if (result[i].see_doctor === true) {
                
                console.log(result[i].patient)

                $.ajax({
                    url: "api/patients",
                    method: "GET"
                })
                .then(function (data) {
                    console.log(data)
                })

                // renderPatient(data)

                // function renderPatient(data) {
                   
                //     var waitList = $("<tr>");
                //     waitList.append("<td>" + data[i].id + " " + "</td>")
                //     waitList.append("<td>" + data[i].first_name + "</td>")
                //     waitList.append("<td>" + data[i].last_name + "</td>")
                //     waitList.append('<td> <a role= button href="/patientview/' + data[i].id + '"> See Patient </a> </td>')

                //     $("#doctor-que-print").append(waitList)

                // }
            }
        }
        

    })


}