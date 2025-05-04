<template>
    <div class="board">
        <Cell background="green" />
        <Cell background="red" />
        <Cell background="blue" /> 
        <Cell background="yellow" />
    </div>
</template>

<script setup>
import Cell from './Cell.vue';

const colors = ['green', 'red', 'blue', 'yellow']

</script>

<style scoped>
.board {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}
</style>