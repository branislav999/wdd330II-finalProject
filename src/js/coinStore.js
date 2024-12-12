import { writable } from 'svelte/store';

// Initialize the coin balance with a default of 100 coins
export const coinBalance = writable(100);

// Functions to add or spend coins
export function addCoins(amount) {
  coinBalance.update((balance) => balance + amount);
}

export function spendCoins(amount) {
  coinBalance.update((balance) => Math.max(0, balance - amount)); // Prevent negative balance
}


// This is how you add or spend coins in the future
// import { addCoins, spendCoins } from '../stores/coinStore';

// addCoins(10);

// spendCoins(5);