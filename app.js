let state = {
  products: [],
  roundsRemaining: 25,
  randomProducts: [],
};

let sectionElem = document.getElementById('results');

function Product(name, imageFile) {
  this.name = name;
  this.imageFile = imageFile;
  this.timeShown = 0;
  this.timesClicked = 0;
  state.products.push(this);
}

function loadProducts() {
  let savedProducts = localStorage.getItem('products');
  if (savedProducts) {
    let parsedProducts = JSON.parse(savedProducts);
    console.log('parsedProducts:', parsedProducts);
    state.products = parsedProducts;
  } else {
    renderProduct();
  }

}
function savedProducts () {
  let stringifiedProducts = JSON.stringify(state.products);
  localStorage.setItem('products', stringifiedProducts);
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
  previousProducts = randomProducts;

  return randomProducts;

}

function checkForDuplicates(array1, array2) {
  if (array1[0] === array1[1] || array1[0] === array1[2] || array1[1] === array1[2]) {
    return true;
  }
  for(let i = 0; i < array1.length; i++) {
    if (array2.includes(array1[i])) {
      return true;
    }
  }
  return false;
}


function renderProduct() {
  let productImages = document.querySelectorAll('.products img');
  let randomProducts = generateRandomProducts();

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
  updateChartData();

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
        savedProducts();
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
loadProducts();

function updateChartData() {
  let labels = [];
  let votesData = [];
  let shownData = [];

  state.products.forEach(product => {
    labels.push(product.name);
    votesData.push(product.timesClicked);
    shownData.push(product.timeShown);
  });

  const ctx = document.getElementById('myChart').getContext('2d');

  let options = {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: '# of Clicked',
        data: votesData,
        backgroundColor: 'rgba(24, 51, 95, 0.8',

        // 'rgba(255, 99, 132, 0.2)',
        // 'rgba(54, 162, 235, 0.2)',
        // 'rgba(75, 192, 192, 0.2)',
        // 'rgba(153, 102, 255, 0.2)',
        // 'rgba(255, 159, 64, 0.2)'

        borderColor: 'rgba(144, 171, 215, 0.6)',
        //   'rgba(54, 162, 235, 1)',
        //   'rgba(255, 206, 86, 1)',
        //   'rgba(75, 192, 192, 1)',
        //   'rgba(153, 102, 255, 1)',
        //   'rgba(255, 159, 64, 1)'
        // ],
        borderWidth: 1,
      },
      {

        label: '# of Times Shown',
        data: shownData,
        backgroundColor: 'rgba(144, 171, 215, 0.6)',
        borderColor: 'rgba(24, 51, 95, 0.8',
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
  };

  const myChart = new Chart(ctx, options);

  myChart.data.labels = labels;
  myChart.data.datasets[0].data = votesData;
  myChart.data.datasets[1].data = shownData;


}


