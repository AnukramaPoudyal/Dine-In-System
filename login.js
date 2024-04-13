const container = document.querySelector(".container");
const pwShowHide = document.querySelectorAll(".showHidePw");
const emailInput = document.querySelector("input[type='email']");
const loginButton = document.querySelector(".button input[type='button']");

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

// Event listener for login button click
loginButton.addEventListener("click", () => {
    const email = emailInput.value.trim();
    const passwordFields = document.querySelectorAll(".password");
    let isValid = true;

    // Check if any field is empty
    if (email === "") {
        emailInput.setCustomValidity("Please enter your email.");
        isValid = false;
    } else {
        emailInput.setCustomValidity("");
    }

    passwordFields.forEach(passwordField => {
        const password = passwordField.value.trim();
        if (password === "") {
            passwordField.setCustomValidity("Please enter your password.");
            isValid = false;
        } else {
            passwordField.setCustomValidity("");
        }
    });

    // If all fields are filled, submit the form
    if (isValid) {
        // Redirect to home.html
        window.location.href = "home.html";
    } else {
        // Show alert for error
        alert("Please fill in all the required fields.");
    }
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
