class Teste {
  constructor() {
    this.teste();
  }

  function teste() {
    fetch('https://api.opendota.com/api/heroStats/?api_key=b950156d-d368-4e3d-b770-f03327c94ccf').then((response) => {
      return response
    })
  };
}

const teste = new Teste()
console.log(teste.teste())
