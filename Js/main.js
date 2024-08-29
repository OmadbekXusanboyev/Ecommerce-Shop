const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#close-cart");
const darkmode = document.querySelector(".darkmode");
const body = document.querySelector("body");
const dark = document.querySelector(".bx-moon");




darkmode.addEventListener("click", () => {
  body.classList.toggle("active");
  if (dark.classList.contains("bx-moon")) {
    dark.classList.remove("bx-moon");
    dark.classList.add("bx-sun");
  } else {
    dark.classList.add("bx-moon");
    dark.classList.remove("bx-sun");
  }
});



// Open Cart
cartIcon.onclick = () => {
  cart.classList.add("active");
};
closeCart.onclick = () => {
  cart.classList.remove("active");
};

// Cart Working JS
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// Making Function
function ready() {
  const removeCartButtons = document.getElementsByClassName("cart-remove");
  for (let button of removeCartButtons) {
    button.addEventListener("click", removeCartItem);
  }
  const quantityInputs = document.getElementsByClassName("cart-quantity");
  for (let input of quantityInputs) {
    input.addEventListener("change", quantityChanged);
  }
  // add cart
  const addCart = document.getElementsByClassName("add-cart");
  for (let button of addCart) {
    button.addEventListener("click", addCartClicked);
  }
  // Buy Button Work
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}

// Buy Button
function buyButtonClicked() {
  alert("Your Order Is Placed"); 
  let cartContent = document.querySelector(".cart-content");
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updateTotal();
}

function removeCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest('.cart-box').remove();
  updateTotal();
}

function quantityChanged(event) {
  const input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

// add to cart
function addCartClicked(event) {
  const button = event.target;
  const shopProducts = button.closest('.product-box');
  const title = shopProducts.querySelector(".product-title").innerText;
  const price = shopProducts.querySelector(".price").innerText;
  const productImg = shopProducts.querySelector(".product-img").src;
  addProductToCart(title, price, productImg);
  updateTotal();
}

function addProductToCart(title, price, productImg) {
  const cartContent = document.querySelector(".cart-content");
  const cartItemsNames = cartContent.getElementsByClassName("cart-product-title");
  
  for (let cartItemName of cartItemsNames) {
    if (cartItemName.innerText === title) {
      alert("You have already added this item to cart");
      return;
    }
  }

  const cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  
  const cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    <i class='bx bxs-trash-alt cart-remove'></i>`;
  
  cartShopBox.innerHTML = cartBoxContent;
  cartContent.append(cartShopBox);
  
  cartShopBox.querySelector(".cart-remove").addEventListener("click", removeCartItem);
  cartShopBox.querySelector(".cart-quantity").addEventListener("change", quantityChanged);
}

// Update total
function updateTotal() {
  const cartContent = document.querySelector(".cart-content");
  const cartBoxes = cartContent.getElementsByClassName("cart-box");
  let total = 0;
  
  for (let cartBox of cartBoxes) {
    const priceElement = cartBox.querySelector(".cart-price");
    const quantityElement = cartBox.querySelector(".cart-quantity");
    const price = parseFloat(priceElement.innerText.replace("$", ""));
    const quantity = quantityElement.value;
    total += price * quantity;
  }
  
  total = Math.round(total * 100) / 100;
  document.querySelector(".total-price").innerText = "$" + total;
}