<script>
  import { backpack, addCoins } from '../coinStore';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  let backpackItems = [];
  let berries = [];
  let potions = [];
  let showBerryOptions = false;
  let showPotionOptions = false;
  let petCooldown = false;
  let petCooldownTime = 0;
  let countdown = null;

  // Notification store
  let notification = writable('');

  // Load the last pet action timestamp from localStorage
  onMount(() => {
    const lastPetTime = localStorage.getItem('lastPetTime');
    if (lastPetTime) {
      const elapsed = Date.now() - parseInt(lastPetTime, 10);
      const remainingCooldown = 15 * 60 * 1000 - elapsed; // 15 minutes cooldown

      if (remainingCooldown > 0) {
        petCooldown = true;
        petCooldownTime = remainingCooldown;
        startCooldownTimer();
      }
    }
  });

  // Subscribe to backpack store to track items
  backpack.subscribe((items) => {
    backpackItems = items;
    berries = items.filter((item) => item.name.toLowerCase().includes('berry'));
    potions = items.filter((item) =>
      item.name.toLowerCase().includes('potion')
    );
  });

  const feedPokemon = () => {
    showBerryOptions = true;
  };

  const selectBerry = (berry) => {
    // Remove the berry from the backpack
    backpack.update((items) => {
      const updatedItems = items
        .map((item) => {
          if (item.name === berry.name) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
      return updatedItems;
    });

    // Add coins for feeding
    addCoins(6);
    showBerryOptions = false;
    notification.set(`${berry.name} used! Pokémon liked that!`);
  };

  const petPokemon = () => {
    if (!petCooldown) {
      addCoins(10);
      // Store the time of last pet action
      localStorage.setItem('lastPetTime', Date.now().toString());
      petCooldown = true;
      petCooldownTime = 15 * 60 * 1000; // 15 minutes cooldown time
      startCooldownTimer();
      notification.set('Pokémon enjoyed being petted!');
    } else {
      notification.set("You can't pet the Pokémon yet! Wait for the cooldown.");
    }
  };

  const carePokemon = () => {
    showPotionOptions = true;
  };

  const selectPotion = (potion) => {
    // Remove the potion from the backpack
    backpack.update((items) => {
      const updatedItems = items
        .map((item) => {
          if (item.name === potion.name) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
      return updatedItems;
    });

    // Add coins for using the potion
    addCoins(8);
    showPotionOptions = false;
    notification.set(`${potion.name} used! Pokémon starts feeling better.`);
  };

  // Start a timer to update the remaining cooldown
  const startCooldownTimer = () => {
    countdown = setInterval(() => {
      if (petCooldownTime > 0) {
        petCooldownTime -= 1000; // Decrease by 1 second
      } else {
        clearInterval(countdown);
        petCooldown = false;
      }
    }, 1000);
  };

  // Show remaining time in a readable format
  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
</script>

<div class="actions">
  <button class="action-btn" on:click={feedPokemon}>Feed</button>
  {#if showBerryOptions}
    <div class="options">
      {#each berries as berry}
        <button class="option-btn" on:click={() => selectBerry(berry)}>
          {berry.name}
        </button>
      {/each}
    </div>
  {/if}

  <button class="action-btn" on:click={petPokemon} disabled={petCooldown}>
    Pet
    {#if petCooldown}
      <span> (Cooldown: {formatTime(petCooldownTime)})</span>
    {/if}
  </button>

  <button class="action-btn" on:click={carePokemon}>Care</button>
  {#if showPotionOptions}
    <div class="options">
      {#each potions as potion}
        <button class="option-btn" on:click={() => selectPotion(potion)}>
          {potion.name}
        </button>
      {/each}
    </div>
  {/if}
</div>

{#if $notification}
  <div class="notification">{$notification}</div>
{/if}

<style>
  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
  }

  .options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 10px;
    margin-top: 10px;
    width: 100%;
    max-width: 20%;
  }

  .action-btn {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .action-btn:hover {
    background-color: #0056b3;
  }

  .action-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .option-btn {
    background-color: #28a745;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .option-btn:hover {
    background-color: #218838;
  }

  .notification {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    animation: fadeInOut 4s forwards;
  }

  @keyframes fadeInOut {
    0% {
      opacity: 0;
    }
    10%,
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>
