"use strict";
const CommentsDB = require('../models/CommentsDB');
const Comment = require('../models/Comment')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var secret = "somesecretkey";

var commentsDB = new CommentsDB();

function getAllComments (request, respond){
    commentsDB.getAllComments(function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });

}



function addComment(request, respond){
    var now = new Date();
    var comment = new Comment(null, request.body.restaurantId, request.body.restaurant, request.body.userId,
        request.body.username, request.body.review, request.body.rating, now.toString());
    commentsDB.addComment(comment, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });

}

function updateComment(request, respond){
    var now = new Date();
    var review = request.body.review;
    var rating = request.body.rating;
    var token = request.body.token;
    var commentID = request.params.id;
    // var comment = new Comment(parseInt(request.params.id),request.body.restaurantId, request.body.restaurant, request.body.userId,
    // request.body.username, request.body.review, request.body.rating, now.toString());
    try {
        var decoded = jwt.verify(token,secret);
        commentsDB.updateComment(review, rating, now.toString(), commentID, decoded, function(error,result){
            if(error){
                respond.json(error);
            }
            else{
                respond.json(result);
            }
        });
    } catch (error) {
        respond.json({result:"invalid token"});
    }

    // commentsDB.updateComment(comment, function(error,result){
    //     if(error){
    //         respond.json(error);
    //     }
    //     else{
    //         respond.json(result);
    //     }
    // });
}

function deleteComment(request, respond){
    var commentID = request.params.id;

    try {
        var decoded = jwt.verify(request.body.token,secret);
        commentsDB.deleteComment(commentID,decoded, function(error,result){
            if(error){
                respond.json(error);
            }
            else{
                respond.json(result);
            }
        });
    } catch (error) {
        respond.json({result:"invalid token"});
    }
   
}

function getSomeComments (request, respond){
    var restaurantID = request.params.restaurantId;
    commentsDB.getSomeComments(restaurantID,function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}

function getUserComments (request, respond){
    var token = request.body.token;
    try {
        var decoded = jwt.verify(token,secret);
        commentsDB.getUserComments(decoded, function(error,result){
            if(error){
                respond.json(error);
            }
            else{
                respond.json(result);
            }
        });
    } catch (error) {
        respond.json({result:"invalid token"});
    }
   
}

module.exports = {getAllComments,addComment,updateComment,deleteComment,getSomeComments,getUserComments};