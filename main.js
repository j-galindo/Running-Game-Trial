minHeight = 50;
maxHeight = 100;
minWidth = 10;
maxWidth = 20;
minGap = 50;
maxGap = 200;
gap = randGap();
var myObstacles = [];

function startGame() {
    gamearea.start();
}

function everyinterval(n) {
    if (gamearea.frame % n == 0) {
        return true;
    }
}

function jump() {
    player.speedY = -5;

}

function randGap() {
    return Math.floor(minGap + Math.random() * (maxGap - minGap + 1));
}
let player = {
    x: 200,
    y: 460,
    speedY: 0,
    update: function() {
        gamearea.context.fillRect(this.x, this.y, 20, 20);
    },
    newPos: function() {
        if (this.y < 260) {
            this.speedY = 5
        }
        this.y = this.y + this.speedY;
        if (this.speedY == 5 && this.y == 460) {
            this.speedY = 0;
        }
    },
    crashWith: function(obs) {
        if (this.x + 20 > obs.x && this.x < obs.x + obs.width && this.y + 20 > obs.y) {
            myObstacles.pop();
            player.x -= 5
            if (player.x == 0) {
                console.log(myObstacles)
                alert(`Enemies Killed`)
            }
        }
    }
}



function obstacle() {
    this.height = Math.floor(minHeight + Math.random() * (maxHeight - minHeight + 1));
    this.width = Math.floor(minWidth + Math.random() * (maxWidth - minWidth + 1))
    this.x = 900;
    this.y = gamearea.canvas.height - this.height;
    this.draw = function() {
        gamearea.context.fillRect(this.x, this.y, this.width, this.height)
    };

}
let gamearea = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.height = 480;
        this.canvas.width = 900;
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.context = this.canvas.getContext("2d")
            // myObstacles.push(new obstacle());
        this.frame = 0;
        this.interval = setInterval(this.updateGameArea, 5)
        window.addEventListener("keydown", jump);
    },
    updateGameArea: function() {
        for (i = 0; i < myObstacles.length; i++) {
            if (player.crashWith(myObstacles[i])) {
                gamearea.stop();
                return;
            }
        }
        gamearea.clear();
        if (everyinterval(gap)) {
            myObstacles.push(new obstacle());
            console.log(myObstacles)
            gap = randGap();
            gamearea.frame = 1;
        }
        for (i = 0; i < myObstacles.length; i++) {
            myObstacles[i].x -= 4;
            myObstacles[i].draw();
        }
        player.newPos();
        player.update();
        gamearea.frame += 1;
    },
    clear: function() {
        gamearea.context.clearRect(0, 0, this.canvas.width, this.canvas.width)
    }
}