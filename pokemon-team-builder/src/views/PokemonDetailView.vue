<template>
  <div class="pokemon-detail-view">
    <h2>{{ pokemon.name }}</h2>
    <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-image" />
    <div class="pokemon-info">
      <p><strong>Type:</strong> {{ pokemon.types.join(', ') }}</p>
      <p><strong>Height:</strong> {{ pokemon.height }} decimetres</p>
      <p><strong>Weight:</strong> {{ pokemon.weight }} hectograms</p>
      <p><strong>Description:</strong> {{ pokemon.description }}</p>
      <button @click="playSound" class="sound-btn">Play Cry</button>
    </div>
    <PokemonStatsChart :stats="pokemon.stats" />
    <h3>Evolution Chain</h3>
    <div class="evolution-chain">
      <div v-for="evolution in pokemon.evolutions" :key="evolution.name" class="evolution-item">
        <img :src="evolution.image" :alt="evolution.name" />
        <p>{{ evolution.name }}</p>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { fetchPokemonDetails } from '@/utils/api';
  import PokemonStatsChart from "@/components/PokemonStatsChart.vue"

  const route = useRoute();
  const pokemon = ref({
    name: '',
    image: '',
    stats: {
      hp: 0,
      attack: 0,
      defense: 0,
      'special-attack': 0,
      'special-defense': 0,
      speed: 0,
    },
    types: [],
    height: 0,
    weight: 0,
    description: '',
    sound: '',
    evolutions: [],
  });
  
  const loadPokemonDetails = async () => {
    const data = await fetchPokemonDetails(route.params.id);
    pokemon.value = data;
  };
  
  const playSound = () => {
    const audio = new Audio(pokemon.value.sound);
    audio.play();
  };
  
  onMounted(() => {
    loadPokemonDetails();
  });
</script>
  
<style scoped>
  .pokemon-detail-view {
    padding: 1rem;
    text-align: center;
  }
  
  .pokemon-image {
    width: 150px;
    height: 150px;
  }
  
  .pokemon-info {
    margin: 1rem 0;
  }
  
  .sound-btn {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #1DA1F2;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .sound-btn:hover {
    background-color: #0c85d0;
  }
  
  .evolution-chain {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 1rem;
  }
  
  .evolution-item {
    text-align: center;
  }
</style>