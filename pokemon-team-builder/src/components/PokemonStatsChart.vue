<template>
  <div class="stats-chart">
    <div class="bars">
      <div
        v-for="(stat, index) in stats"
        :key="index"
        class="bar"
        :style="{ height: `${stat}px` }"
      >
        <span class="stat-value">{{ stat }}</span>
      </div>
    </div>
    <div class="labels">
      <span v-for="(label, index) in labels" :key="index" class="label">
        {{ label }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface StatsProps {
  stats: number[]; // Array de números que representan las estadísticas
  labels: string[]; // Etiquetas para las estadísticas (HP, Attack, Defense, etc.)
}

const props = defineProps<StatsProps>();
</script>

<style scoped>
.stats-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bars {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.bar {
  background-color: #1da1f2;
  width: 30px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  border-radius: 5px;
  position: relative;
}

.bar .stat-value {
  position: absolute;
  bottom: -20px;
  font-size: 12px;
  color: #333;
}

.labels {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
}

.label {
  width: 30px;
  text-align: center;
  font-size: 12px;
  color: #333;
}
</style>