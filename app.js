// Products data
const products = [
    { name: "Off_White Kurta", price: 2500, image: "Off_White Kurta.webp" },
    { name: "Greenish Kurta", price: 2300, image: "Greenish Kurta.webp" },
    { name: "Light Blue Kurta", price: 2000, image: "Light blue Kurta.webp" },
    { name: "Black Suit", price: 4000, image: "Black Suit.webp" },
    { name: "Dark Blue Suit", price: 4500, image: "Dark Blue Suit.webp" },
    { name: "Pista Suit", price: 4200, image: "Pista Suit.webp" },
    { name: "Black Long Frock", price: 2000, image: "Black long Frock.webp" },
    { name: "Pink Long Frock", price: 2000, image: "Pink long Frock.webp" },
    { name: "Multi Frock", price: 2000, image: "Multi Frock.webp" },
];

// Home page rendering
const container = document.getElementById("productsContainer");

// Render products if on home page
if (container) {
    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-list";

        card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <p>${product.name}</p>
      <p class="price">Rs. ${product.price} PKR</p>
      <button>Add to Bag</button>
    `;

        container.appendChild(card);
    });
}


// Cart count logic
const cartCount = document.getElementById("cart-count");
let count = parseInt(localStorage.getItem("cartCount")) || 0;

if (cartCount) {
    cartCount.textContent = count;
}

// Add to Cart functionality
if (container) {
    container.addEventListener("click", function (e) {
        if (e.target.tagName === "BUTTON") {
            const card = e.target.closest(".product-list");
            const name = card.querySelector("p").innerText;
            const priceText = card.querySelector(".price").innerText;
            const price = parseInt(priceText.replace("Rs. ", "").replace("PKR", "").trim());
            const image = card.querySelector("img").getAttribute("src");

            // Get cart from localStorage or initialize
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            // Check if product exists
            const existing = cart.find(p => p.name === name);
            if (existing) {
                existing.quantity++;
            } else {
                cart.push({ name, price, image, quantity: 1 });
            }

            // Save updated cart
            localStorage.setItem("cart", JSON.stringify(cart));

            // Update cart count
            count++;
            cartCount.textContent = count;
            localStorage.setItem("cartCount", count);
        }
    });
}

// Cart page logic

const cartItemsContainer = document.getElementById("cart-items");
const totalQuantity = document.getElementById("total-quantity");
const totalPrice = document.getElementById("total-price");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = "";
    let totalQty = 0;
    let total = 0;

    cart.forEach(item => {
        totalQty += item.quantity;
        total += item.price * item.quantity;

        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
      <div class="item-details" style="display: flex; align-items: center;">
        <img src="${item.image}" alt="${item.name}" style="width: 80px; height: auto; margin-right: 10px;">
        <div>
          <p><strong>${item.name}</strong></p>
          <p>Rs. ${item.price}</p>
          <div class="quantity-controls">
            <button onclick="decreaseQty('${item.name}')">-</button>
            <span>${item.quantity}</span>
            <button onclick="increaseQty('${item.name}')">+</button>
          </div>
        </div>
      </div>
      <p>Rs. ${item.price * item.quantity}</p>
    `;
        cartItemsContainer.appendChild(div);
    });

    totalQuantity.textContent = totalQty;
    totalPrice.textContent = total;

    // Save updated cart
    localStorage.setItem("cart", JSON.stringify(cart));
}

function increaseQty(name) {
    const item = cart.find(p => p.name === name);
    if (item) {
        item.quantity++;
    }
    renderCart();
}

function decreaseQty(name) {
    const item = cart.find(p => p.name === name);
    if (item) {
        item.quantity--;
        if (item.quantity === 0) {
            cart = cart.filter(p => p.name !== name);
        }
    }
    renderCart();
}

// Render cart on page load if cart page
renderCart();


