var myHeaders = new Headers();

var get = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

var api = 'https://5bdc8f14433b4f0013e6e10e.mockapi.io/jogo';

this.getRank()

function getRank () {
  const requestRank = new Request(api + '/player', get);
  fetch(requestRank)
    .then((response) => {
      response.json().then((data) => {
        const top = data.sort((a, b) => {
          if (a.score > b.score) {
            return -1;
          }
          if (a.score < b.score) {
            return 1;
          }
          return 0;
        });
        this.createRank(top);
      });
    });
}

function createRank (top) {
  for (var x = 1; x < 6; x++) {
    var playerInfo = document.createElement('div');
    playerInfo.id = 'player-' + x;
    document.getElementById('rank').appendChild(playerInfo);
    document.getElementById('player-' + x).style.marginTop = '25px';

    var span = document.createElement('span');
    span.id = 'player-' + x + '-info';
    span.classList.add('text--small');
    document.getElementById('player-' + x).appendChild(span);
    span.innerHTML = 'NAME: ' + top[x].name + ' - SCORE: ' + top[x].score;
  }
}

function startGame () {
  const value = document.getElementById('name').value;
  var post = { method: 'POST',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default',
               body: JSON.stringify({ name: value })
             };
  const requestRank = new Request(api + '/player', post);
  fetch(requestRank)
    .then((response) => {
      response.json().then((data) => {
        console.log(data);
      });
    });
}
