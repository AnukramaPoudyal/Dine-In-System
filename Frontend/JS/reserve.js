function findTable() {
    var numberOfPeople = document.getElementById("numberOfPeople").value;
    var dateTime = document.getElementById("dateTime").value;

    var indoor = document.getElementById("indoor");
    var outdoor = document.getElementById("outdoor");

    console.log(numberOfPeople, dateTime, indoor.checked, outdoor.checked);

    // Simple validation
    if (
        numberOfPeople === "" ||
        dateTime === "" ||
        (!indoor.checked && !outdoor.checked)
    ) {
        alert("All fields are required!");
        return false;
    }

    var formData = {};
    formData.number_of_people = numberOfPeople;
    var tmpDate = new Date(dateTime);

    formData.date_time = generateDatabaseDateTime(tmpDate);
    formData.sitting_space = indoor.checked ? "Indoor" : "Outdoor";

    // Store formData in local storage
    console.log("Store FormData in Local Storage");
    localStorage.setItem("reservationDetail", JSON.stringify(formData));

    // Now move to bookings
    window.location.href = "../Frontend/booking.html";
    //return false; // Prevent default form submission
}

function generateDatabaseDateTime(date) {
    return date.toISOString().replace("T"," ").substring(0, 19);
  }

function goToHomePage() {
    window.location.href = "../Frontend/homepage.html";
}
