"use strict";

const { use } = require('bcrypt/promises');
var db = require('../db-connections');
class CommentsDB{
    getAllComments(callback){
        var sql = "SELECT * from restaurant_review.review";
        db.query(sql, callback);
    }

    getUserComments(username, callback){
        var sql = "SELECT * from restaurant_review.review WHERE username = ?";
        db.query(sql,[username], callback);
    }

    addComment(comment, callback){
        var sql = "INSERT INTO review(restaurantId, restaurant, userId, username, review, rating, dateposted) VALUES(?, ?, ?, ?, ?, ?, ?)";
        db.query(sql,[comment.getRestaurantId(), comment.getRestaurant(), comment.getUserId(), comment.getUsername(), comment.getReview(),
        comment.getRating(), comment.getDatePosted()], callback);
    }

    updateComment(review,rating,dateposted,commentID,username, callback){
        var sql = "UPDATE restaurant_review.review SET review = ?, rating = ?, dateposted =  ? WHERE _id = ? AND username = ?";
        return db.query(sql,[review, rating, dateposted, commentID, username], callback);
    }

    deleteComment(commentID,decoded, callback){
        var sql = "DELETE from review WHERE _id = ? AND username = ?";
        return db.query(sql, [commentID,decoded], callback);
    }

    getSomeComments(restaurantID,callback){
        var sql = "SELECT * from restaurant_review.review WHERE restaurantId = ?";
        return db.query(sql,[restaurantID],callback);
    }
}

module.exports = CommentsDB;