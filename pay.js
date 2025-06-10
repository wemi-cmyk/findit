// pay.js

document.getElementById("paymentMethod").addEventListener("change", updateForm);
document.getElementById("payBtn").addEventListener("click", processPayment);

function updateForm() {
  const method = document.getElementById('paymentMethod').value;
  const formDiv = document.getElementById('paymentForm');
  formDiv.innerHTML = '';

  if (method === 'atm') {
    formDiv.innerHTML = `
      <label for="cardNumber">Card Number:</label>
      <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19" />
      <label for="expiry">Expiry Date:</label>
      <input type="month" id="expiry" />
      <label for="cvv">CVV:</label>
      <input type="password" id="cvv" maxlength="3" />
    `;
  } else if (method) {
    formDiv.innerHTML = `
      <label for="phoneNumber">${method.charAt(0).toUpperCase() + method.slice(1)} Phone Number:</label>
      <input type="tel" id="phoneNumber" placeholder="e.g., 09..." />
    `;
  }
}

function processPayment() {
  const method = document.getElementById('paymentMethod').value;
  const messageDiv = document.getElementById('message');
  messageDiv.innerHTML = '';

  if (!method) {
    messageDiv.innerHTML = '<p class="error">Please select a payment method.</p>';
    return;
  }

  if (method === 'atm') {
    const cardNumber = document.getElementById('cardNumber').value.trim();
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value.trim();
    if (!cardNumber || !expiry || !cvv) {
      messageDiv.innerHTML = '<p class="error">Please fill all card details.</p>';
      return;
    }
  } else {
    const phone = document.getElementById('phoneNumber').value.trim();
    let valid = false;

    if (method === "airtel" && (phone.startsWith("097") || phone.startsWith("077"))) valid = true;
    if (method === "mtn" && (phone.startsWith("096") || phone.startsWith("076"))) valid = true;
    if (method === "zamtel" && phone.startsWith("095")) valid = true;

    if (!valid) {
      messageDiv.innerHTML = '<p class="error">Invalid number for selected provider.</p>';
      return;
    }
  }

  messageDiv.innerHTML = '<p>Processing payment...</p>';
  setTimeout(() => {
    if (Math.random() < 0.7) {
      messageDiv.innerHTML = `<p class="success">Payment successful via ${method === 'atm' ? 'ATM Card' : method.charAt(0).toUpperCase() + method.slice(1)}! Thank you.</p>`;
      localStorage.removeItem("cart");
      setTimeout(() => window.location.href = "index.html", 2000);
    } else {
      messageDiv.innerHTML = '<p class="error">Payment failed. Please try again.</p>';
    }
  }, 2000);
}

