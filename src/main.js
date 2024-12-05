import "./style.css";
import { mount } from "svelte";
import App from "./js/components/App.svelte";
import { renderHeaderFooter } from "./js/utils.js";

const app = document.querySelector("#app");

renderHeaderFooter();

mount(App, {
  target: app,
});