function deleteuser(){

    var deleteUser = new XMLHttpRequest();

    deleteUser.open("DELETE","/delete",true);
    deleteUser.setRequestHeader("Content-Type","application/json");
    deleteUser.onload = function(){

        $('#successModal').modal('show');
        $('#registerMenu').show();
        $('#loginMenu').show();
        $('#logoutMenu').hide();
        $('#editMenu').hide();
        $('#dropdownMenuLink').hide();
        $('#navbrand').hide();
        sessionStorage.removeItem("token");
        setTimeout(gotoindex, 1500)
        
          
    }

    var payload = {token:token}
    deleteUser.send(JSON.stringify(payload));
}

function gotoindex() {
    window.location.href = "index.html"
}