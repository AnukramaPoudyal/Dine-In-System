// Function to show the popup after 3 seconds
function showPopup() {
    console.log("showPopup() function is being called.");
    setTimeout(function() {
        document.getElementById('popup-container').style.display = 'block';
        console.log("Popup is being displayed.");
    }, 3000); // Change timeout duration to 3000 milliseconds for 3 seconds
}

// popup.js
function closePopup() {
    console.log("closePopup() function is being called.");
    document.getElementById('popup-container').style.display = 'none';
}

// Call the showPopup function when the page loads
window.onload = function() {
    console.log("Window onload event handler is being called.");
    showPopup();
};
