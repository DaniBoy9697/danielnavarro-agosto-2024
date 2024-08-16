import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
});

export const fetchPokemons = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  const results = response.data.results;

  // Mapear los resultados para obtener los detalles de cada Pokémon
  return await Promise.all(
    results.map(async (result: { name: string; url: string }) => {
      const details = await axios.get(result.url);
      return {
        id: details.data.id,
        name: details.data.name,
        image: details.data.sprites.front_default,
      };
    })
  );
};

export const fetchPokemonDetails = async (id: string | number) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  const evolutionResponse = await axios.get(speciesResponse.data.evolution_chain.url);
  const evolutions = await getEvolutionChain(evolutionResponse.data.chain);

  return {
    name: response.data.name,
    image: response.data.sprites.other['official-artwork'].front_default,
    id: response.data.id,
    stats: response.data.stats.map((stat: any) => stat.base_stat),
    types: response.data.types.map((t: any) => t.type.name),
    height: response.data.height,
    weight: response.data.weight,
    sound: `https://pokemoncries.com/cries/${response.data.id}.mp3`,
    description: speciesResponse.data.flavor_text_entries.find(
      (entry: any) => entry.language.name === 'en'
    )?.flavor_text,
    evolutions,
  };
};

const getEvolutionChain = async (chain: any) => {
  const evolutions = [];
  let currentChain = chain;

  while (currentChain) {
    const speciesName = currentChain.species.name;

    // Consulta la API de /pokemon/{name} para obtener la imagen correcta
    const pokemonDetailsResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${speciesName}`);
    const image = pokemonDetailsResponse.data.sprites.other['official-artwork'].front_default;

    evolutions.push({
      name: speciesName,
      image: image,
    });

    currentChain = currentChain.evolves_to[0]; // Continuar con la siguiente evolución
  }

  return evolutions;
};