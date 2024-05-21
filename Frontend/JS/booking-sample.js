document.addEventListener("DOMContentLoaded", function () {
    var formData = JSON.parse(localStorage.getItem("formData"));

    // Read from LocalStorage
    const resData = JSON.parse(localStorage.getItem("reservationDetail"));

    //console.log(resData);
    //console.log(resData.date_time);

    document.getElementById("rtable-date").textContent = resData.date_time;
    document.getElementById("rtable-num").textContent =
        resData.number_of_people;
    document.getElementById("rtable-sitting").textContent =
        resData.sitting_space;
});

function cancelBooking() {
    window.location.href = "../Frontend/tabledetails.html";
}

function returnBack() {
    window.location.href = "../Frontend/tabledetails.html";
}

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

function tableBooking() {
    event.preventDefault(); // Prevent default form submission

    // Name validation
    var firstName = document.getElementById("first_name").value.trim();
    var lastName = document.getElementById("last_name").value.trim();
    if (!isValidName(firstName) || !isValidName(lastName)) {
        alert("Please enter a valid first and last name.");
        return;
    }

    // Email validation
    const email = document.getElementById("email").value.trim();
    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Phone number validation
    const phoneNumber = document.getElementById("phone_number").value.trim();
    if (!isValidPhoneNumber(phoneNumber)) {
        alert("Please enter a valid phone number.");
        return;
    }
    const occassion = document.getElementById("occasion").value.trim();

    // Read from LocalStorage
    const resData = JSON.parse(localStorage.getItem("reservationDetail"));

    // Construct Data
    var formData = {};
    formData.number_of_people = resData.number_of_people;
    formData.date_time = resData.date_time;
    formData.sitting_space = resData.sitting_space;
    formData.firstname = firstName;
    formData.lastname = lastName;
    formData.email = email;
    formData.phoneNumber = phoneNumber;
    formData.occassion = occassion;

    console.log(formData);

    // Send data to backend
    fetch("http://127.0.0.1:8000/find-reservation/", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(formData),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data.message); // Handle response from the server

            // Again store formData in local storage
            localStorage.setItem("reservationFinal", JSON.stringify(formData));

            // Redirect to appropriate confirmation page
            window.location.href = "../Frontend/confirmbooking.html";
        })
        .catch((error) => {
            console.error("Error:", error);
            // Handle error here
        });

    return false; // Prevent default form submission
    //window.location.href = "../Frontend/payment.html";
}

function confirmBooking() {
    event.preventDefault(); // Prevent default form submission

    // Read from LocalStorage
    const formData = JSON.parse(localStorage.getItem("reservationFinal"));
    console.log(formData);

    // Send data to backend
    fetch("http://127.0.0.1:8000/reserve/", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(formData),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data.message); // Handle response from the server

            // Redirect to appropriate confirmation page
            window.location.href = "../Frontend/successbooking.html";
        })
        .catch((error) => {
            console.error("Error:", error);
            alert(
                "Unfortunately, your party is too large to make an online reservation. we recommend contacting the restaurant directly."
            );
            window.location.href = "../Frontend/failurebooking.html";
        });

    return false; // Prevent default form submission
}
