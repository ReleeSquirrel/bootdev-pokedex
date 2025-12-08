import { State } from "./state.js";

export async function commandExit(state: State) {
    console.log("Closing the Pokedex... Goodbye!");
    state.readline_interface.close();
    process.exit(0);
}