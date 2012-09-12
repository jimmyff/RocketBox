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
	
	/* RocketBox will call this with the setup object */
	initalise: function (setup) {

		this.canvasContext 	= setup.canvasContext;
		this.width 			= setup.width;
		this.height 		= setup.height;
		this.ballPosition 	= {
			x:	Math.round(this.width/2), 
			y:	Math.round(this.height/2)
		};

		this.events = setup.events;
		this.events.listen('APP:TICK', this.appLoop, this);
		this.events.listen('APP:RESIZE', this.resize, this);
		this.clearCanvas(1);
		this.events.fire('LOG', 'Bouncing ball app initalised');
	},
	
	resize: function (eventData) {

		this.width		= eventData.width;
		this.height		= eventData.height;

	},

	appLoop: function (tickData) {

		this.clearCanvas(0.2);
		this.move(tickData);
		this.render();
	},

	clearCanvas: function (opacity) {

		// 0.2 opacity to give trail effect
		this.canvasContext.fillStyle = "rgba(225,225,225,"+opacity+")";
		this.canvasContext.fillRect(0, 0, this.width, this.height);

	},

	move: function (tickData) {

		this.ballPosition.x += ((tickData.timer.dt/5) * this.ballDirection.x);
		this.ballPosition.y += ((tickData.timer.dt/5) * this.ballDirection.y);

		if (this.ballPosition.x - this.ballRadius < 0) this.ballDirection.x = 1;
		if (this.ballPosition.x + this.ballRadius > this.width) this.ballDirection.x = -1;
		if (this.ballPosition.y - this.ballRadius < 0) this.ballDirection.y = 1;
		if (this.ballPosition.y + this.ballRadius > this.height) this.ballDirection.y = -1;
		
	},

	render: function () {

		this.canvasContext.fillStyle = "rgb(40,40,40)";
		this.canvasContext.beginPath();
		this.canvasContext.arc(this.ballPosition.x, this.ballPosition.y, this.ballRadius, 0, Math.PI*2, true); 
		this.canvasContext.closePath();
		this.canvasContext.fill();
	}

};