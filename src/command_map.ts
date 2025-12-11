import { State } from "./state.js";

export async function commandMap(state: State) {
    if (state.prevLocationsURL === "" && state.nextLocationsURL === "") {
        // We are at the start; prevLocationsURL and nextLocationsURL are unset
        const currentAreaSet = await state.pokeAPI.fetchLocationAreaSet();
        if (currentAreaSet != undefined) {
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
    } else if (state.nextLocationsURL != "") {
        // Continue with the 20 entries from nextLocationsURL
        const currentAreaSet = await state.pokeAPI.fetchLocationAreaSet(state.nextLocationsURL);
        if (currentAreaSet != undefined) {
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
}