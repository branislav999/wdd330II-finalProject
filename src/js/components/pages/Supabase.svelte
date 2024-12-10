<script>
    import { supabase } from '../../../lib/supabase';
    import { onMount } from 'svelte';
  
    let pokemon = [];
  
    onMount(async () => {
      const { data, error } = await supabase.from('pokemon').select('*');
      if (error) {
        console.error(error.message);
      } else {
        console.log(data);
        pokemon = data; 
      }
    });

    console.log(supabase)
  </script>
  
  <ul>
    {#each pokemon as p}
      <li>{p.pokemon_id}</li>
    {/each}
  </ul>
  