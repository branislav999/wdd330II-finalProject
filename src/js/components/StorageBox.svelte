<script>
  import { navigate } from 'svelte-routing';
  import { calculateHappiness, calculateHunger } from '../utils';
  import { onMount } from 'svelte';

  export let name = '';
  export let imageUrl = '';
  export let id = '';

  function handleClick(event) {
    event.preventDefault();
    localStorage.setItem(
      'selectedPokemon',
      JSON.stringify({ name, imageUrl, id })
    );
    navigate('/pokemon'); 
  }

  let hungerPercentage;
  let happinessPercentage;

  onMount(async () => {
    hungerPercentage = await calculateHunger(id);
    happinessPercentage = await calculateHappiness(id);
  });


</script>

<a href="/pokemon" class="storage-box-link" on:click={handleClick}>
  <div class="storage-box">
    <img src={imageUrl} alt="{name} Preview" />
    <h2>{name}</h2>
    <p>Hunger: {hungerPercentage}%</p>
    <p>Happiness: {happinessPercentage}%</p>
  </div>
</a>
