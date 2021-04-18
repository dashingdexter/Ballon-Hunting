
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu , Play ]

   
}
//My name is Can Huang. My project title is "Ballon Hunting"
//Today is 2021.4.17 I took 11 hours to finished it.
// In order to avoide error, I did not changed some files' name like "spaceship.js"
//But it is ballon now.

//redesign game artwork UI change it to be a ballon shooting game.
//the weapon become slingshot
//game's sound effect are coming from "Splice"
//game's art work by me through adobe illusion(60 points)

//add background music in the play scene(5)
//background music is produce by me throgh logic

//add fire text in the UI(5)

//add new spaceship spirte(gold ballon)
// the old sprite is red ballon which equal to the spaceship.
//this ballon is move faster, smaller and worth 100 points(other ballon worth 30)
//expect point(20)

//add moouse click to fire and mouse click to restart the game(20)




let game = new Phaser.Game(config);
 let borderUISize = game.config.height / 15;
 let borderPadding = borderUISize / 3;
 // reserve keyboard variables
 let keyF, keyR, keyLEFT, keyRIGHT;