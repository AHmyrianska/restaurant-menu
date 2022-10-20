import { menuArray as data } from "./data.js";

const menuContainer = document.getElementById("menu");
const orderBtn = document.getElementById("order");
const payBtn = document.getElementById("pay-btn");
const modal = document.getElementById("modal");
const finalMessage = document.getElementById("final");

let cartItemsArray = [];

document.addEventListener("click", (e) => {
  if (e.target.dataset.add) {
    addItemToCart(e.target.dataset.add);
  } else if (e.target.dataset.remove) {
    removeFromCart(e.target.dataset.remove);
  }
});

function getMenuItems() {
  let menuItem = "";

  data.forEach((item) => {
    menuItem += `
    <div class="item-container">
        <div class="item-img">
            <img src=${item.img} alt="image of pizza slice" />
        </div>

        <div class="item-details">
            <h3>${item.name}</h3>
            <p>${item.ingredients}</p>
            <h4>$${item.price}</h4>
        </div>

        <div class="item-add" data-add=${item.id}>
            <p data-add=${item.id}>+</p>
        </div>
    </div>
          
        `;
  });

  return menuItem;
}

function render() {
  let menu = getMenuItems();

  menuContainer.innerHTML = menu;
}

render();

function getCartItems() {
  let cartItem = "";

  cartItemsArray.forEach((item) => {
    cartItem += `
          <div class="cart-item">
           <div class="cart-item-details">  
              <p>${item.name}</p>
              <button class="remove-btn" data-remove=${item.id}> remove </button>
           </div>

           <div class="quantity-price">
               <p>qty. &nbsp; <button id="item-quantity"> ${item.quantity} </button> </p>
               <p id="item-total-price">$ ${item.price}</p>
            </div>
         </div>
        `;
  });

  return cartItem;
}

function renderCart() {
  let cartElem = getCartItems();
  const cart = document.getElementById("cart-item-container");
  cart.innerHTML = cartElem;

  if (cartItemsArray.length > 0) {
    document.getElementById("cart").classList.add("cart-visible");
  } else {
    document.getElementById("cart").classList.remove("cart-visible");
  }
}

renderCart();

function addItemToCart(id) {
  finalMessage.style.display = "none";

  const selectedItem = data.filter((item) => item.id == id)[0];

  if (!cartItemsArray.find((item) => item.id == selectedItem.id)) {
    const newItem = {
      id: selectedItem.id,
      name: selectedItem.name,
      quantity: 1,
      price: selectedItem.price,
    };

    cartItemsArray.push(newItem);
  } else {
    const temp = cartItemsArray.filter(
      (item) => item.id === selectedItem.id
    )[0];
    temp.price = temp.price + temp.price / temp.quantity;
    temp.quantity++;
  }
  updateTotal();
  renderCart();
}

function removeFromCart(id) {
  let temp = [];
  temp = cartItemsArray.filter((item) => item.id != id);
  cartItemsArray = temp;
  console.log(temp);
  renderCart();
}

function updateTotal() {
  const totalElem = document.getElementById("cart-total");

  const total = cartItemsArray.reduce((total, item) => {
    total += item.price;
    return total;
  }, 0);

  totalElem.textContent = `$ ${total}`;
}

orderBtn.addEventListener("click", proceedToPayment);

function proceedToPayment() {
  console.log(modal);
  modal.style.display = "block";
  modal.style.transform = "translateY(0)";
}

payBtn.addEventListener("click", finalPayment);

function finalPayment(e) {
  if (document.getElementById("user-name").value) {
    e.preventDefault();

    cartItemsArray = [];
    renderCart();

    const formData = new FormData(form);
    modal.style.transform = "translateY(-200%)";

    const name = document.getElementById("name-user");

    finalMessage.style.display = "flex";
    name.textContent = formData.get("name");

    form.reset();
  }
}
