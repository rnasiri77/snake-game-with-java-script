var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var score = 0;
var foodX = 0;
var foodY = 0;
var x = 15;
var y = 15;
var foodweith = 20;
var foodHeight = 20;
var leaderboard = [];

var step = 20;
var maxX = canvas.width - step;    //border for creating meal
var maxY = canvas.height - step;
var min = 0;


var foodPosition = function () {
    //foodX= Math.floor((Math.random() * 300) + 1);
    //foodY = Math.floor((Math.random() * 300) + 1);

    foodX = Math.floor(Math.random() * (maxX - min) + min);//new position
    foodY = Math.floor(Math.random() * (maxY - min) + min);
}

foodPosition();
var createFood = function () {


    var img2 = document.getElementById("foodImg");
    ctx.drawImage(img2, foodX, foodY, foodweith, foodHeight);
}


var snake = function () {
    var img = document.getElementById("scream");
    ctx.drawImage(img, x, y, 30, 30);
}

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }
    if (e.keyCode == 38) {
        upPressed = true;
    }
    else if (e.keyCode == 40) {
        downPressed = true;
    }
}


function keyUpHandler(e) {
    if (e.keyCode == 37) {
        leftPressed = false;
    }
    else if (e.keyCode == 39) {
        rightPressed = false;
    }
    if (e.keyCode == 38) {
        upPressed = false;
    }
    else if (e.keyCode == 40) {
        downPressed = false;
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 0, 15);
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake();
    createFood();
    drawScore();
    eat();
    if (rightPressed && x < canvas.width - 20) {
        x += 5;
    }
    else if (leftPressed && x > 0) {
        x -= 5;
    }
    if (upPressed && y > 0) {
        y -= 5
    }
    else if (downPressed && y < canvas.height - 20) {
        y += 5;
    }

    if (rightPressed && x > canvas.width - 30) {
        x = 0;
    }
    if (leftPressed && x == 0) {
        x = canvas.width - 30;
    }
    if (upPressed && y == 0) {
        y = canvas.height - 30;
    }
    if (downPressed && y > canvas.height - 30) {
        y = 0;
    }
    requestAnimationFrame(draw);
}

draw();


function eat() {
    if ((foodX > x && foodX < x + 30 && foodY > y && foodY < y + 30) || (x > foodX && x < foodX + foodweith && y > foodY && y < foodY + foodHeight)) {
        score++;
        foodPosition();
        createFood();
        h2.textContent = "00:00:00";
        seconds = 0;

    }
}


var h2 = document.getElementsByTagName('h2')[0],
    start = document.getElementById('start'),
    stop = document.getElementById('stop'),

    seconds = 0, minutes = 0, hours = 0,
    t;

function add() {
    seconds++;
    if (seconds >= 11) {

        var playerName;
        playerName = prompt("GAME  OVER ,Insert your name");
        if (playerName == '') {
            playerName = "unknown";
        }
        player(playerName, score);
        makeTable(leaderboard);

        score = 0;
        seconds = 0;
        minutes = 0;


        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    h2.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    timer();
}

function timer() {
    t = setTimeout(add, 1000);
}

timer();
start.onclick = timer;


stop.onclick = function () {
    clearTimeout(t);
}

function player(name, score) {
    var obj = {
        name: name,
        score: score
    }
    leaderboard.push(obj);
    leaderboard.sort(dynamicSort("score"));
}


//sorting array of objects
function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result = (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}


function makeTable(array) {
    var table = document.createElement('table');
    for (var i = 0; i < array.length; i++) {
        var row = document.createElement('tr');
        var cell = document.createElement('td');
        var cell2 = document.createElement('td');
        cell.textContent = array[i].name;
        cell2.textContent = array[i].score;

        row.appendChild(cell);
        row.appendChild(cell2);
        table.appendChild(row);
    }

//    document.body.appendChild(table);
    document.getElementById('leaderBord').innerHTML = "";
    document.getElementById('leaderBord').appendChild(table);

}

