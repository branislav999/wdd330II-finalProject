<script>
    import { Router, Route } from 'svelte-routing';
    import Login from './pages/Login.svelte';
    import Pokemon from './pages/Pokemon.svelte';
    import Shop from './pages/Shop.svelte';
    import Storage from './pages/Storage.svelte';
  
    let routes = [
      { path: '/', component: Login },
      { path: '/pokemon', component: Pokemon },
      { path: '/shop', component: Shop },
      { path: '/storage', component: Storage },
    ];
  </script>
  
  <Router>
    {#each routes as { path, component }}
      <Route path={path} component={component} />
    {/each}
  </Router>