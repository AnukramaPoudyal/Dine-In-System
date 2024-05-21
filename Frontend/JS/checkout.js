document.addEventListener("DOMContentLoaded", function() {
    function handleSubmit(event) {
        event.preventDefault(); // Prevent the default form submission

        if (!validateForm(event.target)) {
            alert("Please fill out all required fields.");
            return;
        }

        const formData = new FormData(event.target);
        const data = {};
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }

        // Perform form submission based on the form ID
        switch (event.target.id) {
            case 'cardPaymentForm':
                // Handle card payment form submission
                console.log('Card payment form submitted:', data);
                window.location.href = 'thanks.html'; // Redirect to thanks.html
                break;
            case 'onlinePaymentForm':
                // Handle online payment form submission
                console.log('Online payment form submitted:', data);
                window.location.href = 'thanks.html'; // Redirect to thanks.html
                break;
            default:
                // Handle other form submissions if needed
                break;
        }
    }

    function validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        for (let field of requiredFields) {
            if (!field.value.trim()) {
                return false;
            }
        }
        return true;
    }

    function calculateTotal() {
        // Get the selected option from the specialOrder dropdown
        const specialOrder = document.getElementById("specialOrder");
        const selectedOption = specialOrder.options[specialOrder.selectedIndex];
        
        // Extract the price from the selected option's data-price attribute
        const price = parseFloat(selectedOption.getAttribute("data-price")) || 0;
    
        // Get the table booking charge from the tableamount input field
        const tableAmount = parseFloat(document.getElementById("tableamount").value.replace('Rs.', '')) || 0;
    
        // Calculate the total amount by adding the dish price and table booking charge
        const totalAmount = price + tableAmount;
    
        // Set the total amount in the amount input field, formatted as Nepali Rupees
        document.getElementById("amount").value = `Rs.${totalAmount.toFixed(2)}`;
    }
      

    function enablePaymentForms() {
        const cardPaymentFormInputs = document.querySelectorAll('#cardPaymentForm input');
        const onlinePaymentFormInputs = document.querySelectorAll('#onlinePaymentForm select, #onlinePaymentForm input');

        cardPaymentFormInputs.forEach(input => input.removeAttribute('disabled'));
        onlinePaymentFormInputs.forEach(input => input.removeAttribute('disabled'));
    }

    function confirmTable() {
        const checkoutFormInputs = document.querySelectorAll('#checkoutForm input, #checkoutForm select');

        // Set inputs to readonly
        checkoutFormInputs.forEach(input => {
            if (input.tagName === 'SELECT') {
                input.setAttribute('disabled', true);
            } else {
                input.setAttribute('readonly', true);
            }
        });

        // Enable the payment forms
        enablePaymentForms();

        // Show alert message
        alert('Table booking has been confirmed. Please proceed to payment on the right.');
    }

    document.getElementById('confirmTable').addEventListener('click', function() {
        confirmTable();
    });

    document.getElementById('checkoutForm').addEventListener('submit', function(event) {
        event.preventDefault();
        confirmTable();
    });

    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleSubmit);
    });

    document.getElementById('cancelReservation').addEventListener('click', function() {
        if (confirm('Are you sure you want to cancel the reservation?')) {
            window.location.href = 'reserve.html';
        } else {
            window.location.href = 'checkout.html';
        }
    });

    document.getElementById('specialOrder').addEventListener('change', calculateTotal);

    window.calculateTotal = calculateTotal;
});
