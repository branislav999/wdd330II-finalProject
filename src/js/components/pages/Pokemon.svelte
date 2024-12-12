<script>
  import Stats from '../Stats.svelte';
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
<h1>Pokemon Name</h1>
<p>
  This page will show the pokemon that you clicked on from the Storage page. It
  will show the pokemon, its status, and actions you can take.
</p>

<Stats />

<div class="actions">
  <button on:click={feedPokemon}>Feed</button>
  <button on:click={petPokemon}>Pet</button>
  <button on:click={cleanPokemon}>Clean</button>
</div>
