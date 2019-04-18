function Dungeon(){
    this.roomMap = new Map();
    this.addVRoom()= function(roomNumber){
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
}
function Room(){
    this.people= new Map();
    this.message = [];
    this.outgoingRoom = [null,null,null,null,null,null];
    this.addOutgoingRoom = function(newRoom, direction){
        this.outgoingRoom[direction] = newRoom;
    }
    this.addPeople = function(person){
        this.people.set(person.getName(),person);
    }
    this.removePeople = function(person){
        this.people.delete(person.getName());
    }
    
}
function People(username){
    this.inbox = [];
    this.name = username;
    this.getName = function(){
        return this.name;
    }
}