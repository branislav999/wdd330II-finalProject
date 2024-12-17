<script>
    import { getSprite } from '../api.js';

    let selectedPokemon;
    let spriteUrl;

    async function fetchSprite() {
        selectedPokemon = JSON.parse(localStorage.getItem('selectedPokemon'));
        if (selectedPokemon) {
            spriteUrl = await getSprite(selectedPokemon.name);
        }
    }

    fetchSprite();
</script>

<div class="pokemon-container">
    <img id='environment-background' src='src\images\grass-bg.jpg' alt="grass background"/>
    {#if spriteUrl}
        <img id='sprite' src={spriteUrl} alt="pokemon sprite"/>
    {/if}
</div>
