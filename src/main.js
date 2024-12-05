import "./style.css";
import { mount } from "svelte";
import { fetchPokemon } from "./js/api";
import StorageBox from "./js/components/StorageBox.svelte";
import Storage from "./js/components/pages/Storage.svelte";

const app = document.querySelector("#app");
const searchButton = document.createElement("button");
searchButton.textContent = "Search Pokémon";
const input = document.createElement("input");
input.placeholder = "Enter Pokémon name";

searchButton.addEventListener("click", async () => {
  try {
    const pokemon = await fetchPokemon(input.value.toLowerCase());
    app.innerHTML = `
      <h2>${pokemon.name.toUpperCase()}</h2>
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
      <p>Type: ${pokemon.types.map((t) => t.type.name).join(", ")}</p>
      <p>Weight: ${pokemon.weight}</p>
    `;
  } catch (err) {
    app.innerHTML = `<p>${err.message}</p>`;
  }
});

mount(StorageBox, {
  target: app,
  props: {
    name: "Pikachu",
  },
});

app.appendChild(input);
app.appendChild(searchButton);

const storageContainer = document.createElement("div");
app.appendChild(storageContainer);

mount(Storage, {
  target: storageContainer,
  props: {},
});
