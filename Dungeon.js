//add room as constructor instead of calling new. 
var Dungeon = function () {
    var roomMap = new Map();
    var personMap = new Map();
    var currentPlayers = new Map();
    var chat = Chat();
    const addRoomVertex = function (roomNumber, newRoom) {
        roomMap.set(roomNumber, newRoom);
    }
    /*takes two rooms u, and v and creates edge between them at contrasting
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
        personMap.set(personName, roomNum);
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
        for (let i = 0; i < peopleInRoom.length; i++) {
            console.log(peopleInRoom[i].name);
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
        var dialog = input.substr(0, input.indexOf(" "));
        var roomNum = currentDungeon.get(currentUser);
        currentDungeon.get(roomNum).addInbox(dialog);
        console.log("you said: " + dialog);
    }
    const tell = function (input, currentUser, currentDungeon) {
        var name = input.substr(0, input.indexOf(" "));
        var dialog = name.substr(input.indexOf(" ") + 1);
        var message = dialog + " from " + currentUser;
        if (currentDungeon.currentPlayers.has(name)) {
            currentDungeon.currentPlayers.get(name).addInbox(message);
        }
        console.log("you told: " + name + ": " + dialog);

    }
    const yell = function (input, currentUser, currentDungeon) {
        var dialog = input.substr(0, input.indexOf(" "));
        currentDungeon.addInbox(dialog);
        console.log("you yelled: " + dialog);

    }
    const moveDirectionHelper = function (input, currentUser, currentDungeon, direction) {
        var currentPlayer = currentDungeon.currentPlayers.get(currentUser);
        var roomNum = currentDungeon.personMap.get(currentUser);
        var currentRoom = currentDungeon.roomMap.get(roomNum);
        if (currentRoom.outgoingRoom[direction] != null) {
            var movedRoom = currentRoom.outgoingRoom[direction];
            currentRoom.removePeople(currentUser);
            movedRoom.addPeople(currentPlayer);
            console.log("you have moved to room: " + movedRoom.roomNumber);
            movedRoom.printPeopleInRoom;
            movedRoom.printInbox;
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
    return { say, tell, yell, north, south, east, west, up, down };

})
module.exports.Dungeon = Dungeon;
module.exports.Room = Room;
module.exports.People = People;
module.exports.Chat = Chat;
module.exports.Command = Command;