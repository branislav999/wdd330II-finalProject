<script>
    import { selectedPokemon } from '../../store.js';
    import { onMount } from 'svelte';
    import Stats from '../Stats.svelte';
    
    let pokemon = {};

    onMount(() => {
        selectedPokemon.subscribe(value => {
            pokemon = value;
        });
    });
</script>

<div>
    <h1>{pokemon.name}</h1>
    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
</div>

<p>This page will show the pokemon that you clicked on from the Storage page. It will show the pokemon, its status, and actions you can take.</p>

<Stats />