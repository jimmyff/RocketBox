<pre>
  ____            _        _   ____            
 |  _ \ ___   ___| | _____| |_| __ )  _____  __
 | |_) / _ \ / __| |/ / _ \ __|  _ \ / _ \ \/ /
 |  _ ( (_) | (__|   (  __/ |_| |_) | (_) )  ( 
 |_| \_\___/ \___|_|\_\___|\__|____/ \___/_/\_\
  * * *  HTML5 APP TOOLKIT BY ROCKETWARE  * * *

</pre>
                                           

RocketBox is a HTML5 application toolkit. This project has been developed to simplify the process of creating a HTML5 applications. Features include: 

 * Front-end player & UI for canvas based applications
 * Events system
 * Render loop timer 
 * Debug & logging system
 * Supports multiple apps per page

Features in the pipeline:

 * Input handling (mouse, keyboard & touch)
 * Audio player & interface controls
 * HTML based interface system
 * Facebook connect authentication
 * Highscore/Leaderboards API (server script too maybe)

RocketBox is developed with Closure Library and compiled with Closure Compiler.

 * Open Source, MIT Licence
 * Copyright James A. Forrester-Fellowes
 * www.rocketware.co.uk

---

# RocketBox Documentation

Below is the guide to integrate your application with RocketBox.

## Integrate with your application

Your application should wait for the initialise method to be called. RocketBox passes your application a setup object which among other things contains the events handler. Communication between your application and RocketBox is then done via the events system. Your application should subscribe it's 'main loop' to the 'APP:TICK' event and wait for this to be called.

### initalise([object] options) : initial setup

Passes the setup object to your application. The setup object contains:

	* canvas : Your Canvas DOM Element
	* canvasContext : the Canvas 2D Context
	* events : The event object
		* fire(eventName, data) :
		* listen(eventName, callback, context) : 
	* viewportWidth & viewportHeight: current dimensions of the viewport
	* renderCallback: callback for your application to optionally call after rendering each frame (used to calculate FPS)
	
Note: If you would like to display a preview frame in the player (shown before the user has clicked play), you should render a single frame to the canvas element after initalise is called.

### Events

	* APP:TICK
		* This is the main event, you should call your 'main app/game loop' when this event fires. It passes an object as a parameter which includes useful information:
			* dt [int] : delta time, this it the time milliseconds since the last tick
			* counter [float] : this is the number of seconds your application has been running
			* fps [float] : the fps average
	* APP:PLAY
		* This is fired when the application is played, you do not need to do act on this event as the APP:TICK event will start firing. This event is fired incase you want to utilise this information in someway.
	* APP:PAUSE
		* This is fired when the application is paused, like above you do not need to listen or act on this event, it's additional information.


## Instantiate RocketBox

Below is an example of how you would instantiate RocketBox & your application.

```
<div id="exampleApp"></div>
<script>
test1 = new RocketBox(

	/* replace with your application object */
	new ExampleApplication (),

	/* RocketBox configuration options */
	{
		id			: 'exampleApp',
		width		: 720,
		height		: 350,
		fps			: 30,
		title		: 'Application title goes here',
		description	: 'Optional application description goes here.'
	}
);
</script>
```

## Configuration options

	* id [string]: This is should correspond to an ID used by the dom element that you want to contain your canvas element.
	* autoplay [bool]: Should the app start on page load (if another app not already running), defaults to true
	* fps [int]: Your apps desired frames per second
	* width & height [ints]: the dimensions for your player
	* title [string]: application title
	* description [string]: application description