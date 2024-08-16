<template>
  <div @click="toggleSelection" :class="['pokemon-card', { selected: isSelected }]">
    <img :src="pokemonImage" :alt="pokemon.name" class="pokemon-image" />
    <h3 class="pokemon-name">{{ pokemon.name }}</h3>
  </div>
</template>
  
<script setup lang="ts">
  import { computed } from 'vue';
  import { usePokemonStore } from '@/stores/usePokemonStore';
  
  interface SimplePokemon {
    name: string;
    image: string;
  }
  
  const props = defineProps<{ pokemon: SimplePokemon }>();
  const store = usePokemonStore();
  
  const isSelected = computed(() => store.selectedPokemons.some(p => p.name === props.pokemon.name));
  
  const toggleSelection = () => {
    if (isSelected.value) {
      store.removePokemonFromTeam(store.selectedPokemons.find(p => p.name === props.pokemon.name)!);
    } else {
      const fullPokemon = {
        ...props.pokemon,
        id: props.pokemon.id,
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
        sound: '',
        description: '',
        evolutions: [],
      };
      store.addPokemonToTeam(fullPokemon);
    }
  };
  
  const pokemonImage = computed(() => props.pokemon.image);
</script>
  
<style scoped>
  .pokemon-card {
    cursor: pointer;
    padding: 1rem;
    border: 2px solid transparent;
    border-radius: 8px;
    transition: border-color 0.2s;
  }
  
  .pokemon-card.selected {
    border-color: #1DA1F2;
  }
  
  .pokemon-image {
    width: 100px;
    height: 100px;
  }
  
  .pokemon-name {
    text-align: center;
    margin-top: 0.5rem;
    font-weight: bold;
  }
</style>