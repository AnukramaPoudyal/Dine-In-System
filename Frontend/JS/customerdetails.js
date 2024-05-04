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
