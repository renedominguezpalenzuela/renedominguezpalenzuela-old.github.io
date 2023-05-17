/***************************************************************************************************** 
  Rene Dominguez Palenzuela
  17/05/2023 
 ******************************************************************************************************/

//TODO: minificar, ofuscar
//TODO: Crear funcion para mostrar mensajes, pasar solo el texto como parametro
//TODO: Poner animacion mientras no se reciban los datos

const base_url = 'https://backend.ducapp.net';
const x_api_key = 'test.c6f50414-cc7f-5f00-bbb5-2d4eb771c41a';

async function getData(){

     //leer token desde local storage
     const accessToken = window.localStorage.getItem('accessToken');

     
  const config = {
    headers:{
      "x-api-key": x_api_key,
      "Content-Type" : "application/json",
      "authorization" : `Bearer ${accessToken}`
    }
  };


  
  const datos = { 
    "filter": {
        "status": "queued"
    }
   };


   
  axios.get(`{$base_url}/api/private/transactions?skip=0&limit=100`,  config)
  .then(response => {
    const datos = response.data;
    console.log(datos)


   

  })
  .catch(error => {
    console.log('Login Error ');
   

    if (error.response) {
        console.error(error.response);
      Swal.fire({
        icon: 'error',
        title: error.response.data.error + ' code ' + error.response.data.statusCode,
        text: error.response.data.message,
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong getting TR data',
        footer: '<h5> Inspect console for details </h5>'

      })
    }

  });




}

async function  getDataWithFetch() {

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
                columns: ["transactionAmount", "transactionStatus", "currency", "type" , "concept", "transactionID" ,  "id"],
                data: datos
              }).render(document.getElementById("container-listtr"));



            console.log(datos);

        } )
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