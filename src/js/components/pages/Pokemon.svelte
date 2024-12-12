<script>
    import { onMount } from 'svelte';
    import Stats from '../Stats.svelte';
    import PokemonDisplay from '../PokemonDisplay.svelte';
    
</script>

<p>This page will show the pokemon that you clicked on from the Storage page. It will show the pokemon, its status, and actions you can take.</p>

<PokemonDisplay />
<Stats />