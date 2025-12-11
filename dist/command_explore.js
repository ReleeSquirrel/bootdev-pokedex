export async function commandExplore(state, ...args) {
    if (args[0] === undefined) {
        console.log(`Please enter the name of a location to explore.`);
        return;
    }
    const explore_area_name = args[0];
    const location_area_data = await state.pokeAPI.fetchLocationArea(explore_area_name);
    if (location_area_data != undefined) {
        console.log(`Exploring ${explore_area_name}...`);
        console.log(`Found Pokemon:`);
        for (const encounter of location_area_data.pokemon_encounters) {
            console.log(` - ${encounter.pokemon.name}`);
        }
    }
    else {
        console.log(`No Data Found.`);
    }
}
