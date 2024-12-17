import { writable } from 'svelte/store';
import { getLocalStorageId } from './utils';
import { supabase } from '../lib/supabase';


// Store with localStorage
function createPersistentStore(key, initialValue) {
  const storedValue = localStorage.getItem(key);
  const parsedValue = storedValue ? JSON.parse(storedValue) : initialValue;

  const store = writable(parsedValue);

  // Subscribe to store changes
  store.subscribe((value) => {
    localStorage.setItem(key, JSON.stringify(value));
  });

  return store;
}

// Persistent coin balance
export const coinBalance = createPersistentStore('coinBalance', 100);

// Persistent backpack
export const backpack = createPersistentStore('backpack', []);

// Add and spend coins
export function addCoins(amount) {
  coinBalance.update((balance) => balance + amount);
}

export async function spendCoins(amount) {

    const userId = getLocalStorageId();
  
      await supabase
      .from('users')
      .update({coins: amount})
      .eq('id', userId);  
      
      document.querySelector('.coinAmount').innerHTML = amount;
  

}

// Add items to the backpack
export function addToBackpack(item) {
  backpack.update((items) => {
    const existingItem = items.find((i) => i.name === item.name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      items.push({ ...item, quantity: 1 });
    }
    return items;
  });
}