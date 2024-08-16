import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
});

export const fetchPokemons = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;
  const response = await api.get(`pokemon?limit=${limit}&offset=${offset}`);
  const results = response.data.results;

  return await Promise.all(
    results.map(async (result: { name: string; url: string }) => {
      const details = await axios.get(result.url);
      return {
        name: details.data.name,
        image: details.data.sprites.front_default,
        id: details.data.id,
      };
    })
  );
};

export const fetchPokemonDetails = async (id: string | number) => {
  const response = await api.get(`pokemon/${id}`);
  const speciesResponse = await api.get(`pokemon-species/${id}`);

  const evolutionResponse = await axios.get(
    speciesResponse.data.evolution_chain.url
  );
  const evolutions = await getEvolutionChain(evolutionResponse.data.chain);

  return {
    name: response.data.name,
    image: response.data.sprites.other['official-artwork'].front_default,
    id: response.data.id,
    stats: {
      hp: response.data.stats[0].base_stat,
      attack: response.data.stats[1].base_stat,
      defense: response.data.stats[2].base_stat,
      'special-attack': response.data.stats[3].base_stat,
      'special-defense': response.data.stats[4].base_stat,
      speed: response.data.stats[5].base_stat,
    },
    types: response.data.types.map((t: any) => t.type.name),
    height: response.data.height,
    weight: response.data.weight,
    sound: `https://pokemoncries.com/cries/${response.data.id}.mp3`,
    description: speciesResponse.data.flavor_text_entries.find(
      (entry: any) => entry.language.name === 'en'
    ).flavor_text,
    evolutions,
  };
};

const getEvolutionChain = async (chain: any) => {
  const evolutions = [];
  let currentChain = chain;

  while (currentChain) {
    const speciesResponse = await axios.get(currentChain.species.url);
    evolutions.push({
      name: currentChain.species.name,
      image: speciesResponse.data.sprites.front_default,
    });
    currentChain = currentChain.evolves_to[0];
  }

  return evolutions;
};