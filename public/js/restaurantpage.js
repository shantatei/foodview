$(document).ready(function () {
    var restaurant_array = JSON.parse(sessionStorage.getItem("restaurant"));
    var item = sessionStorage.getItem("item");
    currentIndex = item;
    var comment_array = JSON.parse(sessionStorage.getItem('comments'));
    for (var i = 0; i < comment_array.length; i++) {
        if (comment_array[i].restaurantId === restaurant_array[item]._id) {


            document.getElementById("emptyComment").innerHTML = "";
            star = "";
            var html = '<div class="text-center" style="width:100%;">                                                           \
                               <div class="card border-0" username = "'+comment_array[i].username+'">                                                                                  \
                                   <div class="card-body ">                                                                         \
                                       <p class="card-text" id="rating' + i + '">' + comment_array[i].review + "</p>               \
                                       <small>by " + comment_array[i].username + " @ " + comment_array[i].dateposted + "</small>   \
                                   </div>                                                                                          \
                               </div>                                                                                              \
                           </div>";
            document.getElementById("commentBody").insertAdjacentHTML('beforeend', html);

            var star = "";
            for (var j = 0; j < comment_array[i].rating; j++) {
                star += "<img src='images/burger.png' style='width:30px' />";

            }
            star += "<i class='d-none far fa-trash-alt fa-2x edit deletecomment' data-dismiss='modal' item='" + i + "' onClick='deleteComment(this)' ></i>";
            star += "<i class='d-none far fa-edit fa-2x edit editcomment' data-toggle='modal' data-target='#editCommentModal' item='" + i + "' onClick='editComment(this)' ></i>";
            document.getElementById("rating" + i).insertAdjacentHTML('beforebegin', star + "<br/>");
        }


    }
    document.getElementById("restaurantTitle").textContent = restaurant_array[item].name;
    document.getElementById("restaurantPic").src = restaurant_array[item].picture;
    document.getElementById("type").textContent = restaurant_array[item].type;
    document.getElementById("location").textContent = restaurant_array[item].location_name;
    document.getElementById("Availability").textContent = restaurant_array[item].availability;
    document.getElementById("description").textContent = restaurant_array[item].about;


})

function editComment(element) {
    var item = element.getAttribute("item");
    currentIndex = item;
    var comment_array = JSON.parse(sessionStorage.getItem('comments'));

    document.getElementById("editnickname").value = comment_array[item].username;
    document.getElementById("edituserComments").value = comment_array[item].review;
    console.log(comment_array[item].rating);
    displayColorPopcorn('editpop', comment_array[item].rating);
}

function displayColorPopcorn(classname, num) {
    var pop = document.getElementsByClassName(classname);
    var classTarget = "." + classname;
    for (let p of pop) {
        p.setAttribute("src", popcornBWImage);
    }
    changePopcornImage(num, classTarget);
}


function updateComment() {


    var comment_array = JSON.parse(sessionStorage.getItem('comments'));
    var response = confirm("Are you sure you want to update this comment?");
    if (response == true) {
        
        var edit_comment_url = comment_url + "/" + comment_array[currentIndex]._id;
        var updateComment = new XMLHttpRequest(); // new HttpRequest instance to send request to server
        updateComment.open("PUT", edit_comment_url, true); //The HTTP method called 'PUT' is used here as we are updating data
        updateComment.setRequestHeader("Content-Type", "application/json");
        comment_array[currentIndex].username = document.getElementById("editnickname").value;
        comment_array[currentIndex].review = document.getElementById("edituserComments").value;
        comment_array[currentIndex].rating = rating;
        updateComment.onload = function () {
            fetchComments();
        };
        updateComment.send(JSON.stringify({
            review: document.getElementById('edituserComments').value,
            rating: rating,
            token: sessionStorage.getItem('token')
        }));
    }

}

//This function deletes the selected comment in a specific movie
function deleteComment(element) {
    var comment_array = JSON.parse(sessionStorage.getItem('comments'));
    var response = confirm("Are you sure you want to delete this comment?");

    if (response == true) {
        var item = element.getAttribute("item"); //get the current item
        var delete_comment_url = comment_url + "/" + comment_array[item]._id;
        var eraseComment = new XMLHttpRequest();
        eraseComment.open("DELETE", delete_comment_url, true);
        eraseComment.setRequestHeader('Content-Type', 'application/json')
        eraseComment.onload = function () {
            fetchComments();
        };
        eraseComment.send(JSON.stringify({token:sessionStorage.getItem('token')}));
    }
}

function changePopcornImage(num, classTarget) {
    switch (eval(num)) {
        case 1:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            rating = 1;
            break;
        case 2:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", popcornImage);
            rating = 2;
            break;
        case 3:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", popcornImage);
            rating = 3;
            break;
        case 4:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", popcornImage);
            rating = 4;
            break;
        case 5:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='5']").setAttribute("src", popcornImage);
            rating = 5;
            break;
    }
}

function rateIt(element) {
    var num = element.getAttribute("value");
    var classname = element.getAttribute("class");
    var popcorns = document.getElementsByClassName(classname);
    var classTarget = "." + classname;

    // This is another way of writing 'for' loop, which initialises the 
    // popcorn images to use black and white.
    for (let popcorn of popcorns) {
        popcorn.setAttribute("src", popcornBWImage);
    }
    changePopcornImage(num, classTarget);
}
function newComment() {
    var profile = JSON.parse(sessionStorage.getItem("profile"));
    username = profile[0].username; 
    rating = 0;
    document.getElementById("userComments").value = "";
    document.getElementById("nickname").value = username;
}

function fetchComments() {
    var request = new XMLHttpRequest();

    request.open('GET', comment_url, true);

    //This command starts the calling of the comments api
    request.onload = function () {
    //get all the comments records into our comments array
    comment_array = JSON.parse(request.responseText);
    sessionStorage.setItem("comments",JSON.stringify(comment_array));
    document.location.reload(true)
    };

    request.send();
}

function addComment() {
    var restaurant_array = JSON.parse(sessionStorage.getItem("restaurant"));
    var comment = new Object();
    var item = sessionStorage.getItem("item")
    comment.restaurantId = restaurant_array[item]._id; 
    comment.restaurant = restaurant_array[item].name; 
    comment.username = document.getElementById("nickname").value;// Value from HTML input text
    comment.review = document.getElementById("userComments").value; // Value from HTML input text
    comment.datePosted = null; // Change the datePosted to null instead of taking the timestamp on the client side;
    comment.rating = rating;

    var postComment = new XMLHttpRequest(); // new HttpRequest instance to send comment

    postComment.open("POST", comment_url, true); //Use the HTTP POST method to send data to server

    postComment.setRequestHeader("Content-Type", "application/json");
    postComment.onload = function() {
        	console.log("new comment sent");
	fetchComments(); // fetch all comments again so that the web page can have updated comments.     
    };
// Convert the data in Comment object to JSON format before sending to the server.
    postComment.send(JSON.stringify(comment)); 
}

