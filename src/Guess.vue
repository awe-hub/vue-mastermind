<template>
    <div class="guess">
        <Cell :background="guess[0]" />
        <Cell :background="guess[1]" />
        <Cell :background="guess[2]" />
        <Cell :background="guess[3]" />
        <button @click="submitGuess">Submit</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Cell from './Cell.vue';
const guess = ref([ 'black', 'black', 'black', 'black' ]);

function submitGuess() {
    console.log('Guess submitted:', guess.value);
    // handle guess here
}
</script>

<style scoped>
.guess {
    text-align: center;
    margin-top: 20px;
}

input {
    margin-right: 10px;
    padding: 5px;
}

button {
    padding: 5px 10px;
    cursor: pointer;
}
</style>