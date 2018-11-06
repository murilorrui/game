var myHeaders = new Headers();

var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

var api = 'https://api.opendota.com';
var mock = 'https://5bdc8f14433b4f0013e6e10e.mockapi.io/jogo';

const requestHeroes = new Request(api + '/api/heroStats/?api_key=b950156d-d368-4e3d-b770-f03327c94ccf', myInit);

this.points = 100;
this.score = 0;

this.createGame();
this.setPlayer();

function setPlayer() {
  const player = window.location.search.substr(1).split('=');
  document.getElementById('player').innerHTML = player[1];
  document.getElementById('score').innerHTML = 0;
}

function createGame() {
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

        this.points = 100;
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

function reply(id) {
  if (this.questionTeste == id) {
    const msg = 'VICTORY!';
    this.endRound(msg);
    return;
  }
  var card = document.getElementById(id);
  card.classList.add('wrong-answer');

  this.points -= 50;

  if (this.points < 50) {
    const msg = 'OUTPLAYED!';
    this.endRound(msg);
  }
}

function endRound(result) {
  var overlay = document.createElement('div');
  var modal = document.createElement('div');
  var modalContentBox = document.createElement('div');
  var modalImg = document.createElement('img');
  var msg = document.createElement('h1');
  var button = document.createElement('button');

  overlay.id = 'overlay';
  modal.id = 'modal';
  modalContentBox.id = 'modal-content__box';
  modalImg.id = 'modal-content__img';
  msg.insertAdjacentHTML('afterbegin', result);
  button.innerHTML = 'New Game';
  button.addEventListener('click', newGame)

  document.getElementById('body').appendChild(overlay);
  document.getElementById('body').appendChild(modal);
  document.getElementById('modal').appendChild(modalContentBox);
  document.getElementById('modal').appendChild(msg);
  document.getElementById('modal').appendChild(button);
  document.getElementById('modal-content__box').appendChild(modalImg);
  document.getElementById('modal-content__img').src = api + this.hero.icon;

  if (this.points < 50) {
    this.play('outplayed');
    msg.id = 'text--outplayed';
    return;
  }

  this.play('victory');
  msg.id = 'text--victory';
  this.score += this.points
  document.getElementById('score').innerHTML = this.score;
}


function newGame() {
  var cards = document.getElementsByClassName('card-answer');
  Array.prototype.map.call(cards, (card) => {
    card.classList.remove('wrong-answer');
  });
  document.getElementById('body').removeChild(overlay);
  document.getElementById('body').removeChild(modal);
  document.getElementById('loading').style.display = 'flex';
  document.getElementById('game').style.display = 'none';

  createGame();
}

function play(status) {
  var soundFile = document.createElement("audio");
  soundFile.preload = "auto";

  var src = document.createElement("source");
  src.src = './audio/' + status +'.mp3';
  soundFile.appendChild(src);

  soundFile.load();
  soundFile.volume = 0.1;
  soundFile.play();

  function play() {
     soundFile.currentTime = 0.01;
     soundFile.volume = volume;

     setTimeout(function(){soundFile.play();},1);
  }
}
