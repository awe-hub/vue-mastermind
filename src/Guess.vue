<template>
    <div class="guess">
        <Cell :background="guess[0]" :clickable=true :index = "0" @cell-clicked="changeColor"/>
        <Cell :background="guess[1]" :clickable=true :index = "1" @cell-clicked="changeColor"/>
        <Cell :background="guess[2]" :clickable=true :index = "2" @cell-clicked="changeColor"/>
        <Cell :background="guess[3]" :clickable=true :index = "3" @cell-clicked="changeColor"/>
        <button @click="submitGuess">Submit</button>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import Cell from './Cell.vue';
    const guess = ref([ 'green', 'green', 'green', 'green' ]);

    function submitGuess() {
        console.log('Guess submitted:', guess.value);
    }

    function changeColor(index) {
        console.log('Changing color at index:', index);
        const colors = ['green', 'red', 'blue', 'yellow'];
        const currentColorIndex = colors.indexOf(guess.value[index]);
        console.log('Current color index:', currentColorIndex);
        const nextColorIndex = (currentColorIndex + 1) % colors.length;
        guess.value[index] = colors[nextColorIndex];
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