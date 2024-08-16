import { defineStore } from 'pinia';

interface Pokemon {
  name: string;
  image: string;
  id: number;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    'special-attack': number;
    'special-defense': number;
    speed: number;
  };
  types: string[];
  height: number;
  weight: number;
  sound: string;
  description: string;
  evolutions: { name: string; image: string }[];
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
    clearTeam() {
      this.selectedPokemons = [];
    },
  },
  getters: {
    isTeamFull: (state) => state.selectedPokemons.length >= 6,
  },
});