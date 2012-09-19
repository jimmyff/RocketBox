/*
	Implementation of Conway's "Game of Life"
	By jimmyff (Jimmy Forrester-Fellowes), Rocketware
	A RocketBox example app
*/

var ConwaysGameOfLife = function () {
	this.cellSize = 4;	// resolution (dots per cell)
};

ConwaysGameOfLife.prototype = {

	/* RocketBox will call this with the setup object */
	initalise: function (setup) {

		this.canvasContext 	= setup.canvasContext;
		this.width			= Math.floor(setup.width / this.cellSize);
		this.height			= Math.floor(setup.height / this.cellSize);
		this.setupSimulation();

		this.events = setup.events;
		this.events.listen('APP:TICK', this.appLoop, this);
		this.events.listen('APP:RESIZE', this.playerResized, this);
		this.clearCanvas();
		this.events.fire('LOG', 'Conway\'s Game Of Life initalised');
	},
	
	playerResized: function (eventData) {

		this.width		= Math.round(eventData.width / this.cellSize);
		this.height		= Math.round(eventData.height / this.cellSize);
		this.setupSimulation();
	},
	setupSimulation: function () {

		this.cells = {};
		for (var x = 0, xl = this.width; x < xl; x++) {
			this.cells[x] = {};
			for (var y = 0, yl = this.height; y < yl; y++) {
				this.cells[x][y] =  Math.round(Math.random()*8) ==1?true:false;
			}
		}
	},
	appLoop: function (tickData) {

		this.clearCanvas();
		this.tick(tickData);
		this.render();
	},

	clearCanvas: function () {

		this.canvasContext.fillStyle = "rgb(0,0,0)";
		this.canvasContext.fillRect(0, 0, this.width*this.cellSize, this.height*this.cellSize);

	},
	countNeighbours: function (cellState, x, y) {

		var neighbours = 0;
		for (var cx = x-1; cx <= x+1; cx++) {
			for (var cy = y-1; cy <= y+1; cy++) {
				if (cx > 0 && cx < this.width &&
					cy > 0 && cy < this.height &&
					!(cx == x && cy == y) &&
					cellState[cx][cy] === true)
						neighbours++;
			}
		}
		return neighbours;
	},
	tick: function (tickData) {

		var cellState = {};

		// clone the grid for processing
		for (var sx = 0, sxl = this.width; sx < sxl; sx++) {
			cellState[sx] = {};
			for (var sy = 0, syl = this.height; sy < syl; sy++) {
				cellState[sx][sy] = this.cells[sx][sy];
			}
		}

		for (var x = 0, xl = this.width; x < xl; x++) {
			for (var y = 0, yl = this.height; y < yl; y++) {

				var neighbours = this.countNeighbours(cellState, x, y);

				if (this.cells[x][y] === true) {
					/* living cell */
					switch (neighbours) {
						case 0:
						case 1:
							// dies due to under population
							this.cells[x][y] = false;
							break;
						case 2:
						case 3:
							// lives on
							break;
						default:
							// dies due to overpopulation
							this.cells[x][y] = false;
							break;
					}
				} else {
					/* dead cell */
					if (neighbours === 3)
						// ...it's a boy! a new cell is born
						this.cells[x][y] = true;
					
				}
			}
		}
	},

	render: function () {

		this.canvasContext.fillStyle = "rgb(255,255,255)";

		for (var x = 0, xl = this.width; x < xl; x++) {
			for (var y = 0, yl = this.height; y < yl; y++) {

				if (this.cells[x][y] === true)
					this.canvasContext.fillRect(
						x*this.cellSize, 
						y*this.cellSize, 
						this.cellSize, 
						this.cellSize); 

			}
		}
	}



};