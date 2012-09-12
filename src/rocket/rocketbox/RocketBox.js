goog.provide('rocket.rocketbox.RocketBox');

goog.require('rocket.util.Events');
goog.require('rocket.util.Timer');
goog.require('rocket.util.Logger');
goog.require('goog.events');
goog.require('goog.style');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.object');
goog.require('goog.dom.ViewportSizeMonitor');
goog.require('goog.math.Size');

goog.exportSymbol('RocketBox', rocket.rocketbox.RocketBox);

/**
 * @constructor
 */
rocket.rocketbox.RocketBox = function (app, userOptions) {

	// store the app
	this.app = app;
	if (!this.app)
		this.app = {
			'initalise'	: function () { }
		};

	this.input = {};
	this.input.cursor = {
		'x'	:	undefined, 
		'y'	:	undefined
	};

	// set default options
	this.options	= {
		'id'					: undefined,	// DOM element id
		'title'					: undefined,	// player ui title
		'description'			: undefined,	// player ui description
		'autoPlay'				: true,			// auto start if can
		'fps'					: 30,			// desired fps
		'width'					: 480,			// player width
		'height'				: 320,			// player height
		'fullscreen'			: false,		// enable fullscreen
		'autoFullscreen'		: false,		// fullscreen on play
		'canvasResize'			: true,			// allow canvas resize
		'realTimeInputEvents'	: false,		// input events real time
		'logger'				: false,		// enable console logging
		'playerUi'				: true,			// show player controls
		'flashCanvas'			: false			// init flashcanvas if avail
	};

	// extend default options with user options
	goog.object.extend(this.options, userOptions);

	this.canvasContext	= undefined;
	this.ui				= {};			/* collection of dom elements */

	this.dictionary = {
		overlayPlay			: '&#9658;',
		playButton			: '&#9658; PLAY',
		pauseButton			: '&#10073;&#10073; PAUSE',
		appType				: 'DEMO',
		fullscreenButton	: 'FULLSCREEN',
		flashCanvasInit		: 'FlashCanvas initalised',
		flashCanvasMissing	: 'FlashCanvas could not be found',
		rootElementMissing	: 'Container element not found: '
	};
	
	this.eventDictionary = {
		timerTick		: 'TIMER:TICK',
		appTick			: 'APP:TICK',
		appPlay			: 'APP:PLAY',
		appPause		: 'APP:PAUSE'
	};

	this.cssDictionary = {
		base:'.rocketBox.fullscreen { margin:0 !important; max-width:100% !important; z-index:5337; position:absolute !important; width:100% !important; height:100% !important; left:0px; right:0px;  top:0px; bottom:0px; } .rocketBoxFullScreenBody { width:100%; height:100%; margin:0; }'
	};

	// create the event handler
	this.events = new rocket.util.Events();

	this.logger = new rocket.util.Logger({
		enabled		: this.options['loggerEnabled'],
		prefix		: this.options['id'],
		events		: this.events
	});

	// create the timer
	this.timer = new rocket.util.Timer({
		events		: this.events,
		fps			: this.options['fps'],
		tickEvent	: this.eventDictionary.timerTick
	});

	// size of the canvas the app knows about
    this.processedCanvasSize = new goog.math.Size (this.options['width'], this.options['height']);

    // monitor changes in viewport size
	this.viewportSizeMonitor = new goog.dom.ViewportSizeMonitor();
    goog.events.listen(
		this.viewportSizeMonitor, 
		goog.events.EventType.RESIZE, 
		goog.bind(this.possibleCanvasResized, this)
    );

	this.init();

};

rocket.rocketbox.RocketBox.prototype = {
	

	init: function () {

		goog.style.installStyles(this.cssDictionary.base);

		this.events.listen(this.eventDictionary.timerTick, this.appTick, this);

		// create the player interface
		this.createPlayerUi();

		this.attachInputEvents();

		// check size
		this.possibleCanvasResized();

		// initalise the application
		this.app['initalise']({
			'canvas'			: this.ui.canvas,
			'canvasContext'		: this.canvasContext,
			'events'			: {
				'fire'				: goog.bind(this.events.fire,this.events), 
				'listen'			: goog.bind(this.events.listen,this.events)
			},
			'width'				: this.processedCanvasSize.width,
			'height'			: this.processedCanvasSize.height,
			'renderCallback'	: goog.bind(this.appTick, this)
		});

		// check if the application wants to autoplay
		if (window.rocketPlayerAppId === undefined && this.options['autoPlay'])
			this.play({animateOverlay:false});

	},

	possibleCanvasResized: function () {

		var canvasSize = goog.style.getSize(this.ui.canvas);
		
		if (goog.math.Size.equals(this.processedCanvasSize, canvasSize))
			return;
		
		// update the overlay
		goog.style.setStyle(this.ui.overlay, {
			'width'		: '100%',
			'height'	: canvasSize.height+'px'
		});
		goog.style.setStyle(this.ui.overlayPlayButton, {
			'lineHeight'	: canvasSize.height+'px'
		});


		this.processedCanvasSize = canvasSize;

		// resize events may be blocked, if so don't resize canvas
		if (!this.options['canvasResize'])
			return;

		this.events.fire('APP:RESIZE', {
			'width'		: canvasSize.width,
			'height'	: canvasSize.height
		});
		
		goog.dom.setProperties(this.ui.canvas, {
			'width'		: canvasSize.width,
			'height'	: canvasSize.height
		});


		
	},

	enterFullscreen: function () {
		goog.dom.classes.add(this.ui.playerContainer, 'fullscreen');
		goog.dom.classes.add(document.body, 'rocketBoxFullScreenBody');
		this.possibleCanvasResized();
	},

	leaveFullscreen: function () {
		goog.dom.classes.remove(this.ui.playerContainer, 'fullscreen');
		goog.dom.classes.remove(document.body, 'rocketBoxFullScreenBody');
		this.possibleCanvasResized();
	},

	toggleFullScreen: function () {

		if (goog.dom.classes.has(this.ui.playerContainer, 'fullscreen'))
			this.leaveFullscreen();
		else
			this.enterFullscreen();

	},

	togglePlayPause: function () {
	
		if (!this.timer.running) this.play();
		else this.pause();
	
	},

	play: function (options) {

		if (this.timer.running) return;

		if (this.options['autoFullscreen'])
			this.enterFullscreen();

		// start the app
		this.events.fire(this.eventDictionary.appPlay);
		this.timer.play();

		// set the global app id to current
		window.rocketPlayerAppId = this.options['id'];
		
		// update ui
		this.ui.playPauseButton.innerHTML	= this.dictionary.pauseButton;
		goog.style.showElement(this.ui.overlay, false);

	},

	pause: function (options) {

		if (!this.timer.running) return;

		// pause the app
		this.events.fire(this.eventDictionary.appPause);
		this.timer.pause();

		// update ui
		this.ui.playPauseButton.innerHTML	= this.dictionary.playButton;
		goog.style.showElement(this.ui.overlay, true);

	},

	appTick: function (timerData) {
	
		this.ui.fps.innerHTML = (timerData['fps']?timerData['fps']:'...');

		if (this.timer.running && window.rocketPlayerAppId !== this.options['id']) {
			this.events.fire('LOG', 'RocketBox Pausing ', {
				'timerRunning': this.timer.running, 
				'windowId':window.rocketPlayerAppId
			});
			this.pause();
		}

		this.events.fire(this.eventDictionary.appTick, {
			'timer'	: timerData,
			'input'	: {
				'cursor' : this.input.cursor
			}
		});

	},

	attachInputEvents: function () {


		goog.events.listen(this.ui.canvas, goog.events.EventType.MOUSEMOVE,goog.bind(this._inputEventMouseMove, this));


	},
	_inputEventMouseMove: function (e) {

		this.input.cursor = {
			'x'	:	e['offsetX'],
			'y'	:	e['offsetY']
		};

		if (this.options['realTimeInputEvents'])
			this.events.fire('INPUT:MOUSE_MOVE', this.input.cursor);

	},

	createPlayerUi: function () {

		/* Create Player Container */
		this.ui.playerContainer = goog.dom.createDom('div', {
			'class'		: 'rocketBox'
		});
		goog.style.setStyle(this.ui.playerContainer, {
			'position'			: 'relative',
			'maxWidth'			: this.options['width']+'px'
		});

		// is the player ui attached?
		if (this.options['playerUi']) {

		goog.style.setStyle(this.ui.playerContainer, {
			'border'			: '1px solid #111',
			'backgroundColor'	: '#444',
			'borderRadius'		: '0 0 5px 5px',
			'margin'			: '10px auto 10px auto'
		});

		}


		// attach container to user referenced dom node
		var rootContainer = document.getElementById(this.options['id']);
		if (!rootContainer) {

			this.events.fire('LOG:ERROR', this.dictionary.rootElementMissing+this.options['id']);
			
			// if no root container, create it, 
			rootContainer = goog.dom.createDom('div', {
				'id' : this.options['id']
			});

		}
		rootContainer.appendChild(this.ui.playerContainer);



		/* Create Canvas Element */
		this.ui.canvas = goog.dom.createDom('canvas', {
			'id'		: this.options['id']+'_canvas',
			'width'		: this.options['width'],
			'height'	: this.options['height']
		});
		goog.style.setStyle(this.ui.canvas, {
			'width'		: '100%'
		});


		if (this.options['flashCanvas'] && typeof FlashCanvas !== "undefined") {
		    FlashCanvas.initElement(this.ui.canvas);
		    this.events.fire('LOG:INFO', this.dictionary.flashCanvasInit);
		} else if (this.options['flashCanvas']) {
		    this.events.fire('LOG:WARN', this.dictionary.flashCanvasMissing);
		} 



		this.ui.playerContainer.appendChild(this.ui.canvas);
		

		/* Save Canvas Context */
		if (!this.ui.canvas.getContext) {
			// handle browser support issue... rollback to flash?
			// this.events.fire('LOG',"Browser not supported");
			throw "Failed to create canvas element";
		}
		this.canvasContext = this.ui.canvas.getContext('2d');
		



		/* Create Player UI container */
		this.ui.playerUiContainer = goog.dom.createDom('div', {
			'class'		: 'playerui'
		});


		/* Create Control Bar */
		this.ui.controlBar = goog.dom.createDom('div');
		goog.style.setStyle(this.ui.controlBar, {
			'backgroundColor'	: '#111',
			'height'			: '25px',
			'padding'			: '5px',
			'textAlign'			: 'left'
		});


		/* Create Play / Pause Button */
		this.ui.playPauseButton = goog.dom.createDom('button');
		this.ui.playPauseButton.innerHTML = this.dictionary.playButton;
		goog.style.setStyle(this.ui.playPauseButton, {
			'backgroundColor'	: '#ff8000',
			'color'				: 'rgb(255,255,255)',
			'borderRadius'		: '5px',
			'border'			: '0px',
			'width'				: '70px',
			'font'				: '12px Arial',
			'fontWeight'		: 'bold',
			'marginRight'		: '10px',
			'cursor'			: 'hand',
			'height'			: '25px'
		});
		goog.events.listen(this.ui.playPauseButton, 'click', goog.bind(this.togglePlayPause, this));
		this.ui.controlBar.appendChild(this.ui.playPauseButton);


		/* Create Fullscreen Button */
		this.ui.fullscreenButton = goog.dom.createDom('button');
		this.ui.fullscreenButton.innerHTML = this.dictionary.fullscreenButton.toUpperCase();
		goog.style.setStyle(this.ui.fullscreenButton, {
			'backgroundColor'	: '#ff8000',
			'color'				: 'rgb(255,255,255)',
			'borderRadius'		: '5px',
			'border'			: '0px',
			'width'				: '100px',
			'font'				: '12px Arial',
			'fontWeight'		: 'bold',
			'marginLeft'		: '10px',
			'float'				: 'right',
			'cursor'			: 'hand',
			'height'			: '25px'
		});
		goog.events.listen(this.ui.fullscreenButton, 'click', goog.bind(this.toggleFullScreen, this));
		this.ui.controlBar.appendChild(this.ui.fullscreenButton);



		/* Application Title */
		this.ui.playerTitle = goog.dom.createDom('span');
		this.ui.playerTitle.innerHTML = this.options['title'].toUpperCase();
		goog.style.setStyle(this.ui.playerTitle, {
			'color'			: 'rgb(180,180,180)',
			'font'			: '12px Arial',
			'fontWeight'	: 'bold',
			'lineHeight'	: '25px'
		});

		/* Application Title Container */
		this.ui.playerTitleContainer = goog.dom.createDom('span');
		goog.style.setStyle(this.ui.playerTitleContainer, {
			'color'		: 'rgb(100,100,100)',
			'font'		: '12px Arial',
			'fontWeight': 'bold',
			'lineHeight'	: '25px'
		});
		if (this.options['appType'])
			this.ui.playerTitleContainer.appendChild(document.createTextNode(this.options['appType'].toUpperCase()+': '));
		this.ui.playerTitleContainer.appendChild(this.ui.playerTitle);
		this.ui.controlBar.appendChild(this.ui.playerTitleContainer);



		/* Create FPS span */
		this.ui.fps = goog.dom.createDom('span');
		this.ui.fps.innerHTML				= '...';
		goog.style.setStyle(this.ui.fps, {
			'color'			: 'rgb(140,140,140)',
			'font'			: '12px Arial',
			'fontWeight'	: 'bold',
			'lineHeight'	: '25px'
		});


		/* Create FPS container */
		this.ui.fpsContainer = goog.dom.createDom('span');
		goog.style.setStyle(this.ui.fpsContainer, {
			'color'		: 'rgb(100,100,100)',
			'font'		: '12px Arial',
			'float'		: 'right',
			'lineHeight'	: '25px'
		});
		this.ui.fpsContainer.appendChild(document.createTextNode('FPS: '));
		this.ui.fpsContainer.appendChild(this.ui.fps);
		this.ui.controlBar.appendChild(this.ui.fpsContainer);


		// add control bar to Player
		this.ui.playerUiContainer.appendChild(this.ui.controlBar);



		/* Create Info Bar (description) */
		this.ui.infoBar = goog.dom.createDom('div');
		goog.style.setStyle(this.ui.infoBar, {
			'backgroundColor'	: '#333',
			'color'				: '#777',
			'padding'			: '5px 5px 7px 5px',
			'textAlign'			: 'left',
			'font'				: '12px Arial',
			'borderRadius'		: '0 0 5px 5px'
		});
		this.ui.infoBar.appendChild(document.createTextNode(this.options['description']));
		this.ui.playerUiContainer.appendChild(this.ui.infoBar);



		if (this.options['playerUi'])
			this.ui.playerContainer.appendChild(this.ui.playerUiContainer);



		/* Create Paused Overlay */
		this.ui.overlay = goog.dom.createDom('div');
		goog.style.setStyle(this.ui.overlay, {
			'backgroundColor'	: 'rgba(0,0,0,0.35)',
			'width'				: '100%',
			'height'			: this.options['height']+'px',
			'position'			: 'absolute',
			'top'				: 0,
			'left'				: 0,
			'cursor'			: 'hand'
		});
		// overlay: play icon
		this.ui.overlayPlayButton = goog.dom.createDom('div');
		this.ui.overlayPlayButton.innerHTML = this.dictionary.overlayPlay;
		goog.style.setStyle(this.ui.overlayPlayButton, {
			'color'			: '#eee',
			'fontSize'		: '64px',
			'textAlign'		: 'center',
			'lineHeight'	: this.options['height']+'px',
			'margin'		: 'auto auto auto auto',
			'textShadow'	: '0px 0px 15px #222'
		});
		this.ui.overlay.appendChild(this.ui.overlayPlayButton);
		this.ui.playerContainer.appendChild(this.ui.overlay);
		goog.events.listen(this.ui.overlay, 'mousemove', goog.bind(this.play, this));
		goog.events.listen(this.ui.overlay, 'click', goog.bind(this.play, this));




	}



/*

	// Below is an implementation of the Fullscreen API
	// Removed until it's had longer in the oven

	initaliseFullScreen: function () {

		// setup event listeners
		var fullScreenEnter = goog.bind(this.fullScreenEnter, this);
		var fullScreenExit = goog.bind(this.fullScreenExit, this);
		
		document.addEventListener("fullscreenchange", function () {
			if (document.fullscreen) fullScreenEnter();
			else fullScreenExit()
		}, false);

		document.addEventListener("mozfullscreenchange", function () {
		    if (document.mozFullScreen)fullScreenEnter();
			else fullScreenExit()
		}, false);

		document.addEventListener("webkitfullscreenchange", function () {
		   if (document.webkitIsFullScreen) fullScreenEnter();
			else fullScreenExit()
		}, false);
	},

	fullScreenEnter: function () {

	},

	fullScreenExit: function () {

			goog.dom.setProperties(this.ui.canvas, {
				'width':this.options['width'],
				'height':this.options['height']
			});
	},

	startFullScreen: function () {

		goog.dom.classes.add(this.ui.canvas, 'fullscreen');

		if (this.ui.canvas['requestFullscreen']) this.ui.canvas['requestFullscreen']();
		else if (this.ui.canvas['mozRequestFullScreen']) this.ui.canvas['mozRequestFullScreen']();
		else if (this.ui.canvas['webkitRequestFullScreen']) this.ui.canvas['webkitRequestFullScreen']();
		else if (this.ui.canvas['msRequestFullScreen']) this.ui.canvas['msRequestFullScreen']();

		var vpSize = goog.dom.getViewportSize();

		goog.dom.setProperties(this.ui.canvas, {
			'width':vpSize.width,
			'height':vpSize.height
		});

	},

	*/
};