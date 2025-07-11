export function useConfetti(confetti) {
    var stop = false;
    // adapted from canvas-confetti example
    function genericConfetti() {
        // do this for 15 seconds
        const duration = 15 * 1000;
        const start = Date.now()
        const end = start + duration;
        stop = false;

        (function frame() {
            // pulse the confetti
            const now = Date.now()
            const elapsedSeconds = Math.floor((now - start) / 1000);
            if (elapsedSeconds % 2 === 0) {
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
            }
            // keep going until we are out of time or until manually stopped
            if (now < end && !stop) {
                requestAnimationFrame(frame);
            }
        }());    
    }

    function stopConfetti() {
        stop = true;
    }

    return { genericConfetti, stopConfetti}
}

