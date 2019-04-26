//add room as constructor instead of calling new. 
var Dungeon = function () {
    //map of all rooms in dungeon, room num corresponds to room
    var roomMap = new Map();
    //map with people and their current rooms
    var personMap = new Map();
    //all players in game
    var currentPlayers = new Map();
    var chat = Chat();
    const addRoomVertex = function (roomNumber, newRoom) {
        roomMap.set(roomNumber, newRoom);
    }
    /*takes two room numbers u, and v and creates edge between them at contrasting
    directions. ie North-South East-West Up-Down
    */
    const addRoomEdge = function (u, v, direction) {
        if (roomMap.has(u) && roomMap.has(v)) {
            roomMap.get(u).addOutgoingRoom(v, direction);
            if (direction % 2 == 0) {
                roomMap.get(v).addOutgoingRoom(u, direction + 1);
            }
            else {
                roomMap.get(v).addOutgoingRoom(u, direction - 1);
            }

        }

    }
    const putPersonInRoom = function (personName, roomNum) {
        if (currentPlayers.has(personName) && roomMap.has(roomNum)) {
            roomMap.get(roomNum).addPeople(currentPlayers.get(personName));
            personMap.set(personName, roomNum);
        }
    }
    const addPlayer = function (username, personObj) {
        currentPlayers.set(username, personObj);
    }
    return Object.assign({}, chat, {
        get roomMap() {
            return roomMap;
        },
        get personMap() {
            return personMap;
        },
        get currentPlayers() {
            return currentPlayers;
        },
        addRoomVertex, addRoomEdge, putPersonInRoom, addPlayer
    });
};
var Room = function (roomNum) {
    var roomNumber = roomNum;
    var peopleInRoom = new Map();
    var outgoingRoom = [null, null, null, null, null, null];
    var chat = Chat();
    const addOutgoingRoom = function (newRoom, direction) {
        outgoingRoom[direction] = newRoom;
    };
    const addPeople = function (person) {
        peopleInRoom.set(person.name, person);
    };
    const removePeople = function (person) {
        peopleInRoom.delete(person.name);
    };
    const printPeopleInRoom = function () {
        console.log("The people in this room are: ")
        for (const k of peopleInRoom.keys()) {
            console.log(k);
        }
    }
    return Object.assign({}, chat, {
        get roomNumber() {
            return roomNumber;
        },
        get peopleInRoom() {
            return peopleInRoom;
        },
        get outgoingRoom() {
            return outgoingRoom;
        },
        addOutgoingRoom, addPeople, removePeople, printPeopleInRoom
    });

};
var People = function (username) {
    var name = username;
    var chat = Chat();
    return Object.assign({}, chat, {
        get name() {
            return name;
        }
    });
};
var Chat = function () {
    var inbox = [];
    const addInbox = function (message) {
        inbox.push(message);
    }
    const inboxCount = function () {
        return inbox.length;
    }
    const printInbox = function () {
        console.log("The current chat messages are: ")
        for (let i = 0; i < inbox.length; i++) {
            console.log(inbox[i]);
        }
    }
    const printInboxMessage = function (numMessage) {
        for (let i = inbox.length; i >= inbox.length - numMessage; i--) {
            console.log(inbox[i]);
        }
    }
    const getIndexedMessage = function (index) {
        if (index < inbox.length) {
            return inbox[index];
        }
    }
    return {
        addInbox, inboxCount, printInbox, printInboxMessage, getIndexedMessage
    };
}
const Command = (function () {
    const say = function (input, currentUser, currentDungeon) {
        var dialog = input;
        var roomNum = currentDungeon.personMap.get(currentUser);
        if (dialog != "say") {
            currentDungeon.roomMap.get(roomNum).addInbox(dialog);
            console.log(currentUser + " said: " + dialog);
        }
    }
    const tell = function (input, currentUser, currentDungeon) {
        var name = input.substr(0, input.indexOf(" "));
        var dialog = input.substr(input.indexOf(" ") + 1);
        var message = dialog + " from " + currentUser;
        if (dialog != "tell") {
            if (currentDungeon.currentPlayers.has(name)) {
                currentDungeon.currentPlayers.get(name).addInbox(message);
                console.log(currentUser + " told " + name + ": " + dialog);
            }
        }

    }
    const yell = function (input, currentUser, currentDungeon) {
        var dialog = input;
        if (dialog != "yell") {
            currentDungeon.addInbox(dialog);
            console.log(currentUser + " yelled: " + dialog);
        }
    }
    const moveDirection = function (input, currentUser, currentDungeon, direction) {
        var currentPlayer = currentDungeon.currentPlayers.get(currentUser);
        var roomNum = currentDungeon.personMap.get(currentUser);
        var currentRoom = currentDungeon.roomMap.get(roomNum);
        var directionList = ["north", "south", "east", "west", "up", "down"];
        if (currentRoom.outgoingRoom[direction] != null) {
            var movedRoomNum = currentRoom.outgoingRoom[direction];
            var movedRoom = currentDungeon.roomMap.get(movedRoomNum);
            currentRoom.removePeople(currentUser);
            movedRoom.addPeople(currentPlayer);
            currentDungeon.putPersonInRoom(currentUser, movedRoomNum);
            console.log("you have moved to room: " + movedRoom.roomNumber);
            console.log("These are available outgoing rooms");
            for (let i = 0; i < movedRoom.outgoingRoom.length; i++) {
                console.log(directionList[i] + ": " + movedRoom.outgoingRoom[i]);
            }
            console.log("should print now");
            movedRoom.printPeopleInRoom();
            movedRoom.printInbox();
        }
    }
    const north = function (input, currentUser, currentDungeon) {
        moveDirection(input, currentUser, currentDungeon, 0);
    }
    const south = function (input, currentUser, currentDungeon) {
        moveDirection(input, currentUser, currentDungeon, 1);
    }
    const east = function (input, currentUser, currentDungeon) {
        moveDirection(input, currentUser, currentDungeon, 2);

    }
    const west = function (input, currentUser, currentDungeon) {
        moveDirection(input, currentUser, currentDungeon, 3);

    }
    const up = function (input, currentUser, currentDungeon) {
        moveDirection(input, currentUser, currentDungeon, 4);

    }
    const down = function (input, currentUser, currentDungeon) {
        moveDirection(input, currentUser, currentDungeon, 5);

    }
    const globalChat = function (input, currentUser, currentDungeon) {
        currentDungeon.printInbox();
    }
    return { say, tell, yell, north, south, east, west, up, down, globalChat };

})();
module.exports.Dungeon = Dungeon;
module.exports.Room = Room;
module.exports.People = People;
module.exports.Chat = Chat;
module.exports.Command = Command;