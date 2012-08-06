<pre>
 ____            _        _   ____  _                       
|  _ \ ___   ___| | _____| |_|  _ \| | __ _ _   _  ___ _ __ 
| |_) / _ \ / __| |/ / _ \ __| |_) | |/ _` | | | |/ _ \ '__|
|  _ ( (_) | (__|   (  __/ |_|  __/| | (_| | |_| |  __/ |
|_| \_\___/ \___|_|\_\___|\__|_|   |_|\__,_|\__, |\___|_|
 HTML5 CANVAS PLAYER BY ROCKETWARE           |___/

</pre>

RocketPlayer is a lightweight HTML5 application player. It provides a front-end for JavaScript applications, intended use case is for developers wanting a quick uniformed inteface for testing html5 demos or embedding them in blog posts etc. Allows multiple instances per page, scaling (including responsive designs), auto-play and more. Developed using Closure Library & compiled with Closure Compiler.

 * Open Source, MIT Licence
 * Copyright James A. Forrester-Fellowes
 * www.rocketware.co.uk


# RocketPlayer documentation

In order for your application to be compatible with RocketPlayer is must implement a few mandatory methods which is how RocketPlayer communicates with your application. 

When RocketPlayer is instantiated it first creates a canvas element which it then passes to your application. It then calls your applications run() and pause() in response to user input. Your application can implement optional methods which allows RocketPlayer to show a preview of the application before it runs, or tell the user the applications current frames per second.


## Integrate with your application

Below is a list of the methods your application needs to implement to be compatible with RocketPlayer. Your application should start in paused mode and await run() to be called.

	* initalise([object] options) : initial setup
		* canvas: the canvas DOM element your application should render to
		* viewportWidth & viewportHeight: current dimensions of the viewport
		* renderCallback: callback for your application to optionally call after rendering each frame (used to calculate FPS)
	* run() : run the application;
	* pause() : pause the application;

Note: If you would like to display a preview frame in the player (shown before the user has clicked play), you should render a single frame to the canvas element after initalise is called.


## Instantiate RocketPlayer

Below is an example of how you would instantiate RocketPlayer & your application.

```
<div id="test1"></div>
<script>
test1 = new RocketPlayer(

	/* replace with your application object */
	new ExampleApplication (),

	/* RocketPlayer configuration options */
	{
		id			: 'test1',
		width		: 870,
		height		: 350,
		title		: 'Application title goes here',
		description	: 'Optional application description goes here.'
	}
);
</script>
```

## Configuration options

	* id [string]: This is should correspond to an ID used by the dom element that you want to contain your canvas element.
	* autoplay [bool]: Should the player start on page load (if another player not already running), defaults to true
	* width & height [ints]: the dimensions for your player
	* title [string]: application title
	* description [string]: application description
	* audio [bool]: enable audio controls (TODO)