<template>
    <div class="feedback">
        <div 
            v-for="(peg, index) in feedbackPegs" 
            :key="index" 
            :class="['peg', peg === 'correct' ? 'correct' : peg === 'almost' ? 'almost' : '']"
        >
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    feedbackPegs: {
        type: Array,
        default: () => [], // Array of feedback pegs: 'correct' or 'almost'
    },
});
</script>

<style scoped>
.feedback {
    display: grid;
    grid-template-columns: repeat(2, 20px);
    grid-template-rows: auto;
    gap: 5px;
    justify-content: center;
    align-items: center;
    margin-top: 2px;
}

.peg {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 1px solid #ccc;
    background-color: transparent;
}

.peg.correct {
    background-color: black;
}

.peg.almost {
    background-color: white;
}
</style>