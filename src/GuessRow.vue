<template>
    <div class="guess">
        <GamePeg
            v-for="(color, index) in localGuessColors"
            :key="index"
            :background="color"
            :clickable="isActive"
            :hidden="!isActive && !isLocked"
            @cell-clicked="changeColor(index)"
        />
        <div class="button-container">
            <GuessFeedback :feedbackPegs="guess.feedback" /> 
            <BaseButton @click="submitGuess" :disabled="!isActive || (localGuessColors.some(color => color === 'gray')) " :hidden="!isActive">Submit</BaseButton>
            <BaseButton @click="randomizeGuess" :disabled="!isActive" :hidden="!isActive">Randomize</BaseButton>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import GamePeg from './GamePeg.vue';
    import GuessFeedback from './GuessFeedback.vue';
    import BaseButton from './components/BaseButton.vue';

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
                colors: [],
                feedback: []
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

</style>