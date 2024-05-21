function findTable() {
    var numberOfPeople = document.getElementById("numberOfPeople").value;
    var dateTime = document.getElementById("dateTime").value;
    var phoneNumber = document.getElementById("phoneNumber").value; // Added phone number field

    console.log("Number of People:", numberOfPeople);
    console.log("Date and Time:", dateTime);
    console.log("Phone Number:", phoneNumber);

    // Simple validation
    if (
        numberOfPeople === "" ||
        dateTime === "" ||
        phoneNumber === "" ||
        (!document.getElementById("indoor").checked && !document.getElementById("outdoor").checked)
    ) {
        alert("All fields are required!");
        return false;
    }

    // Validate phone number
    if (phoneNumber.length !== 10 || isNaN(phoneNumber)) {
        alert("Please enter a valid 10-digit phone number.");
        return false;
    }

    // Prepare data for submission
    var formData = {
        number_of_people: numberOfPeople,
        date_time: dateTime,
        phone_number: phoneNumber, // Added phone number field to formData
        sitting_space: document.getElementById("indoor").checked ? "Indoor" : "Outdoor"
    };

    // Store formData in local storage as JSON
    localStorage.setItem('reservationDetail', JSON.stringify(formData));

    console.log("Sending data to server:", formData);

    // Send data to backend
    fetch("http://127.0.0.1:8000/find-reservation/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
    })
    .then((response) => {
        console.log("Response status:", response.status);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log("Server response:", data); // Handle response from the server
        // Redirect to appropriate page after successful registration
        window.location.href = "../Frontend/booking.html";
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("There was an error processing your request. Please try again.");
    });

    return false; // Prevent default form submission
}
