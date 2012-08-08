goog.provide('rocket.util.Timer');


/*
 * General purpose Timer / Game loop
 */

/**
 * @constructor
 */
rocket.util.Timer = function (config) {
	
	this.events			= config.events;
	this.tickLast		= undefined;		// last tick timestamp
	this.tickCurrent	= undefined;		// current tick timestamp
	
	this.fpsArr			= [];
	this.fpsAverage		= 0;
	
	this.speed			= config && config.speed ? config.speed : 1.0;
	this.fps			= config && config.fps ? config.fps : 30;
	this.tickEvent		= config && config.tickEvent ? config.tickEvent : 'TICK';
	
	this.counter		= 0;
	this.running		= false;


}

rocket.util.Timer.prototype = {
	
	play: function () {

		this.tick();
		this.running = true;
		this.intervalId = setInterval(goog.bind(this.tick, this), 1000 / this.fps);

	},

	pause: function () {

		clearInterval(this.intervalId);
		this.running = false;
		this.tickLast = undefined;
	
	},
	
	tick: function () {

		var now = new Date();
		this.tickCurrent = now.getTime();

		var deltaTime = !this.tickLast?0:this.tickCurrent - this.tickLast;
		
		if (this.tickLast && deltaTime > 0) {
		
			if (deltaTime > (1000/this.fps))
				deltaTime = (1000/this.fps);
			
			this.counter += deltaTime / 100;
		}

		this.events.fire(this.tickEvent, {
			'dt'		: deltaTime,
			'fps'		: this.fpsAverage,
			'counter'	: this.counter,
			'speed'		: this.speed
		});
		
		// calculate the FPS
		if (this.tickLast && deltaTime > 0) {
			this.fpsArr.push(1000 / deltaTime);

			if (this.fpsArr.length > this.fps) {

				for(var fpsTotal = 0, i = 0, l = this.fpsArr.length; i < l; i++)
					fpsTotal += this.fpsArr[i];

				this.fpsAverage = Math.round(fpsTotal/this.fpsArr.length);
				this.fpsArr = [];
			}
		}
		this.tickLast = this.tickCurrent;
	}
}
