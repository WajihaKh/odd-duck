let state = {
    products: [],
    roundsRemaining: 25,
    productsConsidered: new Set(),

}
 
function Product(name, imageFile) {
    this.name = name;
    this.imageFile = imageFile;
    this.timeShown = 0;
    this.timesClicked = 0;
    state.products.push(this);
    state.productsConsidered.add(name);
}

function getRandomNumber() {
    return Math.floor(Math.random() * state.products.length);
}

function renderProduct() {
    let productImages = document.querySelectorAll('.products img');

    for (let i = 0; i < productImages.length; i++) {
        let randomNumber = getRandomNumber();
        productImages[i].src = state.products[randomNumber].imageFile;
        state.products[randomNumber].timeShown++;


        productImages[i].addEventListener('click', clickHandler);
        productImages[i].setAttribute('data-product-index', randomNumber);
    }
}

function clickHandler(event) {

    let productName = event.target.getAttribute('data-product-name');
    if (productName) {
        let clickedProduct;
        for (let i = 0; i < state.products.length; i++){
            if (state.product[i].name === productName) {
                clickedProduct = state.products[i];
                break;
            }
        }

        if (clickedProduct) {
            clickedProduct.timesClicked++;
            state.roundsRemaining--;
        }

            if (state.roundsRemaining === 0){
                alert('Voting session has ended. Thank you for participating!');
                
                let productImages = document.querySelectorAll('.products img');
                for (let j = 0; j < productImages.length; j++) {
                    productImages[j].removeEventListener('click', clickHandler);
                }        
            }
            renderProduct();
    }
}


let bag = new Product('bag', './img/bag.jpg');
let banana = new Product('banana', './img/banana.jpg');
let bathroom = new Product('bathroon', './img/bathroom.jpg');
let boots = new Product('boots', './img/boots.jpg');
let breakfast = new Product('breakfast', './img/breakfast.jpg');
let bubblegum = new Product('bubblegum', './img/bubblegum.jpg');
let chair = new Product('chair', './img/chair.jpg');
let cthulhu = new Product('cthulhu', './img/cthulhu.jpg');
let dogduck = new Product('dogduck', './img/dog-duck.jpg');
let dragon = new Product('dragon', './img/dragon.jpg');
let pen = new Product('pen', './img/pen.jpg');
let petsweep = new Product('petsweep', './img/pet-sweep.jpg');
let scissors = new Product('scissors', './img/scissors.jpg');
let shark = new Product('shark', './img/shark.jpg');
let sweep = new Product('sweep', './img/sweep.png');
let tauntaun = new Product('tauntaun', './img/tauntaun.jpg');
let unicorn = new Product('unicorn', './img/unicorn.jpg');
let watercan = new Product('watercan', './img/water-can.jpg');
let wineglass = new Product('wineglass', './img/wine-glass.jpg');

renderProduct();


