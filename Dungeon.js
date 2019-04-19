function Dungeon(){
    this.roomMap = new Map();
    this.addVRoom() = function(roomNumber){
        var newRoom = new Room();
        this.roomMap.set(roomNumber, newRoom);
    }
    /*takes two rooms u, and v and creates edge between them at contrasting
    directions. ie North-South East-West Up-Down
    */
    this.addRoomEdge = function(u,v,direction){ 
        if(this.roomMap.has(u) && this.roomMap.has(v)){
            this.roomMap.get(u).addOutgoingRoom(v, direction);
            if(direction % 2 == 0){
                this.roomMap.get(v).addOutgoingRoom(u,direction +1);
            }
            else{
                this.roomMap.get(v).addOutgoingRoom(u,direction -1);
            }

        }
    }
};
var Room = function (){
    var peopleInRoom = new Map();
    var message = [];
    var outgoingRoom = [null,null,null,null,null,null];
    const addOutgoingRoom = function(newRoom, direction){
        outgoingRoom[direction] = newRoom;
    };
    const addPeople = function(person){
        peopleInRoom.set(person.getName(),person);
    };
    const removePeople = function(person){
        peopleInRoom.delete(person.getName());
    };
    return {peopleInRoom,message,addOutgoingRoom,addPeople,removePeople};
    
};
var People = function (username){
    var inbox = [];
    var name = username;
    const getName = function(){
        return name;
    };
    return {inbox,name,getName};
};