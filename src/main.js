import "./style.css";
import { mount } from "svelte";
import App from "./js/components/App.svelte";

const app = document.querySelector("#app");

mount(App, {
  target: app,
});
