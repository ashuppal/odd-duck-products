'use strict';


//Global
let voteCount = 25;
let productArray =[];

//DOM References
let imageContainer = document.getElementById('image-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let resultBtn = document.getElementById('show-result-btn');

let resultContainer = document.getElementById('result-container');

//Canvas DOM reference
let chartContext = document.getElementById('my-chart').getContext('2d');

//Chart on



//Helper/ Utility Functions

let indexArray = [];

function randomDuck(){
  return Math.floor(Math.random() * productArray.length);
}

function renderImages(){
  // let imgOneRandom = randomDuck();
  // let imgTwoRandom = randomDuck();
  // let imgThreeRandom = randomDuck();

//   while (imgOneRandom === imgTwoRandom || imgTwoRandom === imgThreeRandom || imgOneRandom === imgThreeRandom) {
//     imgOneRandom = randomDuck();
//     imgTwoRandom = randomDuck();
//     imgThreeRandom = randomDuck();
//   }

  while (indexArray.length < 6){
    let randomNum =  randomDuck();
    if(!indexArray.includes(randomNum)){
      indexArray.push(randomNum);
    }
  }

  let imgOneRandom = indexArray.shift();
  let imgTwoRandom = indexArray.shift();
  let imgThreeRandom = indexArray.shift();

  imgOne.src = productArray[imgOneRandom].imagePath;
  imgTwo.src= productArray[imgTwoRandom].imagePath;
  imgThree.src = productArray[imgThreeRandom].imagePath;

  imgOne.alt = productArray[imgOneRandom].name;
  imgTwo.alt = productArray[imgTwoRandom].name;
  imgThree.alt = productArray[imgThreeRandom].name;


  productArray[imgOneRandom].views++;
  productArray[imgTwoRandom].views++;
  productArray[imgThreeRandom].views++;
}
//Event Handler

function handleShowResult(event){

  if(voteCount === 0){

    let productName = [];
    let productViews = [];
    let productClicks = [];

for(let i=0; i<productArray.length;i++){
  productName.push(productArray[i].name);
  productViews.push(productArray[i].views);
  productClicks.push(productArray[i].click);

}
    let chartConfig = {
      type: 'bar',
      data: {
        labels: productName,
        datasets: [{
          label: "# of views",
          data: productViews,
          backgroundColor: 'red',
        },{
          label: "# of clicks",
          data: productClicks,
          backgroundColor: 'blue',

        }],
       
    
    },
      options: {},
    };
    let myChart = new Chart(chartContext, chartConfig);
    resultBtn.removeEventListener('click',handleShowResult);
    }
   
  }

function handleImageClick(event){

  let productCliked = event.target.alt;

  for(let i=0; i<productArray.length; i++){
    if(productArray[i].name === productCliked ){
      productArray[i].click++;
    }
  }
  voteCount--;
  renderImages();
  
  if(voteCount === 0){
    imageContainer.removeEventListener('click', handleImageClick);
   
  }
}

//product constructor

function Product(name,fileExt = 'jpg'){
  this.name = name;
  this.imagePath = `img/${name}.${fileExt}`;
  this.click = 0;
  this.views = 0;
}

let sweep = new Product('sweep', 'png');
let bag = new Product('bag');
let banana = new Product('banana');
let bathroom = new Product('bathroom');
let boots = new Product('boots');
let breakfast = new Product('breakfast');
let bubblegum = new Product('bubblegum');
let chair = new Product('chair');
let cthulhu = new Product('cthulhu');
let dogDuck = new Product('dog-duck');
let dragon = new Product('dragon');
let pen = new Product('pen');
let petSweep = new Product('pet-sweep');
let scissors = new Product('scissors');
let shark = new Product('shark');
let tauntaun = new Product('tauntaun');
let unicorn = new Product('unicorn');
let waterCan = new Product('water-can');
let wineGlass = new Product('wine-glass');

productArray.push(sweep,bag,banana,bathroom,boots,breakfast,bubblegum,chair,cthulhu,dogDuck,dragon,pen,petSweep,scissors,shark,tauntaun,unicorn,waterCan,wineGlass);

renderImages();



imageContainer.addEventListener('click',handleImageClick);
resultBtn.addEventListener('click', handleShowResult);




