import { useState, useEffect } from 'react';
import Card from './Card';
import { useSelector, useDispatch } from 'react-redux';
import { useFetchPokemons } from '../hooks/useFetchPokemon';
import { resetType, setPokemonType } from '../controller/pokemonTypeSlice';

const CardHolder = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchError, setSearchError] = useState('');
  const [ buttonText, setButtonText] = useState('Search')
  const isScreenSmall = useSelector((state) => state.screen.isScreenSmall)
  const pokemonsPerPage = isScreenSmall ? 6 : 5;
  const data = useSelector((state) => state.pokemonFetched.data)
  const fetch_loading = useSelector((state) => state.pokemonFetched.loading)
  const totalPages = useSelector((state) => state.totalPages.amount)
  const pokemonTypes = useSelector((state) => state.pokemonType.availablePokemonType)
  const availablePokemonType = useSelector((state) => state.pokemonType.availablePokemonType)
  const currentPokemonType = useSelector((state) => state.pokemonType.currentPokemonType)
  const dispatch = useDispatch();

  useFetchPokemons(pokemonsPerPage, page)

  //This could be its own component....<SearchBar>
  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      dispatch(resetType())
      return;
    }
    if (pokemonTypes.includes(searchTerm)) {
      dispatch(setPokemonType(searchTerm))
      setSearchTerm('');
      setSearchError('');
      return
    }
    try {
      dispatch(resetType())
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
    const loadPokemons = async () => {
      setLoading(true);
      try {
        const detailedPokemons = await Promise.all(
          data.map(async (pokemon) => {
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

    loadPokemons();
  }, [page, pokemonsPerPage, data]);

  useEffect(() => {
    setPage(1);
  }, [isScreenSmall, currentPokemonType])
  useEffect(() => {
    if(currentPokemonType !== "All"){
      setButtonText("Delete Filter")
      return
    }
    setButtonText("Search")
  }, [currentPokemonType])

  if (loading || fetch_loading) {
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
          placeholder="Search Pokémon by name/ID or type..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          {buttonText}
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