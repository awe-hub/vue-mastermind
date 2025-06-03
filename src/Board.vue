<template>
    <div class="answer" :class="{ hidden: !gameOver }">
        <Cell :background="key[0]" />
        <Cell :background="key[1]" />
        <Cell :background="key[2]" /> 
        <Cell :background="key[3]" />
    </div>
    <Guess 
        v-for="(guess, index) in guesses"
        :key="index"
        :guess="guess"
        :isActive="(index === activeGuessIndex && !gameOver)" 
        :isLocked="(index < activeGuessIndex)"      
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
const gameOver = ref(false)

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

  if (activeGuessIndex.value >= guesses.value.length) {
    alert('Game over! You have used all your guesses.')
    gameOver.value = true
    return
  }

  if (feedback.every(f => f === 'correct')) {
    alert('Winner! Congratulations! You guessed the key!')
    gameOver.value = true
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
    grid-template-columns: repeat(4, 60px);
    gap: 10px;
}

.answer.hidden {
    opacity: 0;
}

</style>