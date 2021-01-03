//start set up av allt

const express = require('express');
const bodyParser = require('body-parser');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const { request } = require('express');
const adapter = new FileSync('database.json');
const database = new lowdb(adapter);
const app = express();
const port = 8000;
app.use(express.static('otherfiles'));
app.use(bodyParser.json());

// se till att servern fungerar
app.listen(port, () => {
    console.log('Wohoooo server startad');
});

// visar i min terminal vad jag requestar
app.use((request, response, next) => {
    console.log('A new request: ', request.url);
    next();
});



// hämtar alla mina produkter i min databas
app.get('/api/products', (request, response) => {
    const products = database.get('products').value();
    //console.log(products);
    response.send(products);
});

// hämtar alla mina produkter i min cart
app.get('/api/cart', (request, response) => {
    const myCart = database.get('cart').value();
    //console.log(myCart);
    response.send(myCart);
});

// pushar in produkter från min cart
app.post('/api/cart', (request, response) => {
    const chosenProduct = request.body;

    //kollar ifall produkten finns i kollektionen
    if (checkProductsList(chosenProduct.id) == false) {
        response.send('NOT EXIST: the product doesnt exist in our collection');
        return;
    }

    //kollar ifall den redan finns i cart
    if (checkCartContainer(chosenProduct.id) == true) {
        response.send('ALREADY EXIST: the product is already in your cart.....');
        return;
    }

    //om det är ok att lägga till produkten vill jag pusha in den i min cart här
    database.get('cart').push(chosenProduct).write();
    response.send('ADDED: the chosen product is now added to the cart');
});

app.delete('/api/cart/:id', (request, response) => {
    const id = request.params.id;

    //kollar ifall den redan finns i cart
    if (checkCartContainer(id) == false) {
        response.send('PRODUCT CART NOT EXISTING: the product doesnt exist in your cart.....');
        return;
    }

    // om det är ok att ta bort produkten så raderas den från min cart här
    database.get('cart').remove({ id: parseInt(id) }).write();
    response.send('PRODUCT CART REMOVED: the chosen product is removed from the cart');
});


// försökte med "null" istället för "undefined" men det fungerade inte då...
function checkProductsList(chosenProductId) {
    return database.get('products').find({ id: parseInt(chosenProductId) }).value() !== undefined;
};

function checkCartContainer(chosenProductId) {
    return database.get('cart').find({ id: parseInt(chosenProductId) }).value() !== undefined;
};

// testar att pusha in något för att se om databaserna reagerar!
//console.log(database.get('products').push({ id:7, name:'Southhampton', price: 1200, image: 'https://placeimg.com/640/480/any' }).write());

