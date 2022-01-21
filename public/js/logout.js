function logoutMe(){

    $('#registerMenu').show();
    $('#loginMenu').show();
    $('#logoutMenu').hide();
    $('#editMenu').hide();
    $('#dropdownMenuLink').hide();
    $('#navbrand').hide();
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("profile");
    window.location.href = "index.html"

}