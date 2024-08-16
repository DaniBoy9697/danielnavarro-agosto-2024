<template>
  <div class="home-view">
    <div class="pokemon-grid">
      <PokemonCard
        v-for="pokemon in paginatedPokemons.value"
        :key="pokemon.id"
        :pokemon="pokemon"
      />
    </div>
    <button @click="loadMore" v-if="hasMore.value" class="load-more-btn">
      Load More
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePokemonStore } from '@/stores/usePokemonStore';
import { fetchPokemons } from '@/utils/api';
import PokemonCard from '@/components/PokemonCard.vue';

const store = usePokemonStore();
const pokemons = ref([]);
const currentPage = ref(1);
const pageSize = 25;

const loadPokemons = async () => {
  const data = await fetchPokemons(currentPage.value, pageSize);
  pokemons.value.push(...data);
};

const loadMore = () => {
  currentPage.value++;
  loadPokemons();
};

onMounted(() => {
  loadPokemons();
});

const paginatedPokemons = ref(() => pokemons.value);
const hasMore = ref(() => pokemons.value.length < 151);
</script>

<style scoped>
  .home-view {
    padding: 1rem;
  }

  .pokemon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }

  .load-more-btn {
    display: block;
    margin: 2rem auto;
    padding: 0.5rem 1rem;
    background-color: #1DA1F2;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .load-more-btn:hover {
    background-color: #0c85d0;
  }
</style>