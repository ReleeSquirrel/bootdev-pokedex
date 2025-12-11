import { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]) {
    if (args[0] === undefined) {
        console.log(`Please enter the name of a pokemon to inspect.`);
        return;
    }
    const inspect_target_name = args[0];

    if (inspect_target_name in state.pokedex) {
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
        return;
    } else {
        console.log(`you have not caught that pokemon`);
        return;
    }
}