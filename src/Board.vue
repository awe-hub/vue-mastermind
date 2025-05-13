<template>
    <div class="board">
        <Cell :background="getRandomColor()" />
        <Cell :background="getRandomColor()" />
        <Cell :background="getRandomColor()" /> 
        <Cell :background="getRandomColor()" />
        <Guess />
    </div>

</template>

<script setup>
import Cell from './Cell.vue';
import Guess from './Guess.vue';
const colors = ['green', 'red', 'blue', 'yellow']

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length)

  return colors[index]
}
</script>

<style scoped>
.board {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}
</style>