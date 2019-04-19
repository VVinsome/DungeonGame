//add room as constructor instead of calling new. 
var Dungeon = function () {
    var roomMap = new Map();
    var globalChat = [];
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
    const addGlobalChat = function (message) {
        globalChat.push(message);
    }
    return {
        get roomMap() {
            return roomMap;
        },
        get globalChat() {
            return globalChat;
        },
        addRoomVertex, addRoomEdge, addGlobalChat
    };
};
var Room = function (roomNum) {
    var roomNumber = roomNum;
    var peopleInRoom = new Map();
    var roomChat = [];
    var outgoingRoom = [null, null, null, null, null, null];
    const addOutgoingRoom = function (newRoom, direction) {
        outgoingRoom[direction] = newRoom;
    };
    const addPeople = function (person) {
        peopleInRoom.set(person.name, person);
    };
    const removePeople = function (person) {
        peopleInRoom.delete(person.name);
    };
    const addChat = function (message) {
        roomChat.push(message);
    };
    return {
        get roomNumber() {
            return roomNumber;
        },
        get peopleInRoom() {
            return peopleInRoom;
        },
        get roomChat() {
            return roomChat;
        },
        get outgoingRoom() {
            return outgoingRoom;
        },
        addOutgoingRoom, addPeople, removePeople, addChat
    };

};
var People = function (username) {
    var inbox = [];
    var name = username;
    const addMail = function (mail) {
        inbox.push(mail);
    }
    return {
        get name() {
            return name;
        },
        get inbox() {
            return inbox;
        },
        addMail

    };
};
module.exports.Dungeon = Dungeon;
module.exports.Room = Room;
module.exports.People = People;