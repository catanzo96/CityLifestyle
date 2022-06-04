const inputCity = document.querySelector('.city-input');
const searchButton = document.querySelector('.search');


/////////////////////////////////////////////////////////////// Funzione wrapper
function CityLifeStyle() {
  fetchData(getURL(inputCity.value));
};

////////////////////////////////////////////////////// Funzione per generare URL
function getURL(name) {
  let str = (name.toLowerCase()).replaceAll(' ', '-');
  let url = `https://api.teleport.org/api/urban_areas/slug:${str}/scores/`;
  return url;
};

///////////////////////////////////// Funzione per controllo e chiamata dei dati
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    createError();
  } else {
    const data = await response.json();
    createOutput(data);
    inputCity.value = '';
  }
};

////////////////////////////////////////////////// Funzione per gestire l'errore
const mainMenu = document.querySelector('.menu');
const containerDiv = document.querySelector('.container');
const errorDiv = document.createElement('div');
const errorMessage = document.createElement('p');

function createError() {
  errorDiv.classList.add('col-12', 'error-message');
  errorMessage.innerHTML = '<strong>Attention city not found!</strong> The inserted city does not exist or is not in the database.';
  errorDiv.append(errorMessage);
  mainMenu.append(errorDiv);
};



/////////////////////////////////////////////////// Funzione per generare output
const rowOutput = document.createElement('div');
rowOutput.classList.add('row', 'output');

const summaryDiv = document.createElement('div');
summaryDiv.classList.add('col-12');

const firstCategoriesDiv = document.createElement('div');
firstCategoriesDiv.classList.add('col-md-6');

const secondCategoriesDiv = document.createElement('div');
secondCategoriesDiv.classList.add('col-md-6');

const scoreDiv = document.createElement('div');
scoreDiv.classList.add('col-12');

rowOutput.append(summaryDiv, firstCategoriesDiv, secondCategoriesDiv, scoreDiv);


function createOutput(data) {

  summaryDiv.innerHTML = `<h2>${(inputCity.value).toUpperCase()}</h2>
                            <p>${data.summary}</p>`;

  scoreDiv.innerHTML = `<h3>Total Score: ${data.teleport_city_score.toFixed()}</h3>`;
  createCategories(data);

  containerDiv.append(rowOutput);

};



searchButton.addEventListener('click', function() {
  errorDiv.remove();
  CityLifeStyle();
});



function createCategories(data) {
  let firstCategories = data.categories.slice(0, -8);
  let secondCategories = data.categories.slice(9);

  if (firstCategoriesDiv.hasChildNodes()) {
    firstCategoriesDiv.innerHTML = '';
    secondCategoriesDiv.innerHTML = '';
    createCategories(data);
  } else {

    firstCategories.forEach(category => {
      const categoryDesc = document.createElement('li');
        categoryDesc.innerHTML = `<span><strong>${category.name}</strong>: ${(category.score_out_of_10).toFixed()}/10</span>`;
        categoryDesc.style.color = category.color;
        firstCategoriesDiv.append(categoryDesc);
    });

    secondCategories.forEach(category => {
      const categoryDesc = document.createElement('li');
        categoryDesc.innerHTML = `<span><strong>${category.name}</strong>: ${(category.score_out_of_10).toFixed()}/10</span>`;
        categoryDesc.style.color  = category.color;
        secondCategoriesDiv.append(categoryDesc);
    });
  };
};
