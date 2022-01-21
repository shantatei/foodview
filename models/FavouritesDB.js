"use strict";

var db = require('../db-connections');
class FavouritesDB{
    getAllFavourites(callback){
        var sql = "SELECT * from restaurant_review.favourites";
        db.query(sql, callback);
    }


    getSomeFavourites(userID,callback){
        var sql = "SELECT * from restaurant_review.favourites WHERE userId = ?";
        return db.query(sql,[userID],callback);
    }

    addFavourites(favourites, callback){
        var sql = "INSERT INTO favourites(restaurantId, restaurant, userId, username) VALUES(?, ?, ?, ?)";
        db.query(sql,[favourites.getRestaurantId(), favourites.getRestaurant(), favourites.getUserId(), favourites.getUsername()], callback);
    }

    deleteFavourites(favouritesID, callback){
        var sql = "DELETE from favourites WHERE _id = ?";
        return db.query(sql, [favouritesID], callback);
    }
}


module.exports = FavouritesDB