document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("sittingspaceForm");
    const selectButton = document.querySelector(".button");

    // Add event listener to form submit
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Get the selected seating type
        const selectedOption = document.querySelector('input[name="seatingType"]:checked');

        if (selectedOption) {
            // Redirect to booking.html
            window.location.href = "booking.html";
        } else {
            // Show error message or handle the case where no option is selected
            alert("Please select a seating type.");
        }
    });

    // Add event listener to radio buttons to allow only one selection
    const radioButtons = document.querySelectorAll('input[name="seatingType"]');
    radioButtons.forEach(function(radioButton) {
        radioButton.addEventListener("change", function() {
            // Unselect other radio buttons
            radioButtons.forEach(function(radio) {
                if (radio !== radioButton) {
                    radio.checked = false;
                }
            });
        });
    });
});
