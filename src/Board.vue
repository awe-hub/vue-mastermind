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
        :key="gameId + '-' + index"
        :guess="guess"
        :isActive="(index === activeGuessIndex && !gameOver)" 
        :isLocked="(index < activeGuessIndex)"      
        @submit-clicked="addGuess">
    </Guess>
</template>

<script setup>
import { inject } from 'vue';
import { useConfetti } from './composables/useConfetti';
import { gameLogic } from './composables/gameLogic';

import Cell from './Cell.vue';
import Guess from './Guess.vue';
import BaseButton from './components/BaseButton.vue';

const confetti = inject('ms-confetti');
const { genericConfetti } = useConfetti(confetti);
const { gameId, key, guesses, activeGuessIndex, gameOver, checkGuess, isWin, isLoss, resetGame } = gameLogic();

const emit = defineEmits(['game-end']);

resetGame()

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

  if (isWin(feedback)) {
    //alert('Winner! Congratulations! You guessed the key!')
    gameOver.value = true
    emit('game-end', 'win');
    genericConfetti();
    return
  }

  if (isLoss()) {
    alert('Game over! You have used all your guesses.')
    gameOver.value = true
    emit('game-end', 'loss');
    return
  }
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