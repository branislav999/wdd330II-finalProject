  <script>
    import { get } from 'svelte/store';
    import CoinDisplay from '../CoinDisplay.svelte';
    import { coinBalance, spendCoins, addToBackpack } from '../../coinStore';
  import { getCoins } from '../../utils';

    // Hard-coded list of items
    let items = [
      // Items remain unchanged
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
      { name: 'Egg', price: 20, image: 'src/images/egg.png' },
    ];

    let showModal = false;
    let modalMessage = '';

    // Buying items
    async function buyItem(item) {
      const currentCoins = await getCoins();
      if (currentCoins >= item.price) {
        const amount = currentCoins - item.price;
        await spendCoins(amount);
        addToBackpack(item);
        modalMessage = `${item.name} added to Backpack!`;
      } else {
        modalMessage = 'Not enough coins!';
      }
      showModal = true;
    }

    function closeModal() {
      showModal = false;
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
          <p>Price: ${item.price}</p>
          <button on:click={() => buyItem(item)}>Buy</button>
        </div>
      {/each}
    </div>

    {#if showModal}
      <div class="modal">
        <div class="modal-content">
          <p>{modalMessage}</p>
          <button on:click={closeModal}>Close</button>
        </div>
      </div>
    {/if}
  </main>

  <style>
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .modal-content {
      background-color: white;
      padding: 20px;
      border-radius: 10px;
      text-align: center;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      animation: fadeIn 0.3s ease-out;
    }

    .modal-content button {
      margin-top: 10px;
      padding: 10px 20px;
      background-color: #4caf50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    .modal-content button:hover {
      background-color: #45a049;
    }

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
      width: 120px;
      height: 120px;
      object-fit: contain;
      margin-bottom: 10px;
    }

    .item-card h2 {
      font-size: 1.2em;
      margin: 10px 0;
    }

    .item-card button {
      padding: 10px 20px;
      background-color: #4caf50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    .item-card button:hover {
      background-color: #45a049;
    }

    /* Animations */
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  </style>
