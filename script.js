document.addEventListener('DOMContentLoaded', function () {
    const taxForm = document.getElementById('taxForm');
    const errorIcons = document.getElementById('errorIcons');
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close');

    taxForm.addEventListener('submit', function (event) {
        event.preventDefault();
        // Reset error icons
        errorIcons.innerHTML = '';

        // Retrieve form values
        const age = document.getElementById('age').value;
        const grossIncome = parseFloat(document.getElementById('grossIncome').value);
        const extraIncome = parseFloat(document.getElementById('extraIncome').value);
        const deductions = parseFloat(document.getElementById('deductions').value);

        // Validate inputs
        let hasError = false;
        if (isNaN(grossIncome)) {
            displayError('Gross Annual Income is required.', 'grossIncome');
            hasError = true;
        }
        if (isNaN(extraIncome)) {
            displayError('Extra Income must be a number.', 'extraIncome');
            hasError = true;
        }
        if (isNaN(deductions)) {
            displayError('Deductions must be a number.', 'deductions');
            hasError = true;
        }

        if (!hasError) {
            // Perform tax calculation
            let tax = 0;
            if (grossIncome + extraIncome - deductions > 800000) {
                if (age === '<40') {
                    tax = 0.3 * (grossIncome + extraIncome - deductions - 800000);
                } else if (age === '≥40 & <60') {
                    tax = 0.4 * (grossIncome + extraIncome - deductions - 800000);
                } else if (age === '≥60') {
                    tax = 0.1 * (grossIncome + extraIncome - deductions - 800000);
                }
            }

            // Display tax amount
            showModal(tax);
        }
    });

    function displayError(message, fieldId) {
        const errorIcon = document.createElement('div');
        errorIcon.classList.add('error-icon');
        errorIcon.innerHTML = '!';
        errorIcon.title = message;
        const field = document.getElementById(fieldId);
        field.insertAdjacentElement('afterend', errorIcon);
    }

    function showModal(tax) {
        const taxAmount = document.getElementById('taxAmount');
        taxAmount.textContent = `Your tax amount is: ₹${tax.toFixed(2)}`;
        modal.style.display = 'block';
    }

    closeButton.onclick = function () {
        modal.style.display = 'none';
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});
