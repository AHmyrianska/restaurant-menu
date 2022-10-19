import { items } from '/data.js';

let orderedItems = [];

document.addEventListener('click', function(e) {
    if(e.target.dataset.add){
        handleAddBtn(e.target.dataset.add);
    } else if (e.target.dataset.indexNumber) {
        removeItems(e.target.dataset.indexNumber);
    }
})


function handleAddBtn(itemId) {
    let targetItem = items.filter(function(item) {
        return item.uuid === itemId;
    })[0]
    orderedItems.push(targetItem);
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
        document.getElementById('order-container').style.display = 'flex';
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
