$(document).ready(function(){

    var getProfile = new XMLHttpRequest();


    getProfile.open("POST","/member",true);
    getProfile.setRequestHeader("Content-Type","application/json");
    getProfile.onload = function(){
        var profile = JSON.parse(getProfile.responseText);
        console.log(getProfile.responseText);
        profilepic = profile[0].profilepic;
        email = profile[0].email;
        mobilenum = profile[0].mobilenum;
        username = profile[0].username;
        firstname = profile[0].firstname;
        lastname = profile[0].lastname;
        address = profile[0].address;
        gender = profile[0].gender;

        document.getElementById('username').value=username;
        document.getElementById('email').value=email;
        document.getElementById('telephone').value=mobilenum;
        document.getElementById('firstname').value = firstname;
        document.getElementById('lastname').value = lastname;
        document.getElementById('address').value = address;
        document.querySelector('#form').gender.value = gender;

        if (profilepic == null) {
            document.getElementById("target").src = "images/user.png"
            document.getElementById("target2").src = "images/user.png"
            console.log("it is null")
        } else{
            document.getElementById("target").src = profilepic
            document.getElementById("target2").src = profilepic
            
        }
    }

    var payload = {token : token};
    getProfile.send(JSON.stringify(payload));


})