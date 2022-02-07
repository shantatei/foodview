function deleteuser() {

    // var deleteUser = new XMLHttpRequest();

    // deleteUser.open("DELETE","/delete",true);
    // deleteUser.setRequestHeader("Content-Type","application/json");
    var response = confirm("Are you sure you want to delete your account ?");
    if (response == true) {
        var deleteUser = new XMLHttpRequest();
        deleteUser.open("DELETE", "/delete", true);
        deleteUser.setRequestHeader("Content-Type", "application/json");
        deleteUser.onload = function () {
            $('#deletesuccessmodal').modal('show');
            document.getElementById("usernamedelete").textContent = username
            $('#registerMenu').show();
            $('#loginMenu').show();
            $('#logoutMenu').hide();
            $('#editMenu').hide();
            $('#dropdownMenuLink').hide();
            $('#navbrand').hide();
            sessionStorage.removeItem("token");
        }
        var payload = { token: token }
        deleteUser.send(JSON.stringify(payload));
    }
    // deleteUser.onload = function(){

    //     $('#deletesuccessmodal').modal('show');
    //     document.getElementById("usernamedelete").textContent = username
    //     $('#registerMenu').show();
    //     $('#loginMenu').show();
    //     $('#logoutMenu').hide();
    //     $('#editMenu').hide();
    //     $('#dropdownMenuLink').hide();
    //     $('#navbrand').hide();
    //     sessionStorage.removeItem("token");



    // }

    // var payload = { token: token }
    // deleteUser.send(JSON.stringify(payload));
}

function afterdelete() {
    window.location.href = "index.html"
}