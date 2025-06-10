function goToProducts() {
  window.location.href = "products.html";
}

function goToCart() {
  window.location.href = "cart.html";
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItemsDiv = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");
const checkoutBtn = document.getElementById("checkoutBtn");

function displayCart() {
  cartItemsDiv.innerHTML = "";
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty!</p>";
    totalPriceEl.textContent = "";
    checkoutBtn.style.display = "none";
    return;
  }

  checkoutBtn.style.display = "block";

  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" width="80" />
      <div>
        <h4>${item.name}</h4>
        <p>Price: ZMW ${item.price}</p>
        <p>
          Quantity: 
          <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)" />
        </p>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
    cartItemsDiv.appendChild(itemDiv);
  });

  updateTotal();
}

function updateQuantity(index, value) {
  const qty = parseInt(value);
  if (qty < 1) return;
  cart[index].quantity = qty;
  localStorage.setItem("cart", JSON.stringify(cart));
  updateTotal();
  updateCartCount();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

function updateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalPriceEl.textContent = `Total: ZMW ${total.toFixed(2)}`;
}

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Redirect to payment page instead of showing thank you
  window.location.href = "pay.html";
});


function updateCartCount() {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const counter = document.querySelector(".cart-counter");
  if (counter) {
    counter.textContent = `🛒 ${totalItems}`;
  }
}

displayCart();
updateCartCount();

