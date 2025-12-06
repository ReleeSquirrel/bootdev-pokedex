import { CLICommand } from "./command.js";

export function commandHelp(commands?: Record<string, CLICommand>) {
    let command_list = ``;

    for(const command in commands) {
        command_list += `${commands[command].name}: ${commands[command].description}\n`
    }
    
    console.log(`Welcome to the Pokedex!\nUsage:\n\n` + command_list);
}