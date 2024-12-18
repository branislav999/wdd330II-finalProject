<script>
  import StorageBox from '../StorageBox.svelte';
  import CoinDisplay from '../CoinDisplay.svelte';
  import { getAllPokemons } from '../../utils';
  import { eggs } from '../../coinStore';
  import { onMount } from 'svelte';

  let pokemons = [];
  let errorMessage = '';
  let eggItems = [];
  let countdowns = {};
  const eggImageUrl = 'src/images/egg.png';

  // Subscribe to the eggs storage
  eggs.subscribe((items) => {
    eggItems = items;
    items.forEach(item => {
      if (!countdowns[item.timePurchased]) {
        startCountdown(item);
      }
    });
  });

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

  function startCountdown(item) {
    const endTime = new Date(item.timePurchased).getTime() + 30 * 1000; // 30 seconds countdown
    countdowns[item.timePurchased] = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance < 0) {
        clearInterval(countdowns[item.timePurchased]);
        countdowns[item.timePurchased] = '00:00';
      } else {
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        countdowns[item.timePurchased] = `00:${seconds < 10 ? '0' : ''}${seconds}`;
      }
    }, 1000);
  }
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
    {#each eggItems as item (item.timePurchased)}
      <div class="storage-box">
        <img src={eggImageUrl} alt="Egg Preview" />
        <h2>{item.name}</h2>
        <p>Hatching in: {countdowns[item.timePurchased]}</p>
      </div>
    {/each}
  </div>
{/if}

