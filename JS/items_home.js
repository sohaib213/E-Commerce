function addElement(product){
    let Discount = '';
    if(product.old_price)
    {
        const precentDiscount = Math.floor(((product.old_price - product.price) / product.old_price) * 100)
        Discount = `<span class="sale_present">${precentDiscount}%</span>`
    }
    return `
                    <div class="swiper-slide product">
                        ${Discount}
                        <div class="img_product">
                            <a href="#"><img src="${product.img}" alt=""></a>
                        </div>
                        <div class="stars">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>

                        <p class="name_product"><a href="#">${product.name}</a></p>

                        <div class="price">
                            <p><span>$${product.price}</span></p>
                            ${product.old_price? `<p class="old_price">$${product.old_price}</p>` : ''}
                        </div>

                        <div class="icons">
                            <span class="btn_add_cart" btn_id="${product.id}">
                                <i class="fa-solid fa-cart-shopping"></i>
                                <p class="textInAddToCartButton"> add to cart </p>
                            </span>
                            <span class="icon_product"><i class="fa-regular fa-heart"></i></span>
                        </div>
                    </div>
            `
}


fetch('products.json')
.then(response => response.json())
.then(data => {
    
    const swiper_items_sale = document.getElementById("swiper_items_sale");
    const swiper_items_mobile = document.getElementById("swiper_items_mobile");
    const swiper_items_electronics = document.getElementById("swiper_items_electronics");
    const swiper_items_appliances = document.getElementById("swiper_items_appliances");

    data.forEach(product => {
        // sale category
        if(product.old_price)
        {
            const precentDiscount = Math.floor(((product.old_price - product.price) / product.old_price) * 100)

            swiper_items_sale.innerHTML += `
            
                    <div class="swiper-slide product">
                        <span class="sale_present">${precentDiscount}%</span>
                        <div class="img_product">
                            <a href="#"><img src="${product.img}" alt=""></a>
                        </div>
                        <div class="stars">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>

                        <p class="name_product"><a href="#">${product.name}</a></p>

                        <div class="price">
                            <p><span>$${product.price}</span></p>
                            <p class="old_price">$${product.old_price}</p>
                        </div>

                        <div class="icons">
                            <span class="btn_add_cart" btn_id="${product.id}">
                                <i class="fa-solid fa-cart-shopping"></i>
                                <p class="textInAddToCartButton"> add to cart </p>
                            </span>
                            <span class="icon_product"><i class="fa-regular fa-heart"></i></span>
                        </div>
                    </div>
            
            `
        }
        // mobile category
        if(product.catetory === "mobiles"){
            swiper_items_mobile.innerHTML += addElement(product);
        }
        // electronics category
        if(product.catetory === "electronics"){
            swiper_items_electronics.innerHTML += addElement(product);
        }
        // Appliances category
        if(product.catetory === "appliances"){
            swiper_items_appliances.innerHTML += addElement(product);
        }
    });

    
})

