<template>
  <div class="home-view">
    <div class="pokemon-grid">
      <PokemonCard
        v-for="pokemon in paginatedPokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
      />
    </div>
    <Pagination
      :totalPages="totalPages"
      :currentPage="currentPage"
      @updatePage="changePage"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { fetchPokemons } from '@/utils/api';
import PokemonCard from '@/components/PokemonCard.vue';
import Pagination from '@/components/Pagination.vue';

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

const pokemons = ref<Pokemon[]>([]);
const currentPage = ref(1);
const pageSize = 25;
const totalPages = computed(() => Math.ceil(151 / pageSize));

// Cargar los Pokémon según la página seleccionada
const loadPokemons = async () => {
  const data = await fetchPokemons(currentPage.value, pageSize);
  pokemons.value = data;
};

// Cambiar la página y recargar los Pokémon
const changePage = (page: number) => {
  currentPage.value = page;
  loadPokemons();
};

onMounted(() => {
  loadPokemons();
});

const paginatedPokemons = computed(() => pokemons.value);
</script>

<style scoped>
.home-view {
  padding: 20px;
}

.pokemon-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
</style>

<style scoped>
.home-view {
  padding: 20px;
}

.pokemon-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.load-more-btn {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #1da1f2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.load-more-btn:hover {
  background-color: #0c85d0;
}
</style>