const container = document.querySelector(".container");
const loginButton = document.querySelector(".input-field.button input[type='button']");
const pwShowHide = document.querySelectorAll(".showHidePw");
const emailInput = document.querySelector("input[type='email']");
const passwordInputs = document.querySelectorAll(".password");

// Event listener for login button click
loginButton.addEventListener('click', () => {
    // Get email and password input values
    const email = emailInput.value.trim();
    let isValid = true;
    let password;

    // Check if any field is empty
    if (email === "") {
        emailInput.setCustomValidity("Please enter your email.");
        isValid = false;
    } else {
        emailInput.setCustomValidity("");
    }

    passwordInputs.forEach(passwordInput => {
        password = passwordInput.value.trim();
        if (password === "") {
            passwordInput.setCustomValidity("Please enter your password.");
            isValid = false;
        } else {
            passwordInput.setCustomValidity("");
        }
    });

    // If all fields are filled, submit the form
    if (isValid) {
        fetch('http://localhost:8000/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
       .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
       .then(data => {
            if (data.message) {
                // Redirect to home.html upon successful login
                window.location.href = "home.html";
            } else {
                // Login failed, display error message to the user
                alert("Can't login. Please check your email and password.");
            }
        })
       .catch(error => {
            console.error('Error:', error);
            // Show alert for any error during login
            alert("An error occurred. Please try again later.");
        });
    } else {
        // Show alert for incomplete form
        alert("Please fill in all the required fields.");
    }
});

// Toggle password visibility
pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        const passwordField = eyeIcon.previousElementSibling;
        if (passwordField.type === "password") {
            passwordField.type = "text";
            eyeIcon.classList.replace("uil-eye-slash", "uil-eye");
        } else {
            passwordField.type = "password";
            eyeIcon.classList.replace("uil-eye", "uil-eye-slash");
        }
    });
});

// Email format validation
emailInput.addEventListener("input", function(event) {
    const email = this.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        this.setCustomValidity("Invalid email format! Must be in the format 'example@example.com'");
    } else {
        this.setCustomValidity("");
    }
});
