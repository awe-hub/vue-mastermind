<template>
    <div class="guess">
        <Cell :background="guess[0]" :clickable=isActive :hidden="!isActive" :index = "0" @cell-clicked="changeColor"/>
        <Cell :background="guess[1]" :clickable=isActive :hidden="!isActive" :index = "1" @cell-clicked="changeColor"/>
        <Cell :background="guess[2]" :clickable=isActive :hidden="!isActive" :index = "2" @cell-clicked="changeColor"/>
        <Cell :background="guess[3]" :clickable=isActive :hidden="!isActive" :index = "3" @cell-clicked="changeColor"/>
        <div class="button-container">
            <button @click="submitGuess" :disabled="!isActive" :hidden="!isActive">Submit</button>
            <button @click="randomizeGuess" :disabled="!isActive" :hidden="!isActive">Randomize</button>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import Cell from './Cell.vue';
    const emit = defineEmits(['submit-clicked']);
    const props = defineProps({
        isActive: {
            type: Boolean,
            default: false
        }
    });
    const guess = ref([ "black", "black", "black", "black" ]);

    function submitGuess() {
        console.log('Guess submitted:', guess.value);
        emit('submit-clicked', guess.value);
    }

    function changeColor(index) {
        console.log('Changing color at index:', index);
        const colors = ['green', 'red', 'blue', 'yellow'];
        const currentColorIndex = colors.indexOf(guess.value[index]);
        console.log('Current color index:', currentColorIndex);
        const nextColorIndex = (currentColorIndex + 1) % colors.length;
        guess.value[index] = colors[nextColorIndex];
    }

    function randomizeGuess() {
        const colors = ['green', 'red', 'blue', 'yellow'];
        for (let i = 0; i < guess.value.length; i++) {
            const randomIndex = Math.floor(Math.random() * colors.length);
            guess.value[i] = colors[randomIndex];
        }
    }
</script>

<style scoped>
.guess {
    display: grid;
    grid-template-columns: repeat(5, 1fr); /* 4 cells + 1 column for buttons */
    gap: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 15px;
    border: 2px solid #ccc;
    border-radius: 10px;
    background-color: #5b1c1c;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
}

.guess:hover {
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15); /* Slightly stronger shadow on hover */
}

.button-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;}

input {
    margin-right: 10px;
    padding: 5px;
}

button {
    padding: 2px 10px;
    cursor: pointer;
    background-color: #007BFF;
    color: white;
    border: 2px solid #0056b3; /* Add a border with a darker blue color */
    border-radius: 5px; /* Optional: Add rounded corners */
    transition: background-color 0.3s, border-color 0.3s; /* Smooth hover effect */
}

button:hover {
    background-color: #0056b3; /* Darken background on hover */
    border-color: #003f7f; /* Darken border on hover */
}
</style>