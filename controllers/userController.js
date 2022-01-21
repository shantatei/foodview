"use strict";
const UsersDB = require('../models/UsersDB');
const User = require('../models/User');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var secret = "somesecretkey";

var usersDB = new UsersDB();

function getAllUsers (request, respond){
    usersDB.getAllUsers(function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });

}

function addUser(request, respond){
    var username = request.body.username
    var password = request.body.password
    var email = request.body.email
    var firstname = request.body.firstname
    var lastname = request.body.lastname
    var gender = request.body.gender
    var address = request.body.address
    var mobilenum = request.body.mobilenum


    password = bcrypt.hashSync(password,10)
    usersDB.addUser(username,password,email, firstname, lastname, gender, address, mobilenum, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });

}

function updateUser(request, respond){
    var email = request.body.email;
    var profilepic = request.body.profilepic;
    var mobilenum = request.body.mobilenum;
    var firstname = request.body.firstname
    var lastname = request.body.lastname
    var gender = request.body.gender
    var address = request.body.address

    var token = request.body.token;
    try {
        var decoded = jwt.verify(token,secret);
        usersDB.updateUser(decoded,email,profilepic,firstname,lastname,gender,address,mobilenum, function(error,result){
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

function deleteUser(request, respond){
    //var userID = request.params.id;
    var token = request.body.token;
    try {
        var decoded = jwt.verify(token,secret);
        usersDB.deleteUser(decoded, function(error,result){
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
    
    // usersDB.deleteUser(userID, function(error,result){
    //     if(error){
    //         respond.json(error);
    //     }
    //     else{
    //         respond.json(result);
    //     }
    // });
}

function LoginUser(request, respond){
    var username = request.body.username;
    var password = request.body.password;
    usersDB.Login(username, function(error,result){
        if(error){
            respond.json(error);
        }
        else{
           // console.log(result[0].password);
            const hash = result[0].password;
            var flag = bcrypt.compareSync(password,hash);
            if (flag) {
                var token = jwt.sign(username,secret);
                respond.json({result:token});
            } else {
                respond.json({result:"invalid"});   
            }
            
        }
    });
}

function getUser(request, respond){
    var token = request.body.token;
    try {
        var decoded = jwt.verify(token,secret);
        usersDB.getUser(decoded, function(error,result){
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


module.exports = {getAllUsers,addUser,updateUser,deleteUser,LoginUser,getUser};