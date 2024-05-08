document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Name validation
        const firstName = form.querySelector('#first_name').value.trim();
        const lastName = form.querySelector('#last_name').value.trim();
        if (!isValidName(firstName) || !isValidName(lastName)) {
            alert('Please enter a valid first and last name.');
            return;
        }

        // Email validation
        const email = form.querySelector('#email').value.trim();
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Phone number validation
        const phoneNumber = form.querySelector('#phone_number').value.trim();
        if (!isValidPhoneNumber(phoneNumber)) {
            alert('Please enter a valid phone number.');
            return;
        }

        // If all validations pass, submit the form
        form.submit();
    });
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

