$(document).ready(function () {
    var token = sessionStorage.getItem("token");
    var profile = JSON.parse(sessionStorage.getItem("profile"));
    
    if (token) {
        document.querySelectorAll('.card.border-0').forEach(card => {
            if (card.getAttribute('username') == profile[0].username) {
                card.querySelectorAll('.edit').forEach(card => {
                    card.classList.remove('d-none');
                });
            }
        })
    }
})


