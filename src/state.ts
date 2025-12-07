import { createInterface, type Interface } from 'node:readline';
import { commandHelp } from './command_help.js';
import { commandExit } from './command_exit.js';

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
};

export type State = {
    readline_interface: Interface;
    commands: Record<string, CLICommand>;
}

export function initState(): State {
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