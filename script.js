import { items } from '/data.js';

const orderBtn = document.getElementById('order-btn');
const payBtn = document.getElementById('pay-btn');
const orderContainer = document.getElementById('order-container');
const modal = document.getElementById('modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const finalMessage = document.getElementById('final-message');
const paymentForm = document.getElementById('payment-form');


let orderedItems = [];

orderBtn.addEventListener('click', function(){
    modal.classList.remove('hidden');
})

modalCloseBtn.addEventListener('click', function(){
    modal.classList.add('hidden');
})

paymentForm.addEventListener('submit', function(e){
    e.preventDefault();
    const paymentFormData = new FormData(paymentForm);    
    const name = paymentFormData.get('name');
       
    modal.classList.add('hidden');
    orderContainer.style.display = 'none';       
    paymentForm.reset();

    finalMessage.innerHTML = `<p>Thanks ${name}! Your order is on its way!</p>`; 
    orderedItems = [];   
})

document.addEventListener('click', function(e) {
    if(e.target.dataset.add){
        handleAddBtn(e.target.dataset.add);
    } else if (e.target.dataset.indexNumber) {
        removeItems(e.target.dataset.indexNumber);
    }
})


function handleAddBtn(id) {
    finalMessage.innerHTML = '';
    orderContainer.style.display = 'flex';

    let targetItem = items.filter(function(item) {
        return item.uuid === id;
    })[0]

    if(!orderedItems.find((item) => item.uuid == targetItem.uuid)) {
         const newItem = {
            uuid: targetItem.uuid,
            name: targetItem.name,
            quantity: 1,
            price: targetItem.price,
          };
        orderedItems.push(newItem);
    } else {
        const temp = orderedItems.filter(
          (item) => item.uuid === targetItem.uuid
        )[0];
        temp.price = temp.price + temp.price / temp.quantity;
        temp.quantity++;
      }

    renderOrderItems();
    renderTotal()
}

function renderOrderItems() {
    const html = orderedItems.map((item, index) => {
        return `<div class="order-item">
                    <h3>${item.name}</h3>
                    <button type="button" class="remove-btn" data-index-number="${index}">remove</button>
                    <p class="order-price">$${item.price}</p>
                </div>
            `
        });
    
        document.getElementById('order-wrapper').innerHTML = html.join("");
    }


function renderTotal() {
    let totalPrice = 0;

    if (orderedItems.length === 0) {
        document.getElementById('total-price').innerText = `$0`;    
    }

    for (let i=0; i < orderedItems.length; i++) {
        totalPrice += orderedItems[i].price;
        document.getElementById('total-price').innerText = `$${totalPrice}`;    
    }   
}

function removeItems(index) {
    orderedItems.splice(index, 1)
    renderOrderItems();
    renderTotal();
  }

function getFeedHtml() {
    let feedHtml = ``;

    for (let item of items) {
        
        feedHtml += `
        <div class="menu-item">
            <div class="img-wrapper">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="description">
                <h3>${item.name}</h3>
                <p class="ingredients">${item.composition}</p>
                <p class="price">$${item.price}</p>
            </div>
            <div class="btn-wrapper">
                <button type="button" class="add-btn" data-add="${item.uuid}">+</button>
            </div>
        </div>
        <hr>
        `        
    }    
    return feedHtml;
}

function renderMenu () {
    document.getElementById('menu-container').innerHTML = getFeedHtml();
}

renderMenu();
