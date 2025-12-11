import { createInterface, type Interface } from 'node:readline';
import { PokeAPI } from './pokeapi.js';
import { Pokemon } from './pokedex_pokemon_endpoint.js';
import { commandHelp } from './command_help.js';
import { commandExit } from './command_exit.js';
import { commandMap } from './command_map.js';
import { commandMapb } from './command_mapb.js';
import { commandExplore } from './command_explore.js';
import { commandCatch } from './command_catch.js';
import { commandInspect } from './command_inspect.js';

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    readline_interface: Interface;
    pokeAPI: PokeAPI;
    nextLocationsURL: string;
    prevLocationsURL: string;
    commands: Record<string, CLICommand>;
    pokedex: Record<string, Pokemon>;
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
        explore: {
          name: "explore",
          description: "Displays a list of all pokemon in the named area",
          callback: commandExplore,
        },
        catch: {
          name: "catch",
          description: "Attempts to catch a pokemon with the given name",
          callback: commandCatch,
        },
        inspect: {
          name: "inspect",
          description: "Describe a pokemon from your pokedex",
          callback: commandInspect,
        },
        // can add more commands here
    };

    const pokedex = {};

    return {
        readline_interface: rl,
        pokeAPI: pokeAPI,
        nextLocationsURL: "",
        prevLocationsURL: "",
        commands: commands,
        pokedex: pokedex,
    };
}