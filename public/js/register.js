const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const mobilenum = document.getElementById('mobilenum');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const address = document.getElementById('address');


form.addEventListener('submit', e => {
    e.preventDefault();

    registerMe();
});

document.querySelectorAll('input:not([type="radio"])').forEach(input => {
    if (input.type == 'email') {
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
    } else {
        input.addEventListener('input', event => {
            let inputEle = event.target;
            inputEle.value != "" ? setSuccessFor(inputEle) : setErrorFor(inputEle, `${inputEle.id} cannot be blank`);
        });

    }
});


function checkInputs() {
    // trim to remove the whitespaces
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const mobilenumValue = mobilenum.value.trim();
    const firstnameValue = firstname.value.trim();
    const lastnameValue = lastname.value.trim();
    const addressValue = address.value.trim();

    if (usernameValue === '') {
        setErrorFor(username, 'Username cannot be blank');
    } else {
        setSuccessFor(username);
    }

    if (emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Not a valid email');
    } else {
        setSuccessFor(email);
    }

    if (passwordValue === '') {
        setErrorFor(password, 'Password cannot be blank');
    } else {
        setSuccessFor(password);
    }

    if (mobilenumValue === '') {
        setErrorFor(mobilenum, 'Telephone cannot be blank');
    } else {
        setSuccessFor(mobilenum);
    }

    if (firstnameValue === '') {
        setErrorFor(firstname, 'First Name cannot be blank');
    } else {
        setSuccessFor(firstname);
    }

    if (lastnameValue === '') {
        setErrorFor(lastname, 'Last Name cannot be blank');
    } else {
        setSuccessFor(lastname);
    }

    if (addressValue === '') {
        setErrorFor(address, 'Address cannot be blank');
    } else {
        setSuccessFor(address);
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


function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function gotoindex() {
    window.location.href = "index.html"
}

function registerMe() {

    var regsiterUser = new XMLHttpRequest();

    regsiterUser.open("POST", "/users", true);
    regsiterUser.setRequestHeader("Content-Type", "application/json");
    regsiterUser.onload = function () {
        var ER_DUP_ENTRY = "ER_DUP_ENTRY"
        let results = JSON.parse(regsiterUser.responseText);
        console.log(results);
        if (results.code == ER_DUP_ENTRY) {
            typeoferror = results.sqlMessage
            if (typeoferror.includes("username")) {
                console.log("it is a duplicate username");
                setErrorFor(username, 'Username has been taken')
                alert("Username has been taken, please change")
            } else {
                console.log("it is a duplicate email");
                setErrorFor(email,'Email has been taken')
                alert("Email has been taken, please change")
            }
        } else {
            $('#signupsuccessModal').modal('show');
            setTimeout(gotoindex, 1500)
        }
    }
  
    var usernamevalue = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var emailvalue = document.getElementById("email").value;
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    let gender = document.querySelector('#form').gender.value
    var address = document.getElementById("address").value;
    var mobilenum = document.getElementById("mobilenum").value
    if (emailvalue =='') {
        setErrorFor(email, 'Email cannot be blank');
    } else if (!isEmail(emailvalue)) {
        setErrorFor(email, 'Not a valid email');
        alert("Enter a valid email")
    } else {
        var payload = { username: usernamevalue, password: password, email: emailvalue, firstname: firstname, lastname: lastname, gender: gender, address: address, mobilenum: mobilenum }
    regsiterUser.send(JSON.stringify(payload));

    }
}
