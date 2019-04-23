const wholeDungeon = require("./Dungeon.js");
var dungeon = wholeDungeon.Dungeon;
var room = wholeDungeon.Room;
var people = wholeDungeon.People;
var chat = wholeDungeon.Chat;
const command = wholeDungeon.Command;

const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});
// initialize game
var dungeon1 = dungeon();
var currentUser = "";
for (let i = 1; i <= 7; i++) {
    var nRoom = room(i);
    dungeon1.addRoomVertex(i, nRoom);
}
//0-1 is north south. 2-3 is east west. 4-5 is up down
/* undirected (both directions) graph looks like this 
                     |-----(1)
                    |    /  |  \
                   |   (2)--(3) (4)
                   |         |
                   |        (5)
                   |         /\
                   -------(6) (7)
*/
// this is north to south room edges
dungeon1.addRoomEdge(1, 2, 0);
dungeon1.addRoomEdge(1, 3, 0);
dungeon1.addRoomEdge(1, 4, 0);
dungeon1.addRoomEdge(3, 5, 0);
dungeon1.addRoomEdge(5, 6, 0);
dungeon1.addRoomEdge(5, 7, 0);
//this is east west edges
dungeon1.addRoomEdge(2, 3, 3);
dungeon1.addRoomEdge(6, 7, 3);
//this is up down edges
dungeon1.addRoomEdge(6, 7, 4);
readline.question("What is your name", function (username) {
    currentUser = username;
    var nPerson = people(username);
    dungeon1.addPlayer(username, nPerson);
    dungeon1.putPersonInRoom(username, 1);
    console.log("you were placed in room 1");

})
readline.question("Please input your command", function (userInput) {
    var input = userInput.toLowerCase();
    var action = input.substr(0, input.indexOf(" "));
    input = input.substr(input.indexOf(" ") + 1);
    command[action](input, currentUser, dungeon1);
}
        /* get person to either create dungeon or select pre created dungeon
then parse their inputs to affect dungeon data, aka
say, yell, message and walk. possibly using another object
*/)