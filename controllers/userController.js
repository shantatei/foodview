"use strict";
const UsersDB = require('../models/UsersDB');
const User = require('../models/User');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var secret = "somesecretkey";
const sgMail = require('@sendgrid/mail');
const req = require('express/lib/request');
const res = require('express/lib/response');
var nodemailer = require('nodemailer');

var transponder = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: 'botseng1@gmail.com',
        pass:'shantasen'
    }
})

function sendGmail(email,content){

    var mailoptions = {
        from :'teirenxuanshanta@gmail.com',
        to: email ,
        subject: 'Password reset link',
        text: content,
        html: '<strong>' + content + '</strong>'
    }

    transponder.sendMail(mailoptions,function(error,info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        
    })
    
}


var usersDB = new UsersDB();

function getAllUsers(request, respond) {
    usersDB.getAllUsers(function (error, result) {
        if (error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });

}

function addUser(request, respond) {
    var username = request.body.username
    var password = request.body.password
    var email = request.body.email
    var firstname = request.body.firstname
    var lastname = request.body.lastname
    var gender = request.body.gender
    var address = request.body.address
    var mobilenum = request.body.mobilenum


    password = bcrypt.hashSync(password, 10)
    usersDB.addUser(username, password, email, firstname, lastname, gender, address, mobilenum, function (error, result) {
        if (error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });

}

function updateUser(request, respond) {
    var email = request.body.email;
    var profilepic = request.body.profilepic;
    var mobilenum = request.body.mobilenum;
    var firstname = request.body.firstname
    var lastname = request.body.lastname
    var gender = request.body.gender
    var address = request.body.address

    var token = request.body.token;
    try {
        var decoded = jwt.verify(token, secret);
        usersDB.updateUser(decoded, email, profilepic, firstname, lastname, gender, address, mobilenum, function (error, result) {
            if (error) {
                respond.json(error);
            }
            else {
                respond.json(result);
            }
        });
    } catch (error) {
        respond.json({ result: "invalid token" });
    }

}

function deleteUser(request, respond) {
    //var userID = request.params.id;
    var token = request.body.token;
    try {
        var decoded = jwt.verify(token, secret);
        usersDB.deleteUser(decoded, function (error, result) {
            if (error) {
                respond.json(error);
            }
            else {
                respond.json(result);
            }
        });
    } catch (error) {
        respond.json({ result: "invalid token" });
    }

}

function LoginUser(request, respond) {
    var username = request.body.username;
    var password = request.body.password;
    usersDB.Login(username, function (error, result) {
        if (error) {
            respond.json(error);
        }
        else {
            if (result.length > 0) {
                // console.log(result[0].password);
                const hash = result[0].password;
                var flag = bcrypt.compareSync(password, hash);
                if (flag) {
                    var token = jwt.sign(username, secret);
                    respond.json({ result: token });
                } else {
                    respond.json({ result: "invalid" });
                }
            } else {
                respond.json({ result: "invalid" });
            }

        }
    });
}

function getUser(request, respond) {
    var token = request.body.token;
    try {
        var decoded = jwt.verify(token, secret);
        usersDB.getUser(decoded, function (error, result) {
            if (error) {
                respond.json(error);
            }
            else {
                respond.json(result);
            }
        });
    } catch (error) {
        respond.json({ result: "invalid token" });
    }
}

//check if user is in databse
function forgetPassword(request, respond) {
    var email = request.body.email;
    usersDB.forgetPassword(email, function (error, result) {
        if (error) {
            respond.json(error);
        }
        else {
            if (result.length > 0) {
                let emailSecret = secret + result[0].password;
                let userEmail = result[0].email;
                let userID = result[0]._id;
                let username = result[0].username;
                let token = jwt.sign({ email: userEmail, _id: userID, username: username }, emailSecret, { expiresIn: '15m' });
                let link = `http://127.0.0.1:8080/${result[0].username}/${token}`;
                let sent = sendGmail(userEmail, link);
                sent != false ? respond.json('success') : respond.json('failure')

            } else {
                respond.json('failure')
            }
        }
    });


}

function validation(req, res) {
    let username = req.body.username;
    let token = req.body.token;
    usersDB.Login(username, (error, result) => {
        if (error) {
            console.log(error);
            res.json('invalid username')
        }else {
            if (result.length > 0) {
                let secretKey = secret + result[0].password;
                try {
                    let decoded = jwt.verify(token, secretKey);
                    res.json('success')
                } catch (error) {
                    console.log(error.message);
                    res.json(error.message)
                    // res.json('invalid token');
                }
            }else {
                res.json('invalid username')
            }
        }
    })
}

//sending email
function sentMail(email, content) {
    sgMail.setApiKey("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")
    const msg = {
        to: email, // Change to your recipient
        from: '2101683G@student.tp.edu.sg', // Change to your verified sender
        subject: 'Password reset link',
        text: content,
        html: '<strong>' + content + '</strong>',
    }
    sgMail
        .send(msg)
        .catch(error => {
            console.log(error);
            return false;
        })
    
}

function updatePassword(request, respond) {
    
    var password = request.body.password
    var username = request.body.username
    password = bcrypt.hashSync(password, 10)
    usersDB.updatePassword(password,username,function (error, result) {
        if (error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });
        
}




module.exports = { getAllUsers, addUser, updateUser, deleteUser, LoginUser, getUser, forgetPassword, validation, updatePassword };