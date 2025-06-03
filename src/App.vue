<template>
  <div class="stats">
    Wins: {{ stats.wins }} | Losses: {{ stats.losses }}
  </div>
  <Board @game-end="handleGameEnd" />
</template>

<script setup>

import { ref, onMounted } from 'vue';
import Board from './Board.vue';

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

</style>
