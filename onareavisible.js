(function(global, document)
{
	"use strict";

	/**
	* execute function only when a DOM element is in the viewport. Useful for lazy loading
	* dependancies on jQuery and underscore.js
	* @param $container the DOM element to monitor : once in the viewport, the callback method is called
	* @param fCallback the method that will be fired
	* @param iTopOffset number of pixels before the element is visible for the method to be call. Defaults to 100
	* USAGE :
	*	// will execute the init method only when the above the fold line is not far from 200 pixels
	*	onAreaVisible( $('#myId'), MY.plugin.init, 200);
	*/
	global.onAreaVisible = function($container, fCallback, iTopOffset) {
		// check at least once the dependancies : jQuery and underscore.js
		if(!global.$ || !global._)
			throw new TypeError('global.onAreaVisible requires jQuery and underscore.js');
		// shortcuts : jQuery version of the DOM elements
		var $window = $(window),
			$document = $(document),
			aWatchables = []; // the queue
		// do not check too often, 100ms seems reasonable
		var	checkDisplayable = _.throttle(function() {
				var iScrollBottom = $document.scrollTop() + $window.height();
				//console.log(aWatchables);
				// remove from the array as soon as the element is visible
				aWatchables = _.reject(aWatchables, function( element ) {
					// check the DOM element offset positions ...
					if(iScrollBottom > (element.$container.offset().top - element.iTopOffset )) {
						// ... and fire the callback if they are soon visible
						setTimeout(element.fCallback, 0);
						return true;
					}
					return false;
				});
			}, 100);
		// listen once and for all the global scroll event
		$window.on('scroll', checkDisplayable );

		// overwrite and execute the real core of the function
		global.onAreaVisible = function onAreaVisible($container, fCallback, iTopOffset) {
			
			if(typeof iTopOffset === 'undefined')
				iTopOffset = 100;//  default value
			if( !_.isFunction( fCallback ) )
				throw new TypeError('Provide a callback function');
			if( !_.isNumber( iTopOffset ) )
				throw new TypeError('Provide a valid Number');
			if( _.isElement($container) ) // transform to jQuery  if a DOM element was given
				$container = $($container);
			if( !_.isElement( $container.get()[0] ) ) // missing target
				throw new TypeError('Could not find $container in the DOM');
			// fill the configuration array
			aWatchables.push( {
				$container:$container,
				iTopOffset: iTopOffset,
				fCallback: fCallback
			});
			// immediately check for the visibility of the element
			checkDisplayable();
		};
		global.onAreaVisible($container, fCallback, iTopOffset);
	};
	
})(this.YOUR_NAMESPACE || this, document);