const wholeDungeon = require("./Dungeon.js");
var dungeon = wholeDungeon.Dungeon;
var room = wholeDungeon.Room;
var people = wholeDungeon.People;
const command = wholeDungeon.Command;
var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);
// initialize game
var dungeon1 = dungeon();
var currentUser = "";
var npcCount = 0;
for (let i = 1; i <= 7; i++) {
    var nRoom = room(i);
    for (let j = 0; j < 3; j++) {
        var npc = people("npc" + npcCount);
        npcCount++;
        dungeon1.putPersonInRoom(npc, i);
        dungeon1.addPlayer(npc.name, npc);
        nRoom.addPeople(npc);
    }
    dungeon1.addRoomVertex(i, nRoom);
}
//0-1 is north south. 2-3 is east west. 4-5 is up down
/* undirected (both directions) graph looks like this 
                    (9)
                    |                       
                    (8)--(10)--(12)         Level 3
                   /       |
                 /        (11)
                (4)--(5)                    Level 2
              /   |    |
      (2)   /    (6)--(7)
       |  /
 (3)--(1)                                   Level 1
*/
// this is level 1 edges
dungeon1.addRoomEdge(1, 2, 0);
dungeon1.addRoomEdge(1, 3, 2);
dungeon1.addRoomEdge(1, 4, 4);
//this is level 2 edges
dungeon1.addRoomEdge(4, 5, 3);
dungeon1.addRoomEdge(4, 6, 1);
dungeon1.addRoomEdge(4, 8, 1);
dungeon1.addRoomEdge(6, 7, 3);
//this is level 3 edges
dungeon1.addRoomEdge(8, 9, 0);
dungeon1.addRoomEdge(8, 10, 3);
dungeon1.addRoomEdge(10, 12, 3);
dungeon1.addRoomEdge(10, 11, 1);

var first = 1;
rl.setPrompt('What is your name? \n');
rl.prompt();
rl.on('line', function (line) {
    if (line === "exit") {
        rl.close();
    }
    if (first) {
        var username = line;
        currentUser = username;
        var nPerson = people(username);
        var directionList = ["north", "south", "east", "west", "up", "down"];
        dungeon1.addPlayer(username, nPerson);
        dungeon1.putPersonInRoom(username, 1);
        console.log("you were placed in room 1");
        console.log("These are available outgoing rooms");
        for (let i = 0; i < dungeon1.roomMap.get(1).outgoingRoom.length; i++) {
            console.log(directionList[i] + ": " + dungeon1.roomMap.get(1).outgoingRoom[i]);
        }
        first = 0;
        rl.setPrompt("Please input your command \n");
    }
    else {
        var input = line.toLowerCase();
        var action = line;
        if (input.indexOf(" ") != -1) {
            action = input.substr(0, input.indexOf(" "));
        }
        input = input.substr(input.indexOf(" ") + 1);
        if (command.hasOwnProperty(action)) {
            command[action](input, currentUser, dungeon1);
        }
    }
    rl.prompt();
}).on('close', function () {
    process.exit(0);
});
