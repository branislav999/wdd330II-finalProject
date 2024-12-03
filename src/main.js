import './style.css';
import { fetchPokemon } from './api';

const app = document.querySelector('#app');
const searchButton = document.createElement('button');
searchButton.textContent = 'Search Pokémon';
const input = document.createElement('input');
input.placeholder = 'Enter Pokémon name';

searchButton.addEventListener('click', async () => {
  try {
    const pokemon = await fetchPokemon(input.value.toLowerCase());
    app.innerHTML = `
      <h2>${pokemon.name.toUpperCase()}</h2>
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
      <p>Type: ${pokemon.types.map(t => t.type.name).join(', ')}</p>
      <p>Weight: ${pokemon.weight}</p>
    `;
  } catch (err) {
    app.innerHTML = `<p>${err.message}</p>`;
  }
});

app.appendChild(input);
app.appendChild(searchButton);
