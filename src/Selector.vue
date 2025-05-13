<template>
    <div>
      <div 
        v-for="color in colorOptions"
        :key="color"
        @click="selectedColor = color"
        >
        <Cell :background="color" />
        </div>
  
      <Cell :background="selectedColor" />

    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import Cell from './Cell.vue'
  const colorOptions = ['green', 'red', 'blue', 'yellow']
  const selectedColor = ref('red')
  </script>
  
  <style scoped>

  </style>
  