//This function is to call the restaurant api and get all the restaurants

const e = require("express");

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
        console.log(restaurant_array) // output to console        
        //call the function so as to display all movies tiles for "Now Showing"        	
        displayRestaurants(category);
    };

    //This command starts the calling of the movies web api    
    request.send();
}

function displayRestaurants(category, restaurantArray) {
    let listOfRestaurants = restaurant_array
    if (restaurantArray) {

        listOfRestaurants = restaurantArray
    }
    var table = document.getElementById("restaurantsTable");
    var restaurantCount = 0;

    table.innerHTML = "";
    totalRestaurants = listOfRestaurants.length;
    for (var count = 0; count < totalRestaurants; count++) {
        {
            var thumb = listOfRestaurants[count].picture;
            var name = listOfRestaurants[count].name;
            var cell = '<div class="card border-secondary m-2 rounded-0 " style="width:250px;height:310px"> <img class="card-img-top" src="' + thumb + '" id = "thumb" width="250px" height = "250px"alt="Card image cap">\
                        <div class="card-body" item = ' + count + '>\
                        <h5 style="padding-left:30px;cursor:pointer;height: 25px;line-height: 25px;"   class="card-title" item="' + count + '" onClick="gotorestaurant(this)">' + name + '</h5></div>\
</div>'
            table.insertAdjacentHTML('beforeend', cell);
            restaurantCount++;
        }
    }

}

{/* <i class="far fa-comment fa-lg" style="float:left;cursor:pointer;height: 25px;line-height: 25px;position: absolute;" data-toggle="modal" data-target="#commentModal" item="' + count + '" onClick="showMovieComments(this)"></i> */ }

// data-toggle="modal"data-target="#movieModal"
// onClick="showRestaurantDetails(this)"


function gotorestaurant(element) {
    window.location.href = "restaurant.html"
    var item = element.getAttribute("item");
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
        document.querySelector(`label[for="${filter.id}"]`).classList.add('btn-primary')
        document.querySelector(`label[for="${filter.id}"]`).classList.remove('btn-secondary')
    });

    if (element.checked) {
        label.classList.remove('btn-primary')
        label.classList.add('btn-secondary')
        for (let index = 0; index < restaurant_array.length; index++) {
            if (restaurant_array[index].type == type) {

                filteredrestaurants.push(restaurant_array[index])

            }

        }
        displayRestaurants(null, filteredrestaurants)
    } else {
        label.classList.add('btn-primary')
        label.classList.remove('btn-secondary')
        displayRestaurants(null, restaurant_array)
    }

    

}




