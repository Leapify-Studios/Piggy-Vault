document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "65be7c529fa2e46ad03585b2";

    document.getElementById("login-form").addEventListener("submit", function (e) {
        e.preventDefault();

        let userEmail = document.getElementById("login-email").value;
        let userPassword = document.getElementById("login-password").value;

        authenticateUser(userEmail, userPassword);
    });

    function authenticateUser(email, password) {
        let settings = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            },
        };
        
        /* check if user signed up already*/
        fetch(`https://piggyvault-b0eb.restdb.io/rest/userinfo?q={"email":"${email}","password":"${password}"}`, settings)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    /* login done green bootstrap alert*/
                    document.getElementById("login-msg").innerHTML = '<div class="alert alert-success" role="alert">Login successful! Please wait while we redirect you.</div>';
                    setTimeout(function () {
                        window.location.href = "index.html"; /*redirect to homepage*/
                    }, 2000);
                } else {
                    /* wrong password or email alert red*/
                    document.getElementById("login-msg").innerHTML = '<div class="alert alert-danger" role="alert">Invalid email or password. Please try again.</div>';
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }
});

