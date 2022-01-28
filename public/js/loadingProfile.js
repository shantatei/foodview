$(document).ready(function () {

    var getProfile = new XMLHttpRequest();
    var username, email, profilepic, mobilenum, token;
    token = sessionStorage.getItem("token");
    if (token == null) {
        console.log("user not logged in");
        $('#newReview').hide();
        $('#favourites').hide();
    } else {
        getProfile.open("POST", "/member", true);
        getProfile.setRequestHeader("Content-Type", "application/json");
        getProfile.onload = function () {
            var profile = JSON.parse(getProfile.responseText);
            sessionStorage.setItem("profile",JSON.stringify(profile));
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
)