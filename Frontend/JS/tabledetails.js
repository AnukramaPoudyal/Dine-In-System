// Select all list items in the navigation
let list = document.querySelectorAll(".navigation li");

// Function to add "active" class to the selected list item when clicked and remove it from others
function activateMenuItem() {
    // Remove "active" class from all list items
    list.forEach((item) => {
        item.classList.remove("active");
    });
    // Add "active" class to the clicked item
    this.classList.add("active");

    // Add identifier to the active menu item (in this example, adding data-active attribute)
    list.forEach((item) => {
        if (item.classList.contains("active")) {
            item.setAttribute("data-active", "true");
        } else {
            item.removeAttribute("data-active");
        }
    });
}

// Add event listener to each list item to trigger the activateMenuItem function on click
list.forEach((item) => item.addEventListener("click", activateMenuItem));

// Check which menu item is active
let activeMenuItem = document.querySelector(".navigation li[data-active='true']");
if (activeMenuItem) {
    // Do something with the active menu item
    console.log("Active menu item:", activeMenuItem.textContent);
} else {
    console.log("No menu item is active.");
}

  // Add event listener to each list item to trigger the activeLink function on mouseover
  list.forEach((item) => item.addEventListener("mouseover", activeLink));

  // Menu Toggle
  let toggle = document.querySelector(".toggle");
  let navigation = document.querySelector(".navigation");
  let main = document.querySelector(".main");

  // Toggle the "active" class on navigation and main elements when the toggle button is clicked
  toggle.onclick = function () {
      navigation.classList.toggle("active");
      main.classList.toggle("active");
  };


// table.js
document.addEventListener("DOMContentLoaded", function() {
  // Function to handle table reservation
  function reserveTable(fullName, numberOfPeople, dateBooked, timeBooked, tableNumber, sittingSpace, status) {

      // Make the GET request
      fetch(`/table/reservation?fullName=${fullName}&numberOfPeople=${numberOfPeople}&dateBooked=${dateBooked}&timeBooked=${timeBooked}&tableNumber=${tableNumber}&sittingSpace=${sittingSpace}&status=${status}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          },
      })
      .then(response => response.json())
      .then(data => {
          console.log(data); // Handle response from the server
      })
      .catch(error => {
          console.error('Error:', error);
      });
  }

  // Example usage
  reserveTable('John Doe', 4, '2024-05-05', '18:00', 5, 'outdoor', 'confirmed');
});

