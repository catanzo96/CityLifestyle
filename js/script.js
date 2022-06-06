// Selettori per input e bottone
const inputCity = document.querySelector('.city-input');
const searchButton = document.querySelector('.search');

// Evento sul click del bottone
searchButton.addEventListener('click', function() {
  errorDiv.remove();
  fetchData(getURL(inputCity.value));
});

// Funzione per generare URL
function getURL(name) {
  let str = (name.toLowerCase()).replaceAll(' ', '-');
  let url = `https://api.teleport.org/api/urban_areas/slug:${str}/scores/`;
  return url;
};

// Funzione wrapper per chiamata dati e creazione output o messaggio di errore
async function fetchData(url) {
  const response = await fetch(url)
  if (response.status == 404 || !response.ok) {
    createError();
  } else {
    const data = await response.json();
    createOutput(data);
    inputCity.value = '';
  }
};

// Selettore per l'interfaccia menu alla quale si appenderà il messaggio di errore
const mainMenu = document.querySelector('.menu');

const errorDiv = document.createElement('div');
errorDiv.classList.add('col-12', 'error-message');
const errorMessage = document.createElement('p');

function createError() {
  errorMessage.innerHTML = `<p><strong>Attention city not found!</strong></p><p>The inserted city does not exist or is not in the database.</p>`;
  errorDiv.append(errorMessage);
  mainMenu.append(errorDiv);
};

// Selettore per il Div .container
const containerDiv = document.querySelector('.container');
// Creazione ed assegnazione classi la row di output
const rowOutput = document.createElement('div');
rowOutput.classList.add('row', 'output', 'day-output');
const summaryDiv = document.createElement('div');
summaryDiv.classList.add('col-12');
const firstCategoriesDiv = document.createElement('div');
firstCategoriesDiv.classList.add('col-md-6');
const secondCategoriesDiv = document.createElement('div');
secondCategoriesDiv.classList.add('col-md-6');
const scoreDiv = document.createElement('div');
scoreDiv.classList.add('col-12');

rowOutput.append(summaryDiv, firstCategoriesDiv, secondCategoriesDiv, scoreDiv);

// Funzione wrapper per la creazione dell'output
function createOutput(data) {                   // Viene chiamata in fetchData()
  // Creazione titole e descrizione della città
  summaryDiv.innerHTML = `<h2>${(inputCity.value).toUpperCase()}</h2> <p>${data.summary}</p>`;
  // Funzione che crea le categorie
  createCategories(data);
  // Creazione del punteggio totale
  scoreDiv.innerHTML = `<h3>Total Score: ${data.teleport_city_score.toFixed()}</h3>`;

  containerDiv.append(rowOutput);
};

// Funzione per la creazione e lo stile delle categorie
function createCategories(data) {            // Viene chiamata in createOutput()
  // Le categorie sono suddivise in due gruppi in modo da poter essere visualizzate meglio
  let firstCategories = data.categories.slice(0, -8);
  let secondCategories = data.categories.slice(9);
  // Condizione che verifica l'esistenza di categorie precedenti e richiama la funzione
  if (firstCategoriesDiv.hasChildNodes()) {
    firstCategoriesDiv.innerHTML = '';
    secondCategoriesDiv.innerHTML = '';
    createCategories(data);
  } else {
    // Creazione del primo gruppo di categorie
    firstCategories.forEach(category => {
      const categoryDesc = document.createElement('li');
        categoryDesc.innerHTML = `<span><strong>${category.name}: ${(category.score_out_of_10).toFixed()}/10</strong></span>`;
        categoryDesc.style.color = category.color;
        firstCategoriesDiv.append(categoryDesc);
    });
    // Creazione del secondo gruppo di categorie
    secondCategories.forEach(category => {
      const categoryDesc = document.createElement('li');
        categoryDesc.innerHTML = `<span><strong>${category.name}: ${(category.score_out_of_10).toFixed()}/10</strong></span>`;
        categoryDesc.style.color  = category.color;
        secondCategoriesDiv.append(categoryDesc);
    });
  };
};
