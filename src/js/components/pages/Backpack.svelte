<script>
  import { backpack } from '../../coinStore';
  import CoinDisplay from '../CoinDisplay.svelte';

  // Subscribe to the backpack storage
  let backpackItems = [];
  backpack.subscribe((items) => {
    backpackItems = items;
  });
</script>

<div class="backpack">
  <CoinDisplay />
  <h1>Backpack</h1>
  <div class="grid">
    {#if backpackItems.length > 0}
      {#each backpackItems as item (item.name)}
        <div class="item-card">
          <img src={item.image} alt={item.name} />
          <h2>{item.name}</h2>
          <p>Quantity: x{item.quantity}</p>
        </div>
      {/each}
    {:else}
      <p class="empty">Your backpack is empty.</p>
    {/if}
  </div>
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 20px;
    justify-items: center;
    padding: 20px;
  }

  .item-card {
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .item-card:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  .item-card img {
    width: 100px;
    height: 100px;
    object-fit: contain;
    margin-bottom: 10px;
  }

  .item-card h2 {
    font-size: 1.2em;
    margin: 10px 0;
  }

  .item-card p {
    margin: 5px 0;
    font-size: 1em;
    color: #666;
  }

  .empty {
    font-size: 1.2em;
    color: #ff2020;
    font-weight: bold;
    text-align: center;
    margin-top: 20px;
  }
</style>
