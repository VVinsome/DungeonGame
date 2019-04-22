var wholeDungeon = require("./Dungeon.js");
var dungeon = wholeDungeon.Dungeon;
var room = wholeDungeon.Room;
var people = wholeDungeon.People;
var chat = wholeDungeon.Chat;
// Testing constructor name
function testPerson() {
    var person1 = people("person1");
    var person2 = people("person2");
    if (person1.name == "person1") {
        console.log("person1 initialized name correct");
    }
    if (person2.name == "person2") {
        console.log("person2 initialized name correct");
        return;
    }
    if (person1.name != "person1") {
        console.log("incorrect name " + person1.name);
    }
    if (person2.name != "person2") {
        console.log("incorrect name " + person1.name);
    }
}
//testing constructor inbox
function testPersonInbox() {
    var person1 = people("person1");
    var person2 = people("person2");
    person1.addInbox("person1Mail");
    person2.addInbox("person2Mail");
    if (person1.getIndexedMessage(0) == "person1Mail") {
        console.log("person1 inbox: correct ");
    }
    if (person2.getIndexedMessage(0) == "person2Mail") {
        console.log("person2 inbox: correct");
        return;
    }
    console.log("person inbox fail, Person1: " + person1.getIndexedMessage(0) + "person2: " + person2.getIndexedMessage(0));
}

function testRoomNumber() {
    var room1 = room(1);
    var room2 = room(2);
    if (room1.roomNumber == 1 && room2.roomNumber == 2) {
        console.log("room number correct");
    }
    else {
        console.log("room number incorrect room1: " + room1.roomNumber + " room2: " + room2.roomNumber);
    }
}
/*
function logMapElements(value, key, map) {
    console.log(`map.get('${key}') = ${value}`);
}
*/
function testRoomPeople() {
    var person1 = people("person1");
    var room1 = room(1);
    room1.addPeople(person1);
    if (room1.peopleInRoom.get("person1") == person1) {
        console.log("room people true");
    }
    else {
        var get_entries = room1.peopleInRoom.entries();
        var get_keys = room1.peopleInRoom.keys();
        for (var ele of get_entries) {
            console.log(ele);
        }
        for (var elem of get_keys) {
            console.log(elem);
        }
        for (let elem of room1.peopleInRoom.entries()) {
            console.log(`${elem[0].name}: ${elem[1]}`);
        }
    }
    room1.addInbox("hi");
    if (room1.getIndexedMessage(0) == "hi") {
        console.log("adding to chat works");
    }
    else {
        console.log("chat doesnt work: " + room1.getIndexedMessage(0));
    }
    var room2 = room(2);
    room1.addOutgoingRoom(room2, 0);
    if (room1.outgoingRoom[0] === room2) {
        console.log("room outgoing add works");
    }
    else {
        console.log("room outgoing does not work: " + room1.outgoingRoom);
    }
}
function dungeonTest() {
    var person1 = people(person1);
    var room1 = room(1);
    var room2 = room(2);
    var dungeon1 = dungeon();
    dungeon1.addRoomVertex(1, room1);
    dungeon1.addRoomVertex(2, room2);
    dungeon1.addRoomEdge(1, 2, 0);
    dungeon1.addInbox("hello");
    if (dungeon1.getIndexedMessage(0) == "hello") {
        console.log("dungeon has correct chat");
    }
    if (dungeon1.roomMap.get(1).outgoingRoom[0] == 2) {
        console.log("room1 has edge to room2 in correct direction");
    }
    if (dungeon1.roomMap.get(2).outgoingRoom[1] == 1) {
        console.log("room2 has edge to room1 in correct direction");
        return
    }
    console.log("dungeon error: room1 in dungeon: " + dungeon1.roomMap.get(1).outgoingRoom[0]);
    console.log("dungeon error: room2 in dungeon: " + dungeon1.roomMap.get(2).outgoingRoom[1]);
}


testPerson();
testPersonInbox();
testRoomNumber();
testRoomPeople();
dungeonTest();
console.log("done");
