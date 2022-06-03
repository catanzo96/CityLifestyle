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
    console.log(data)
  }
};

////////////////////////////////////////////////// Funzione per gestire l'errore
const mainMenu = document.querySelector('.menu');
const errorDiv = document.createElement('div');
const errorMessage = document.createElement('p');

function createError() {
  errorDiv.classList.add('col-12', 'error-message');
  errorMessage.innerHTML = 'Errore!';
  errorDiv.append(errorMessage);
  mainMenu.append(errorDiv);
};

/////////////////////////////////////////////////// Funzione per ripulire output
function clearOutput() {
  errorDiv.remove();
}


searchButton.addEventListener('click', function() {
  clearOutput();
  CityLifeStyle();
});
