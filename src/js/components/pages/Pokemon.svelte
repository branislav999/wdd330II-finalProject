<script>
  import Stats from '../Stats.svelte';
  import { onMount } from 'svelte';
  import PokemonDisplay from '../PokemonDisplay.svelte';
  import CoinDisplay from '../CoinDisplay.svelte';
  import { addCoins } from '../../coinStore';

  const feedPokemon = () => {
    addCoins(10);
  };
  const petPokemon = () => {
    addCoins(5);
  };
  const cleanPokemon = () => {
    addCoins(7);
  };
</script>

<CoinDisplay />
<PokemonDisplay />
<Stats />

<div class="actions">
  <button on:click={feedPokemon}>Feed</button>
  <button on:click={petPokemon}>Pet</button>
  <button on:click={cleanPokemon}>Clean</button>
</div>
