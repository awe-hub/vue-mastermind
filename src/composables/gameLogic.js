import { ref } from 'vue';

export function gameLogic() {
  const colors = ["#00ff00", "#0000ff", "#ff0000", "#ffff00"]
  const key = ref([])
  const guesses = ref(Array.from({ length: 10 }, () => ({
      colors: [],
      feedback: []
    })
  ));
  const activeGuessIndex = ref(0)
  const gameOver = ref(false)
  const gameId = ref("");

  function generateKey() {
    key.value = []
    for (let i = 0; i < 4; i++) {
      key.value.push(getRandomColor())
    }
  }

  function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)

    return colors[index]
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

  function isWin(feedback) {
    return (feedback.every(f => f === 'correct'))
  }

  function isLoss() {
    return (activeGuessIndex.value >= guesses.value.length)
  }

  function resetGame() {
    generateKey()
    guesses.value = Array.from({ length: 10 }, () => ({
      colors: [],
      feedback: []
    }))
    activeGuessIndex.value = 0
    gameOver.value = false
    gameId.value = crypto.randomUUID();
  }

  return { gameId, key, guesses, activeGuessIndex, gameOver, checkGuess, isWin, isLoss, resetGame }
}