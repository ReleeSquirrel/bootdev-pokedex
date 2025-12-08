import { createInterface, type Interface } from 'node:readline';
import { commandHelp } from './command_help.js';
import { commandExit } from './command_exit.js';
import { commandMap } from './command_map.js';
import { commandMapb } from './command_mapb.js';
import { PokeAPI } from './pokeapi.js';

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};

export type State = {
    readline_interface: Interface;
    pokeAPI: PokeAPI;
    nextLocationsURL: string;
    prevLocationsURL: string;
    commands: Record<string, CLICommand>;
}

export function initState(): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    const pokeAPI = new PokeAPI();

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
        map: {
          name: "map",
          description: "Displays the names of Pokemon location-areas, 20 at a time",
          callback: commandMap,
        },
        mapb: {
          name: "mapb",
          description: "Displays the previous names of Pokemon location-areas, 20 at a time",
          callback: commandMapb,
        },
        // can add more commands here
    };

    return {
        readline_interface: rl,
        pokeAPI: pokeAPI,
        nextLocationsURL: "",
        prevLocationsURL: "",
        commands: commands,
    };
}