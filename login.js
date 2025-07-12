// login.js
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault(); // stops page from refreshing

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  if (email && password) {
    message.style.color = "green";
    message.textContent = "Login successful!";
    
    setTimeout(() => {
      window.location.href = "products.html";
    }, 1000);
  } else {
    message.style.color = "red";
    message.textContent = "Please enter both email and password.";
  }
});
