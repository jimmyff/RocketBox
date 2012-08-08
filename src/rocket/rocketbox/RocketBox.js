goog.provide('rocket.rocketbox.RocketBox');

goog.require('rocket.util.Events');
goog.require('rocket.util.Timer');
goog.require('goog.events');
goog.require('goog.style');
goog.require('goog.object');

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

	// set default options
	this.options	= {
		'id'			: undefined,
		'title'			: undefined,
		'description'	: undefined,
		'autoPlay'		: true,
		'fps'			: 30,
		'width'			: 480,
		'height'		: 320
	};

	// extend default options with user options
	goog.object.extend(this.options, userOptions);

	this.canvasContext	= undefined;
	this.ui				= {};			/* collection of dom elements */

	this.dictionary = {
		overlayPlay		: '&#9658;',
		playButton		: '&#9658; PLAY',
		pauseButton		: '&#10073;&#10073; PAUSE',
		appType			: 'DEMO'
	};
	
	this.eventDictionary = {
		appTick			: 'APP:TICK',
		appPlay			: 'APP:PLAY',
		appPause		: 'APP:PAUSE'
	};

	// create the event handler
	this.events = new rocket.util.Events();

	// create the timer
	this.timer = new rocket.util.Timer({
		events		: this.events,
		fps			: this.options['fps'],
		tickEvent	: this.eventDictionary.appTick
	});

	this.init();

};

rocket.rocketbox.RocketBox.prototype = {
		
	init: function () {

		this.events.listen('APP:TICK', this.appTicked, this);

		// create the player interface
		this.createPlayerUi();

		// initalise the application
		this.app['initalise']({
			'canvas'			: this.ui.canvas,
			'canvasContext'		: this.canvasContext,
			'events'			: {
				'fire'				: goog.bind(this.events.fire,this.events), 
				'listen'			: goog.bind(this.events.listen,this.events)
			},
			'viewportWidth'		: undefined,
			'viewportHeight'	: undefined,
			'renderCallback'	: goog.bind(this.appTicked, this)
		});

		// check if the application wants to autoplay
		if (window.rocketPlayerAppId === undefined && this.options['autoPlay'])
			this.play({animateOverlay:false});

	},

	toggle: function () {
	
		if (!this.timer.running) this.play();
		else this.pause();
	
	},

	play: function (options) {

		if (this.timer.running) return;

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

	appTicked: function (cycleData) {
	
		this.ui.fps.innerHTML = (cycleData['fps']?cycleData['fps']:'...');

		if (this.timer.running && window.rocketPlayerAppId !== this.options['id'])
			this.pause();
	},

	createPlayerUi: function () {

		/* Create Player Container */
		this.ui.playerContainer = goog.dom.createDom('div');
		goog.style.setStyle(this.ui.playerContainer, {
			'position'			: 'relative',
			'backgroundColor'	: '#444',
			'border'			: '1px solid #111',
			'maxWidth'			: this.options['width']+'px',
			'margin'			: '10px auto 10px auto',
			'borderRadius'		: '0 0 5px 5px'
		});

		// attach container to user referenced dom node
		var rootContainer = document.getElementById(this.options['id']);
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
		this.ui.playerContainer.appendChild(this.ui.canvas);
		

		/* Save Canvas Context */
		if (!this.ui.canvas.getContext) {
			// handle browser support issue... rollback to flash?
			// this.events.fire('LOG',"Browser not supported");
			throw "Failed to create canvas element";
		}
		this.canvasContext = this.ui.canvas.getContext('2d');
		


		/* Create Control Bar */
		this.ui.controlBar = goog.dom.createDom('div');
		goog.style.setStyle(this.ui.controlBar, {
			'backgroundColor'	: '#111',
			'height'			: '22px',
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
			'cursor'			: 'hand'
		});
		goog.events.listen(this.ui.playPauseButton, 'click', goog.bind(this.toggle, this));
		this.ui.controlBar.appendChild(this.ui.playPauseButton);



		/* Application Title */
		this.ui.playerTitle = goog.dom.createDom('span');
		this.ui.playerTitle.innerHTML = this.options['title'].toUpperCase();
		goog.style.setStyle(this.ui.playerTitle, {
			'color'		: '#ff8000',
			'font'		: '12px Arial',
			'fontWeight': 'bold'
		});

		/* Application Title Container */
		this.ui.playerTitleContainer = goog.dom.createDom('span');
		goog.style.setStyle(this.ui.playerTitleContainer, {
			'color'		: 'rgb(180,180,180)',
			'font'		: '12px Arial',
			'fontWeight': 'bold'
		});
		this.ui.playerTitleContainer.appendChild(document.createTextNode(this.dictionary.appType+': '));
		this.ui.playerTitleContainer.appendChild(this.ui.playerTitle);
		this.ui.controlBar.appendChild(this.ui.playerTitleContainer);



		/* Create FPS span */
		this.ui.fps = goog.dom.createDom('span');
		this.ui.fps.innerHTML				= '...';
		goog.style.setStyle(this.ui.fps, {
			'color'			: '#ff8000',
			'font'			: '12px Arial',
			'fontWeight'	: 'bold'
		});


		/* Create FPS container */
		this.ui.fpsContainer = goog.dom.createDom('span');
		goog.style.setStyle(this.ui.fpsContainer, {
			'color'		: 'rgb(180,180,180)',
			'font'		: '12px Arial',
			'float'		: 'right'
		});
		this.ui.fpsContainer.appendChild(document.createTextNode('FPS: '));
		this.ui.fpsContainer.appendChild(this.ui.fps);
		this.ui.controlBar.appendChild(this.ui.fpsContainer);


		// add control bar to Player
		this.ui.playerContainer.appendChild(this.ui.controlBar);



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
		this.ui.playerContainer.appendChild(this.ui.infoBar);


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
		this.ui.playButton = goog.dom.createDom('div');
		this.ui.playButton.innerHTML = this.dictionary.overlayPlay;
		goog.style.setStyle(this.ui.playButton, {
			'color'			: '#eee',
			'fontSize'		: '64px',
			'textAlign'		: 'center',
			'lineHeight'	: this.options['height']+'px',
			'margin'		: 'auto auto auto auto',
			'textShadow'	: '0px 0px 15px #222'
		});
		this.ui.overlay.appendChild(this.ui.playButton);
		this.ui.playerContainer.appendChild(this.ui.overlay);
		goog.events.listen(this.ui.overlay, 'mousemove', goog.bind(this.play, this));
		goog.events.listen(this.ui.overlay, 'click', goog.bind(this.play, this));

	}

};