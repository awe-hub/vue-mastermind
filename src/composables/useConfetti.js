import { ref } from 'vue'

export function useConfetti(confetti) {
    const confettiInterval = ref(null);

    function startConfettiLoop() {
        if (confettiInterval.value) return;

        confettiInterval.value = setInterval(() => {
            confetti({
            particleCount: 200,
            spread: 160
            });
        }, 1000);
    }

    function stopConfettiLoop() {
        if (confettiInterval.value) {
            clearInterval(confettiInterval.value);
            confettiInterval.value = null;
        }
    }

    return { startConfettiLoop, stopConfettiLoop }
}

