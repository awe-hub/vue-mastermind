<template>
    <div class="guess">
        <Cell
            v-for="(color, index) in localGuessColors"
            :key="index"
            :background="color"
            :clickable="isActive"
            :hidden="!isActive && !isLocked"
            @cell-clicked="changeColor(index)"
        />
        <div class="button-container">
            <Feedback :feedbackPegs="guess.feedback" /> 
            <button @click="submitGuess" :disabled="!isActive" :hidden="!isActive">Submit</button>
            <button @click="randomizeGuess" :disabled="!isActive" :hidden="!isActive">Randomize</button>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import Cell from './Cell.vue';
    import Feedback from './Feedback.vue';

    const emit = defineEmits(['submit-clicked']);
    const props = defineProps({
        isActive: {
            type: Boolean,
            default: false
        },
        isLocked: {
            type: Boolean,
            default: false
        },
        guess: {
            type: Object,
            default: () => ({
                colors: [], // Default colors for the guess
                feedback: [] // Default empty feedback
            })
        }
    });
    const colors = ['green', 'red', 'blue', 'yellow'];
    const localGuessColors = ref(["gray", "gray", "gray", "gray" ]);

    function submitGuess() {
        console.log('Guess submitted:', localGuessColors.value);
        const isValid = localGuessColors.value.every(color => colors.includes(color));
        if (!isValid) {
            alert(`Invalid guess. All pegs must be one of: ${colors.join(', ')}`);
            console.error('Invalid guess. All pegs must be one of:', colors);
            return;
        }

        //props.guess.feedback = ['correct', 'correct', 'almost'];

        emit('submit-clicked', localGuessColors.value);
    }

    function changeColor(index) {
        const currentColorIndex = colors.indexOf(localGuessColors.value[index]);
        const nextColorIndex = (currentColorIndex + 1) % colors.length;
        localGuessColors.value[index] = colors[nextColorIndex];
    }

    function randomizeGuess() {
        for (let i = 0; i < localGuessColors.value.length; i++) {
            const randomIndex = Math.floor(Math.random() * colors.length);
            localGuessColors.value[i] = colors[randomIndex];
        }
    }
</script>

<style scoped>
.guess {
    display: grid;
    grid-template-columns: 60px 60px 60px 60px 100px; /* 4 cells + 1 column for buttons */
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
    padding: 2px 10px; /* Increase padding for a more prominent look */
    cursor: pointer;
    background: linear-gradient(to bottom, #007BFF, #0056b3); /* Add a gradient for a 3D effect */
    color: white;
    border: 2px solid #0056b3; /* Border color matches the gradient */
    border-radius: 5px; /* Rounded corners */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* Add a shadow for depth */
    transition: transform 0.2s, box-shadow 0.2s; /* Smooth hover effect */
}

button:hover {
    background: linear-gradient(to bottom, #0056b3, #003f7f); /* Darken gradient on hover */
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.3); /* Stronger shadow on hover */
    transform: translateY(-2px); /* Slightly lift the button */
}

button:active {
    background: linear-gradient(to bottom, #003f7f, #0056b3); /* Invert gradient on click */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Reduce shadow on click */
    transform: translateY(2px); /* Simulate button press */
}
</style>