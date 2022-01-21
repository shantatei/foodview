function loginMe(){

    var loginUser = new XMLHttpRequest();

    loginUser.open("POST","/login",true);
    loginUser.setRequestHeader("Content-Type","application/json");
    loginUser.onload = function(){

        $('#loginModal').modal('hide');
        var token = JSON.parse(loginUser.responseText);
        console.log(token.result);
        if (token.result != "invalid") {
            $('#successModal').modal('show');
            document.getElementById("registerMenu").style.display = "none";
            document.getElementById("loginMenu").style.display = "none";
            document.getElementById("logoutMenu").style.display = "block";
            document.getElementById("editMenu").style.display = "block";
            document.getElementById("dropdownMenuLink").style.display = "block";
            document.getElementById("navbrand").style.display = "block";
            sessionStorage.setItem("token",token.result);
            updateProfile();
            document.location.reload(true)
           
            

        } else {
            $('#failModal').modal('show');
            
        }
    }

    var username = document.getElementById("usernameLogin").value;
    var password = document.getElementById("passwordLogin").value;
    var payload = {username:username, password:password}
    loginUser.send(JSON.stringify(payload));
}

function updateProfile(){
    var getProfile = new XMLHttpRequest();
    var username, email, profilepic, mobilenum, token;
    token = sessionStorage.getItem("token");
    if (token == null) {
        console.log("user not logged in");
    } else {
        getProfile.open("POST", "/member", true);
        getProfile.setRequestHeader("Content-Type", "application/json");
        getProfile.onload = function () {
            var profile = JSON.parse(getProfile.responseText);
            console.log(getProfile.responseText);
            profilepic = profile[0].profilepic;
            email = profile[0].email;
            mobilenum = profile[0].mobilenum;
            username = profile[0].username;
            document.getElementById("dropdownMenuLink").value=username;
            if (profilepic == null) {
                document.getElementById("target2").src = "images/user.png"
                console.log("it is null")
            } else {
                document.getElementById("target2").src = profilepic

            }

        }

        var payload = { token: token };
        getProfile.send(JSON.stringify(payload));

    }
}