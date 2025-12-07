import { createInterface } from 'node:readline';
import { commandHelp } from './command_help.js';
import { commandExit } from './command_exit.js';
export function initState() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });
    const commands = {
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        // can add more commands here
    };
    return {
        readline_interface: rl,
        commands: commands,
    };
}
