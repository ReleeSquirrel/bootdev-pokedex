import { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]) {
    const target_pokemon_name = args[0];
    const target_pokemon = await state.pokeAPI.fetchPokemon(target_pokemon_name);

    if (target_pokemon != undefined) {
        console.log(`Throwing a Pokeball at ${target_pokemon_name}...`);
        // Rather than use the base experience of the pokemon to determine catch rate
        // which isn't based on pokemon rules or explained how I should do so on boot.dev
        // I'm just going to give each toss a 66% chance of success.
        if (Math.floor(Math.random() * 3) === 0 || 1) {
            state.pokedex[target_pokemon_name] = target_pokemon;
            console.log(`${target_pokemon_name} was caught!`);
        } else {
            console.log(`${target_pokemon_name} escaped!`);
        }
    } else {
        console.log(`Error: Pokemon ${target_pokemon_name} not found.`);
    }
}