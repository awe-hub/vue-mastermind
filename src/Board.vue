<template>
    <div class="board">
        <Cell :background="getRandomColor()" />
        <Cell :background="getRandomColor()" />
        <Cell :background="getRandomColor()" /> 
        <Cell :background="getRandomColor()" />
    </div>
    <Guess @submit-clicked="addGuess"/>

</template>

<script setup>
import { ref } from 'vue';
import Cell from './Cell.vue';
import Guess from './Guess.vue';
const colors = ['green', 'red', 'blue', 'yellow']
const guesses = ref([])

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length)

  return colors[index]
}
function addGuess(guess) {
  console.log('Adding guess:', guess)
  guesses.value.push(guess)
  console.log('Guesses:', guesses.value)
}
</script>

<style scoped>
.board {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}
</style>