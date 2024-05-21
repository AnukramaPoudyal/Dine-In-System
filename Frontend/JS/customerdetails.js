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

document.addEventListener("DOMContentLoaded", function () {
    // AJAX request to customer customerdetails endpoint
    fetch("http://127.0.0.1:8000/dashboard/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            // Get the table body
            var tableBody = document.getElementById("customerData");

            // Clear the table body
            tableBody.innerHTML = "";

            // For each user in the data...
            data.forEach((user) => {
                // Create a new table row
                var row = document.createElement("tr");

                // Create a table cell for each user detail and append it to the row
                ["firstname", "lastname", "email", "contact"].forEach(
                    (detail) => {
                        var cell = document.createElement("td");
                        cell.textContent = user[detail];
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
