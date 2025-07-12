// 🛠️ Mock Product List
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

// 🧺 Simulated cart stored in memory
const cart = [];

// 🧱 Render product cards
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

// 🔍 Filter by search bar
function filterProducts() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(query)
  );
  displayProducts(filtered);
}

// 🛒 Add item to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartCount();
  alert(`${product.name} added to cart! 🛒`);
}

// 🔄 Update cart icon count
function updateCartCount() {
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  const counter = document.getElementById("cartCounter");
  if (counter) counter.textContent = `🛒 ${total}`;
}

// ➡️ Simulated cart navigation
function goToCart() {
  alert("Going to cart");
  window.location.href = "cart.html"; // You can create this page next
}

// 🧹 Simulated logout
function logout() {
  alert("Logging out...");
  window.location.href = "login.html";
}

// 🚀 On Load
displayProducts(products);
updateCartCount();
