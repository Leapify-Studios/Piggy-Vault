/*For login*/

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
                  const userId = data[0]._id; 
                  localStorage.setItem("userId", userId); 
                  localStorage.setItem("userEmail", email);
                  localStorage.setItem('userPassword', password);
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

/* For signup */

document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "65be7c529fa2e46ad03585b2"; 
    document.getElementById("signup-msg").style.display = "none";
  
    document.getElementById("info-submit").addEventListener("click", function (e) {
      e.preventDefault();
  
      let userEmail = document.getElementById("user-email").value;
      let userPassword = document.getElementById("user-password").value;
      let confirmPassword = document.getElementById("confirm-password").value;
      let userName = document.getElementById("username").value;
  
      if (!isValidEmail(userEmail)) {
        /*Invalid email*/
        displayErrorMessage("Please enter a valid email address.");
        return;
      }
  
      if (userEmail.trim() === "" || userPassword.trim() === "" || confirmPassword.trim() === "") {
        /*Never fill in everything*/
        displayErrorMessage("Please fill in all fields.");
        return;
      }
  
      if (userPassword !== confirmPassword) {
        /*Passwords do not match*/
        displayErrorMessage("Passwords do not match. Please try again.");
        return;
      }
  
      let jsondata = {
        "email": userEmail,
        "password": userPassword,
        "username": userName,
        "piggycoins": 0,
        "level": 1
      }
  
      let settings = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": APIKEY,
          "Cache-Control": "no-cache"
        },
        body: JSON.stringify(jsondata),
        beforeSend: function () {
          document.getElementById("info-submit").disabled = true;
          document.getElementById("signup-form").reset();
        }
      };
  
      fetch("https://piggyvault-b0eb.restdb.io/rest/userinfo", settings)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          document.getElementById("info-submit").disabled = false;
          displaySuccessMessage("User registered successfully! Please proceed to log in.");
          /* Registered into database*/
        })
        .catch(error => {
          console.error("Error:", error);
          displayErrorMessage("An error occurred. Please try again later.");
        });
    });
  
    /* Bootstrap alerts green */
    function displaySuccessMessage(message) {
      document.getElementById("signup-msg").innerHTML = `<div class="alert alert-success" role="alert">${message}</div>`;
      document.getElementById("signup-msg").style.display = "block";
      setTimeout(function () {
        document.getElementById("signup-msg").style.display = "none";
      }, 3000);
    }
  
    /* Bootstrap alert red*/
    function displayErrorMessage(message) {
      document.getElementById("signup-msg").innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
      document.getElementById("signup-msg").style.display = "block";
      setTimeout(function () {
        document.getElementById("signup-msg").style.display = "none";
      }, 3000);
    }
  
  
    /* Check whether email is valid*/
    function isValidEmail(email) {
      return email.includes('@');
    }
  });

    /* loading screen */
    document.getElementById("submit").addEventListener("click", function(event) { 
      event.preventDefault();
          setTimeout(function() {
              window.location.href = 'loading.html';
          }, 1000);
      });

           
    setTimeout(function() {
      window.location.href = 'index.html';
        }, 6000); 