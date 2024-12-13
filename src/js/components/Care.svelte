<script>
  import { backpack, addCoins } from '../coinStore';

  let backpackItems = [];
  let berries = [];
  let potions = [];
  let showBerryOptions = false;
  let showPotionOptions = false;
  let petCooldown = false;
  let petCooldownTime = 0;
  let countdown = null;

  // Load the last pet action timestamp from localStorage
  import { onMount } from 'svelte';
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
  };

  const petPokemon = () => {
    if (!petCooldown) {
      addCoins(10);
      localStorage.setItem('lastPetTime', Date.now().toString()); // Store the time of last pet action
      petCooldown = true;
      petCooldownTime = 15 * 60 * 1000; // 15 minutes cooldown time
      startCooldownTimer();
    } else {
      alert("You can't pet the Pokémon again yet! Wait for the cooldown.");
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

  // Format the remaining time into a readable format (HH:mm:ss)
  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
</script>

<div class="actions">
  <button on:click={feedPokemon}>Feed</button>
  {#if showBerryOptions}
    <div class="options">
      {#each berries as berry}
        <button on:click={() => selectBerry(berry)}>{berry.name}</button>
      {/each}
    </div>
  {/if}

  <button on:click={petPokemon} disabled={petCooldown}>
    Pet
    {#if petCooldown}
      <span> (Cooldown: {formatTime(petCooldownTime)})</span>
    {/if}
  </button>

  <button on:click={carePokemon}>Care</button>
  {#if showPotionOptions}
    <div class="options">
      {#each potions as potion}
        <button on:click={() => selectPotion(potion)}>{potion.name}</button>
      {/each}
    </div>
  {/if}
</div>
