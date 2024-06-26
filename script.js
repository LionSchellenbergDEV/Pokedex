const row = document.querySelector('.row');

async function createPokemonCards() {
 /* Creates the elements that are necessary in the "info-window-content" div in order 
  to correctly display the additional information about the selected Pokemon. */
  const infoWindow = document.getElementById("info-window-content");

  const closingBtn = document.createElement("button");
  closingBtn.textContent = "X";
  closingBtn.id = "closing-button";

  const pokemonName = document.createElement("h1");
  pokemonName.id = "pokemon-name";

  const pokemonImage = document.createElement("img");
  pokemonImage.id = "pokemon-image";

  infoWindow.appendChild(closingBtn);
  infoWindow.appendChild(pokemonName);
  infoWindow.appendChild(pokemonImage);

  document.getElementById("closing-button").addEventListener('click', () =>{
    document.getElementById("info-window-wrapper").style.display = "none";
  })

  const table = document.createElement("table");
  infoWindow.appendChild(table);

  const getTable = document.querySelector('table');

  const template = `<tr>
                    <th>Abilities</th>
                    <td id="abilities"></td>
                  </tr>
                  <tr>
                  <th>Held items</th>
                  <td id="held_items"></td>
                </tr>
                <tr>
                  <th>Type</th>
                  <td id="type"></td>
                </tr>
                <tr>
                  <th>Moves</th>
                  <td id="moves"></td>
                </tr>
                <tr>
                  <th>Weight</th>
                  <td id="weight"></td>
                </tr>
                <tr>
                  <th>Cry</th>
                  <td>
                    <audio controls src="" id="cries" style="height: 25px; width: 100%;"></audio>
                  </td>
                </tr>`;
  getTable.innerHTML = template;




  for (let i = 1; i <= 1008; i++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const data = await response.json();
    const card = document.createElement('div');
    card.classList.add('card', data.types[0].type.name);
    
    const img = document.createElement('img');
    img.src = data.sprites.front_default;
    img.alt = data.name;
    card.appendChild(img);

    const number = document.createElement('p');
    number.textContent = `#${data.id.toString().padStart(3, '0')}`;
    card.appendChild(number);

    const name = document.createElement('h2');
    name.textContent = data.name;
    card.appendChild(name);

    const type = document.createElement('p');
    type.textContent = `Type: ${data.types.map(types => types.type.name).join(', ')}`;

    /* if unfamiliar with map() and join(), here is an alternative:

    example for dataobject:
    const data = {
    types: [
       { type: { name: 'fire' } },
       { type: { name: 'flying' } }
       ]
    };

    let typeString = 'Type: ';
    for (let i = 0; i < data.types.length; i++) {
       typeString += data.types[i].type.name;
       if (i < data.types.length - 1) {
          typeString += ', ';
        }
    }
    type.textContent = typeString;
    */

    card.appendChild(type);

  
    const moves = document.createElement('p');
    moves.textContent = `Moves: ${data.moves.map(move => move.move.name).slice(0, 3).join(', ')}`;
    card.appendChild(moves);
 
    // Append the card element to the row element
    row.appendChild(card);


    /*Listens if a card has been clicked and then executes the code that opens 
    the window with further information about the Pokemon.*/
    card.addEventListener('click', () => {


      document.getElementById("pokemon-name").innerHTML = data.name;
      document.getElementById("pokemon-image").src = data.sprites.front_default;
      document.getElementById("abilities").innerHTML = data.abilities.map(ability => ability.ability.name).slice(0, 3).join(', ');
      
      //Checks whether the pokemon is holding items or not.
      if(data.held_items.map(item => item.item.name).slice(0, 4).join(', ') == ""){
        document.getElementById("held_items").innerHTML = "/"
      } else {
        document.getElementById("held_items").innerHTML = data.held_items.map(item => item.item.name).slice(0, 3).join(', ');
      }
      document.getElementById("type").innerHTML = data.types.map(types => types.type.name).join(', ');
      document.getElementById("moves").innerHTML = data.moves.map(move => move.move.name).slice(0, 3).join(', ');
      document.getElementById("weight").innerHTML = data.weight/10+" kg";
      document.getElementById("cries").src = data.cries.latest;
      document.getElementById("info-window-wrapper").style.display = "flex"; 
  });
  }
}

// Call the createPokemonCards() function to create the Pokemon cards
createPokemonCards();

