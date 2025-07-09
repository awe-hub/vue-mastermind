export function gameLogic() {
  function checkGuess(guess, key) {
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
  return { checkGuess }
}