<template>
    <div class="circle" :style="{ backgroundColor: background }">
        <!-- Add your cell content here -->

    </div>
</template>

<script setup>
defineProps({
        background: String
    });
</script>

<style scoped>
/* Add your styles here */
.circle {
    /* Example styling */
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>