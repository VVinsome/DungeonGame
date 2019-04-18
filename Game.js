const Dungeon = require(Dungeon.js);

var standard_input = process.stdin;
standard_input.setEncoding('utf-8');
console.log("Please input text in command line.");
standard_input.on('data', function (data){
    if(data === 'exit\n'){
        console.log("Exiting Game");
        process.exit();
    }
    else{
        /* get person to either create dungeon or select pre created dungeon
        then parse their inputs to affect dungeon data, aka 
        say, yell, message and walk. possibly using another object. 
        if say say <> then do say function
        */
    }
})