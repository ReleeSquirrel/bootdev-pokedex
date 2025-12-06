export function commandHelp(commands) {
    let command_list = ``;
    for (const command in commands) {
        command_list += `${commands[command].name}: ${commands[command].description}\n`;
    }
    console.log(`Welcome to the Pokedex!\nUsage:\n\n` + command_list);
}
