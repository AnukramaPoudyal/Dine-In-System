// Function to show the popup after 3 seconds
function showPopup() {
    setTimeout(function() {
        document.getElementById('popup-container').style.display = 'block';
    }, 3000); // 3000 milliseconds = 3 seconds
}

// Function to close the popup
function closePopup() {
    document.getElementById('popup-container').style.display = 'none';
}

// Call the showPopup function when the page loads
window.onload = function() {
    showPopup();
};
