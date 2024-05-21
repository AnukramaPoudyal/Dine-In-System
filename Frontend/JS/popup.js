// Flag to track if the user has logged in or signed up
let userLoggedInOrSignedUp = false;

// Function to show the popup after 3 seconds, only if the user hasn't logged in or signed up
function showPopup() {
    console.log("showPopup() function is being called.");
    setTimeout(function() {
        if (!userLoggedInOrSignedUp) {
            document.getElementById('popup-container').style.display = 'block';
            console.log("Popup is being displayed.");
        }
    }, 3000); // Change timeout duration to 3000 milliseconds for 3 seconds
}

// Function to simulate user login or signup
function simulateLoginOrSignUp() {
    userLoggedInOrSignedUp = true;
    console.log("User logged in or signed up.");
}

// popup.js
function closePopup() {
    console.log("closePopup() function is being called.");
    document.getElementById('popup-container').style.display = 'none';
}

// Call the showPopup function after the page loads
window.onload = function() {
    console.log("Window onload event handler is being called.");
    showPopup();
};

// Call simulateLoginOrSignUp function to simulate user login or signup
simulateLoginOrSignUp();
