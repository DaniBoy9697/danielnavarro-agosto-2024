<template>
  <div class="team-view">
    <h2>My Team</h2>
    <div class="pokemon-team">
      <div
        v-for="pokemon in store.selectedPokemons"
        :key="pokemon.id"
        class="team-pokemon-card"
      >
        <PokemonCard :pokemon="pokemon" />
        <button @click="removePokemon(pokemon)" class="remove-btn">
          Remove
        </button>
        <router-link :to="`/team/${pokemon.id}`" class="details-link">
          View Details
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { usePokemonStore } from '@/stores/usePokemonStore';
  import PokemonCard from '@/components/PokemonCard.vue';

  const store = usePokemonStore();

  const removePokemon = (pokemon: any) => {
    store.removePokemonFromTeam(pokemon);
  };
</script>

<style scoped>
  .team-view {
    padding: 1rem;
  }

  .pokemon-team {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .team-pokemon-card {
    position: relative;
  }

  .remove-btn {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background-color: #e74c3c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .remove-btn:hover {
    background-color: #c0392b;
  }

  .details-link {
    display: block;
    margin-top: 0.5rem;
    color: #1DA1F2;
    text-align: center;
    text-decoration: none;
  }

  .details-link:hover {
    text-decoration: underline;
  }
</style>