<template>
    <div 
        class="circle" 
        :style="{ '--circle-color': background, '--circle-gradient': `linear-gradient(to bottom, ${background}, ${darkenColor(background, 80)})` }"
        @click=clicked()
        :class="{ hidden: hidden, clickable: clickable }"
    >
    </div>
</template>

<script setup>
    const emit = defineEmits(['cell-clicked']);
    const props = defineProps({
            background: {
                type: String,
                default: 'black'
            },
            clickable: {
                type: Boolean,
                default: false
            },
            index: {
                type: Number,
                default: 0
            },
            hidden: {
                type: Boolean,
                default: false
            }
        });
    function clicked() {

        if (props.clickable) {emit('cell-clicked', props.index);}
    }

// Utility function to darken a color
function darkenColor(color, percent) {
    const num = parseInt(color.slice(1), 16); // Convert hex to integer
    const amt = Math.round(2.55 * Math.max(percent, 20)); // Ensure a minimum adjustment of 20%

    // Adjust each color channel and clamp the values between 0 and 255
    const r = Math.max(0, (num >> 16) - amt); // Adjust red
    const g = Math.max(0, ((num >> 8) & 0x00ff) - amt); // Adjust green
    const b = Math.max(0, (num & 0x0000ff) - amt); // Adjust blue

    // Convert back to hex and return the darkened color
    return `#${(0x1000000 + (r * 0x10000) + (g * 0x100) + b).toString(16).slice(1)}`;
}
</script>

<style scoped>

.circle {
    width: 50px;
    height: 50px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 50%;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--circle-gradient, black); /* Use the gradient dynamically */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* Add depth */
    transition: transform 0.2s, box-shadow 0.2s, background 0.3s; /* Smooth transitions */
}

.circle.clickable:hover {
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.3); /* Stronger shadow on hover */
    transform: translateY(-2px); /* Slightly lift the circle */
}

.circle.clickable:active {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Reduce shadow on click */
    transform: translateY(2px); /* Simulate button press */
}

.circle.hidden {
    opacity: 0;
    pointer-events: none;
}
</style>