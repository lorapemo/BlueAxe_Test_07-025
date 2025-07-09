import { useState, useEffect } from 'react';
import Card from './Card';

const CardHolder = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchError, setSearchError] = useState('');
  const pokemonsPerPage = 5;

  //This could be its own component....<SearchBar>
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      setSearchError('Please enter a Pokémon name');
      return;
    }

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
      const pokemonData = await response.json();

      const pokemonId = pokemonData.id;
      const pageNumber = Math.ceil(pokemonId / pokemonsPerPage);

      setPage(pageNumber);
      setSearchTerm('');
      setSearchError('');

    } catch (error) {
      setSearchError('Pokémon not found');
      console.error("Search error:", error);
    }
  };
  // </SearchBar>

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        //Fetch the whole page
        const offset = (page - 1) * pokemonsPerPage;
        const listResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${pokemonsPerPage}&offset=${offset}`
        );
        const data = await listResponse.json();
        setTotalPages(Math.ceil(data.count / pokemonsPerPage))
        //The api only brings general information (name and url) when you call for an offset
        //Therfore I must then call the API a few more times to get all the relevan info
        //TBH I don't really like this implementation, I think the API could be better if it just brought back all the info it would by calling the specific poke
        const detailedPokemons = await Promise.all(
          data.results.map(async (pokemon) => {
            const detailResponse = await fetch(pokemon.url);
            return await detailResponse.json();
          })
        );

        setPokemons(detailedPokemons);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [page]);

  if (loading) {
    return <div className="loading">Loading Pokémon...</div>;
  }

  return (
    <div className="pokemon-app">
      <form onSubmit={handleSearch} className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setSearchError('');
          }}
          placeholder="Search Pokémon by name or ID..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
        {searchError && <div className="search-error">{searchError}</div>}
      </form>
      <div className="pokemon-grid">
        {pokemons.map((pokemon) => (
          <Card pokemon={pokemon}></Card>
        ))}
      </div>

      <div className="pagination-controls">
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CardHolder;