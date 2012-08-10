var BouncingBall = function () {

	this.canvasContext 	= undefined;
	this.events 		= undefined;
	this.width 			= 640;
	this.height 		= 360;
	this.ballPosition 	= {x:0, y: 0};
	this.ballDirection 	= {x:1, y:1};
	this.ballRadius 	= 30;

};

BouncingBall.prototype = {
	
	initalise: function (setup) {
		this.canvasContext = setup.canvasContext;
		this.width = setup.width;
		this.height = setup.height;
		this.ballPosition = {
			x:Math.round(this.width/2), 
			y: Math.round(this.height/2)
		};
		this.events = setup.events;
		this.events.listen('APP:TICK', this.appLoop, this);

		this.events.listen('APP:RESIZE', this.resize, this);

		this.canvasContext.fillStyle = "rgb(245,245,245)";
		this.canvasContext.fillRect(0, 0, this.width, this.height);
	},

	resize: function (eventData) {

		this.width 		= eventData.width;
		this.height 	= eventData.height;


	},

	appLoop: function (cycle) {

		this.clearCanvas(cycle);
		this.move(cycle);
		this.render(cycle);
	},

	clearCanvas: function (cycle) {

		// 0.2 opacity to give trail effect
		this.canvasContext.fillStyle = "rgba(245,245,245,0.2)";
		this.canvasContext.fillRect(0, 0, this.width, this.height);

	},

	move: function (cycle) {

		this.ballPosition.x += ((cycle.dt/5) * this.ballDirection.x);
		this.ballPosition.y += ((cycle.dt/5) * this.ballDirection.y);

		if (this.ballPosition.x - this.ballRadius < 0) this.ballDirection.x = 1;
		if (this.ballPosition.x + this.ballRadius > this.width) this.ballDirection.x = -1;
		if (this.ballPosition.y - this.ballRadius < 0) this.ballDirection.y = 1;
		if (this.ballPosition.y + this.ballRadius > this.height) this.ballDirection.y = -1;
		
	},

	render: function (cycle) {

		this.canvasContext.fillStyle = "rgb(40,40,40)";
		this.canvasContext.beginPath();
		this.canvasContext.arc(this.ballPosition.x, this.ballPosition.y, this.ballRadius, 0, Math.PI*2, true); 
		this.canvasContext.closePath();
		this.canvasContext.fill();
	}

};