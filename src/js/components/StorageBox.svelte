<script>
    import { fetchPokemon } from '../api.js';
    {/* This will get data from DB about each pokemon */}
    {/* Maybe we want a utils.js to have functions like getPokemonDetails */}

    export let name = 'Default Name';
    let image = '';

    async function getImage() {
        const imageRes = await fetchPokemon(name.toLowerCase());
        console.log(imageRes);
        image = imageRes.sprites.front_default;
    }

    getImage();

  </script>
  
  <div class="storage-box">
    <img src={image} alt="Pokemon Preview" />
    <h2>{name}</h2>
    <p>Status: Awake</p>
    <p>Hunger: 24%</p>
    <p>Happiness: 87%</p>
  </div>
  