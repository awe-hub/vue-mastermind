<template>
  <img src="./assets/logo.png" alt="Mastermind Logo" class="logo" />
  <div class="stats">
    Wins: {{ stats.wins }} | Losses: {{ stats.losses }}
  </div>
  <Board @game-end="handleGameEnd" />
</template>

<script setup>

import { ref, onMounted, provide } from 'vue';
import confetti from 'canvas-confetti';
import Board from './Board.vue';

provide('ms-confetti', confetti);
const stats = ref({ wins: 0, losses: 0 });

function getStats() {
  const stored = localStorage.getItem('mastermindStats');
  return stored ? JSON.parse(stored) : { wins: 0, losses: 0 };
}

function saveStats(newStats) {
  localStorage.setItem('mastermindStats', JSON.stringify(newStats));
  stats.value = { ...newStats };
}

onMounted(() => {
  stats.value = getStats();
});

// Handler to be called from Board.vue
function handleGameEnd(result) {
  const newStats = getStats();
  if (result === 'win') newStats.wins += 1;
  if (result === 'loss') newStats.losses += 1;
  saveStats(newStats);
}
</script>



<style scoped>
.logo {
  display: block;
  max-width: 300px;
  width: 100%;
  height: auto;
  margin: 20px auto 10px auto;
}
.stats {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.2em;
}
</style>