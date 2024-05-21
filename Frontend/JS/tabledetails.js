// Select all list items in the navigation
let list = document.querySelectorAll(".navigation li");

// Function to add "active" class to the selected list item when mouseover and remove it from others
function activateLink() {
    // Remove "active" class and data-active attribute from all list items
    list.forEach((item) => {
        item.classList.remove("active");
        item.removeAttribute("data-active");
    });

    // Add "active" class to the mouseover item
    this.classList.add("active");
    this.setAttribute("data-active", "true");

    // Do something with the active menu item
    console.log("Active menu item:", this.textContent);
}

// Add event listener to each list item to trigger the activateLink function on mouseover
list.forEach((item) => item.addEventListener("mouseover", activateLink));
// Sample reservation data (replace with actual data from your system)
const reservations = [
    { id: 1, name: "John Doe", table: 4, time: "2024-05-13T12:00:00" },
    { id: 2, name: "Jane Smith", table: 2, time: "2024-05-14T18:00:00" },
];

// Function to display reservations
function displayReservations() {
    const reservationList = document.getElementById("reservationList");
    reservationList.innerHTML = "";
    reservations.forEach((reservation) => {
        const listItem = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        listItem.textContent = `Name: ${reservation.name}, Table: ${
            reservation.table
        }, Time: ${new Date(reservation.time).toLocaleString()}`;
        listItem.prepend(checkbox); // Add checkbox before reservation details
        reservationList.appendChild(listItem);
    });
}

// Function to handle table deletion
function deleteTable() {
    // Check if any checkboxes are checked
    const checkboxes = document.querySelectorAll(
        "#reservationList input[type='checkbox']:checked"
    );
    if (checkboxes.length === 0) {
        alert("Please select at least one reservation to delete.");
        return; // Exit the function if no checkbox is selected
    }

    if (confirm("Are you sure you want to delete selected reservations?")) {
        checkboxes.forEach((checkbox) => {
            // Perform deletion logic (e.g., remove reservation from the array)
            const listItem = checkbox.parentNode;
            listItem.parentNode.removeChild(listItem);
            // You may want to delete the reservation from the server/database as well
        });
        alert("Selected reservations deleted successfully.");
    }
}

// Event listener for Delete Table button
const deleteTableBtn = document.querySelector(".button-container button");
deleteTableBtn.addEventListener("click", deleteTable);

// Function to open the add_reservation.html page
function addReservation() {
    window.open("addreservation.html", "_blank");
}

// Function to confirm table details
function tableConfirmation() {
    // Check if any required values are null
    const name = document.getElementById("CustomerName").value.trim();
    const email = document.getElementById("Email").value.trim();
    const submission = document
        .getElementById("SubmissionTimestamp")
        .value.trim();
    const dateTime = document.getElementById("Date & Time").value.trim();
    const tableNumber = document.getElementById("TableNumber").value.trim();
    const occasionType = document.getElementById("Occasion Type").value.trim();
    const numberOfPeople = document
        .getElementById("Number Of People")
        .value.trim();
    const sittingSpace = document.getElementById("Sitting Space").value.trim();

    // Check for null values
    if (
        !name ||
        !email ||
        !submission ||
        !dateTime ||
        !tableNumber ||
        !occasionType ||
        !numberOfPeople ||
        !sittingSpace
    ) {
        alert("Please fill in all the required fields.");
        return; // Exit the function if any value is null
    }

    // Call the function to handle table details
    handleTableReservation(
        name,
        email,
        submission,
        dateTime,
        tableNumber,
        occasionType,
        numberOfPeople,
        sittingSpace
    );
}

// Function to open the add_reservation.html page
function tableConfirmation() {
    window.open("tablestatus.html", "_blank");
}

// Function to handle table details
function handleTableReservation(
    name,
    email,
    submission,
    dateTime,
    tableNumber,
    occasionType,
    numberOfPeople,
    sittingSpace,
    timestamp
) {
    // AJAX request to table details endpoint
    fetch("http://127.0.0.1:8000/add_registration", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            email: email,
            submission: submission,
            dateTime: dateTime,
            tableNumber: tableNumber,
            occasionType: occasionType,
            numberOfPeople: numberOfPeople,
            sittingSpace: sittingSpace,
            timestamp: timestamp,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data); // Handle response from the server
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

// Menu Toggle
const toggle = document.querySelector(".toggle");
const navigation = document.querySelector(".navigation");
const main = document.querySelector(".main");

// Toggle the "active" class on navigation and main elements when the toggle button is clicked
toggle.onclick = function () {
    navigation.classList.toggle("active");
    main.classList.toggle("active");
};
