 var initialurl = (window.location.href);
 var spliturl = initialurl.split('/')
//  console.log(spliturl);
 var username = spliturl[3]
 var token = spliturl[4]
 let validate = new XMLHttpRequest()
 validate.open('POST','/validate')
 validate.setRequestHeader('Content-Type','application/json')
 validate.onload = function(){
     let responseText = JSON.parse(validate.responseText)
     if (responseText != "success"){
         if (responseText == "jwt expired") {
            window.location.href = "/linkexpired.html"
         } else {
             window.location.href = "/invalidlink.html"
         }
     }
 }
 validate.send(JSON.stringify({
     username,
     token
 }))
 const password = document.getElementById('newpassword');
 const password2 = document.getElementById('confirmpassword');


 form.addEventListener('submit', e => {
	e.preventDefault();
	
	updatePassword();
});

 function checkInputs() {
	// trim to remove the whitespaces

	const passwordValue = password.value.trim();
	const password2Value = password2.value.trim();
	
	if(passwordValue === '') {
		setErrorFor(password, 'Password cannot be blank');
	} else {
		setSuccessFor(password);
	}
	
	if(password2Value === '') {
		setErrorFor(password2, 'Confirm Password cannot be blank');
	} else if(passwordValue !== password2Value) {
		setErrorFor(password2, 'Passwords does not match');
	} else{
		setSuccessFor(password2);
	}
}


 function setErrorFor(input, message) {
    const formgroup = input.parentElement;
    const small = formgroup.querySelector('small');
    formgroup.className = 'form-group error';
    small.innerText = message;
}

function setSuccessFor(input) {
    const formgroup = input.parentElement;
    formgroup.className = 'form-group success';
}

function updatePassword(){

    var updatepassword = new XMLHttpRequest();

    updatepassword.open("PUT","/updatepassword",true);
    updatepassword.setRequestHeader("Content-Type","application/json");
    updatepassword.onload = function(){

        $('#successModal').modal('show');
          
    }
    var passwordvalue = document.getElementById("newpassword").value
    var password2Value = document.getElementById("confirmpassword").value
    if (passwordvalue =='') {
        setErrorFor(password, 'Password cannot be blank');
    }else if(password2Value === ''){
        setErrorFor(password2, 'Confirm Password cannot be blank');
    }else if(passwordvalue !== password2Value) {
		setErrorFor(password2, 'Passwords does not match');
	} else{
		setSuccessFor(password2);
        setSuccessFor(password)
        var payload = {username:username,password:passwordvalue}
        updatepassword.send(JSON.stringify(payload));
	}

    // var payload = {username:username,password:passwordvalue}
    // updatepassword.send(JSON.stringify(payload));
}



