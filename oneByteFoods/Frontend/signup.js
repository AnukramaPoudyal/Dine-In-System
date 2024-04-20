const container = document.querySelector(".container");
const pwShowHide = document.querySelectorAll(".showHidePw");
const pwFields = document.querySelectorAll(".password");
const signUp = document.querySelector(".signup-link");
const login = document.querySelector(".login-link");
const submitBtn = document.querySelector(".submit-btn");


// Toggle password visibility
pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        pwFields.forEach(pwField => {
            if (pwField.type === "password") {
                pwField.type = "text";
                eyeIcon.classList.replace("uil-eye-slash", "uil-eye");
            } else {
                pwField.type = "password";
                eyeIcon.classList.replace("uil-eye", "uil-eye-slash");
            }
        });
    });
});

// Event listener for signup link
signUp.addEventListener('click', () => {
    container.classList.add("active");
});

// Event listener for login link
login.addEventListener("click", () => {
    container.classList.remove("active");
});

// Event listener for form submission
submitBtn.addEventListener("click", () => {
    // Perform form submission actions here
    // For example, redirect to home.html
    window.location.href = "home.html";
});

// Function to switch to signup form
function register() {
    container.classList.add("active");
}

// Function to switch to login form
function logindn() {
    container.classList.remove("active");
}
