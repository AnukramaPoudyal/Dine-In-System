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

// Function to handle customer paymentdetails
function customerPaymentDetails(
    id,
    customerName,
    orderDetails,
    tableNumber,
    totalPrice,
    paymentMethod,
    status
) {
    // AJAX request to customer paymentdetails endpoint
    fetch("http://127.0.0.1:8000/customer/paymentdetails", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
            customerName: customerName,
            orderDetails: orderDetails,
            tableNumber: tableNumber,
            totalPrice: totalPrice,
            paymentMethod: paymentMethod,
            status: status,
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
