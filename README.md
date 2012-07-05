onAreaVisible
=============

efficient JS Snippet used to be warned when a DOM element is about to be seen by the user, for progressive enhancement and performance boost. Dependancies on jQuery (you have it) and underscore.js (you really should have it)

Usage

<div id="taking-space">Scroll down ↓</div>
<div id="container">Should not see me</div>
<script>
	window.onAreaVisible(
		$('#container'), // that DOM element will be enhanced only when visible
		function() {
			// scope is window
			// no arguments given

			// here goes your init method
			$('#container').html('enhanced DOM element')
		},
		100 // run the method 100 pixel before seeing the element
	);
</script>