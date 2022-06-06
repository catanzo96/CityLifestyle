// Funzione per impostare il background
const hour1 = new Date().getHours();
const title1 = document.querySelector('h1');

function backgroundTime() {
  console.log('start')
  if (hour1 > 4 && hour1 <= 12) {
    document.body.style.backgroundImage = "url('./images/background-city-morning.png')";
    console.log(1)
  } else if (hour1 > 12 && hour1 <= 20) {
    document.body.style.backgroundImage = "url('./images/background-city-afternoon.png')";
    console.log(2)
  } else {
    document.body.style.backgroundImage = "url('./images/background-city-evening.png')";
    title1.style.color = 'white';
    rowOutput.classList.remove('day-output');
    rowOutput.classList.add('evening-output');
    console.log(3)
  };
}
backgroundTime();
