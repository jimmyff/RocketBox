goog.provide('rocket.player.Player');

goog.require('goog.events');
goog.require('goog.style');
goog.require('goog.object');
goog.require('goog.fx.dom.FadeInAndShow');
goog.require('goog.fx.dom.FadeOutAndHide');

goog.exportSymbol('RocketPlayer', rocket.player.Player);

/**
 * @constructor
 */
rocket.player.Player = function (app, userOptions) {

	this.app		= app;
	if (!this.app)
		this.app = {
			'initalise': function () { },
			'run': function () { },
			'pause': function () { }
		};

	// default options
	this.options	= {
		'id'			: undefined,
		'title'			: undefined,
		'description'	: undefined,
		'autoPlay'		: true,
		'width'			: 480,
		'height'		: 320
	};

	// extend default options with user options
	goog.object.extend(this.options, userOptions);


	this.canvas		= undefined;
	this.ctx		= undefined;
	this.running	= false;

	this.dictionary = {
		overlayPlay		: '&#9658;',
		playButton		: '&#9658; PLAY',
		pauseButton		: '&#10073;&#10073; PAUSE',
		appType			: 'DEMO'
	};

	this.init();


};

rocket.player.Player.prototype = {
		
	init: function () {

		this.createCanvas();
		this.createOverlay();

		// initalise the application
		this.app['initalise']({
			'canvas'			: this.canvas,
			'canvasCtx'			: this.ctx,
			'viewportWidth'		: undefined,
			'viewportHeight'	: undefined,
			'renderCallback'	: goog.bind(this.appTicked, this)
		});

		if (window.rocketPlayerAppId === undefined && this.options['autoPlay']) this.play({animateOverlay:false});

	},

	createCanvas: function () {

        this.canvas = document.createElement("canvas");

        if (!this.canvas.getContext) {
//			this.events.fire('LOG',"Failed to create canvas element");
            throw "Failed to create canvas element";
        }

        this.ctx = this.canvas.getContext('2d');

		this.canvas.id		= this.options.id+'_canvas';
		this.canvas.width	= this.options.width;
		this.canvas.height	= this.options.height;

		this.canvas.style.width = '100%';
        
        // add canvas to body
        var playerContainer = document.getElementById(this.options.id);

       goog.style.setStyle(playerContainer, {
			'position'			: 'relative',
			'backgroundColor'	: '#444',
			'border'			: '1px solid #111',
			'maxWidth'			: this.options.width+'px',
			'margin'			: '10px auto 10px auto',
			'borderRadius'		: '0 0 5px 5px'
		});

        playerContainer.appendChild(this.canvas);
		
		//this.events.listen('VIEWPORT:RESIZE', this.resize, this);
        var controlBar = document.createElement("div");


       goog.style.setStyle(controlBar, {
			'backgroundColor'	: '#111',
			'height'			: '22px',
			'padding'			: '5px',
			'textAlign'			: 'left'
		});

        this.playPause = document.createElement("button");
		this.playPause.innerHTML = this.dictionary.playButton;

		goog.style.setStyle(this.playPause, {
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

		goog.events.listen(this.playPause, 'click', goog.bind(this.toggle, this));

        controlBar.appendChild(this.playPause);



        var playerTitleContainer = document.createElement("span");
		playerTitleContainer.style.color	= 'rgb(180,180,180)';
		playerTitleContainer.style.font		= '12px Arial';
		playerTitleContainer.style.fontWeight		= 'bold';

        var playerTitle = document.createElement("span");
		playerTitle.innerHTML		= this.options.title.toUpperCase();

		goog.style.setStyle(playerTitle, {
			'color'		: '#ff8000',
			'font'		: '12px Arial',
			'fontWeight': 'bold'
		});

		playerTitleContainer.appendChild(document.createTextNode(this.dictionary.appType+': '));
		playerTitleContainer.appendChild(playerTitle);
        controlBar.appendChild(playerTitleContainer);



        playerContainer.appendChild(controlBar);

        var fpsContainer = document.createElement("span");
		goog.style.setStyle(fpsContainer, {
			'color'		: 'rgb(180,180,180)',
			'font'		: '12px Arial',
			'float'		: 'right'
		});

        this.fps = document.createElement("span");
		this.fps.innerHTML				= '...';
		goog.style.setStyle(this.fps, {
			'color'			: '#ff8000',
			'font'			: '12px Arial',
			'fontWeight'	: 'bold'
		});


		fpsContainer.appendChild(document.createTextNode('FPS: '));
		fpsContainer.appendChild(this.fps);


        controlBar.appendChild(fpsContainer);


        playerContainer.appendChild(controlBar);



        // description
        var infoBar = document.createElement("div");

       goog.style.setStyle(infoBar, {
			'backgroundColor'	: '#333',
			'color'				: '#777',
			'padding'			: '5px 5px 7px 5px',
			'textAlign'			: 'left',
			'font'				: '12px Arial',
			'borderRadius'		: '0 0 5px 5px'
		});

		infoBar.appendChild(document.createTextNode(this.options.description));

        playerContainer.appendChild(infoBar);

	},
	play: function (options) {

		if (!this.running) this.toggle(options);

	},
	toggle: function (options) {

		if (!options) options = {};

		if (!this.running) {
			
			/* run the application */
			this.app['run']();
			this.running				= true;
			window.rocketPlayerAppId	= this.options.id;
			this.playPause.innerHTML	= this.dictionary.pauseButton;

			// hide overlay
			if (typeof options.animateOverlay == 'boolean' && options.animateOverlay == false) {
				goog.style.setOpacity(this.overlay, 0);
				goog.style.showElement(this.overlay, false);
			} else {
				var anim = new goog.fx.dom.FadeOutAndHide(this.overlay, 150);
				anim.play();
			}
			

		} else {

			/* Pause the application */
			this.app['pause']();
			this.running				= false;
			this.playPause.innerHTML	= this.dictionary.playButton;

			// show overlay
			if (typeof options.animateOverlay == 'boolean' && options.animateOverlay == false) {
				goog.style.setOpacity(this.overlay, 1);
				goog.style.showElement(this.overlay, true);
			} else {
				var anim = new goog.fx.dom.FadeInAndShow(this.overlay, 200);
				anim.play();
			}
		}

	},

	appTicked: function () {
		
		var cycleData = {fps:'?'};

		this.fps.innerHTML				= (cycleData.fps?cycleData.fps:'...');

		if (this.running && window.rocketPlayerAppId !== this.options.id) {
			this.toggle();
		}

	},
	createOverlay: function () {

        this.overlay = document.createElement("div");

       goog.style.setStyle(this.overlay, {
			'backgroundColor'	: 'rgba(0,0,0,0.35)',
			'width'				: '100%',
			'height'			:  this.options.height+'px',
			'position'			: 'absolute',
			'top'				: 0,
			'left'				: 0,
			'cursor'			: 'hand'
        });


       // playButton image specified?
		if (this.options.playButton) {
			this.playButton = document.createElement("img");
			this.playButton.src = this.options.playButton?this.options.playButton:'img/play.png';
			this.playButton.margin = 'auto auto auto auto';
		
		} else {
			this.playButton = document.createElement("div");
			this.playButton.innerHTML = this.dictionary.overlayPlay;
		
			goog.style.setStyle(this.overlay, {
				'color'			: '#eee',
				'fontSize'		: '64px',
				'textAlign'		: 'center',
				'lineHeight'	: this.options.height+'px',
				'margin'		: 'auto auto auto auto',
				'textShadow'	: '0px 0px 15px #222'
			});
			

		}
		this.overlay.appendChild(this.playButton);

        var playerContainer = document.getElementById(this.options.id);
        playerContainer.appendChild(this.overlay);

		goog.events.listen(this.overlay, 'mousemove', goog.bind(this.play, this));
		goog.events.listen(this.overlay, 'click', goog.bind(this.play, this));
	}

};
