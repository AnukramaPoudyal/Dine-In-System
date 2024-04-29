document.addEventListener("DOMContentLoaded", function() {
    // Select necessary elements from the DOM
    const container = document.querySelector(".container");
    const pwShowHide = document.querySelectorAll(".showHidePw");
    const signUpLink = document.querySelector(".login-link");
    const submitBtn = document.querySelector(".submit-btn");

    // Ensure all required elements exist before adding event listeners
    if (container && pwShowHide && signUpLink && submitBtn) {
        // Function to validate email format
        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        // Function to validate password format (minimum length and combination of letters and numbers)
        function validatePassword(password) {
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            return passwordRegex.test(password);
        }

        // Function to validate contact number format (only integers and maximum length of 10 digits)
        function validateContactNumber(contactNumber) {
            const contactNumberRegex = /^\d{1,10}$/;
            return contactNumberRegex.test(contactNumber);
        }

        // Function to validate name format (start with a capital letter)
        function validateName(name) {
            const nameRegex = /^[A-Z][a-z]*$/;
            return nameRegex.test(name);
        }

        // Toggle password visibility
        pwShowHide.forEach(eyeIcon => {
            eyeIcon.addEventListener("click", () => {
                const pwField = eyeIcon.previousElementSibling;
                pwField.type = pwField.type === "password"? "text" : "password";
                eyeIcon.classList.toggle("uil-eye-slash");
                eyeIcon.classList.toggle("uil-eye");
            });
        });

        // Event listener for signup link
        signUpLink.addEventListener('click', () => {
            container.classList.add("active");
        });

        // Event listener for form submission
        submitBtn.addEventListener("click", (event) => {
            event.preventDefault(); 
            const firstName = document.getElementById("firstName").value.trim();
            const lastName = document.getElementById("lastName").value.trim();
            const contactNumber = document.getElementById("contactNo").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            // Validate form fields
            if (firstName === "" || lastName === "" || contactNumber === "" || email === "" || password === "") {
                alert("Please fill in all the required fields.");
                return;
            }

            if (!validateName(firstName) ||!validateName(lastName)) {
                alert("First and last names must start with a capital letter.");
                return;
            }

            if (!validateContactNumber(contactNumber)) {
                alert("Contact number must be a maximum of 10 digits and contain only integers.");
                return;
            }

            if (!validateEmail(email)) {
                alert("Invalid email format! Must be in the format 'user@example.com'");
                return;
            }

            if (!validatePassword(password)) {
                alert("Password must be at least 8 characters long and contain a combination of letters and numbers.");
                return;
            }

            if (password!== confirmPassword) {
                alert("Password and confirm password do not match.");
                return;
            }

            // Construct signup data
            const signupData = {
                first_name: firstName,
                last_name: lastName,
                contact_number: contactNumber,
                email: email,
                password: password
            };

            // HTTP POST request to signup endpoint
           fetch('http://127.0.0.1:8000/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupData)
            })
           .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
           .then(data => {
                console.log(data); // Output the response data
                window.location.href = "home.html"; // Redirect to home.html after successful signup
            })
           .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        });
    } else {
        console.error("One or more required elements not found in the DOM.");
    }
});
