<script>
  import CoinDisplay from '../CoinDisplay.svelte';

  // Define the items and their prices
  const items = [
    { name: 'Egg', price: '$20' },
    { name: 'Soap', price: '$2' },
    { name: 'Oran Berry', price: '$3' },
    { name: 'Sitrus Berry', price: '$4' },
    { name: 'Lum Berry', price: '$6' },
    { name: 'Pecha Berry', price: '$3' },
    { name: 'Rawst Berry', price: '$3' },
    { name: 'Cheri Berry', price: '$3' },
    { name: 'Chesto Berry', price: '$3' },
  ];
</script>

<main>
  <CoinDisplay />
  <h1>Shop</h1>
  <table>
    <thead>
      <tr>
        <th>Item</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      {#each items as item}
        <tr>
          <td>{item.name}</td>
          <td>{item.price}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</main>
