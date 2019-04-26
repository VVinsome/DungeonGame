To first initialize this game, you must have Node.js installed. 
Then, while in Game.js directory, run game by typing " node Game.js " in terminal.
Open file for correct formatting.

You are in a dungeon with this layout.
/ = up/down   | = north/south -- = east/west
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
 
 There are some npcs in every room. They have the names npc + some number.
 Don't include "" in command
 Commands are: 
 say "Example dialog" -> say something in the room chat
 tell "Example name" "Example dialog" -> tell "name" some "example dialog"
 yell "Example dialog" -> say "example dialog" in global chat
 north -> move north if possible
 south -> move south if possible
 east -> move east if possible
 west -> move west if possible
 up -> move up a level if possible
 down -> move down a level if possible
 globalChat -> show the global chat
