//starts the product page, the function is called in the end of this page
async function getProducts() {
    const response = await fetch('http://localhost:8000/api/products');
    const products = await response.json();
    console.log(products);
    showProducts(products);
};

//loop thorugh all the webpages products
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
        productDiv.setAttribute('id', 'addButton');
        prodButton.innerHTML = 'Add me to cart';
        productDiv.appendChild(prodButton);

        productsWrapperElem.append(productDiv);

        //when I click the add button I send the product to the fetch function below to my cart and then
         //it turnes disabled and grey so the user cant click it again
        prodButton.addEventListener('click', function() {
          
            const theProduct = product;
            console.log(theProduct); //denna post är korrekt med all data
            postProductToCart(theProduct);
            prodButton.innerHTML = 'ADDED';
            prodButton.disabled = true;
            prodButton.style.backgroundColor = "grey";
            prodButton.style.cursor = "default";
        });
    }
}

// the fetch function to add the product to my cart
async function postProductToCart(theProduct) {
  
  const response = await fetch('http://localhost:8000/api/cart', 
  {
      method: 'POST',
      body: JSON.stringify(theProduct),
      headers: {
          'Content-Type': 'application/json'
      }
  });

}

getProducts();
