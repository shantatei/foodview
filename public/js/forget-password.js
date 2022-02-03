const email = document.getElementById('email');

form.addEventListener('submit', e => {
    e.preventDefault();

    forgetPassword();
});


document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', event => {
            let inputEle = event.target;
            if (inputEle.value =='') {
                setErrorFor(inputEle, 'Email cannot be blank');
            } else if (!isEmail(inputEle.value)) {
                setErrorFor(inputEle, 'Not a valid email');
            } else {
                setSuccessFor(inputEle);
            }
        
        })
});
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

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function checkInputs() {
    const emailValue = email.value.trim();


    if (emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Not a valid email');
    } else {
        setSuccessFor(email);
    }


}

function forgetPassword() {

    var forgetpassword = new XMLHttpRequest();

    forgetpassword.open("POST", "/forgetpassword", true);
    forgetpassword.setRequestHeader("Content-Type", "application/json");
    forgetpassword.onload = function () {
        let results = JSON.parse(forgetpassword.responseText);
        console.log(results);
        results == 'success'? $('#sentmailmodal').modal('show'): $('#failModal').modal('show');
        document.getElementById("sentmail").textContent = emailvalue
    
    }
  
   
    var emailvalue = document.getElementById("email").value;
  
    if (emailvalue =='') {
        setErrorFor(email, 'Email cannot be blank');
    } else if (!isEmail(emailvalue)) {
        setErrorFor(email, 'Not a valid email');
        alert("Enter a valid email")
    } else {
        var payload = {email: emailvalue}
    forgetpassword.send(JSON.stringify(payload));

    }
}

function afteremail(){
    window.location.href = "index.html";
}