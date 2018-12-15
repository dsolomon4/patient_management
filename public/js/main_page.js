$(document).ready(function () {

    // var patientContainer = $(".patient-con)

    $(document).on("click", "button.edit", handlePostEdit);


    var posts;

    var url = window.location.href = "/public/patient_view.html"
    var patientId;
    if (url.indexOf("?patient_id=") !== -1) {
        patientId = url.split("=")[1];
        getPosts(patientId);
    }
    // If there's no authorId we just get all posts as usual
    else {
        getPosts();
    }

    // This function grabs posts from the database and updates the view
    function getPosts(Patient) {
        patientId = patient || "";
        if (patientId) {
            patientId = "/?patient_id=" + patientId;
        }
        $.get("/api/posts" + patientId, function (data) {
            console.log("Posts", data);
            posts = data;
            if (!posts || !posts.length) {
                displayEmpty(patient);
            }
            else {
                initializeRows();
            }
        });
    }

    function initializeRows() {
        blogContainer.empty();
        var postsToAdd = [];
        for (var i = 0; i < posts.length; i++) {
          postsToAdd.push(createNewRow(posts[i]));
        }
        blogContainer.append(postsToAdd);
      }


    //************************************************* */

    // $.ajax({ url: "api/patients", method: "GET", })
    // .then(function(data){
    //     console.log(data)


    //     for (var i = 0; i< data.length; i++){
    //         if (data[i].active === "active"){
    //             console.log(data[i].first_name)
    //             $("#data-print").text(data[i].first_name)
    //         }

    //     }
    // })







    //  $(".patient-search").hide();

    //  $("#submit-search").on("click", function (event) {
    //      event.preventDefault();


    //      var searchPatient = {
    //          first_name: $("#firstName").val(),
    //          last_name: $("#lastName").val(),

    //      };

    //      $("#new-patient-form").hide();

    //      console.log(searchPatient.first_name + " has been searched")


    //      var currentURL = window.location.origin;

    //      $.get(currentURL + "/api/patients", searchPatient, function (data) {


    //          console.log(data.first_name)
    //          document.getElementById("patient-added").innerText = data.first_name + " " + data.last_name + " has succesfully be added";
    //          $("#return-home").show();

    //      });



    //  });






})