document.getElementById("register-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const message = document.getElementById("message");

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    message.style.color = "red";
    message.textContent = "Please enter a valid email address.";
    return;
  }

  // Check for empty fields
  if (!name || !email || !password || !confirmPassword) {
    message.style.color = "red";
    message.textContent = "Please fill in all fields.";
    return;
  }

  // Validate password length
  if (password.length < 8) {
    message.style.color = "red";
    message.textContent = "Password must be at least 8 characters long.";
    return;
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    message.style.color = "red";
    message.textContent = "Passwords do not match!";
    return;
  }

  // All validations passed — ready for backend integration
  message.style.color = "green";
  message.textContent = "Account created successfully! Redirecting...";

  // Simulated redirect after "registration"
  setTimeout(() => {
    window.location.href = "login.html";
  }, 1000);
});
