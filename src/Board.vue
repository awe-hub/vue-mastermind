<template>
    <div class="board">
        <Cell :background="key[0]" />
        <Cell :background="key[1]" />
        <Cell :background="key[2]" /> 
        <Cell :background="key[3]" />
    </div>
    <Guess 
        v-for="(guess, index) in guesses"
        :key="index"
        :guess="guess"
        :isActive="index === activeGuessIndex" 
        :isLocked="index < activeGuessIndex"      
        @submit-clicked="addGuess">
    </Guess>
</template>

<script setup>
import { ref } from 'vue';
import Cell from './Cell.vue';
import Guess from './Guess.vue';
const colors = ['green', 'red', 'blue', 'yellow']
const key = ref([])
const guesses = ref(Array.from({ length: 10 }, () => ({
  colors: [],
  feedback: []
})
));
const activeGuessIndex = ref(0)

for (let i = 0; i < 10; i++) {
  key.value.push(getRandomColor())
}

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length)

  return colors[index]
}
function addGuess(guessColors) {
  const feedback = checkGuess(guessColors)
  console.log('Adding guess:', guessColors)
  console.log('Feedback:', feedback)
  guesses.value[activeGuessIndex.value] = { colors: guessColors, feedback: feedback }
  activeGuessIndex.value += 1
  console.log('Guesses:', guesses.value)
}

function checkGuess(guess) {
  console.log('Checking guess:', guess)
  // Here you would implement the logic to check the guess against the key
  // and provide feedback, e.g., correct or almost correct.
  // This is a placeholder for demonstration purposes.
  return ['correct', 'almost', 'almost']
}

</script>

<style scoped>
.board {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}
</style>