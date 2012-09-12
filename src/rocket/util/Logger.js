goog.provide('rocket.util.Logger');

/**
 * @constructor
 */
rocket.util.Logger = function (config) {
	this.enabled 	= config.enabled ? config.enabled : true;
	this.events 	= config.events ? config.events : undefined;
	this.prefix 	= config.prefix ? config.prefix : 'LOG';
	
	this.init();

	this.TYPE_INFO	= 0;
	this.TYPE_WARN	= 1;
	this.TYPE_ERROR	= 3;
};

rocket.util.Logger.prototype = {
		
	init: function () {
		if (this.events) {
			this._info('Logger listening...');
			this.events.listen('LOG', this._info, this);	
			this.events.listen('LOG:INFO', this._info, this);	
			this.events.listen('LOG:WARN', this._warn, this);
			this.events.listen('LOG:ERROR', this._error, this);	
		}
	},

	_output: function (type, text, data) {
		if (!this.enabled) return;
		
		if (typeof console !== "undefined") {
			var msg = this.prefix.toUpperCase()+'> '+text;

			switch (type) {
				case this.TYPE_INFO:
					console.log(msg);
					break;
					
				case this.TYPE_WARN:
					console.warn(msg);
					break;
					
				case this.TYPE_ERROR:
					console.error(msg);
					break;

			}
			
			if (data) console.log(data);
		}
			
	},
	_info: function (text, data) {	this._output(this.TYPE_INFO, text, data); },
	_warn: function (text, data) { 	this._output(this.TYPE_WARN, text, data); },
	_error: function (text, data) {	this._output(this.TYPE_ERROR, text, data); }
};