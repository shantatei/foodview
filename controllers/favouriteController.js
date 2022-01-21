"use strict";
const FavouritesDB = require('../models/FavouritesDB');
const Favourites = require('../models/Favourites')

var favouritesDB = new FavouritesDB();

function getAllFavourites(request, respond){
    favouritesDB.getAllFavourites(function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });

}

function getSomeFavourites (request, respond){
    var userID = request.params.userId;
    favouritesDB.getSomeFavourites(userID,function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });

}

function addFavourites(request, respond){
    var favourites = new Favourites(null, request.body.restaurantId, request.body.restaurant, request.body.userId,
        request.body.username);
    favouritesDB.addFavourites(favourites, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });

}


function deleteFavourites(request, respond){
    var favouritesID = request.params.id;
    favouritesDB.deleteFavourites(favouritesID, function(error,result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}

module.exports = {getAllFavourites,getSomeFavourites,addFavourites,deleteFavourites}