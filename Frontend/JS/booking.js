document.addEventListener('DOMContentLoaded', function () {
    // Handle form submission for table reservation
    document.getElementById("reservation-form").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission

        // Name validation
        const firstName = this.querySelector('#first_name').value.trim();
        const lastName = this.querySelector('#last_name').value.trim();
        if (!isValidName(firstName) || !isValidName(lastName)) {
            alert('Please enter a valid first and last name.');
            return;
        }

        // Email validation
        const email = this.querySelector('#email').value.trim();
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Phone number validation
        const phoneNumber = this.querySelector('#phone_number').value.trim();
        if (!isValidPhoneNumber(phoneNumber)) {
            alert('Please enter a valid phone number.');
            return;
        }

        // Redirect to payment.html
        window.location.href = "payment.html";
    });

    // Function to handle cancellation of booking
    window.cancelBooking = function() {
        alert("Booking Cancelled. Hope you have a great day ahead!");
    }
});

function isValidName(name) {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^\+?[0-9]{8,}$/;
    return phoneRegex.test(phoneNumber);
}
