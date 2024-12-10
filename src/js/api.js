export async function fetchPokemon(name) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!response.ok) {
    throw new Error('Pokemon not found!');
  }
  return await response.json();
}

export async function getSprite(name) {
  await fetchPokemon(name).then((data) => {
    const sprite = data.sprites.other.home.front_default;
    return sprite;
  });
}
