const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const closeCart = document.getElementById("close-cart");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");
const cartCount = document.getElementById("cart-count");

let cart = [];

document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.onclick = () => {
        const name = btn.dataset.name;
        const price = Number(btn.dataset.price);

        cart.push({ name, price });
        updateCart();
    }
});

function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price;
        cartItems.innerHTML += `<li>${item.name} — ${item.price} ₽</li>`;
    });

    totalPrice.textContent = total;
    cartCount.textContent = cart.length;
}

cartBtn.onclick = () => cartModal.style.display = "flex";
closeCart.onclick = () => cartModal.style.display = "none";

window.onclick = e => {
    if (e.target === cartModal) cartModal.style.display = "none";
};


const searchInput = document.getElementById("searchInput");
const products = document.querySelectorAll(".product");

searchInput.addEventListener("keyup", () => {
    const text = searchInput.value.toLowerCase();

    products.forEach(p => {
        const name = p.querySelector("h3").textContent.toLowerCase();
        p.style.display = name.includes(text) ? "block" : "none";
    });
});

const typeFilter = document.getElementById("typeFilter");
const priceFilter = document.getElementById("priceFilter");

function applyFilters() {
    products.forEach(product => {
        const type = product.dataset.type;
        const price = Number(product.dataset.price);

        const typeSelected = typeFilter.value;
        const priceSelected = priceFilter.value;

        let typeMatch = (typeSelected === "all" || typeSelected === type);
        let priceMatch = false;

        if (priceSelected === "all") priceMatch = true;
        if (priceSelected === "low" && price < 1000) priceMatch = true;
        if (priceSelected === "mid" && price >= 1000 && price <= 3000) priceMatch = true;
        if (priceSelected === "high" && price > 3000) priceMatch = true;

        product.style.display = (typeMatch && priceMatch) ? "block" : "none";
    });
}

typeFilter.onchange = applyFilters;
priceFilter.onchange = applyFilters;
