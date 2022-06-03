const inputCity = document.querySelector('.city-input');
const searchButton = document.querySelector('.search');

function showCity() {
  let url = createURL(checkInput());
  fetchData(url);
}

searchButton.addEventListener('click', function() {
  showCity();
});

//////////////////////////////////////////////////////////////////////////////// Funzione controllo input
function checkInput() {

    if (inputCity.value == '' || !isNaN(inputCity.value)) {
      console.log('errore da gestire');
    } else {
      console.log(inputCity.value);
      return inputCity.value;
    };

    inputCity.value = '';
};
/////////////////////////////////////////////////////////////////// Funzione che genera l'url dall'input
function createURL(name) {
  let low = name.toLowerCase();
  let str = low.replaceAll(' ', '-');
  let url = `https://api.teleport.org/api/urban_areas/slug:${str}/scores/`;
  console.log(url);
  return url;
};
////////////////////////////////////////////////////////////////////////////////////////////////////////
// Carichiamo l'oggetto con le informazioni
async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  createResult(data)
};



function createResult(data) {
  const par = document.createElement('p');
  par.innerHTML = data.summary;
  summaryDiv.append(par)

  const score = document.createElement('h3');
  score.innerHTML = (data.teleport_city_score).toFixed(2);
  scoreDiv.append(score);

  data.categories.forEach(category => {
    let cat = document.createElement('p');
    cat.textContent = `${category.name}: ${(category.score_out_of_10).toFixed(2)}/10`
    categoriesDiv.append(cat);
  })
}

const summaryDiv = document.querySelector('.summary');
const categoriesDiv = document.querySelector('.categories');
const scoreDiv = document.querySelector('.score');

/////
