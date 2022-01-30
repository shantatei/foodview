"use strict";

var db = require('../db-connections');
class FavouritesDB{
    getAllFavourites(callback){
        var sql = "SELECT * from restaurant_review.favourites";
        db.query(sql, callback);
    }

    getSomeFavourites(username,callback){
        var sql = "SELECT * from restaurant_review.favourites WHERE username = ?";
        return db.query(sql,[username],callback);
    }

    addFavourites(restaurantid,username, callback){
        var sql = "INSERT INTO favourites(restaurantId,username) VALUES(?, ?)";
        db.query(sql,[restaurantid,username], callback);
    }

    deleteFavourites(favouritesID, callback){
        var sql = "DELETE from favourites WHERE _id = ?";
        return db.query(sql, [favouritesID], callback);
    }
}


module.exports = FavouritesDB