// PRODUCT LIST
const products = [
  {id:1, name:"Smartphone", category:"electronics", price:12000, img:"https://via.placeholder.com/300x220?text=Smartphone"},
  {id:2, name:"Laptop", category:"electronics", price:45000, img:"https://via.placeholder.com/300x220?text=Laptop"},
  {id:3, name:"T-Shirt", category:"fashion", price:2000, img:"https://via.placeholder.com/300x220?text=T-Shirt"},
  {id:4, name:"Sofa", category:"home", price:25000, img:"https://via.placeholder.com/300x220?text=Sofa"},
  {id:5, name:"Headphones", category:"electronics", price:5000, img:"https://via.placeholder.com/300x220?text=Headphones"},
  {id:6, name:"Dress", category:"fashion", price:7000, img:"https://via.placeholder.com/300x220?text=Dress"},
  {id:7, name:"Coffee Table", category:"home", price:15000, img:"https://via.placeholder.com/300x220?text=Coffee+Table"}
];

const productGrid = document.querySelector(".product-grid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");
const priceValue = document.getElementById("priceValue");
const sortSelect = document.getElementById("sortSelect");

// DISPLAY PRODUCTS
function displayProducts(list) {
  if (!productGrid) return;

  productGrid.innerHTML = list.map(p => `
    <div class="product-card">
      <img src="${p.img}" alt="${p.name}">
      <h4>${p.name}</h4>
      <p class="price">₦${p.price.toLocaleString()}</p>
      <button class="add-btn" onclick='addToCart(${JSON.stringify(p)})'>Add to Cart</button>
    </div>
  `).join('');
}

displayProducts(products);

// PRICE DISPLAY
if (priceValue) priceValue.textContent = priceFilter.value;

// FILTER + SORT FUNCTION
function filterProducts() {
  let filtered = products.filter(p =>
    (!searchInput || p.name.toLowerCase().includes(searchInput.value.toLowerCase())) &&
    (!categoryFilter || categoryFilter.value === "all" || p.category === categoryFilter.value) &&
    (!priceFilter || p.price <= parseInt(priceFilter.value))
  );

  switch (sortSelect.value) {
    case "low-high": filtered.sort((a, b) => a.price - b.price); break;
    case "high-low": filtered.sort((a, b) => b.price - a.price); break;
    case "az": filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
    case "za": filtered.sort((a, b) => b.name.localeCompare(a.name)); break;
  }

  displayProducts(filtered);
}

// EVENT LISTENERS
if (searchInput) searchInput.addEventListener("input", filterProducts);
if (categoryFilter) categoryFilter.addEventListener("change", filterProducts);
if (priceFilter) {
  priceFilter.addEventListener("input", () => {
    priceValue.textContent = priceFilter.value;
    filterProducts();
  });
}
if (sortSelect) sortSelect.addEventListener("change", filterProducts);
