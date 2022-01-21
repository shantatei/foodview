"use strict";
const RestaurantDB = require('../models/RestaurantDB');

var restaurantDB = new RestaurantDB();

function getAllRestaurants (request, respond){
    restaurantDB. getAllRestaurants(function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });

}

module.exports = {getAllRestaurants};