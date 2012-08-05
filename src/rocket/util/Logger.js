
goog.provide('rocket.util.Logger');

/**
 * @constructor
 */
rocket.util.Logger = function (_args) {
	this.enabled 	= _args && _args.enabled ? _args.enabled : true;
	this.events 	= _args && _args.events ? _args.events : undefined;
	
	this.init();
};

rocket.util.Logger.prototype = {
		
	init: function () {
		
		if (this.events) {
			this.log('Listening...');
			this.events.listen('LOG', this.log, this);	
		}
	},
	log: function (text, data) {
		if (!this.enabled) return;
		
		if (typeof console !== "undefined") {
			console.log('Logger: '+text);
			
			if (data)
				console.log(data);
		}
			
	}
};
