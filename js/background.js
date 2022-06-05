// Funzione per impostare il background
const hour1 = new Date().getHours();
const title1 = document.querySelector('h1');

function backgroundTime() {
  if (hour1 > 4 && hour1 <= 12) {
    document.body.style.backgroundImage = "url('./images/background-city-morning.png')";
  } if (hour1 > 12 && hour1 <= 20) {
    document.body.style.backgroundImage = "url('./images/background-city-afternoon.png')";
  } else {
    document.body.style.backgroundImage = "url('./images/background-city-evening.png')";
    title1.style.color = 'white';
    rowOutput.classList.remove('day-output');
    rowOutput.classList.add('evening-output');
  };
}
backgroundTime();
