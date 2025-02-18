"use strict";
let brwoseCategoryButton = document.querySelector(".buttom_header .container .category_nav .category_button");
let categoryNavList = document.querySelector(".buttom_header .container .category_nav .category_nav_list");
if (brwoseCategoryButton !== null) {
    brwoseCategoryButton.addEventListener("click", function () {
        if (categoryNavList !== null) {
            if (!categoryNavList.classList.contains("active"))
                categoryNavList.classList.add("active");
            else
                categoryNavList.classList.remove("active");
        }
    });
}

let dateSpan = document.getElementById("date");
dateSpan.innerHTML = (new Date()).getFullYear();

let cart = document.querySelector(".cart");
let xButton = document.querySelector(".cart .top_cart .close_cart i");
let shopIcon = document.getElementById("shopIcon");
let showMore = document.querySelector(".trans_bg");


xButton.onclick = function(){
    cart.classList.remove("active")
}
shopIcon.onclick = function(){
    cart.classList.add("active")
}
showMore.onclick = function(){
    cart.classList.remove("active")
}


let deleteItemButton = [];
let card;
let itemsInCart = document.getElementById("cart_items");
let checkout_items = document.getElementById("checkout_items");
let cartStorage = JSON.parse(localStorage.getItem('cart')) || [];
let addToCartButton;
let itemsNumberInCart = document.querySelector(".Count_item_Cart");
let itemsNumberInCartIcon = document.querySelector(".count_item_header");
let price_cart_total_number = document.querySelector(".price_cart_total_number");
let price_cart_total = 0;
cartStorage.forEach((cart) => {
    price_cart_total += cart.valueOf().quantity * cart.valueOf().price;
})
let price_cart_subTotal_checkout_page = document.querySelector(".subtotal_checkout");
let price_cart_total_ceckout_page = document.querySelector(".total_checkout");

function updateitemsNumberInCart(){
    itemsNumberInCart.innerHTML = itemsInCart.children.length;
    itemsNumberInCartIcon.innerHTML = itemsInCart.children.length
}

let addToCartFunction = function(product, place){
    let quantityFromStorage;
    if(place === 2)
    {
        cartStorage.push({...product, quantity: 1})
        localStorage.setItem('cart', JSON.stringify(cartStorage));
    }else if(place === 1){
        cartStorage.forEach(cartt => {
            if(cartt.valueOf().id == product.id){
                quantityFromStorage = cartt.valueOf().quantity;
            }
        })
    }
    itemsInCart.innerHTML += `
    <div class="item_cart" item_id='${product.id}'>
        <img src=${product.img} alt="">
        <div class="content">
            <h4>${product.name}</h4>
            <p class="price_cart">$${product.price}</p>
            <div class="quantity_control">
                <button class="decrease_quantity" cardId=${product.id}>-</button>
                <span class="quantity">${place == 2? 1: quantityFromStorage}</span>
                <button class="increase_quantity" cardId=${product.id}>+</button>
            </div>
        </div>
        <button class="delete_item"><i class="fa-solid fa-trash-can"></i></button>
    </div>
    `;
    updateitemsNumberInCart();
    if(place !== 1)
    {
        price_cart_total += product.price;
        price_cart_total_number.innerHTML = `$${price_cart_total}`;
        if(price_cart_subTotal_checkout_page)
        {
            price_cart_subTotal_checkout_page.innerHTML =`$${price_cart_total}`;
            price_cart_total_ceckout_page.innerHTML =`$${price_cart_total + 20}`;
        }
    }


    if(price_cart_subTotal_checkout_page){
        let items_input = document.getElementById("items");
        let total_price_input = document.getElementById("total_price")
        let count_items_input = document.getElementById("count_items")


        items_input.value += product.name + "  ---  " + "price : " + product.price * product.quantity + " --- " + "count : " + product.quantity + "\n";

        total_price_input.value = price_cart_total + 20;
        
    }

    // Add Elements To Card In CheckOut Page
    if(checkout_items){
        checkout_items.innerHTML += `
        <div class="item_cart page2" item_id="${product.id}">

            <div class="image_name">
                <img src=${product.img} alt="">
                <div class="content">
                    <h4>${product.name}</h4>
                    <p class="price_cart">$${product.price}</p>
                    <div class="quantity_control">
                        <button class="decrease_quantity" cardId=${product.id}>-</button>
                        <span class="quantity">${place == 2? 1: quantityFromStorage}</span>
                        <button class="increase_quantity" cardId=${product.id}>+</button>

                    </div>
                </div>
            </div>
            <button class="delete_item"><i class="fa-solid fa-trash-can"></i></button>
        </div>
        `
    }
    
    deleteItemButton = document.querySelectorAll(`button.delete_item`);
    deleteItemButton.forEach(deletButton => {
        deletButton.onclick = function(){
            let page = 1;
            if(this.parentElement.classList.contains("page2"))
                page = 2;

            let cardToDelete = this.parentElement;

            console.log(this);
            console.log(page)
            if(page === 1)
                itemsInCart.removeChild(cardToDelete);
            else if(page === 2)
                checkout_items.removeChild(cardToDelete);

            for(let i = 0; i < cartStorage.length; i++)
            {
                if(cartStorage.at(i).valueOf().id == this.parentElement.getAttribute("item_id"))
                {
                    price_cart_total -= cartStorage.at(i).valueOf().price * cartStorage.at(i).valueOf().quantity;
                    price_cart_total_number.innerHTML = `$${price_cart_total}`
                    if(price_cart_subTotal_checkout_page)
                        {
                            price_cart_subTotal_checkout_page.innerHTML =`$${price_cart_total}`;
                            price_cart_total_ceckout_page.innerHTML =`$${price_cart_total + 20}`;
                        }
                    cartStorage = cartStorage.filter(element => element != cartStorage.at(i))
                    localStorage.setItem('cart', JSON.stringify(cartStorage));
                    addToCartButton.forEach(addButton => {
                        if(addButton.getAttribute("btn_id") == this.parentElement.getAttribute("item_id"))
                        {
                            addButton.classList.remove("active")
                            let text = addButton.querySelector(".textInAddToCartButton");
                            text.innerHTML = "Add To Cart";
                        }
                    })

                }
            }
            updateitemsNumberInCart();

        }
    })
    // ${product.id}
    

}
// add products in cart in application start
let cartItemsFromStorage = JSON.parse(localStorage.getItem('cart'));
itemsInCart.innerHTML = "";
if(cartItemsFromStorage)
{
    cartItemsFromStorage.forEach(item => {
        addToCartFunction(item.valueOf(), 1)
    })
}
IncreaseDecreaseItems();
updateitemsNumberInCart();

const increaseButtons = document.querySelectorAll(`.increase_quantity`);
increaseButtons.forEach(increaseButtons => {
        updatePrice(0, increaseButtons)
    })


function updatePrice(source, event){
    if(source === 0)
        event.target = event;
    for(let i = 0; i < cartStorage.length; i++){
        if(cartStorage.at(i).valueOf().id == event.target.getAttribute("cardId"))
        {
            if((cartStorage.at(i).valueOf().quantity > 1 && source === 2) || (source === 1) || (source === 0))
            {
                if(source === 1)
                    cartStorage.at(i).valueOf().quantity++;
                else if(source === 2)
                {
                    cartStorage.at(i).valueOf().quantity--;
                }
                localStorage.setItem('cart', JSON.stringify(cartStorage));
    
                let quantityShown = event.target.parentElement.querySelector(".quantity");
                quantityShown.innerHTML = cartStorage.at(i).valueOf().quantity;
                let price_cart = event.target.parentElement.parentElement.querySelector(".price_cart");
                price_cart.innerHTML = "$" + cartStorage.at(i).valueOf().quantity * cartStorage.at(i).valueOf().price;
            
                if(source === 1)
                    price_cart_total += cartStorage.at(i).valueOf().price;
                else if(source === 2)
                    price_cart_total -= cartStorage.at(i).valueOf().price;
            
                price_cart_total_number.innerHTML = `$${price_cart_total}`
                if(price_cart_subTotal_checkout_page)
                    {
                        price_cart_subTotal_checkout_page.innerHTML =`$${price_cart_total}`;
                        price_cart_total_ceckout_page.innerHTML =`$${price_cart_total + 20}`;
                    }                
                }
            }
    }


}
// add products in cart and remove them
function IncreaseDecreaseItems(){
    const increaseButtons = document.querySelectorAll(`.increase_quantity`);

    increaseButtons.forEach(increaseButtons => {
        increaseButtons.addEventListener("click", (event) => {
            updatePrice(1, event)
        })
    })

    const decreaseButtons = document.querySelectorAll(`.decrease_quantity`);

    decreaseButtons.forEach(decreaseButtons => {
        decreaseButtons.addEventListener("click", (event) => {
            updatePrice(2, event)
        })
    })

}


fetch("products.json")
.then(response => response.json())
.then(data => {
    addToCartButton = document.querySelectorAll(".btn_add_cart");
    for(let i = 0; i < addToCartButton.length; i++)
    {
        for(let j = 0; j < cartStorage.length; j++)
        {
            if(cartStorage.at(j).valueOf().id == addToCartButton[i].getAttribute("btn_id"))
            {
                addToCartButton[i].classList.add("active");

                let text = addToCartButton[i].querySelector(".textInAddToCartButton");
                text.innerHTML = "Item In Cart";
            }
        }
        addToCartButton[i].addEventListener("click", function(ev){
            for(let j = 0; j < addToCartButton.length; j++)
                {
                    if(ev.target.getAttribute("btn_id")== addToCartButton[j].getAttribute("btn_id"))
                    {
                        addToCartButton[j].classList.add("active");

                        let text = addToCartButton[j].querySelector(".textInAddToCartButton");
                        text.innerHTML = "Item In Cart";
                    }
                }
            let product;
            for(let i = 0; i < data.length; i++)
                if(data.at(i).valueOf().id == ev.target.getAttribute("btn_id"))
                    product = data.at(i).valueOf();   
            addToCartFunction(product, 2);
            IncreaseDecreaseItems();
        })
    }
})



let navLinks = document.querySelector(".nav_links");
let openMenuButton = document.querySelector(".open_menu");
let closeMenuButton = document.querySelector(".close_menu");

openMenuButton.onclick = function(){
    navLinks.classList.add("active");
}
closeMenuButton.onclick = function(){
    navLinks.classList.remove("active");
}