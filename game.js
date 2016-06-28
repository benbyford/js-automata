
// check program is being run

var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');

var gridWidth = 400;
var gridHeight = 250;
var gridSquareWidth = 2;

canvas.width = gridWidth * gridSquareWidth;
canvas.height = gridHeight * gridSquareWidth;
canvas.style.width = canvas.width
canvas.style.height = canvas.height;

var grid = [];
var nextGrid = [];
var defaultStartLine = [1,0,1,0,1,1,1,0,0,0,1,0,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,1,0,1,0,1,0,1,1,1,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,1,0,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,1,0,1,0,1,0,1,1,1,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,1,0,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,1,1,1,0,0,0,1,0,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,1,0,1,0,1,0,1,1,1,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,1,0,1,1,1,1,1,1,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,0,1,0,0,1,0,1,0,1,0,1,1,1,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,1,0,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,1,0,1,0,1,0,1,1,1,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,1,0,1,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1,0,0,0,0,1,0,0,1,0,1,0,1,0,1,1,1,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,1,0,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0];

// create default grid array
for (var y = 0; y < gridHeight; y++) {
	grid[y] = []

	for (var x = 0; x < gridWidth; x++) {
		grid[y][x] = [];
		nextGrid[x] = [];
	}
}

grid[0] = defaultStartLine;

// smooth init grid
function startAutomata(y){

	nextGrid = [];

	// for current row y, process their columns x
	for (var x = 0; x < gridWidth; x++) {

		// find previous nieghours for row above
		var counts = countNextDoor(x,y-1);

		// logic
		// logic 1: if n = 0 bring alive, n = 1 die, n = 2 alive
		if(counts[0] == 0){
			nextGrid[x] = 1;
		}else if(counts[0] == 1){
			nextGrid[x] = 0;
		}else if(counts[0] == 2){
			nextGrid[x] = 1;
		}

		// logic 2: if self = 1 && n = 1 keep alive else die, else if self = 0 && n = 0 bring alive, else die
		// if(counts[2] == 1){
		// 	if(counts[0] == 1){
		// 		nextGrid[x] = 1;
		// 	}else{
		// 		nextGrid[x] = 0;
		// 	}
		// }else{
		// 	if(counts[0] == 0){
		// 		nextGrid[x] = 1;
		// 	}else{
		// 		nextGrid[x] = 0;
		// 	}
		// }

		// logic 3: if n = 4 && self alove then die, n more than or 2 bring alive, else die
		// if(counts[1] == 4 && counts[2] == 1){
		// 	// over crowding
		// 	nextGrid[x] = 0;
		// }else if(counts[1] >= 2){
		// 	nextGrid[x] = 1;
		// }else{
		// 	nextGrid[x] = 0;
		// }


		// // logic 4: if n = 2 then if n4 = 3 alive else die, n = 1 then if n4 = 3 alive else die, if n = 0 bring alive
		// if(counts[0] == 2){
		//
		// 	if(counts[1] == 3){
		// 		nextGrid[x] = 1;
		// 	}else{
		// 		nextGrid[x] = 0;
		// 	}
		//
		// }else if(counts[0] == 1){
		//
		// 	if(counts[1] == 3){
		// 		nextGrid[x] = 1;
		// 	}else{
		// 		nextGrid[x] = 0;
		// 	}
		//
		// }else if(counts[1] == 0){
		// 	nextGrid[x] = 1;
		// }else{
		// 	nextGrid[x] = 0;
		// }

		// logic 5: if n = 2 then if n4 > 2 & self = 1 then die else stay alive, if n = 1 then alive, if n = 0 and n4 > 1 then alive, if n4 = 0 and self dead then alive, else dead
		// if(counts[0] == 2){
		//
		// 	if(counts[1] > 2 && counts[2] == 1){
		// 		nextGrid[x] = 0;
		// 	}else{
		// 		nextGrid[x] = 1;
		// 	}
		//
		// }else if(counts[0] == 1){
		//
		// 	nextGrid[x] = 1;
		//
		// }else if(counts[1] == 0){
		//
		// 	if(counts[1] > 1){
		// 		nextGrid[x] = 1;
		// 	}
		//
		// }else if(counts[1] == 0 && counts[2] == 0){
		// 	nextGrid[x] = 1;
		// }else{
		// 	nextGrid[x] = 0;
		// }
	}

	grid[y] = nextGrid;
}

// helper function to find neighbours
function countNextDoor(x,y){

	var count2 = 0;
	var count4 = 0;
	var selfCount = 0;

	// count all nearby sqaures
	counter2(x-1,y); // left
	counter2(x+1,y); // right
	counter4(x-2,y); // left 2
	counter4(x+2,y); // right 2

	if(grid[y][x] == 1){
		selfCount = 1;
	}

	function counter2(x,y){
		// if x and y on the grid
		if(x >= 0 && x < gridWidth && y >= 0 && y < gridHeight){
			if (grid[y][x] == 1){
				count2++;
				count4++;
			}
		}
	}
	function counter4(x,y){
		// if x and y on the grid
		if(x > 0 && x < gridWidth && y > 0 && y < gridHeight){
			if (grid[y][x] == 1){
				count4++;
			}
		}
	}

	// return count value
	counts = [count2, count4, selfCount]
	return counts;
}

var x = 0,
	y = 1;
var gameEnd = false;

function update(dt, iteration) {

	// if grid is smaller than grid height
	if(y != gridHeight){

		console.log(iteration);

		startAutomata(y);

		y++;

		draw();
	}else{
		gameEnd = true;
	}
}

function draw() {
// clear canvas
	ctx.fillStyle = '#fee';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	for (var x = 0; x < gridWidth; x++) {
		for (var y = 0; y < gridHeight; y++) {

			if (grid[y][x] == 1) {
				ctx.fillStyle = "#ee66aa";
				ctx.fillRect(x * gridSquareWidth, y * gridSquareWidth, gridSquareWidth, gridSquareWidth);
			}
		}
	}
}


// The main game loop
var lastTime;
var iteration = 0;
function gameLoop() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;

	iteration++;

    update(dt, iteration);

    lastTime = now;

	if(gameEnd){
		console.log("simulation ended");
	}else{
		window.setTimeout(gameLoop, 5);
	}
};

// start game
gameLoop();
