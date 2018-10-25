var myHeaders = new Headers();

var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

var api = 'https://api.opendota.com';

const requestHeroes = new Request(api + '/api/heroStats/?api_key=b950156d-d368-4e3d-b770-f03327c94ccf', myInit);

this.startGame();

function startGame() {
  fetch(requestHeroes)
    .then((response) => {
      response.json().then((data) => {
        this.heros = [];
        data.forEach(() => {
          var hero = data[Math.floor(Math.random() * data.length)];
          if (this.heros.indexOf(hero)) {
            this.heros.push(hero);
          }
        });
        this.questionElement = document.getElementById('icon');

        this.hero = this.heros[Math.floor(Math.random() * 3)]

        this.questionElement.src = api + this.hero.icon;
        this.questionTeste = this.hero.id;

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
  });
}


function answerBuild(number) {
  var card = document.getElementsByClassName('card-answer');
  card[number].id = this.heros[number].id;

  var img = document.getElementsByClassName('card-answer__img');
  img[number].id = 'hero-answer-' + this.heros[number].id;

  var text = document.getElementsByClassName('card-answer__text');
  text[number].id = 'hero-answer-name-' + this.heros[number].id;

  card[number].id = this.heros[number].id;
  img[number].src = api + this.heros[number].img;
  text[number].innerHTML = this.heros[number].localized_name;
}

function teste(id) {
  if (this.questionTeste == id) {
    var cardQuestion = document.getElementsByClassName('card-question__img');
    cardQuestion[0].style.animation = 'revert-question-img 2s';
    cardQuestion[0].style.filter = 'unset';
    this.restartGame();
    return;
  }
  var card = document.getElementById(id);
  card.classList.add('wrong-answer');
}

function restartGame() {
  setTimeout(() => {
    var cards = document.getElementsByClassName('card-answer');
    Array.prototype.map.call(cards, (card) => {
      card.classList.remove('wrong-answer');
    });
    document.getElementById('loading').style.display = 'flex';
    document.getElementById('game').style.display = 'none';
    this.startGame();
  }, 3000);
}
