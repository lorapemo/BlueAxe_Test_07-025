import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchError, fetchStart, fetchSuccess } from "../controller/pokemonFetchedSlice";
import { setAmount } from '../controller/totalPagesSlice';

export const useFetchPokemons = (pokemonsPerPage, page) => {
    const dispatch = useDispatch();
    const offset = (page - 1) * pokemonsPerPage;
    const currentPokemonType = useSelector((state) => state.pokemonType.currentPokemonType);

    if (pokemonsPerPage === undefined || pokemonsPerPage < 1) {
        throw new Error("The pokemonsPerPage must be greater than zero when the PokemonType is All");
    }

    useEffect(() => {
        if (currentPokemonType === "All") {
            const fetchData = async () => {
                try {
                    dispatch(fetchStart());
                    const response = await fetch(
                        `https://pokeapi.co/api/v2/pokemon?limit=${pokemonsPerPage}&offset=${offset}`
                    );
                    const data = await response.json();
                    dispatch(setAmount(Math.ceil(1302 / pokemonsPerPage)))
                    dispatch(fetchSuccess(data.results));
                } catch (error) {
                    dispatch(fetchError(error));
                }
            };

            fetchData();
        }
        if (currentPokemonType !== "All") {
            const fetchData = async () => {
                try {
                    dispatch(fetchStart());
                    const response = await fetch(
                        `https://pokeapi.co/api/v2/type/${currentPokemonType}`
                    );
                    const data = await response.json();
                    
                    const data_length = data.pokemon.length
                    dispatch(setAmount(Math.ceil(data_length / pokemonsPerPage)))

                    const startIndex = (page - 1) * pokemonsPerPage;
                    const endIndex = startIndex + pokemonsPerPage;
                    const paginated_data = data.pokemon.slice(startIndex, endIndex);

                    const processed_data = paginated_data.map((pokemon) => {
                        return pokemon.pokemon
                    })

                    dispatch(fetchSuccess(processed_data));
                } catch (error) {
                    dispatch(fetchError(error));
                }
            };

            fetchData();
        }


    }, [currentPokemonType, pokemonsPerPage, page]);


};