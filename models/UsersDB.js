"use strict";

var db = require('../db-connections');
class UsersDB{
    getAllUsers(callback){
        var sql = "SELECT * from restaurant_review.users";
        db.query(sql, callback);
    }

    getUser(username,callback){
        var sql = "SELECT distinct username,email,profilepic,firstname,lastname,gender,address,mobilenum from restaurant_review.users where username = ?";
        db.query(sql,[username], callback);
    }

    addUser(username,password,email,firstname,lastname,gender,address,mobilenum, callback){
        var sql = "INSERT INTO users(username, password, email, firstname, lastname, gender, address, mobilenum) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
        db.query(sql,[username,password,email,firstname,lastname,gender,address,mobilenum], callback);
    }

    updateUser(username,email,profilepic,firstname,lastname,gender,address,mobilenum,callback){
        var sql = "UPDATE users SET email =  ?, profilepic = ?, firstname = ?, lastname = ?, gender = ?, address = ?, mobilenum = ? WHERE username = ?";
        return db.query(sql,[email,profilepic,firstname,lastname,gender,address,mobilenum,username], callback);
    }

    deleteUser(username, callback){
        var sql = "DELETE from users WHERE username = ?";
        return db.query(sql, [username], callback);
    }

    Login(username,callback){
        var sql = "SELECT password FROM restaurant_review.users where username = ?"
        return db.query(sql,[username],callback)
    }

    forgetPassword(email,callback){
        var sql = "SELECT * from restaurant_review.users where email = ?"
        return db.query(sql,[email],callback)
    }



}

module.exports = UsersDB;