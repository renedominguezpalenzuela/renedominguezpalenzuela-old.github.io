
/***************************************************************************************************** 
  Rene Dominguez Palenzuela
  17/05/2023 
 ******************************************************************************************************/

//TODO: minificar, ofuscar
//TODO: Crear funcion para mostrar mensajes, pasar solo el texto como parametro

const base_url = 'https://backend.ducapp.net';
const x_api_key = 'test.c6f50414-cc7f-5f00-bbb5-2d4eb771c41a';
const default_usr = 'darian.alvarez.t@gmail.com';
const default_pass = 'Buvosic8*';

//-------------------------------------------------------------------------------
//  Poniendo datos de usuario por defecto solo para pruebas
//-------------------------------------------------------------------------------
function setTestData() {
  document.getElementById("usr").value = default_usr;
  document.getElementById("pass").value = default_pass;
  Swal.fire('Test data is ready');
}

//-------------------------------------------------------------------------------
//  Funcion que se ejecuta al cargar la pagina principal
//-------------------------------------------------------------------------------
function initializing() {

  //Boton de login
  let btn = document.getElementById('login-btn');
  btn.addEventListener('click', () => {
    console.log('login process');
    login();
  });


  //Boton setea datos de prueba
  let test_data_btn = document.getElementById('test-data-btn');
  test_data_btn.addEventListener('click', () => {
    setTestData();
    console.log('test data');
  });

  //Boton Test API
  let test_api_btn = document.getElementById('test-api-btn');
  test_api_btn.addEventListener('click', () => {
    console.log('test api');
    getAPIStatus();

  });


}


//-------------------------------------------------------------------------------
//  Solicitar estado del API
//-------------------------------------------------------------------------------
function getAPIStatus() {

  axios.get(`${base_url}/api/health`)
    .then(response => {
      const api_status = response.data.status;
      console.log(`API Status`, api_status);

      Swal.fire({
        icon: api_status ? 'info' : 'error',
        title: 'API Status: ',
        text: api_status ? 'API is UP and runnig OK' : 'API is Down',
        footer: `<h5>Base URL: ${base_url}</h5>`

      });


    })
    .catch(error => {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong requesting API Status',
        footer: '<h5> Inspect console for details </h5>'

      })

    });


}


//-------------------------------------------------------------------------------
//  Solicitar estado del API
//-------------------------------------------------------------------------------

function login() {


 

  //leyendo datos del formulario
  const usr = document.getElementById("usr").value;
  const pass = document.getElementById("pass").value;



  var myHeaders = new Headers();
  myHeaders.append("x-api-key", x_api_key);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "email": usr,
    "password": pass
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://backend.ducapp.net/api/auth/login", requestOptions)
    .then(response => response.text())
        .then(result => {
          const datos = JSON.parse(result);

          if (datos.accessToken) {
             console.log(datos.accessToken);
             window.location.assign("listatr.html");
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Login error',
              text: 'Check your credential data',
              footer: '<div>Press "Set Test Data" Button to get Test User credentials</div>'
      
            })
          }
         /* } else {
            Swal.fire({
              icon: 'error',
              title: 'Login error',
              text: 'Check your credential data'
      
            })

          }*/
          
        })
        .catch(error => console.log('error', error));

  return;
  //-----------------------
  const config = `{
    headers:{
      "x-api-key": ${x_api_key},
      "Content-Type" : "application/json"
    }
  }`;


  /*var myHeaders = new Headers();
  myHeaders.append("x-api-key", x_api_key);
  myHeaders.append("Content-Type", "application/json");

  */

  // var raw = JSON.stringify({
  //   "email": "john.doe@test.ducapp.net",
  //   "password": "$2y$10$EiZYJxdFvdTBfY97uTfU1e11U5vAFmxTnAQ5M.d0q8zU9"
  // });

  const datos = `{ "email" : ${usr}, "password" : ${pass} }`;
  console.log(datos);

  // var requestOptions = {
  //   method: 'POST',
  //   headers: myHeaders,
  //   body: raw,
  //   redirect: 'follow'
  // };

  // fetch("https://backend.ducapp.net/api/auth/login", requestOptions)
  //   .then(response => response.text())
  //   .then(result => console.log(result))
  //   .catch(error => console.log('error', error));







  axios.post(`${base_url}/api/auth/login`, datos, config)
    .then(response => {
      const datos = response.data;
      console.log(`API Status`, datos);




    })
    .catch(error => {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong in login process',
        footer: '<h5> Inspect console for details </h5>'

      })

    });




  // fetch(`${base_url}/api/health`, {
  //   method: 'POST'
  // }).then(function (response) {
  //   if (response.ok) {
  //     return response.json();
  //   }
  //   return Promise.reject(response);

  // }).then(function (data) {
  //   console.log(data);
  // }).catch(function (error) {
  //   console.warn('Something went wrong in login.', error);
  //   Swal.fire({
  //     icon: 'error',
  //     title: 'Oops...',
  //     text: 'Something went wrong in login process!',
  //     footer: '<h5> Inspect console for details </h5>'
  //     //  footer: `<h5 >${error}</h5>`
  //   })

  // });

}

function getData() {


  return;

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
  }).render(document.getElementById("wrapper"));;

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