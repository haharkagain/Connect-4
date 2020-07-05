window.addEventListener("load", main, false);
function main() {
    window.addEventListener("keydown", keyDown);
    canv = document.getElementById("main");
    ctx = canv.getContext("2d");
    var turn = 1;
    var playing = true;
    arena = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ];
    draw();
    function keyDown(evt) {
        if (playing) {
            if (evt.keyCode == 49) {
                placePiece(0);
            }
            if (evt.keyCode == 50) {
                placePiece(1);
            }
            if (evt.keyCode == 51) {
                placePiece(2);
            }
            if (evt.keyCode == 52) {
                placePiece(3);
            }
            if (evt.keyCode == 53) {
                placePiece(4);
            }
            if (evt.keyCode == 54) {
                placePiece(5);
            }
            if (evt.keyCode == 55) {
                placePiece(6);
            }
        }    
    }
    function placePiece(x) {
        for (var y = 5; y >= 0; y--) {
            if (arena[y][x] == 0) {
                if (turn == 1) {
                    arena[y][x] = 1;
                }
                else {
                    arena[y][x] = 2;
                }
                draw();
                checkWin(y, x);
                if (playing) {
                    turn = (turn % 2) + 1;
                    console.log(arena);
                }
                else {
                    ctx.fillStyle = "lime";
                    ctx.font = "60px Arial";
                    ctx.textAlign = "center";
                    if (turn == 1) {
                        ctx.fillText("Red Player Wins!", canv.width / 2, canv.height / 2);
                    }
                    else {
                        ctx.fillText("Yellow Player Wins!", canv.width / 2, canv.height / 2);
                    }
                }
                
                break;
            }
        }
    }
    function checkWin(y, x) {
        var count = 0;
        for (var i = 1; i < 4; i++) { // vertical
            if ((y + i < arena.length) && (arena[y + i][x] == turn)) {
                count++;
            }
        }
        if (count == 3) {
            playing = false;
            return;
        }
        count = 0;
        for (var i = -3; i < 4; i++) { // horizontal
            if ((x + i < arena[y].length) && (x + i >= 0) && (arena[y][x + i] == turn)) {
                count++;
                if (count == 4) {
                    playing = false;
                    return;
                }
            }
            else {
                count = 0
            }
        }
        count = 0;
        for (var i = -3; i < 4; i++) { // up-left/down-right diagonal
            if ((x + i < arena[y].length) && (x + i >= 0) && (y + i < arena.length) && (y + i >= 0) && (arena[y + i][x + i] == turn)) {
                count++;
                if (count == 4) {
                    playing = false;
                    return;
                }
            }
            else {
                count = 0
            }
        }
        count = 0;
        for (var i = -3; i < 4; i++) { // up-right/down-left diagonal
            if ((x + i < arena[y].length) && (x + i >= 0) && (y - i < arena.length) && (y - i >= 0) && (arena[y - i][x + i] == turn)) {
                count++;
                if (count == 4) {
                    playing = false;
                    return;
                }
            }
            else {
                count = 0
            }
        }
    }
    function circle(y, x, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(100 * (x + 1) - 50, 100 * (y + 1) - 50, 35, 0, 2 * Math.PI);
        ctx.fill();
    }
    function draw() {
        ctx.fillStyle = "blue";
        ctx.fillRect(0, 0, canv.width, canv.height);
        for (var y = 0; y < 6; y++) {
            for (var x = 0; x < 7; x++) {
                circle(y, x, "black");
            }
        }
        for (var y = 0; y < 6; y++) {
            for (var x = 0; x < 7; x++) {
                if (arena[y][x] == 1) {
                    circle(y, x, "red");
                }
                if (arena[y][x] == 2) {
                    circle(y, x, "yellow");
                } 
            }
        }
        ctx.fillStyle = "green";
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        for (var x = 0; x < 7; x++) {
            ctx.fillText(x + 1, 100 * (x + 1) - 50, 60);
        }
    } 
}