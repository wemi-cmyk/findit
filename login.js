function login() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  const message = document.getElementById("message");

  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser) {
    message.textContent = "No user found. Please register first.";
    return;
  }

  if (storedUser.email === email && storedUser.password === pass) {
    message.style.color = "green";
    message.textContent = "Login successful!";
    setTimeout(() => {
      window.location.href = "products.html";
    }, 1000);
  } else {
    message.textContent = "Incorrect email or password.";
  }
}

const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Simulated check
  if (email && password) {
    localStorage.setItem("loggedInUser", email);
    window.location.href = "products.html";
  } else {
    alert("Invalid login");
  }
});
