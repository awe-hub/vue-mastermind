<template>
  <button class="base-button" :type="type">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'button'
  }
});
</script>

<style scoped>
.base-button {
  padding: 2px 10px;
  cursor: pointer;
  background: linear-gradient(to bottom, #007BFF, #0056b3);
  color: white;
  border: 2px solid #0056b3;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, box-shadow 0.2s;
}

.base-button:hover {
  background: linear-gradient(to bottom, #0056b3, #003f7f);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}

.base-button:active {
  background: linear-gradient(to bottom, #003f7f, #0056b3);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transform: translateY(2px);
}

.base-button:disabled {
  opacity: 0.5;
  background: #cccccc;
  color: #666666;
  cursor: not-allowed;
  box-shadow: none;
}
.base-button:disabled:hover {
  transform: none;
  background: #cccccc;
  box-shadow: none;
}

</style>