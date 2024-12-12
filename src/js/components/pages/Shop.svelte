<script>
  import { get } from 'svelte/store';
  import CoinDisplay from '../CoinDisplay.svelte';
  import { coinBalance, spendCoins, addToBackpack } from '../../coinStore';

  // Hard-coded list of items
  let items = [
    {
      name: 'Cheri Berry',
      price: 5,
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/cheri-berry.png',
    },
    {
      name: 'Chesto Berry',
      price: 5,
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/chesto-berry.png',
    },
    {
      name: 'Pecha Berry',
      price: 5,
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/pecha-berry.png',
    },
    {
      name: 'Rawst Berry',
      price: 5,
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rawst-berry.png',
    },
    {
      name: 'Aspear Berry',
      price: 5,
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/aspear-berry.png',
    },
    {
      name: 'Leppa Berry',
      price: 5,
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/leppa-berry.png',
    },
    {
      name: 'Oran Berry',
      price: 5,
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/oran-berry.png',
    },
    {
      name: 'Sitrus Berry',
      price: 5,
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/sitrus-berry.png',
    },
    {
      name: 'Lum Berry',
      price: 5,
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/lum-berry.png',
    },
    {
      name: 'Figy Berry',
      price: 5,
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/figy-berry.png',
    },
    {
      name: 'Potion',
      price: 5,
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/potion.png',
    },
    {
      name: 'Super Potion',
      price: 10,
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/super-potion.png',
    },
    {
      name: 'Hyper Potion',
      price: 20,
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/hyper-potion.png',
    },
    {
      name: 'Egg',
      price: 20,
      image: 'src/images/egg.png',
    },
  ];

  // Buying items
  function buyItem(item) {
    const currentCoins = get(coinBalance);
    if (currentCoins >= item.price) {
      spendCoins(item.price);
      addToBackpack(item);
      alert(`${item.name} added to backpack!`);
    } else {
      alert('Not enough coins!');
    }
  }
</script>

<main>
  <CoinDisplay />
  <h1>Shop</h1>
  <div class="shop-grid">
    {#each items as item}
      <div class="item-card">
        <img src={item.image} alt={item.name} />
        <h2>{item.name}</h2>
        <p>{item.description}</p>
        <p>Price: ${item.price}</p>
        <button on:click={() => buyItem(item)}>Buy</button>
      </div>
    {/each}
  </div>
</main>

<style>
  .shop-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 20px;
    justify-items: center;
    padding: 20px;
  }

  .item-card {
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 10px;
    text-align: center;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  }

  .item-card img {
    width: 100px;
    height: 100px;
    object-fit: contain;
  }

  .item-card button {
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .item-card button:hover {
    background-color: #45a049;
  }
</style>
