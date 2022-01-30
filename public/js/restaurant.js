//This function is to call the restaurant api and get all the restaurants



// const e = require("express");

//that is showing in Shaw Theatres for Showing Now and Coming Soon
function getRestaurantData() {
    var request = new XMLHttpRequest();
    request.open('GET', restaurant_url, true);
    //This function will be called when data returns from the web api    
    request.onload = function () {
        //get all the movies records into our movie array        
        restaurant_array = JSON.parse(request.responseText);
        sessionStorage.setItem("restaurant", JSON.stringify(restaurant_array));
        //Fetch the comments as well        
        fetchComments();
        getfav();
        console.log(restaurant_array) // output to console        
        //call the function so as to display all movies tiles for "Now Showing"        	
        // displayRestaurants(category);
    };

    //This command starts the calling of the movies web api    
    request.send();
}

function displayRestaurants(category, restaurantArray) {

    // let listOfRestaurants = JSON.parse(sessionStorage.getItem('restaurant'))
    if (restaurantArray) {

        listOfRestaurants = restaurantArray
    }else{
        listOfRestaurants = restaurant_array
    }
    var table = document.getElementById("restaurantsTable");
    var restaurantCount = 0;

    table.innerHTML = "";
    totalRestaurants = listOfRestaurants.length;
    for (var count = 0; count < totalRestaurants; count++) {
        if (sessionStorage.getItem('token')) {
            {
                var thumb = listOfRestaurants[count].picture;
                var name = listOfRestaurants[count].name;
                var cell = '<div class="card border-secondary m-2 rounded-0 " style="width:250px;height:310px"> <img class="card-img-top" src="' + thumb + '" id = "thumb" width="250px" height = "250px"alt="Card image cap">\
                            <div class="card-body d-flex" item = ' + count + '><Button class = "btn favbtn" title = "Add to Favourites"onclick = "toggleLike(this)" item="' + count + '"><i class=" far fa-heart fa-lg" item="' + count + '" ></i></Button>\
                            <h6 style="padding-left:10px;cursor:pointer;height: 25px;line-height: 25px;"   class="card-title " item="' + count + '" onClick="gotorestaurant(this)">' + name + '</h6></div>\
    </div>'
                table.insertAdjacentHTML('beforeend', cell);
                restaurantCount++;
            }

            let favlist = JSON.parse(sessionStorage.getItem('favlist'))
            if (typeof favlist == typeof []) {
                favlist.forEach(fav => {
                    if (fav.restaurantId == listOfRestaurants[count]._id) {
                        document.querySelector(`.card-body[item="${count}"] .btn i`).classList.remove('far')
                        document.querySelector(`.card-body[item="${count}"] .btn i`).classList.add('fas')
                        document.querySelector(`.card-body[item="${count}"] .btn`).title = "Delete from favourites"
                    }
                })
            }
        } else {
            {
                var thumb = listOfRestaurants[count].picture;
                var name = listOfRestaurants[count].name;
                var cell = '<div class="card border-secondary m-2 rounded-0 " style="width:250px;height:310px"> <img class="card-img-top" src="' + thumb + '" id = "thumb" width="250px" height = "250px"alt="Card image cap">\
                            <div class="card-body d-flex" item = ' + count + '>\
                            <h6 style="padding-left:10px;cursor:pointer;height: 25px;line-height: 25px;"   class="card-title " item="' + count + '" onClick="gotorestaurant(this)">' + name + '</h6></div>\
    </div>'
                table.insertAdjacentHTML('beforeend', cell);
                restaurantCount++;
            }
        }

    }

}



function gotorestaurant(element) {
    window.location.href = "restaurant.html"
    var item = element.getAttribute("item");
    console.log(item);
    sessionStorage.setItem("item", item);
}




//This function is to display the individual movies details
//whenever the user clicks on "See More"
function showRestaurantDetails(element) {
    var item = element.getAttribute("item");
    currentIndex = item;
    document.getElementById("movieTitle").textContent = restaurant_array[item].name;
    document.getElementById("moviePoster").src = restaurant_array[item].picture;
    document.getElementById("genre").textContent = restaurant_array[item].type;
    document.getElementById("director").textContent = restaurant_array[item].amenities;
    document.getElementById("cast").textContent = restaurant_array[item].location_name;
    document.getElementById("release").textContent = restaurant_array[item].availability;
    document.getElementById("story").textContent = restaurant_array[item].about;
}

function SearchRestaurant() {

    const searchInput = document.getElementById('searchbar')


    searchInput.addEventListener("input", (e) => {

        // declare and assign the value of the event's target to a variable AKA whatever is typed in the search bar
        let value = e.target.value.toLowerCase()

        console.log(value);

        if (value) {

            let filteredRestaurants = []

            for (let index = 0; index < restaurant_array.length; index++) {

                let restaurant_name = restaurant_array[index].name.toLowerCase()

                if (restaurant_name.indexOf(value) != -1) {

                    filteredRestaurants.push(restaurant_array[index])

                }

            }

            displayRestaurants(null, filteredRestaurants)
            sessionStorage.setItem("restaurant", JSON.stringify(filteredRestaurants));


        } else {

            displayRestaurants()


        }

    }

    )

}

function fetchComments() {
    var request = new XMLHttpRequest();

    request.open('GET', comment_url, true);

    //This command starts the calling of the comments api
    request.onload = function () {
        //get all the comments records into our comments array
        comment_array = JSON.parse(request.responseText);
        sessionStorage.setItem("comments", JSON.stringify(comment_array));
        console.log(comment_array);
    };

    request.send();
}

function filterMe(event) {

    let filteredrestaurants = []
    let element = event.target
    let type = element.getAttribute('value');
    let label = document.querySelector(`label[for="${element.id}"]`)
    console.log(type);

    document.querySelectorAll(`input[value]:not(input[value="${type}"])`).forEach(filter => {
        filter.checked = false;
        document.querySelector(`label[for="${filter.id}"]`).classList.add('btn-secondary')
        document.querySelector(`label[for="${filter.id}"]`).classList.remove('btn-primary')
    });

    if (element.checked) {
        label.classList.remove('btn-secondary')
        label.classList.add('btn-primary')
        for (let index = 0; index < restaurant_array.length; index++) {
            if (restaurant_array[index].type == type) {

                filteredrestaurants.push(restaurant_array[index])

            }

        }
        displayRestaurants(null, filteredrestaurants)
        sessionStorage.setItem("restaurant", JSON.stringify(filteredrestaurants));
    } else {
        label.classList.add('btn-secondary')
        label.classList.remove('btn-primary')
        displayRestaurants(null, restaurant_array)
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
            displayRestaurants(category);
        }
    }
    getfav.send()
}
// far == empty heart
function toggleLike(element) {
    var item = element.getAttribute("item");
    let username = JSON.parse(sessionStorage.getItem('profile'))[0].username
    favbtn = element.querySelector('i')
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
                // favbtn.classList.add('fas')
                // favbtn.classList.remove('far')
                getfav()

            } else {
                console.log(results.code);
            }

        }
        addfavourites.send(JSON.stringify({ restaurantid }))
    }



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





