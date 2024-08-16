import { defineStore } from 'pinia';

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    selectedPokemons: [] as Pokemon[],
  }),
  actions: {
    addPokemonToTeam(pokemon: Pokemon) {
      if (this.selectedPokemons.length < 6 && !this.selectedPokemons.some(p => p.id === pokemon.id)) {
        this.selectedPokemons.push(pokemon);
      }
    },
    removePokemonFromTeam(pokemon: Pokemon) {
      this.selectedPokemons = this.selectedPokemons.filter(p => p.id !== pokemon.id);
    },
  },
  getters: {
    isTeamFull: (state) => state.selectedPokemons.length >= 6,
  },
});