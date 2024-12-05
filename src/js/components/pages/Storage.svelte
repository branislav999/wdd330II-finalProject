<script>
    /* This needs to get all the pokemon from the DB, then loop through
       and create a StorageBox for each one. */
       
    import StorageBox from '../StorageBox.svelte';

    const names = [
        "Pikachu",
        "Charmander",
        "Bulbasaur",
        "Squirtle",
        "Jigglypuff",
        "Eevee",
        "Snorlax",
        "Mewtwo",
        "Gengar",
        "Magikarp"
    ];
</script>

<h1>Storage</h1>

<div id="storage-grid">
    {#each names as name}
        <StorageBox name={name} />
    {/each}
</div>