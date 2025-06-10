const products = [
  {
    id: 1,
    name: "Broom",
    price: 30,
    image: "https://i.ibb.co/Np1J2J5/broom.png",
  },
  {
    id: 2,
    name: "Mop",
    price: 45,
    image: "https://i.ibb.co/TWzqT1h/mop.png",
  },
  {
    id: 3,
    name: "Box of Nails",
    price: 25,
    image: "https://i.ibb.co/mbHFq6T/nails.png",
  },
  {
    id: 4,
    name: "Paint Brush",
    price: 15,
    image: "https://i.ibb.co/bHK99T1/brush.png",
  }
];

// Display products
function displayProducts(list) {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";
  list.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>ZMW ${product.price}</p>
    `;
    grid.appendChild(card);
  });
}

// Filter by search input
function filterProducts() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(query)
  );
  displayProducts(filtered);
}



// Call on load
displayProducts(products);

// Optional logout
function logout() {
  localStorage.removeItem("user");
}

// add on 
const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
  window.location.href = "login.html";
}

// Show welcome message only once
if (!sessionStorage.getItem("welcomed")) {
  alert(`Welcome to FindIT, ${user.name}!`);
  sessionStorage.setItem("welcomed", "true");
}

//cart stuff
function displayProducts(list) {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";
  list.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>ZMW ${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    grid.appendChild(card);
  });
}

const cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  // Check if product is already in cart
  const cartItem = cart.find(item => item.id === productId);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({...product, quantity: 1});
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart! 🛒`);
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  document.getElementById("cartCounter").textContent = `🛒 ${totalItems}`;
}

// Call this on page load and after adding to cart
updateCartCount();
function goToCart() {
  window.location.href = "cart.html"; // Link to cart page
}

// Update cart count function, call on page load and after addToCart
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  document.getElementById("cartCounter").textContent = `🛒 ${totalItems}`;
}

// Call this on page load
updateCartCount();

// Modify addToCart to update count after adding:
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartItem = cart.find(item => item.id === productId);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({...product, quantity: 1});
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart! 🛒`);

  updateCartCount(); // <-- update count right after adding
}
