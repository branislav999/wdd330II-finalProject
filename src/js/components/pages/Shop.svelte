<script>
    // Define the items and their prices
    const items = [
      { name: 'Pokémon Berry', price: '$5' },
      { name: 'Pokémon Egg', price: '$20' },
      { name: 'Soap', price: '$2' }
    ];
  </script>
  
  <main>
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