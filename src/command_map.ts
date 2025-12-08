import { State } from "./state.js";
import { LocationAreaSet } from "./pokeapi.js";

export async function commandMap(state: State) {
    let currentAreaSet: LocationAreaSet = {} as LocationAreaSet;
    if (state.prevLocationsURL === "" && state.nextLocationsURL === "") {
        // We are at the start; prevLocationsURL and nextLocationsURL are unset
        currentAreaSet = await state.pokeAPI.fetchLocationAreaSet();
        if (currentAreaSet.next != null) {
            state.nextLocationsURL = currentAreaSet.next;
        } else {
            state.nextLocationsURL = "";
        }
        if (currentAreaSet.previous != null) {
            state.prevLocationsURL = currentAreaSet.previous;
        } else {
            state.prevLocationsURL = "";
        }
        for (const result of currentAreaSet.results) {
            console.log(result.name);
        }
    } else if (state.nextLocationsURL != "") {
        // Continue with the 20 entries from nextLocationsURL
        currentAreaSet = await state.pokeAPI.fetchLocationAreaSet(state.nextLocationsURL);
        if (currentAreaSet.next != null) {
            state.nextLocationsURL = currentAreaSet.next;
        } else {
            state.nextLocationsURL = "";
        }
        if (currentAreaSet.previous != null) {
            state.prevLocationsURL = currentAreaSet.previous;
        } else {
            state.prevLocationsURL = "";
        }
        for (const result of currentAreaSet.results) {
            console.log(result.name);
        }
    }
}