function initializing() {
    let btn = document.getElementById('login-btn');
    btn.addEventListener('click', () => {
        // handle the click event
       // getData();
        console.log('clicksssed');
    });
}


function getData() {

    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json));

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