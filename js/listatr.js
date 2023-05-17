/***************************************************************************************************** 
  Rene Dominguez Palenzuela
  17/05/2023 
 ******************************************************************************************************/

//TODO: minificar, ofuscar
//TODO: Crear funcion para mostrar mensajes, pasar solo el texto como parametro
//TODO: Poner animacion mientras no se reciban los datos

const base_url = 'https://backend.ducapp.net';
const x_api_key = 'test.c6f50414-cc7f-5f00-bbb5-2d4eb771c41a';



function getData() {

    //leer token desde local storage
    const accessToken = window.localStorage.getItem('accessToken');

    console.log(' aaaa '+accessToken);

    return;


    //obtengo los datos desde el API
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", x_api_key);
    myHeaders.append("authorization", "Bearer <YOUR_ACCESS_TOKEN>");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "filter": {
            "status": "queued"
        }
    });

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://backend.ducapp.net/api/private/transactions?skip=0&limit=10", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));




    // fetch('https://jsonplaceholder.typicode.com/todos/1')
    //   .then(response => response.json())
    //   .then(json => console.log(json));

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

    new gridjs.Grid({
        columns: ['Name', 'Language', 'Released At', 'Artist'],
        pagination: true,
        search: true,
        server: {
            url: 'https://api.scryfall.com/cards/search?q=Inspiring',
            then: data => data.data.map(card => [card.name, card.lang, card.released_at, card.artist])
        }
    }).render(document.getElementById("container-listtr"));;

    /*   
     fetch('https://jsonplaceholder.typicode.com/posts', {
         method: 'POST'
     }).then(function (response) {
         if (response.ok) {
             return response.json();
         }
         return Promise.reject(response);
     }).then(function (data) {
         console.log(data);
     }).catch(function (error) {
         console.warn('Something went wrong.', error);
     });*/

}


//-------------------------------------------------------------------------------
//  Funcion que se ejecuta al cargar la pagina principal
//-------------------------------------------------------------------------------
function initializing() {

    console.log("Initializanidd");
    getData();

    //Boton de login
    // let btn = document.getElementById('login-btn');
    // btn.addEventListener('click', () => {
    //   console.log('login process');
    //   login();
    // });

}