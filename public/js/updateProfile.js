function encode (){

    var selectedfile = document.getElementById("myinput").files;
    if (selectedfile.length>0){

        var imageFile = selectedfile[0];
        var fileReader = new FileReader;
        fileReader.onload = function(fileLoadedEvent){
            profilepic = fileLoadedEvent.target.result;
            document.getElementById('target').src = profilepic

        }
        fileReader.readAsDataURL(imageFile);
    }

}

function update(){

    var updateUser = new XMLHttpRequest();

    updateUser.open("PUT","/users",true);
    updateUser.setRequestHeader("Content-Type","application/json");
    updateUser.onload = function(){

        $('#updatesuccessmodal').modal('show');
          
    }
    mobilenum = document.getElementById("telephone").value;
    email = document.getElementById("email").value;
    firstname = document.getElementById("firstname").value;
    lastname = document.getElementById('lastname').value;
    address = document.getElementById('address').value;
    gender = document.querySelector('#form').gender.value;

    var payload = {token:token, profilepic:profilepic, email:email, mobilenum:mobilenum, firstname:firstname, lastname:lastname, address:address, gender:gender}
    updateUser.send(JSON.stringify(payload));
}

function afterupdate(){
    document.location.reload(true)
}



