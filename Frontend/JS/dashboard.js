document.addEventListener("DOMContentLoaded", function () {
    fetch("http://127.0.0.1:8000/summary/")
        .then(response => response.json())
        .then(data => {
            // Get the elements to update
            var signedUpElement = document.querySelector('#signUps');
            var loggedInElement = document.querySelector('#logIns');
  
            // Update the elements with the data from the JSON
            signedUpElement.textContent = data["user_count"];
            loggedInElement.textContent = data["login_count"];
        })
        .catch((error) => {
            console.error('Error:', error);
        });
  });

      // Select all list items in the navigation
      let list = document.querySelectorAll(".navigation li");

      // Function to add "hovered" class to the selected list item when hovered over
      function activeLink() {
        // Remove "hovered" class from all list items
        list.forEach((item) => {
          item.classList.remove("hovered");
        });
        // Add "hovered" class to the currently hovered item
        this.classList.add("hovered");
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
  
      // Special Offer
      document.addEventListener('DOMContentLoaded', function () {
        // Select all special offer elements
        const offers = document.querySelectorAll('.offer');
  
        // Add event listener to each special offer to toggle the "active" class when clicked
        offers.forEach(function (offer) {
          offer.addEventListener('click', function () {
            // Remove "active" class from all special offers
            offers.forEach(function (el) {
              el.classList.remove('active');
            });
            // Toggle "active" class on the clicked offer
            this.classList.toggle('active');
          });
        });
      });
  
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