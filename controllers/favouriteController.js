"use strict";
const FavouritesDB = require('../models/FavouritesDB');
const Favourites = require('../models/Favourites')
var secret = "somesecretkey";
var jwt = require('jsonwebtoken');

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
    var token = request.params.token;
    try {

        let username = jwt.verify(token,secret)
        favouritesDB.getSomeFavourites(username,function(error, result){
            if(error){
                respond.json(error);
            }
            else{
                respond.json(result);
            }
        });
        
    } catch (error) {
        respond.json("invalid token")
        
    }
  
}

function addFavourites(request, respond){
    var token = request.params.token;
    var restaurantid = request.body.restaurantid
    try {
        let username = jwt.verify(token,secret)
        favouritesDB.addFavourites(restaurantid,username, function(error, result){
            if(error){
                respond.json(error);
            }
            else{
                respond.json(result);
            }
        });
        
    } catch (error) {
        respond.json("invalid token")
        
    }

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