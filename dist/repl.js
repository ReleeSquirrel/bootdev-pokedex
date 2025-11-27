import { createInterface } from 'node:readline';
export function cleanInput(input) {
    const result = input.toLowerCase().trim().split(" ").filter((word) => word.length > 0);
    return result;
}
export function startREPL() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });
    rl.prompt();
    rl.on("line", (input) => {
        const clean_input = cleanInput(input);
        if (clean_input.length === 0) {
            rl.prompt();
        }
        else {
            console.log(`Your command was: ${clean_input[0]}`);
            rl.prompt();
        }
    });
}
