<template>
    <div 
        class="circle" 
        :style="{ backgroundColor: background }" 
        @click=clicked()
        :class="{ hidden: hidden }"
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
        console.log('Cell clicked:', props.background);
        if (props.clickable) {emit('cell-clicked', props.index);}
    }

</script>

<style scoped>

.circle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
}
.circle.hidden {
    opacity: 0;
    pointer-events: none;
}
</style>