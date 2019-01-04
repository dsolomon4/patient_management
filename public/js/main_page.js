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

                        var firstNameArr = data[i].first_name.split("")
                        firstNameArr[0] = firstNameArr[0].toUpperCase()
                        var firstName = firstNameArr.join("")

                        var lastNameArr = data[i].last_name.split("")
                        lastNameArr[0] = lastNameArr[0].toUpperCase()
                        var lastName = lastNameArr.join("")


                        var waitList = $("<tr>");
                        waitList.append("<td>" + data[i].id + " " + "</td>")
                        waitList.append("<td>" + firstName + "</td>")
                        waitList.append("<td>" + lastName + "</td>")
                        waitList.append('<td> <a role= button href="/patientview/' + data[i].id + '"> See Patient </a> </td>')

                        $("#data-print").append(waitList)

                    }

                    totalWaitList()
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

                            var firstNameArr = data[i].first_name.split("")
                            firstNameArr[0] = firstNameArr[0].toUpperCase()
                            var firstName = firstNameArr.join("")

                            var lastNameArr = data[i].last_name.split("")
                            lastNameArr[0] = lastNameArr[0].toUpperCase()
                            var lastName = lastNameArr.join("")


                            var div = $("<tr>");
                            div.append("<td>" + data[i].id + " " + "</td>")
                            div.append("<td>" + firstName + "</td>")
                            div.append("<td>" + lastName + "</td>")
                            div.append("<td>" + viewDob + "</td>")

                            div.append('<button  data-id=' + data[i].id + ' class="activate"> Activate </button>')

                            $("#search-print").append(div)

                            $("#table-search").show()

                           
                        }
                    }
                    //  else {
                    //     $("#bounce-back").text("*** This patient does not exist ***")
                    // }
                }
            })

    });
}

function updateDoctorQue() {
    $.ajax({
        url: "api/posts",
        method: "GET"
    }).then(result => {
        console.log("this will load doctor wait")
        console.log(result)

        for (var i = 0; i < result.length; i++) {
            if (result[i].see_doctor === true) {

                console.log(result[i].patient_id)

                var docQuePatient = result[i].patient_id

                console.log("this is the post id..." + result[i].id)
                var updateId = result[i].id

                $.ajax("api/patient/" + docQuePatient, {
                        type: "GET"
                    })
                    .then(function (data) {
                        console.log("data for doc que get")
                        console.log(data.first_name)

                        printPatient(data)


                        function printPatient(data) {

                            console.log("see doctor")

                            var firstNameArr = data.first_name.split("")
                            firstNameArr[0] = firstNameArr[0].toUpperCase()
                            var firstName = firstNameArr.join("")

                            var lastNameArr = data.last_name.split("")
                            lastNameArr[0] = lastNameArr[0].toUpperCase()
                            var lastName = lastNameArr.join("")

                            var waitList = $("<tr>");
                            waitList.append("<td>" + data.id + " " + "</td>")
                            waitList.append("<td>" + firstName + "</td>")
                            waitList.append("<td>" + lastName + "</td>")
                            waitList.append('<td> <a role= button  class="patient-update" data-id=' + updateId +' href="/patientview/' + data.id + '"> See Patient </a> </td>')

                            $("#doctor-que-print").append(waitList)

                            changeStaus()
                        }

                        
                        totalWaitList()

                        console.log("data after push")
                        console.log(data)

                    })
            }
        }


    })


}


function totalWaitList() {

    var currentNurseWait = $('#data-print').children().length;
    console.log('tr count for nurse = ' + currentNurseWait);

    var currentDoctorWait = $('#doctor-que-print').children().length;
    console.log('tr count for doc= ' + currentDoctorWait);

    var combineWait = currentDoctorWait + currentNurseWait

    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: ["Nurse", "Doctor", "Total"],
            datasets: [{
                label: "Wait List",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [currentNurseWait, currentDoctorWait, combineWait,],
                
            }]
        },
        
        // Configuration options go here
        options: {}
    });

}

function changeStaus(){
    $(".patient-update").on("click", function (event) {
                                   

        var id = $(this).attr('data-id');
        
        $.ajax({
            method: 'PUT',
            url: '/api/posts/' + id,
            data: {
                see_doctor: false
            }
        }).then(result => {
            console.log(result)
   
        })
        


    });
}