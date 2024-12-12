<script>
  import { fetchPokemon } from '../api.js';
  import { navigate } from 'svelte-routing';

  export let name = 'Ditto';
  let image = '';
  let pokemon = {};

  async function getPokemon() {
      pokemon = await fetchPokemon(name.toLowerCase());
      image = pokemon.sprites.front_default;
  }

  getPokemon();

  function handleClick(event) {
      event.preventDefault();
      localStorage.setItem('selectedPokemon', JSON.stringify(pokemon));
      navigate('/pokemon');
  }
</script>

<a href='/pokemon' class="storage-box-link" on:click={handleClick}>
  <div class="storage-box">
    <img src={image} alt="Pokemon Preview" />
    <h2>{name}</h2> 
    <p>Status: Awake</p>
    <p>Hunger: 24%</p>
    <p>Happiness: 87%</p>
  </div>
</a>