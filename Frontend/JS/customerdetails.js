document.addEventListener("DOMContentLoaded", function() {
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

  // Function to handle customer login
  function customerLogin(email, password) {
      // AJAX request to customer login endpoint
      fetch('/customer/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({email: email, password: password})
      })
      .then(response => response.json())
      .then(data => {
          console.log(data); // Handle response from the server
      })
      .catch(error => {
          console.error('Error:', error);
      });
  }

  // Function to handle customer signup
  function customerSignup(email, password, firstName, lastName, contactNumber) {
      // AJAX request to customer signup endpoint
      fetch('/customer/signup', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              email: email,
              password: password,
              first_name: firstName,
              last_name: lastName,
              contact_number: contactNumber
          })
      })
      .then(response => response.json())
      .then(data => {
          console.log(data); // Handle response from the server
      })
      .catch(error => {
          console.error('Error:', error);
      });
  }

  // Function to get data using a GET request
  function getData() {
      // AJAX request to get data endpoint
      fetch('/your/get/data/endpoint', {
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
  customerLogin('customer@example.com', 'password');
  customerSignup('newcustomer@example.com', 'password123', 'John', 'Doe', '+1234567890');
  getData(); // Call the function to fetch data when the page loads
});
