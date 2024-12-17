import { supabase } from '../lib/supabase';


export function renderHeaderFooter() {
  const header = document.createElement('header');
  header.innerHTML = `
    <nav>
      <a href="/pokemon">Pokemon</a>
      <a href="/shop">Shop</a>
      <a href="/storage">Storage</a>
      <a href="/backpack">Backpack</a>
    </nav>
  `;

  const footer = document.createElement('footer');
  footer.innerHTML = `
    <p>WDD330 Final Project - Team Thinkpad</p>
  `;

  document.body.prepend(header);
  document.body.appendChild(footer);
}


export async function getAllPokemons(userId) {
  try {
    const { data, error } = await supabase
      .from('pokemonOwned')
      .select('*')
      .eq('user_id', userId);

      console.log('Supabase query data:', data);  

    return data;
  } catch (error) {
    console.error('Error fetching Pokemon:', error.message);
  }
}

export async function getOwnedPokemon(pokemonId) {
  try{ 
    const {data, error} = await supabase
    .from('pokemonOwned')
    .select('*')
    .eq('id', pokemonId)
    .single();

    return data

  } catch (error) {
    console.error('Error fething Pokemon: ', error.message)
    
  }
}

export async function calculateHunger(pokemonId) {
    
    const pokemon = await getOwnedPokemon(pokemonId);

    const date = new Date(pokemon.last_fed);
    const now = new Date();

    const hunger = pokemon.hunger

    const difference = now - date;
    const differenceInMinutes = Math.floor(difference / 1000 / 60);

    const maxHungerTime = 3 * 24 * 60;

    let hungerPercentage = hunger - (differenceInMinutes / maxHungerTime * 100);

    if (differenceInMinutes >= maxHungerTime) {
      hungerPercentage = 0;
    }

    if (hungerPercentage > 100) {
      hungerPercentage = 100;
    }

    hungerPercentage = Math.round(hungerPercentage);

    console.log(`Calculate Hunger percentage ${hungerPercentage}`)


    return hungerPercentage;

}

export async function calculateHappiness(pokemonId) {
  const pokemon = await getOwnedPokemon(pokemonId);

    const date = new Date(pokemon.last_walked);
    const now = new Date();

    const happiness = pokemon.happiness

    const difference = now - date;
    let differenceInMinutes = Math.floor(difference / 1000 / 60);

    if (differenceInMinutes < 0){
      differenceInMinutes = 0;
    }
  
    const maxHappinessTime = 6 * 24 * 60;

    let happinessPercentage = happiness - (differenceInMinutes / maxHappinessTime * 100);

    if (differenceInMinutes >= maxHappinessTime) {
      happinessPercentage = 0;
    }

    if (happinessPercentage > 100) {
      happinessPercentage = 100;
    }

    happinessPercentage = Math.round(happinessPercentage);

    console.log(`Calculate Happiness percentage ${happinessPercentage}`)

    return happinessPercentage;

}

export function getLocalStorageId() {
  const id = localStorage.getItem('userId');
  return id;
}


export async function getCoins() {
  try{ 

    const userId = getLocalStorageId();

    const {data, error} = await supabase
    .from('users')
    .select('coins')
    .eq('id', userId)
    .single();

    return data.coins

  } catch (error) {
    console.error('Error fething Pokemon: ', error.message)
    
  }

}

export async function feed(pokemonId) {

  try{

    const updatedHunger = await calculateHunger(pokemonId);
    const updatedHappiness = await calculateHappiness(pokemonId);

    await supabase
    .from('pokemonOwned')
    .update({
      happiness: updatedHappiness,
      hunger: updatedHunger
    })
    .eq('id', pokemonId)


    const { data, error: fetchError } = await supabase
      .from('pokemonOwned')
      .select('hunger, happiness')
      .eq('id', pokemonId)
      .single();

      if (fetchError) throw fetchError;

      const currentHunger = data.hunger;
      const newHunger = Math.min(100, currentHunger + 10);
 
      const currentHappiness = data.happiness;
      const newHappiness = Math.min(100, currentHappiness + 10);
      
      document.querySelector('.hungerStat').innerHTML = `Hunger: ${newHunger}%`;
      document.querySelector('.happinessStat').innerHTML = `Happiness: ${newHappiness}%`;



    const { error: updateError } = await supabase
    .from('pokemonOwned')
    .update({
      last_fed: new Date(),
      hunger: newHunger,
      happiness: newHappiness
    })
    .eq('id', pokemonId)

    console.log('Last fed date updated successfully');
  } catch (error ){
    console.error('Unable to update last_fed date')
  }

}


export async function walk(pokemonId) {

  try{

    const updatedHappiness = await calculateHappiness(pokemonId);

    await supabase
    .from('pokemonOwned')
    .update({
      happiness: updatedHappiness
    })
    .eq('id', pokemonId)

    const { data, error: fetchError } = await supabase
      .from('pokemonOwned')
      .select('happiness')
      .eq('id', pokemonId)
      .single();

      if (fetchError) throw fetchError;

    const currentHappiness = data.happiness;
    const newHappiness = Math.min(100, currentHappiness + 30);

    document.querySelector('.happinessStat').innerHTML = `Happiness: ${newHappiness}%`;

    const { error: updateError  } = await supabase
    .from('pokemonOwned')
    .update({
      last_walked: new Date(), 
    happiness: newHappiness})
    .eq('id', pokemonId)



    const userId = getLocalStorageId();

    const coins = await getCoins();
    const updatedCoins = coins + 20

  await supabase
  .from('users')
  .update({ coins: updatedCoins}) 
  .eq('id', userId);

  document.querySelector('.coinAmount').innerHTML = updatedCoins;



  console.log('Last walked date updated successfully');



  } catch (error ){
    console.error('Unable to update last_walked date')
  }

}



export async function getPokemonIds(){
  const { data, error } = await supabase
    .from('pokemonList')
    .select('pokemon_id')
    .not('pokemon_id', 'is', null);  

   
  if (error) {
    console.error('Error fetching data:', error);
    return;
  }

  const pokemonIds = data.map(pokemon => pokemon.pokemon_id);
  
  console.log('Pokemon IDs:', pokemonIds);
  return pokemonIds;
}

function getRandomIndexes(arrayLength, numSelections) {
  const indexes = new Set();
  while (indexes.size < numSelections) {
    const randomIndex = Math.floor(Math.random() * arrayLength);
    indexes.add(randomIndex);
  }
  return Array.from(indexes);
}

export async function getRandomPokemonIds() {
  const pokemonIds = await getPokemonIds();
  const numSelections = Math.min(5, pokemonIds.length);
  const randomIndexes = getRandomIndexes(pokemonIds.length, numSelections);
  const randomPokemonIds = randomIndexes.map(index => pokemonIds[index]);

  console.log('Random Pokemon IDs:', randomPokemonIds);
  return randomPokemonIds;
}

export async function addRandomPokemonsToOwned(user_id) {
  const randomPokemonIds = await getRandomPokemonIds();

  const { data, error } = await supabase
    .from('pokemonList')
    .select('*')
    .in('pokemon_id', randomPokemonIds);

  if (error) {
    console.error('Error fetching pokemon details:', error);
    return;
  }

  const pokemonsToAdd = data.map(pokemon => ({
    user_id: user_id,
    pokemon_id: pokemon.pokemon_id,
    last_fed: new Date().toISOString(),
    last_walked: new Date().toISOString(),
    name: pokemon.name,
    img_url: pokemon.image_url,
    happiness: 100, 
    hunger: 100    
  }));

  const { error: insertError } = await supabase
    .from('pokemonOwned')
    .insert(pokemonsToAdd);

  if (insertError) {
    console.error('Error inserting pokemons:', insertError);
    return;
  }

  console.log('Pokemon added successfully to pokemonOwned');
}