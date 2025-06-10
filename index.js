function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  const confirmPass = document.getElementById("confirmPassword").value;
  const message = document.getElementById("message");

  if (pass !== confirmPass) {
    message.textContent = "Passwords do not match!";
    return;
  }

  // Save to localStorage (temporary simulation)
  const user = {
    name: name,
    email: email,
    password: pass,
  };

  localStorage.setItem("user", JSON.stringify(user));
  message.style.color = "green";
  message.textContent = "Account created successfully!";

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1000);
}

// Auto-redirect to products if already logged in
if (localStorage.getItem("loggedInUser")) {
  window.location.href = "products.html";
}

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", () => {
  const usernameInput = document.getElementById("username").value.trim();

  if (!usernameInput) {
    alert("Please enter a username!");
    return;
  }

  // Simulate saving user (in real app you'd check against a backend)
  localStorage.setItem("loggedInUser", JSON.stringify({ username: usernameInput }));

  // Redirect to products
  window.location.href = "products.html";
});



