let pause1 = document.querySelector('.pause1');
let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();

let fly = new Audio();
let scoreAudio = new Audio();
let gameOver = new Audio();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

fly.src = "audio/bird-fly.mp3";
scoreAudio.src = "audio/score-plus.mp3";
gameOver.src = "audio/game-over.mp3";

ctx.font = "20px Verdana";
ctx.fillText("↑", 68, 20);
ctx.fillText("Click to Start", 10, 50);

let gap = 120;

document.addEventListener("keydown", moveUp);
document.addEventListener("click", moveUp);

function pause() {
    alert("Pause... Press 'OK' for Play");
}

function start() {
    draw();
}

function moveUp() {
    fly.play();
    yPos -= 25;
}

let pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0
}

let score = 0;
// Position bird
let xPos = 10;
let yPos = 150;
let grav = 1.5;

function draw() {
    ctx.drawImage(bg, 0, 0);
    for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y +
            pipeUp.height + gap);

        pipe[i].x--;

        if (pipe[i].x == 125) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) -
                    pipeUp.height
            });
        }
        // crash
        if (xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
                || yPos + bird.height >= pipe[i].y +
                pipeUp.height + gap)
            || yPos + bird.height >= cvs.height - fg.height) {
            gameOver.play(); setTimeout(function () {
                location.reload()
            }, 150);
        }
        if (pipe[i].x == 10) {
            scoreAudio.play();
            score++;
        }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos, 34, 34);

    yPos += grav;

    ctx.fillStyle = "000";
    ctx.font = "24px Verdana";
    ctx.fillText("Score: " + score, 10, cvs.height - 20);
    requestAnimationFrame(draw);
}
//pipeBottom.onload = draw;