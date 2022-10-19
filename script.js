import { items } from '/data.js';

let orderedArr = [];

document.addEventListener('click', function(e) {
    if(e.target.dataset.add){
        handleAddBtn(e.target.dataset.add);
    }
})

function handleAddBtn(itemId) {
    let targetItem = items.filter(function(item) {
        return item.uuid === itemId;
    })[0]

    orderedArr.push(targetItem);

    renderOrder(orderedArr) 
}

function renderOrder(list) {
    let orderedItem = document.createElement('div');
    orderedItem.classList.add('ordered-item');

    let totalPrice = 0;

    for (let item of list) {
        orderedItem.innerHTML = `
            <div class="order-item">
                <h3>${item.name}</h3>
                <p class="remove">remove</p>
                <p class="price">$${item.price}</p>
            </div>
        `

        totalPrice += item.price;
        document.getElementById('total-price').innerText = `$${totalPrice}`;

        document.getElementById('order-wrapper').append(orderedItem);
    }

    document.getElementById('order-container').style.display = 'flex';
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


