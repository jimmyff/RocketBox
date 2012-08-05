goog.provide('rocket.util.Timer');


/*
 * General purpose Timer / Game loop
 */

/**
 * @constructor
 */
rocket.util.Timer = function (config) {
	
	this.events			= config.events;
	this.tickLast 		= null;	// last tick timestamp
	this.tickCurrent 	= null;	// current tick timestamp
	
	this.fpsArr			= [];
	this.fpsAverage		= undefined;
	
	this.speed			= config && config.speed ? config.speed : 1.0;
	this.fpsCap			= config && config.fpsCap ? config.fpsCap : 30;
	
	this.tickCallback 	= undefined;
	
	this.counter		= 0;
	this.running		= false;
}

rocket.util.Timer.prototype = {
	
		
	init: function (callback) {
	
		this.tickCallback 	= callback;
		this.events.fire('LOG', 'Initalised Timer. FPS Cap: '+this.fpsCap+' speed: '+Math.round(this.speed*100));	
		
	},
	
	start: function () {
		this.tick();
		this.running = true;
		this.intervalId = setInterval(goog.bind(this.tick, this), 1000 / this.fpsCap);
	},

	pause: function () {
		this.running = false;
		clearInterval(this.intervalId);
	},
	
	tick: function () {
		var now =  new Date;
		this.tickCurrent = now.getTime();
		if (!this.tickLast) 
			this.tickLast = 0;
		
		var deltaTime = this.tickCurrent - this.tickLast;
		
		if (deltaTime > 0) {
		
			if (deltaTime > (1000/this.fpsCap))
				deltaTime = (1000/this.fpsCap);
			
			this.counter += deltaTime / 100;
		}

		this.events.fire('TICK', {dt: deltaTime, fps: this.fpsAverage, counter: this.counter});
		//this.tickCallback(deltaTime, this.fpsAverage);
		
		
		// calculate the FPS
		this.fps = 1000 / (this.tickCurrent - this.tickLast);
		this.fpsArr.push(this.fps);

		if (this.fpsArr.length > this.fpsCap) {

			var fpsTotal = 0;
			for(var i = 0, l = this.fpsArr.length; i < l; i++)
				fpsTotal += this.fpsArr[i];

			this.fpsAverage = Math.round(fpsTotal/this.fpsArr.length);
			this.fpsArr = [];
			
			var that = this;
			
			goog.array.forEach(goog.dom.getElementsByClass('fps'),
				function (el) {	el.innerHTML = that.fpsAverage });

		}

		
/*	
		// call the next tick to give 30 FPS
		var msPerFrame = 1000 / this.fpsCap;
		var delay = msPerFrame; // - (this.tickCurrent -this.tickLast);
	
		if (delay < 1) delay = 1;
		
		// schedule next tick
		setTimeout(goog.bind(this.tick, this), delay);
*/		
		this.tickLast = this.tickCurrent;
	}
}
