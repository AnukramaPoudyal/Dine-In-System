// main.js

const loginButton = document.querySelector(".input-field.button input[type='button']");
const emailInput = document.querySelector("input[type='email']");
const passwordInputs = document.querySelectorAll(".password");

// Function to validate password
function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
}

// Function to validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Event listener for login button click
loginButton.addEventListener('click', () => {
    // Get email and password input values
    const email = emailInput.value.trim();
    let isValid = true;
    let password;

    // Check if any field is empty
    if (email === "") {
        alert("Please enter your email.");
        isValid = false;
        return;
    } else if (!validateEmail(email)) {
        alert("Invalid email format! Must be in the format 'example@example.com'");
        isValid = false;
        return;
    }

    passwordInputs.forEach(passwordInput => {
        password = passwordInput.value.trim();
        if (password === "") {
            alert("Please enter your password.");
            isValid = false;
            return;
        } else if (!validatePassword(password)) {
            alert("Password must be at least 8 characters long and contain a combination of letters and numbers.");
            isValid = false;
            return;
        }
    });

    // If all fields are filled and password is valid, submit the form
    if (isValid) {
        const userData = {
            email: email,
            password: password
        };

        // Send login data to backend
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.message) {
                // Redirect to homepage upon successful login
                window.location.href = "/homepage.html";
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
    }
});
