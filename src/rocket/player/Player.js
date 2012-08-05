goog.provide('rocket.player.Player');
goog.require('goog.events');

goog.exportSymbol('RocketPlayer', rocket.player.Player);

/**
 * @constructor
 */
rocket.player.Player = function (app, options) {

	this.app		= app;
	if (!this.app)
		this.app = {
			initalise: function () { },
			run: function () { },
			pause: function () { }
		};

	this.options	= options;

	this.canvas		= undefined;
	this.ctx		= undefined;
	this.running	= false;

	this.init();

};

rocket.player.Player.prototype = {
		
	init: function () {

		this.createCanvas();
		this.createOverlay();

		// initalise the application
		this.app.initalise({
			'canvas'			: this.canvas,
			'viewportWidth'		: undefined,
			'viewportHeight'	: undefined,
			'renderCallback'	: goog.bind(this.appTicked, this)
		});

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
        playerContainer.style.position = 'relative';
        playerContainer.style.backgroundColor = '#444';
        playerContainer.style.border = '1px solid #111';
		playerContainer.style.maxWidth		= this.options.width+'px';
		playerContainer.style.margin	= '10px auto 10px auto';
		playerContainer.style.borderRadius		= '0 0 5px 5px';
        playerContainer.appendChild(this.canvas);
		
		//this.events.listen('VIEWPORT:RESIZE', this.resize, this);
        var controlBar = document.createElement("div");


		controlBar.style.backgroundColor	= '#111';
		controlBar.style.height				= '22px';
		controlBar.style.padding			= '5px';
		controlBar.style.textAlign			= 'left';

        this.playPause = document.createElement("button");

		this.playPause.style.backgroundColor	= '#ff8000';
		this.playPause.style.color				= 'rgb(255,255,255)';
		this.playPause.style.borderRadius		= '5px';
		this.playPause.style.border				= '0px';
		this.playPause.style.width				= '70px';
		this.playPause.innerHTML				= 'PLAY';
		this.playPause.style.font				= '12px Arial';
		this.playPause.style.fontWeight			= 'bold';
		this.playPause.style.marginRight		= '10px';
		this.playPause.style.cursor				= 'hand';

		goog.events.listen(this.playPause, 'click', goog.bind(this.toggle, this));

        controlBar.appendChild(this.playPause);



        var playerTitleContainer = document.createElement("span");
		playerTitleContainer.style.color	= 'rgb(180,180,180)';
		playerTitleContainer.style.font		= '12px Arial';
		playerTitleContainer.style.fontWeight		= 'bold';

        var playerTitle = document.createElement("span");

		playerTitle.style.color		= '#ff8000';
		playerTitle.style.font		= '12px Arial';
		playerTitle.innerHTML		= this.options.title.toUpperCase();
		playerTitle.style.fontWeight		= 'bold';


		playerTitleContainer.appendChild(document.createTextNode('DEMO: '));
		playerTitleContainer.appendChild(playerTitle);
        controlBar.appendChild(playerTitleContainer);



        playerContainer.appendChild(controlBar);

        var fpsContainer = document.createElement("span");
		fpsContainer.style.color	= 'rgb(180,180,180)';
		fpsContainer.style.font		= '12px Arial';
		fpsContainer.style['float']	= 'right';
        
        this.fps = document.createElement("span");
		this.fps.style.color			= '#ff8000';
		this.fps.style.font			= '12px Arial';
		this.fps.style.fontWeight	= 'bold';
		this.fps.innerHTML				= '...';

		fpsContainer.appendChild(document.createTextNode('FPS: '));
		fpsContainer.appendChild(this.fps);


        controlBar.appendChild(fpsContainer);


        playerContainer.appendChild(controlBar);



        // description
        var infoBar = document.createElement("div");


		infoBar.style.backgroundColor	= '#333';
		infoBar.style.color				= '#777';
		infoBar.style.padding			= '5px 5px 7px 5px';
		infoBar.style.textAlign			= 'left';
		infoBar.style.font				= '12px Arial';
		infoBar.style.borderRadius		= '0 0 5px 5px';
		infoBar.appendChild(document.createTextNode(this.options.description));

        playerContainer.appendChild(infoBar);

	},
	toggle: function () {

		if (!this.running) {
			
			/* run the application */
			this.app.run();
			this.overlay.style.display	= 'none';
			this.running				= true;
			demoRunning					= this.options.id;
			this.playPause.innerHTML	= 'PAUSE';

		} else {

			/* Pause the application */
			this.app.pause();
			this.overlay.style.display	= 'block';
			this.running				= false;
			this.playPause.innerHTML	= 'PLAY';
		}

	},

	appTicked: function () {
		
		var cycleData = {fps:'?'};

		this.fps.innerHTML				= (cycleData.fps?cycleData.fps:'...');

		if (this.running && demoRunning !== this.options.id) {
			this.toggle();
		}

	},
	createOverlay: function () {

        this.overlay = document.createElement("div");

		this.overlay.style.backgroundColor	= 'rgba(0,0,0,0.35)';
		this.overlay.style.width			= '100%';
		this.overlay.style.height			= this.options.height+'px';
		this.overlay.style.position			= 'absolute';
		this.overlay.style.top				= 0;
		this.overlay.style.left				= 0;
		this.overlay.style.cursor			= 'hand';

        this.playButton = document.createElement("img");
		this.playButton.src = this.options.playButton?this.options.playButton:'img/play.png';
		this.playButton.margin = 'auto auto auto auto';

		this.overlay.appendChild(this.playButton);

        var playerContainer = document.getElementById(this.options.id);
        playerContainer.appendChild(this.overlay);

		goog.events.listen(this.overlay, 'mousemove', goog.bind(this.toggle, this));
		goog.events.listen(this.overlay, 'click', goog.bind(this.toggle, this));
	}

};
