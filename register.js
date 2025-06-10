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
