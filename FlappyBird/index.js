///<reference path="p5.global-mode.d.ts"/>
let flappy;
let bg;
let upTube;
let downTube;
let game;
let myFont;
let cycles = 1
function preload() {
    flappy = loadImage('./FlappyBird/flappybird.png')
    bg = loadImage('./FlappyBird/backgroundflappy.jpg')
    land = loadImage('./FlappyBird/land.jpg')
    upTube = loadImage('./FlappyBird/uprightTube.png')
    downTube = loadImage('./FlappyBird/downTube.png')
    myFont = loadFont('./FlappyBird/VCR_OSD_MONO_1.001.ttf')
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    game = new Game(500);
}

function draw() {
    // background(126, 215, 57)
    imageMode(CORNER)
    image(bg, 0, 0, window.innerWidth, window.innerHeight)
    for (let i = 0 ; i < cycles; i++){
        game.update();
    }
    game.display();
    text("cycles : " + cycles,10,20)
    
}
function keyPressed(e){
    if (e.key === "a"){
        cycles /= 2
    } else if (e.key === "d"){
        cycles *= 2
    }
}
// function keyPressed(e) {
//     console.log(e)
//     if (e.code === "Space" && game.newBird.state === 1) {
//         game.newBird.jump();
//     }
// }
// function mouseClicked(){
//     if (game.newBird.state === 1) {
//     game.newBird.jump();
//     }
// }