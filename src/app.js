var myHeaders = new Headers();

var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

var api = 'https://api.opendota.com';

const requestHeroes = new Request(api + '/api/heroStats/?api_key=b950156d-d368-4e3d-b770-f03327c94ccf', myInit);

fetch(requestHeroes)
  .then((response) => {
    response.json().then((data) => {
      this.heros = [];
      for (var x = 0; x < 3; x++) {
        this.hero = data[Math.floor(Math.random() * data.length)];
        this.heros.push(this.hero);
      }
      this.questionElement = document.getElementById('icon');

      this.questionElement.src = api + this.heros[0].icon;
      this.questionTeste = this.heros[0].id;
      
      for (var x = 0; x < 3; x++) {
        this.answerBuild(x);
      }
    })
    .finally(() => {
      setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('game').style.display = 'flex';
      }, 1000);
    })
})

function answerBuild(number) {
  var answer = document.getElementById('hero-answer-' + number);
  var answerCard = document.getElementById('hero-answer-card-' + number);
  var answerText = document.getElementById('hero-answer-name-' + number);
  answer.src = api + this.heros[number].img;
  answerCard.id = this.heros[number].id;
  answerText.innerHTML = this.heros[number].localized_name;
}

function teste(id) {
  if (this.questionTeste == id) {
    alert(id);
    return;
  }
  alert('erou');
}