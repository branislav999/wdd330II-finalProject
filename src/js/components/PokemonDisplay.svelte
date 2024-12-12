<script>
    import { getSprite } from '../api.js';

    let selectedPokemon;
    let spriteUrl;

    async function fetchSprite() {
        selectedPokemon = JSON.parse(localStorage.getItem('selectedPokemon'));
        if (selectedPokemon) {
            spriteUrl = await getSprite(selectedPokemon.id);
            console.log(spriteUrl);
        }
    }

    fetchSprite();
</script>

<img id='environment-background' src='src\images\grass-bg.jpg' alt="grass background"/>
{#if spriteUrl}
    <img src={spriteUrl} alt="pokemon sprite"/>
{/if}
