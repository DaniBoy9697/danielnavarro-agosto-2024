<template>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">
        &lt;
      </button>
      <span
        v-for="page in totalPages"
        :key="page"
        :class="['page-number', { active: page === currentPage }]"
        @click="goToPage(page)"
      >
        {{ page }}
      </span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        &gt;
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits, computed } from 'vue';
  
  defineProps<{ totalPages: number; currentPage: number }>();
  const emits = defineEmits(['updatePage']);
  
  // Computed property to disable the "Previous" button
  const prevPage = () => {
    if (currentPage > 1) {
      emits('updatePage', currentPage - 1);
    }
  };
  
  // Computed property to disable the "Next" button
  const nextPage = () => {
    if (currentPage < totalPages) {
      emits('updatePage', currentPage + 1);
    }
  };
  
  // Go to the selected page
  const goToPage = (page: number) => {
    emits('updatePage', page);
  };
  </script>
  
  <style scoped>
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
  }
  
  button {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: #333;
  }
  
  button:disabled {
    cursor: not-allowed;
    color: #ddd;
  }
  
  .page-number {
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 5px;
    color: #333;
  }
  
  .page-number.active {
    background-color: #e0e0e0;
    font-weight: bold;
  }
  </style>