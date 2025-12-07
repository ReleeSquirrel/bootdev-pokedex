import { State } from "./state.js";

export function commandHelp(state: State) {
    let command_list = ``;

    for(const command in state.commands) {
        command_list += `${state.commands[command].name}: ${state.commands[command].description}\n`
    }
    
    console.log(`Welcome to the Pokedex!\nUsage:\n\n` + command_list);
}