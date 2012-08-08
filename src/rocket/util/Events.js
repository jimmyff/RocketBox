goog.provide('rocket.util.Events');
goog.require('goog.array');

/**
 * @constructor
 */
rocket.util.Events = function() {
	this.listeners = {};
};

rocket.util.Events.prototype = {
	
	getListeners: function(e) {
		this.listeners || (this.listeners = {});
		this.listeners[e] || (this.listeners[e] = []);
		return this.listeners[e];
	},
	
	listen: function(e, fn, ctx) {

		this.fire('LOG', 'Events: Listener Attached: '+e);
			
		var listeners = this.getListeners(e);
		if (ctx) {
			fn = goog.bind(fn, ctx);
		}
		listeners.push(fn);
	},
	
	addListeners: function(listeners) {
		goog.object.forEach(listeners, function(ls, e) {
			var listeners = this.getListeners(e);
	
			if (goog.isArray(ls)) {
				goog.array.forEach(ls, function(l) {
					this.listen(e, l);
				}, this);
			} else {
				this.listen(e, ls);
			}
		}, this);
	},
	
	fire: function(e, args) {
		
		if (e !== 'LOG' && e !== 'APP:TICK' && e !== 'CURSOR:MOVE' && e !== 'MOUSE:MOVE' && e !== 'KEYBOARD:KEY')
			this.fire('LOG', 'Events: Fired: '+e, args);
		
		goog.array.forEach(this.getListeners(e), function(fn) {
			fn.apply(null, !args? [] : (typeof args == 'array'? args : [args]));
		});
	}
};