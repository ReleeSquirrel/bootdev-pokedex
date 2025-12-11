import { State } from "./state.js";
import { Pokemon } from "./pokedex_location_area_endpoint.js";

export async function commandInspect(state: State, ...args: string[]) {
    const inspect_target_name = args[0];

    if (inspect_target_name.length === 0) {
        console.log(`Please enter the name of a pokemon to inspect.`);
    } else {
        if(inspect_target_name in state.pokedex) {
            console.log(`Name: ${state.pokedex[inspect_target_name].name}`);
            console.log(`Height: ${state.pokedex[inspect_target_name].height}`);
            console.log(`Weight: ${state.pokedex[inspect_target_name].weight}`);
            console.log(`Stats:`);
            for (const stat of state.pokedex[inspect_target_name].stats) {
                console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
            }
            console.log(`Types:`);
            for (const type of state.pokedex[inspect_target_name].types) {
                console.log(`  - ${type.type.name}`);
            }
        } else {
            console.log(`you have not caught that pokemon`);
        }
    }
}