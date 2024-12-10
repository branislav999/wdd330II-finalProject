import './style.css';
import { mount } from 'svelte';
import App from './js/components/App.svelte';
import { renderHeaderFooter } from './js/utils.js';
import Supabase from './js/components/pages/Supabase.svelte';
import Register from './js/components/pages/Register.svelte';
import Login from './js/components/pages/Login.svelte';


const app = document.querySelector('#app');

renderHeaderFooter();

mount(App, {
  target: app,
});
