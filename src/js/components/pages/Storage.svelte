  <script>
    import StorageBox from '../StorageBox.svelte';
    import CoinDisplay from '../CoinDisplay.svelte';
    import { getAllPokemons } from '../../utils';
    import { onMount } from 'svelte';

    let pokemons = [];
    let errorMessage = '';

    
    onMount(async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        const data = await getAllPokemons(userId);
        if (data) {
          pokemons = data; 
        } else {
          errorMessage = 'Failed to fetch Pokemon data.';
        }
      } 
    });
  </script>

  <CoinDisplay />
  <h1>Storage</h1>

  {#if errorMessage}
    <div class="error">{errorMessage}</div>
  {:else}
    <div id="storage-grid">
      {#each pokemons as pokemon}
        <StorageBox 
          name={pokemon.name}
          imageUrl={pokemon.img_url}
          lastFed={pokemon.last_fed}
          lastWalked={pokemon.last_walked}
          id={pokemon.id}
        />
      {/each}
    </div>
  {/if}

