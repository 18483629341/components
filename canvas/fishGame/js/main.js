var can1;
var can2;
var ctx1;
var ctx2;
var lastTime;
var deltime;
var bgPic = new Image();
var canw;
var canh;
var drawBackground;
var aneObj;
var ane;
var startTime = Date.now();;
document.body.onload = game;

function game() {
    init();

    lastTime = Date.now();
    deltaTime = 0;
    // bgPic.onload = function() {

    // };
    gameloop();
}

function init() {
    can1 = document.getElementById("canvas1"); //fishes,dust,UI,circle
    ctx1 = can1.getContext('2d');
    can2 = document.getElementById("canvas2");
    ctx2 = can2.getContext('2d');

    bgPic.src = "./src/background.jpg";
    canw = can1.width;
    canh = can1.height;

    ane = new aneObj();
    ane.init();


}

function gameloop() {
    window.requestAnimFrame(gameloop); //智能 grame per second
    var now = Date.now();
    var interTime = now - lastTime;
    lastTime = now;
    deltaTime = now - startTime;

    drawBackground();
    ane.draw();

}