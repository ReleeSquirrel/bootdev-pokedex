import { Cache } from "./pokecache.js";
import { LocationAreaSet, LocationArea } from "./pokedex_location_area_endpoint.js";
import { Pokemon } from "./pokedex_pokemon_endpoint.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    cache: Cache;

    constructor() {
        this.cache = new Cache(1000);
    }

    async fetchLocationAreaSet(pageURL?: string): Promise<LocationAreaSet | undefined> {
        if (pageURL != undefined) {
            if (this.cache.get(pageURL) != undefined) {
                return this.cache.get(pageURL);
            } else {
                // Get the json from pageURL and return it
                try {
                    const response = await fetch(pageURL);
                    if (!response.ok) {
                        console.log(`HTTP Request Failed - Response status: ${response.status}`);
                        return undefined;
                    } else {
                        const result: LocationAreaSet = await response.json();
                        this.cache.add(pageURL, result);
                        return result;
                    }
                } catch (err) {
                    console.log(err);
                    return undefined;
                }
            }
        } else {
            if (this.cache.get(PokeAPI.baseURL + `/location-area/`) != undefined) {
                return this.cache.get(PokeAPI.baseURL + `/location-area/`);
            } else {
                // Get the json from baseURL + `/location-area/` and return it
                try {
                    const response = await fetch(PokeAPI.baseURL + `/location-area/`);
                    if (!response.ok) {
                        console.log(`HTTP Request Failed - Response status: ${response.status}`);
                        return undefined;
                    } else {
                        const result: LocationAreaSet = await response.json();
                        this.cache.add(PokeAPI.baseURL + `/location-area/`, result);
                        return result;
                    }
                } catch (err) {
                    console.log(err);
                    return undefined;
                }
            }
        }
    }


    async fetchLocationArea(locationName: string): Promise<LocationArea | undefined> {
        if (this.cache.get(PokeAPI.baseURL + `/location-area/${locationName}/`) != undefined) {
            return this.cache.get(PokeAPI.baseURL + `/location-area/${locationName}/`);
        } else {
            try {
                const response = await fetch(PokeAPI.baseURL + `/location-area/${locationName}/`);
                if (!response.ok) {
                    console.log(`HTTP Request Failed - Response status: ${response.status}`);
                    return undefined;
                } else {
                    const result: LocationArea = await response.json();
                    this.cache.add(PokeAPI.baseURL + `/location-area/${locationName}/`, result);
                    return result;
                }
            } catch (err) {
                console.log(err);
                return undefined;
            }
        }
    }


    async fetchPokemon(pokemonName: string): Promise<Pokemon | undefined> {
        if (this.cache.get(PokeAPI.baseURL + `/pokemon/${pokemonName}/`) != undefined) {
            return this.cache.get(PokeAPI.baseURL + `/pokemon/${pokemonName}/`);
        } else {
            try {
                const response = await fetch(PokeAPI.baseURL + `/pokemon/${pokemonName}/`);
                if (!response.ok) {
                    console.log(`HTTP Request Failed - Response status: ${response.status}`);
                    return undefined;
                } else {
                    const result: Pokemon = await response.json();
                    this.cache.add(PokeAPI.baseURL + `/pokemon/${pokemonName}/`, result);
                    return result;
                }
            } catch (err) {
                console.log(err);
                return undefined;
            }
        }
    }
}