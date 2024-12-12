<script>
  import { onMount } from 'svelte';
  import CoinDisplay from '../CoinDisplay.svelte';

  // Store for berries from the API
  let berries = [
    // Placeholder data for berries, delete once implemented from store
    {
      id: 1,
      name: 'Cheri Berry',
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/cheri-berry.png',
      quantity: 3,
    },
    {
      id: 2,
      name: 'Chesto Berry',
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/chesto-berry.png',
      quantity: 5,
    },
    {
      id: 3,
      name: 'Pecha Berry',
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/pecha-berry.png',
      quantity: 4,
    },
    {
      id: 4,
      name: 'Rawst Berry',
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rawst-berry.png',
      quantity: 2,
    },
    {
      id: 5,
      name: 'Aspear Berry',
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/aspear-berry.png',
      quantity: 6,
    },
  ];

  // Fetch berries from the API
  onMount(async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/berry/');
      const data = await response.json();

      // Fetch detailed data for each berry to get the img
      const berryDetails = await Promise.all(
        data.results.map(async (berry) => {
          const berryResponse = await fetch(berry.url);
          const berryData = await berryResponse.json();

          return {
            id: berryData.id,
            name: berryData.name,
            image: berryData.item.sprites.default, // Img from the associated item
            quantity: 2, // Will be updated later
          };
        })
      );

      berries = berryDetails;
    } catch (error) {
      console.error('Error fetching berries:', error);
    }
  });
</script>

<div class="backpack">
  <CoinDisplay />
  <h1>Backpack</h1>
  <div class="grid">
    {#if berries.length > 0}
      {#each berries as berry (berry.id)}
        <div class="item">
          <img src={berry.image} alt={berry.name} />
          <div class="name">{berry.name}</div>
          <div class="quantity">x{berry.quantity}</div>
        </div>
      {/each}
    {:else}
      <p>Loading berries...</p>
    {/if}
  </div>
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 10px;
  }

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    margin: 10px;
    text-align: center;
  }

  .item img {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }

  .name {
    margin-top: 10px;
    font-size: 14px;
    font-weight: bold;
  }

  .quantity {
    margin-top: 5px;
    font-size: 12px;
    color: #666;
  }
</style>
