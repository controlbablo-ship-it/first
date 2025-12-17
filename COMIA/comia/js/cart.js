// CART SYSTEM FOR COMIA

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("comia_cart")) || [];

// Save cart
function saveCart() {
    localStorage.setItem("comia_cart", JSON.stringify(cart));
}

// Add item to cart
function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    saveCart();
    updateCartCount();
}

// Update cart icon count
function updateCartCount() {
    const count = cart.reduce((t, item) => t + item.qty, 0);
    const badge = document.querySelector(".cart-count");

    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? "flex" : "none";
    }
}

// Remove item
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    displayCart();
    updateCartCount();
}

// Change quantity
function changeQty(id, type) {
    const item = cart.find(i => i.id === id);

    if (!item) return;

    if (type === "increase") item.qty++;
    if (type === "decrease" && item.qty > 1) item.qty--;

    saveCart();
    displayCart();
    updateCartCount();
}

// Display cart
function displayCart() {
    const cartBox = document.querySelector(".cart-items");
    const totalBox = document.querySelector(".cart-total");

    if (!cartBox || !totalBox) return;

    if (cart.length === 0) {
        cartBox.innerHTML = `<p class="empty">Your cart is empty.</p>`;
        totalBox.textContent = "₦0";
        return;
    }

    cartBox.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        let itemTotal = item.price * item.qty;
        total += itemTotal;

        cartBox.innerHTML += `
            <div class="cart-card">
                <img src="${item.img}" alt="">
                <div class="info">
                    <h4>${item.name}</h4>
                    <p>₦${item.price.toLocaleString()}</p>

                    <div class="qty-box">
                        <button onclick="changeQty('${item.id}', 'decrease')">-</button>
                        <span>${item.qty}</span>
                        <button onclick="changeQty('${item.id}', 'increase')">+</button>
                    </div>

                    <button class="remove" onclick="removeItem('${item.id}')">Remove</button>
                </div>
            </div>
        `;
    });

    totalBox.textContent = "₦" + total.toLocaleString();
}

// For cart.html only
window.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    displayCart();
});
