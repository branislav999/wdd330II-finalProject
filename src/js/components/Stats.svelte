<script>
  import { fetchPokemon } from '../api.js';

  let selectedPokemon = JSON.parse(localStorage.getItem('selectedPokemon'));
  let pokemonDetails = {};

  async function getPokemonDetails() {
    if (selectedPokemon) {
      pokemonDetails = await fetchPokemon(selectedPokemon.name.toLowerCase());
    }
  }

  function convertHeightToImperial(height) {
    const totalInches = height * 3.937; // 1 decimetre = 3.937 inches
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return `${feet}' ${inches}"`;
  }

  function convertWeightToImperial(weight) {
    const pounds = (weight * 0.220462).toFixed(2); // 1 hectogram = 0.220462 pounds
    return `${pounds} lbs`;
  }

  getPokemonDetails();
</script>

<div class="stats-box">
  <h2 class="capitalize">{selectedPokemon ? selectedPokemon.name : 'Unknown'}</h2>
  <p>Status: Awake</p>
  <p>Happiness: 87%</p>
  <p>Hunger: 24%</p>
  {#if pokemonDetails.height}
    <p>Height: {convertHeightToImperial(pokemonDetails.height)}</p>
  {/if}
  {#if pokemonDetails.weight}
    <p>Weight: {convertWeightToImperial(pokemonDetails.weight)}</p>
  {/if}
</div>