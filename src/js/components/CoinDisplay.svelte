<script>
  import { coinBalance } from '../coinStore';

  // Subscribe to the coin balance
  let coins;
  coinBalance.subscribe((value) => (coins = value));
</script>

<div class="coinContainer">
  <!-- Coin Display Bar -->
  <div class="coinBar">
    <div class="coinInfo">
      <img class="coinImg" src="/src/images/coin.webp" alt="Coin Icon" />
      <span>{coins}</span>
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
