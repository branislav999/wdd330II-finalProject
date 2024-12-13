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
        <div class="item">
          <img src={item.image} alt={item.name} />
          <div class="name">{item.name}</div>
          <div class="quantity">x{item.quantity}</div>
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
    padding: 20px;
    gap: 20px;
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

  .empty {
    font-size: 16px;
    color: #ff2020;
    font-weight: bold;
  }
</style>
