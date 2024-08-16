<template>
  <div class="stats-chart">
    <svg width="200" height="100">
      <polyline
        :points="points"
        fill="none"
        stroke="#1DA1F2"
        stroke-width="2"
      />
      <circle v-for="(stat, index) in stats" :key="index" :cx="index * 40 + 20" :cy="100 - stat" r="4" fill="#1DA1F2" />
    </svg>
    <ul class="stat-labels">
      <li v-for="(stat, index) in statNames" :key="index">{{ stat }}: {{ stats[index] }}</li>
    </ul>
  </div>
</template>
  
<script setup lang="ts">
  import { computed } from 'vue';
  
  interface Props {
    stats: number[];
  }
  
  const props = defineProps<Props>();
  
  const statNames = ['HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed'];
  
  const points = computed(() =>
    props.stats.map((stat, index) => `${index * 40 + 20},${100 - stat}`).join(' ')
  );
</script>
  
<style scoped>
  .stats-chart {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .stat-labels {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .stat-labels li {
    margin-top: 0.5rem;
    text-align: center;
  }
</style>