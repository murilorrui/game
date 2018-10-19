var myHeaders = new Headers();

var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

var api = 'https://api.opendota.com';

const requestHeroes = new Request(api + '/api/heroStats/?api_key=b950156d-d368-4e3d-b770-f03327c94ccf', myInit);

fetch(requestHeroes).then((response) => {
  response.json().then((data) => {
    var heroes = [];
    for (var x = 0; x < 3; x++) {
      this.hero = data[Math.floor(Math.random() * data.length)];
      heroes.push(this.hero);
    }

    var hero = document.getElementById('icon');
    var answer = document.getElementById('hero-answer-first');
    var teste = document.getElementById('hero-answer-xa');
    var xa = document.getElementById('hero-answer-alo');

    hero.src = api + heroes[0].icon;
    
    answer.src = api + heroes[0].img;
    teste.src = api + heroes[1].img;
    xa.src = api + heroes[2].img;
  });
})
