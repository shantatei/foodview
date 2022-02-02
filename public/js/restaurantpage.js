$(document).ready(function () {
    var restaurant_array = JSON.parse(sessionStorage.getItem("restaurant"));
    var item = sessionStorage.getItem("item");
    console.log(item);
    currentIndex = item;
    var comment_array = JSON.parse(sessionStorage.getItem('comments'));
    let favlist = JSON.parse(sessionStorage.getItem('favlist'))
    for (var i = 0; i < comment_array.length; i++) {
        if (comment_array[i].restaurantId === restaurant_array[item]._id) {


            document.getElementById("emptyComment").innerHTML = "";
            star = "";
            var html = '<div class="text-center" style="width:100%;">                                                           \
                               <div class="card border-0" username = "'+ comment_array[i].username + '">                             \
                                   <div class="card-body ">                                                                         \ \
                                   <h6 style = "text-transform: capitalize; ">' + comment_array[i].username + '</h6>   \
                                   <p class="card-text" id="rating' + i + '">' + comment_array[i].review + "</p>               \
                                   <small>  @ " + comment_array[i].dateposted + "</small>   \
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
            document.getElementById("rating" + i).insertAdjacentHTML('afterend', star + "<br/>");
        }
        for (let index = 0; index < favlist.length; index++) {
            if (favlist[index].restaurantId == restaurant_array[item]._id) {
                console.log("yes");
                document.querySelector(`.favbtn i`).classList.remove('far')
                document.querySelector(`.favbtn i`).classList.add('fas')
                document.querySelector(`.favbtn i`).title = "Delete from favourites"
            } else {
                console.log("not favourited");
            }


        }


    }
    document.getElementById("restaurantTitle").textContent = restaurant_array[item].name;
    document.getElementById("restaurantPic").src = restaurant_array[item].picture;
    document.getElementById("type").textContent = restaurant_array[item].type;
    document.getElementById("location").textContent = restaurant_array[item].location_name;
    document.getElementById("monday").textContent = "Monday :" + restaurant_array[item].monday;
    document.getElementById("tuesday").textContent = "Tuesday :" + restaurant_array[item].tuesday;
    document.getElementById("wednesday").textContent = "Wednesday :" + restaurant_array[item].wednesday;
    document.getElementById("thursday").textContent = "Thursday :" + restaurant_array[item].thursday;
    document.getElementById("friday").textContent = "Friday:" + restaurant_array[item].friday;
    document.getElementById("description").textContent = restaurant_array[item].about;
    var locations = [restaurant_array[item].location_name, restaurant_array[item].location_longitude, restaurant_array[item].location_latitude]
    console.log(locations);
    map = new google.maps.Map(document.getElementById("map"), { center: { lat: 1.8, lng: 110.9 }, zoom: 4 })
    var infowindow = new google.maps.InfoWindow();
    var marker, i;
    var markers = []
    restaurantmarker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[1], locations[2]),
        map: map,
        icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/restaurant.png"
        }
    });

    markers.push(restaurantmarker);
    google.maps.event.addListener(restaurantmarker, 'click', (function (marker, i) {
        return function () {
            infowindow.setContent(restaurant_array[item].name)
            infowindow.open(map,marker);
        }
    })(marker, i))

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            map.setCenter(pos);
            map.setZoom(15);
            usermarker = new google.maps.Marker({
                position: new google.maps.LatLng(pos.lat, pos.lng),
                map: map,
                icon: {
                    url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                }
            })

            markers.push(usermarker);
            google.maps.event.addListener(usermarker, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent("Your Current Location")
                    infowindow.open(map,marker);
                }
            })(marker, i))
        }
    )
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
        eraseComment.send(JSON.stringify({ token: sessionStorage.getItem('token') }));
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
        sessionStorage.setItem("comments", JSON.stringify(comment_array));
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
    postComment.onload = function () {
        console.log("new comment sent");
        fetchComments(); // fetch all comments again so that the web page can have updated comments.     
    };
    // Convert the data in Comment object to JSON format before sending to the server.
    postComment.send(JSON.stringify(comment));
}

function toggleLike(element) {
    var item = sessionStorage.getItem('item')
    let username = JSON.parse(sessionStorage.getItem('profile'))[0].username
    favbtn = element.querySelector('i')
    var restaurant_array = JSON.parse(sessionStorage.getItem("restaurant"));

    if (favbtn.classList.contains('fas')) {
        //delete
        getfav(username, restaurant_array[item]._id)
        favbtn.classList.remove('fas')
        favbtn.classList.add('far')
        favbtn.title = "Add to Favourites"
    } else {
        //add
        var addfavourites = new XMLHttpRequest();
        var token = sessionStorage.getItem('token')
        addfavourites.open('POST', `/favourites/${token}`, true)
        addfavourites.setRequestHeader('Content-Type', 'application/json')
        var restaurantid = restaurant_array[item]._id
        addfavourites.onload = function () {
            let results = JSON.parse(addfavourites.responseText)
            if (results.affectedRows == 1) {
                favbtn.classList.add('fas')
                favbtn.classList.remove('far')
                favbtn.title = "Delete from Favourites"
                getfav()

            } else {
                console.log(results.code);
            }

        }
        addfavourites.send(JSON.stringify({ restaurantid }))
    }

}

function getfav(username, restaurantid) {

    var getfav = new XMLHttpRequest();
    var token = sessionStorage.getItem('token')
    getfav.open('GET', `/favourites/${token}`, true)
    getfav.onload = function () {
        if (username && restaurantid) {
            let results = JSON.parse(getfav.responseText)
            results.forEach(favs => {
                if (favs.username == username && restaurantid == favs.restaurantId) {
                    let deleteFav = new XMLHttpRequest();
                    deleteFav.open("DELETE", `/favourites/${favs._id}`, true)
                    deleteFav.onload = function () {
                        if (JSON.parse(deleteFav.responseText).affectedRows != 1) {
                            console.log(JSON.parse(deleteFav.responseText).code);
                        }
                    }
                    deleteFav.send()
                }
            })
        } else {
            sessionStorage.setItem('favlist', getfav.responseText)
        }
    }
    getfav.send()
}

function onclickFav() {
    console.log("clicked");
    let favRestaurants = [];
    let favs = JSON.parse(sessionStorage.getItem('favlist'));
    JSON.parse(sessionStorage.getItem('restaurant')).forEach(restaurant => {
        favs.forEach(fav => {
            if (restaurant._id == fav.restaurantId) {
                favRestaurants.push(restaurant);
            }
        })
    })
    displayRestaurants(null, favRestaurants)
    sessionStorage.setItem("restaurant", JSON.stringify(favRestaurants));
}  