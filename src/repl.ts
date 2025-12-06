import { createInterface } from 'node:readline';
import { getCommands } from './commands.js';



export function cleanInput(input: string): string[] {
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
  rl.on("line", (input: string) => {
    const clean_input = cleanInput(input);
    if (clean_input.length === 0) {
      rl.prompt();
    } else {
      // Respond to Prompt
      const input_command = clean_input[0];
      const commands = getCommands();
      if (input_command in commands) {
        try {
          commands[input_command].callback(getCommands());
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log(`Unknown command.`);
      }

      rl.prompt();
    }
  });
}
