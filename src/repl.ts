import { State } from "./state.js";



export function cleanInput(input: string): string[] {
  const result = input.toLowerCase().trim().split(" ").filter((word) => word.length > 0);
  return result;
}

export function startREPL(state: State) {
  
  state.readline_interface.prompt();
  state.readline_interface.on("line", async (input: string) => {
    const clean_input = cleanInput(input);
    if (clean_input.length === 0) {
      state.readline_interface.prompt();
    } else {
      // Respond to Prompt
      const input_command = clean_input[0];
      const commands = state.commands;
      if (input_command in commands) {
        try {
          await commands[input_command].callback(state);
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log(`Unknown command.`);
      }

      state.readline_interface.prompt();
    }
  });
}
