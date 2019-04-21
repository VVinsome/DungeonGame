//add room as constructor instead of calling new. 
var Dungeon = function () {
    var roomMap = new Map();
    var personMap = new Map();
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
    return {
        get roomMap() {
            return roomMap;
        },
        get personMap() {
            return personMap;
        },
        addRoomVertex, addRoomEdge, putPersonInRoom
    };
};
var Room = function (roomNum) {
    var roomNumber = roomNum;
    var peopleInRoom = new Map();
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
    return {
        get roomNumber() {
            return roomNumber;
        },
        get peopleInRoom() {
            return peopleInRoom;
        },
        get outgoingRoom() {
            return outgoingRoom;
        },
        addOutgoingRoom, addPeople, removePeople
    };

};
var People = function (username) {
    var name = username;
    var chat = Chat();
    return {
        get name() {
            return name;
        },
    };
};
var Chat = function () {
    var inbox = [];
    const addInbox = function (message) {
        inbox.push(mail);
    }
    const printInbox = function (numMessage) {
        for (let i = inbox.length; i >= inbox.length - numMessage; i--) {
            console.log(inbox[i]);
        }
    }
    return {
        addInbox, printInbox
    };
}
module.exports.Dungeon = Dungeon;
module.exports.Room = Room;
module.exports.People = People;