
document.addEventListener("DOMContentLoaded", function () {
    
    // AJAX request to customer customerdetails endpoint
    fetch("http://127.0.0.1:8000/list-all/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {

            console.log(data.reservations);
            // Get the table body
            var tableBody = document.getElementById("tableData");

            // Clear the table body
            tableBody.innerHTML = "";

            // For each reservation in the data...
            data.reservations.forEach((reservation) => {
                // Create a new table row
                var row = document.createElement("tr");

                // Create a table cell for each reservation detail and append it to the row
                ["customer_name", "customer_email", "occasion_type", "number_of_people","date_time","status"].forEach(
                    (detail) => {
                        var cell = document.createElement("td");
                        cell.textContent = reservation[detail];
                        row.appendChild(cell);
                    }
                );

                // Append the row to the table body
                tableBody.appendChild(row);
            });
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});

function addReservation() {
    window.location.href = "../Frontend/reserve.html";
}