export function useConfetti(confetti) {
    // adapted from canvas-confetti example
    function genericConfetti() {
        // do this for 15 seconds
        var duration = 15 * 1000;
        var end = Date.now() + duration;

        (function frame() {
        // launch a few confetti from the left edge
        confetti({
            particleCount: 7,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        // and launch a few from the right edge
        confetti({
            particleCount: 7,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        // keep going until we are out of time
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
        }());    
    }

    return { startConfettiLoop, stopConfettiLoop, genericConfetti }
}

