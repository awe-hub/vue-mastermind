<template>
    <div class="cell" :style="{ backgroundColor: background }">
        <!-- Add your cell content here -->
        {{ cell }}
    </div>
</template>

<script setup>
defineProps({
        background: String
    });
</script>

<style scoped>
/* Add your styles here */
.cell {
    /* Example styling */
    width: 50px;
    height: 50px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>