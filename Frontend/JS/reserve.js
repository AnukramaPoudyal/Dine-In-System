function validateForm() {
    var numberOfPeople = document.getElementById("numberOfPeople").value;
    var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;

    // Simple validation
    if (numberOfPeople === "" || date === "" || time === "") {
        alert("All fields are required!");
        return false;
    }

    // Date validation
    var currentDate = new Date();
    var selectedDate = new Date(date);

    if (selectedDate < currentDate) {
        alert("Please select a future date.");
        return false;
    }

    // Time validation
    if (selectedDate.getDate() === currentDate.getDate()) {
        // If selected date is today, check if the selected time is in the future
        var currentTime = currentDate.getHours();
        var selectedTime = parseInt(time.split(":")[0]);

        if (selectedTime < 7 || selectedTime >= 23 || selectedTime < currentTime) {
            alert("Please select a time between 7:00 AM and 11:00 PM for today.");
            return false;
        }
    } else {
        // If selected date is in the future, any time between 7 am to 11 pm is valid
        var selectedTime = parseInt(time.split(":")[0]);

        if (selectedTime < 7 || selectedTime >= 23) {
            alert("Please select a time between 7:00 AM and 11:00 PM for future dates.");
            return false;
        }
    }

    return true; // Form is valid
}

function sittingSpace() {
        window.location.href = "spacing.html";
    }

function goToHomePage() {
    window.location.href = "index.html";
}
