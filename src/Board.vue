<template>
    <div class="answer">
        <Cell
          v-for="(color, index) in key"
          :key="index"
          :background="color"
          :clickable="false"
          :hidden="!gameOver"
        />
        <div class="button-container">
          <BaseButton @click="resetGame()">Reset</BaseButton>
          <BaseButton @click="giveUp()">Give Up</BaseButton>
        </div>  
    </div>
    <Guess 
        v-for="(guess, index) in guesses"
        :key="resetKey + '-' + index"
        :guess="guess"
        :isActive="(index === activeGuessIndex && !gameOver)" 
        :isLocked="(index < activeGuessIndex)"      
        @submit-clicked="addGuess">
    </Guess>
</template>

<script setup>
import { ref , inject } from 'vue';
import { useConfetti } from './composables/useConfetti';

import Cell from './Cell.vue';
import Guess from './Guess.vue';
import BaseButton from './components/BaseButton.vue';

const confetti = inject('ms-confetti');
const { startConfettiLoop, stopConfettiLoop } = useConfetti(confetti);
const colors = ['green', 'red', 'blue', 'yellow']
const key = ref([])
const guesses = ref(Array.from({ length: 10 }, () => ({
  colors: [],
  feedback: []
})
));
const activeGuessIndex = ref(0)
const gameOver = ref(false)
const resetKey = ref(0);
const emit = defineEmits(['game-end']);

for (let i = 0; i < 4; i++) {
  key.value.push(getRandomColor())
}

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length)

  return colors[index]
}
function resetGame() {
  console.log('Resetting game...')
  key.value = []
  for (let i = 0; i < 4; i++) {
    key.value.push(getRandomColor())
  }
  guesses.value = Array.from({ length: 10 }, () => ({
    colors: [],
    feedback: []
  }))
  activeGuessIndex.value = 0
  gameOver.value = false
  resetKey.value++;
  stopConfettiLoop();
}

function giveUp() {
  gameOver.value = true
  emit('game-end', 'loss');
  console.log('You gave up! The key was:', key.value)
}

function addGuess(guessColors) {
  const feedback = checkGuess(guessColors)
  console.log('Adding guess:', guessColors)
  console.log('Feedback:', feedback)
  guesses.value[activeGuessIndex.value] = { colors: guessColors, feedback: feedback }
  activeGuessIndex.value += 1
  console.log('Guesses:', guesses.value)

  if (activeGuessIndex.value >= guesses.value.length) {
    alert('Game over! You have used all your guesses.')
    gameOver.value = true
    emit('game-end', 'loss');
    return
  }

  if (feedback.every(f => f === 'correct')) {
    //alert('Winner! Congratulations! You guessed the key!')
    gameOver.value = true
    emit('game-end', 'win');
    startConfettiLoop();
    return
  }
}

function checkGuess(guess) {
  const feedback = []
  const unmatchedKey = {}
  const unmatchedGuess = {}

  console.log('Checking guess:', guess)

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] == key.value[i]) { 
      feedback.push('correct')
    } else {
      unmatchedKey[key.value[i]] = (unmatchedKey[key.value[i]] || 0) + 1
      unmatchedGuess[guess[i]] = (unmatchedGuess[guess[i]] || 0) + 1
    }
  }

  let residualMatches = 0
 
  for (const color in unmatchedGuess) {
    if (unmatchedKey[color] && unmatchedGuess[color]) {
      residualMatches += Math.min(unmatchedGuess[color], unmatchedKey[color])
    }   
  }
  for (let i = 0; i < residualMatches; i++) {
    feedback.push('almost')
  }

  // Fill the rest of the feedback with 'none' if needed
  while (feedback.length < 4) {
    feedback.push('none')
  }

  return feedback
}

</script>

<style scoped>
.answer {
    display: grid;
    grid-template-columns: 60px 60px 60px 60px 100px;
    gap: 10px;
    padding: 15px
}

.answer.hidden {
    opacity: 0;
}

.button-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;}

</style>