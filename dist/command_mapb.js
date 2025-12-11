export async function commandMapb(state) {
    if (state.prevLocationsURL === "") {
        // We are at the start; prevLocationsURL and nextLocationsURL are unset
        console.log("you're on the first page");
    }
    else {
        // Go back and get the 20 entries from prevLocationsURL
        const currentAreaSet = await state.pokeAPI.fetchLocationAreaSet(state.prevLocationsURL);
        if (currentAreaSet != undefined) {
            if (currentAreaSet.next != null) {
                state.nextLocationsURL = currentAreaSet.next;
            }
            else {
                state.nextLocationsURL = "";
            }
            if (currentAreaSet.previous != null) {
                state.prevLocationsURL = currentAreaSet.previous;
            }
            else {
                state.prevLocationsURL = "";
            }
            for (const result of currentAreaSet.results) {
                console.log(result.name);
            }
        }
    }
}
