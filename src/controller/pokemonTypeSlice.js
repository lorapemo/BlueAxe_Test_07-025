import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const pokemonTypes = [
    "normal",
    "fire",
    "water",
    "grass",
    "electric",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dark",
    "dragon",
    "steel",
    "fairy",
]

const pokemonTypeSlice = createSlice({
    name: 'pokemonType',
    initialState: {
        currentPokemonType: 'All',
        availablePokemonType: pokemonTypes
    },
    reducers: {
        setPokemonType: (state, action) => {
            if (pokemonTypes.includes(action.payload)) {
                state.currentPokemonType = action.payload
            }
        },
        resetType: (state) => {
            state.currentPokemonType = "All";
        },
    }
})

export const {setPokemonType, resetType} = pokemonTypeSlice.actions

export default pokemonTypeSlice.reducer;