/***************************************************************************************************** 
  Rene Dominguez Palenzuela
  17/05/2023 
 ******************************************************************************************************/

//TODO: minificar, ofuscar
//TODO: Crear funcion para mostrar mensajes, pasar solo el texto como parametro
//TODO: Poner animacion mientras no se reciban los datos

const base_url = 'https://backend.ducapp.net';
const x_api_key = 'test.c6f50414-cc7f-5f00-bbb5-2d4eb771c41a';

async function getData() {

  //leer token desde local storage
  const accessToken = window.localStorage.getItem('accessToken');



  var data = JSON.stringify({
    "filter": {
      "status": "queued"
    }
  });

  var config = {
    method: 'get',
    url: `${base_url}/api/private/transactions?skip=0&limit=100`,
    headers: { 
      'authorization': `Bearer ${accessToken}`,
      'x-api-key': x_api_key, 
      'Content-Type': 'application/json', 
    },
    data : data
  }



axios(config)
.then(function (response) {

  //console.log(JSON.stringify(response.data));

  console.log(response.data.data);

  new gridjs.Grid({
    pagination: true,
    search: true,
    columns: ["Transaction Amount", "Transaction Status", "Currency", "Type", "Concept", "Transaction ID", "Id"],
    data: response.data.data
  }).render(document.getElementById("container-listtr"));

 
})
.catch(function (error) {
  console.log(error);
});



}

async function getDataWithFetch() {

  //leer token desde local storage
  const accessToken = window.localStorage.getItem('accessToken');

  //obtengo los datos desde el API
  var myHeaders = new Headers();
  myHeaders.append("x-api-key", x_api_key);
  myHeaders.append("authorization", `Bearer ${accessToken}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "filter": {
      "status": "queued"
    }
  });

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    //  body: raw,
    // redirect: 'follow'
  };

  fetch(`{$base_url}/api/private/transactions?skip=0&limit=100`, requestOptions)
    .then(response => response.text())
    .then(result => {
      const datos = JSON.parse(result);


      new gridjs.Grid({
        columns: ["transactionAmount", "transactionStatus", "currency", "type", "concept", "transactionID", "id"],
        data: datos
      }).render(document.getElementById("container-listtr"));



      console.log(datos);

    })
    .catch(error => console.log('error', error));






  /*
        new gridjs.Grid({
          columns: ["Name", "Email", "Phone Number"],
          data: [
            ["John", "john@example.com", "(353) 01 222 3333"],
            ["Mark", "mark@gmail.com", "(01) 22 888 4444"],
            ["Eoin", "eoin@gmail.com", "0097 22 654 00033"],
            ["Sarah", "sarahcdd@gmail.com", "+322 876 1233"],
            ["Afshin", "afshin@mail.com", "(353) 22 87 8356"]
          ]
        }).render(document.getElementById("wrapper"));
        */

  /*
new gridjs.Grid({
columns: ['Name', 'Language', 'Released At', 'Artist'],
pagination: true,
search: true,
server: {
    url: 'https://api.scryfall.com/cards/search?q=Inspiring',
    then: data => data.data.map(card => [card.name, card.lang, card.released_at, card.artist])
}
}).render(document.getElementById("container-listtr"));;
*/



}


//-------------------------------------------------------------------------------
//  Funcion que se ejecuta al cargar la pagina principal
//-------------------------------------------------------------------------------
async function initializing() {

  console.log("Initializanidd");
  await getData();
  //await getDataWithFetch();

  //Boton de login
  let btn = document.getElementById('getdata-btn');
  btn.addEventListener('click', async () => {
    console.log('Get TR Data');
    await getDataWithFetch();
  });

}