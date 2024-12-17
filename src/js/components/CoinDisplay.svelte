<script>
  import { onMount } from 'svelte';
  import { getCoins } from '../utils';


  let coins;
  
  onMount(async() => {
    coins = await getCoins();
  });



</script>

<div class="coinContainer">
  <!-- Coin Display Bar -->
  <div class="coinBar">
    <div class="coinInfo">
      <img class="coinImg" src="/src/images/coin.webp" alt="Coin Icon" />
      <span class="coinAmount">{coins}</span>
    </div>
  </div>
</div>

<style>
  .coinContainer {
    display: flex;
    flex-direction: column;
  }

  .coinBar {
    margin-right: 15px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .coinInfo {
    font-size: 18px;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .coinImg {
    width: 24px;
    height: 24px;
  }
</style>
