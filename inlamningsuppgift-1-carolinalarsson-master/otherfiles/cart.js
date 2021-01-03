////starts the cart page, the function is called in the end of this page
async function getCartContent() {
    const response = await fetch('http://localhost:8000/api/cart');
    const products = await response.json();
    console.log(products);
    showProducts(products);
};

//loop thorugh all the carts products
function showProducts(products) {
    const productsWrapperElem = document.querySelector('#showProductsHere');
    productsWrapperElem.innerHTML = ''; 

    // Go through all of the products
    for (let product of products) {
        // Creates all the elements
        const productDiv = document.createElement('div');

        productDiv.setAttribute('class', 'data-product', JSON.stringify(product))

        const imageElem = document.createElement('img');   
        imageElem.src = product.image;
        productDiv.appendChild(imageElem);

        const productElem = document.createElement('h2');
        productElem.innerHTML = product.name;
        console.log(product.name);
        productDiv.appendChild(productElem);

        const priceElem = document.createElement('h3');
        priceElem.innerHTML = 'Price: ' + product.price;
        console.log(product.price);
        productDiv.appendChild(priceElem);

        const prodButton = document.createElement('button');
        productDiv.setAttribute('id', 'removeButton');
        prodButton.innerHTML = 'Remove me from cart';
        productDiv.appendChild(prodButton);

        productsWrapperElem.append(productDiv);

        // when I click on the button to remove the product from my cart
        prodButton.addEventListener('click', function() {
          
            const theProduct = product.id;
            console.log(theProduct); //denna post är korrekt med all data
            removeProductFromCart(theProduct);
        });
    }
}

//removes the product with help of the products ID and then reloads the page
async function removeProductFromCart(theProduct) {
  
    const response = await fetch('http://localhost:8000/api/cart/' + theProduct, 
    {
        method: 'DELETE',
        //body: JSON.stringify(theProduct),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    location.reload();
}



getCartContent();
