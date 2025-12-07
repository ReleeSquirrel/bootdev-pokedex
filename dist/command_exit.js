export function commandExit(state) {
    console.log("Closing the Pokedex... Goodbye!");
    state.readline_interface.close();
    process.exit(0);
}
