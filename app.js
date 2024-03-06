let state = {
  products: [],
  roundsRemaining: 25,

};

let sectionElem = document.getElementById('results');

function Product(name, imageFile) {
  this.name = name;
  this.imageFile = imageFile;
  this.timeShown = 0;
  this.timesClicked = 0;
  state.products.push(this);
}

function getRandomNumber() {
  return Math.floor(Math.random() * state.products.length);
}

let previousProducts = [];

function generateRandomProducts() {
  let randomProducts = [];
  do {
    randomProducts = [
      state.products[getRandomNumber()],
      state.products[getRandomNumber()],
      state.products[getRandomNumber()]
    ];
  } while (checkForDuplicates(randomProducts, previousProducts));
  return randomProducts;
}

function checkForDuplicates(array1, array2) {
  for(let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (array1[i] === array2[j]) {
        return true;
      }
    }
  }
  return false;
}


function renderProduct() {
  let productImages = document.querySelectorAll('.products img');
  let randomProducts = generateRandomProducts();

  previousProducts = randomProducts;

  for (let i = 0; i < productImages.length; i++) {
    console.log(productImages);
    productImages[i].src = randomProducts[i].imageFile;
    productImages[i].alt = randomProducts[i].name;
    randomProducts[i].timeShown++;
    productImages[i].addEventListener('click', clickHandler);
  }


}

let viewResultsButton = document.getElementById('viewResults');
viewResultsButton.addEventListener('click', displayResults);

function displayResults() {
  let ulElem = document.createElement('ul');
  for(let i = 0; i < state.products.length; i++) {
    let liElem = document.createElement('li');
    let product = state.products[i];
    liElem.textContent=`${product.name} had ${product.timesClicked} votes and was seen ${product.timeShown} times.`;
    ulElem.appendChild(liElem);
    // console.log(`${product.name} had ${product.timesClicked} votes and was seen ${product.timeShown} times.`);
  }
  sectionElem.appendChild(ulElem);
}

function clickHandler(event) {
  let productName = event.target.alt;
  console.log(productName);
  if (productName) {
    let clickedProduct;
    for (let i = 0; i < state.products.length; i++) {
      if (state.products[i].name === productName) {
        clickedProduct = state.products[i];
        console.log(clickedProduct);
        break;
      }
    }

    if (clickedProduct) {
      clickedProduct.timesClicked++;
      state.roundsRemaining--;
    }
    renderProduct();
    if (state.roundsRemaining === 0) {
      console.log(`${productName} had ${clickedProduct.timesClicked} votes, and was seen ${clickedProduct.timeShown} times.`);


      let productImages = document.querySelectorAll('.products img');
      for (let j = 0; j < productImages.length; j++) {
        productImages[j].removeEventListener('click', clickHandler);
      }

    }
  }
}



new Product('bag', './img/bag.jpg');
new Product('banana', './img/banana.jpg');
new Product('bathroon', './img/bathroom.jpg');
new Product('boots', './img/boots.jpg');
new Product('breakfast', './img/breakfast.jpg');
new Product('bubblegum', './img/bubblegum.jpg');
new Product('chair', './img/chair.jpg');
new Product('cthulhu', './img/cthulhu.jpg');
new Product('dogduck', './img/dog-duck.jpg');
new Product('dragon', './img/dragon.jpg');
new Product('pen', './img/pen.jpg');
new Product('petsweep', './img/pet-sweep.jpg');
new Product('scissors', './img/scissors.jpg');
new Product('shark', './img/shark.jpg');
new Product('sweep', './img/sweep.png');
new Product('tauntaun', './img/tauntaun.jpg');
new Product('unicorn', './img/unicorn.jpg');
new Product('watercan', './img/water-can.jpg');
new Product('wineglass', './img/wine-glass.jpg');

renderProduct();

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});