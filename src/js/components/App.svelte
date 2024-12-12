<script>
  import { Router, Route } from 'svelte-routing';
  import Login from './pages/Login.svelte';
  import Pokemon from './pages/Pokemon.svelte';
  import Shop from './pages/Shop.svelte';
  import Storage from './pages/Storage.svelte';
  import Supabase from './pages/Supabase.svelte';
  import Register from './pages/Register.svelte';
  import backpack from './pages/Backpack.svelte';

  let routes = [
    { path: '/', component: Login },
    { path: '/pokemon', component: Pokemon },
    { path: '/shop', component: Shop },
    { path: '/storage', component: Storage },
    { path: '/supabase', component: Supabase },
    { path: '/register', component: Register },
    { path: '/backpack', component: backpack },
  ];
</script>

<Router>
  {#each routes as { path, component }}
    <Route {path} {component} />
  {/each}
</Router>
