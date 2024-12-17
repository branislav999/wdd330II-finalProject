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

    const difference = now - date;
    const differenceInMinutes = Math.floor(difference / 1000 / 60);

    const maxHungerTime = 3 * 24 * 60;

    let hungerPercentage = 100 - (differenceInMinutes / maxHungerTime * 100);

    if (differenceInMinutes >= maxHungerTime) {
      hungerPercentage = 0;
    }

    hungerPercentage = Math.round(hungerPercentage);

    return hungerPercentage;

}

export async function calculateHappiness(pokemonId) {
  const pokemon = await getOwnedPokemon(pokemonId);

    const date = new Date(pokemon.last_walked);

    const now = new Date();

    const difference = now - date;
    const differenceInMinutes = Math.floor(difference / 1000 / 60);

    const maxHappinessTime = 6 * 24 * 60;

    let happinessPercentage = 100 - (differenceInMinutes / maxHappinessTime * 100);

    if (differenceInMinutes >= maxHappinessTime) {
      happinessPercentage = 0;
    }

    happinessPercentage = Math.round(happinessPercentage);

    return happinessPercentage;

}


export async function getCoins(userId) {
  try{ 
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