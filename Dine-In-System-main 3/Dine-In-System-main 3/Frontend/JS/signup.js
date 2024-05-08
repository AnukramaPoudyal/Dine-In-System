document.addEventListener("DOMContentLoaded", function() {
    const pwShowHide = document.querySelectorAll("showHidePw");
    const signUp = document.querySelector("signup-link");
    const login = document.querySelector("login-link");
    const submitBtn = document.getElementById("submit-btn");

    // Ensure all elements exist before adding event listeners
    // if (pwShowHide && signUp && login && submitBtn) {
        // Function to validate email format
        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        // Function to validate password format (minimum length and combination of letters and numbers)
        function validatePassword(password) {
            return true
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
                if (pwField.type === "password") {
                    pwField.type = "text";
                    eyeIcon.classList.replace("uil-eye-slash", "uil-eye");
                } else {
                    pwField.type = "password";
                    eyeIcon.classList.replace("uil-eye", "uil-eye-slash");
                }
            });
        });

        // Event listener for signup link
        // signUp.addEventListener('click', () => {
        //     container.classList.add("active");
        // });

        // Event listener for login link
        // login.addEventListener("click", () => {
        //     container.classList.remove("active");
        // });

        // Event listener for form submission
        console.log(submitBtn)
        submitBtn.addEventListener("click", (event) => {
            event.preventDefault(); 
            const firstName = document.getElementById("firstName").value.trim();
            const lastName = document.getElementById("lastName").value.trim();
            const contactNumber = document.getElementById("contactNo").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            if (firstName === "" || lastName === "" || contactNumber === "" || email === "" || password === "") {
                alert("Please fill in all the required fields.");
                return;
            }

            if (!validateName(firstName)) {
                alert("First name must start with a capital letter.");
                return;
            }

            if (!validateName(lastName)) {
                alert("Last name must start with a capital letter.");
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

            const signupData = {
                first_name: firstName,
                last_name: lastName,
                contact_number: contactNumber,
                email: email,
                password: password
            };
console.log(signupData);
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
    // } else {
        // console.error("One or more required elements not found in the DOM.");
    // }
});
