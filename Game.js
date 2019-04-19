const Dungeon = require("./Dungeon.js");
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});
readline.question("Please input your command", function (command) {
    var input = command.toLowerCase();
    if (input.startsWith("say")) {
        input = input.substr(input.indexOf(" ") + 1);
        //TODO: add dungeon changes into roomChat
    }
    else if (input.startsWith("yell")) {
        input = input.substr(input.indexOf(" ") + 1);
        //TODO: add dungeon changes into globalChat
    }
    else if (input.startsWith("tell")) {
        input = input.substr(input.indexOf(" ") + 1);
        name = input.substr(0, input.indexOf(" "));
        input = name.substr(input.indexOf(" ") + 1);
        //TODO: add dungeon changes to inbox of person Name. Found via personMap 
    }
    else if (Number.isInteger(input)) {
        if (input >= 0 && input < 6) {
            //TODO: delete "Hero" from person map in Room and add to new Room. Also change personMap in dungeon graph.
        }
    }
}
var standard_input = process.stdin;
standard_input.setEncoding('utf-8');
console.log("Please input text in command line.");
standard_input.on('data', function (data) {
    if (data === 'exit\n') {
        console.log("Exiting Game");
        process.exit();
    }
    else {
        /* get person to either create dungeon or select pre created dungeon
        then parse their inputs to affect dungeon data, aka 
        say, yell, message and walk. possibly using another object
        */
    }
})