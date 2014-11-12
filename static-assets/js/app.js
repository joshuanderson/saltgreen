(function(){
	'use strict';
	requirejs.config({
	    baseUrl: 'static-assets/js/',
	    urlArgs: 't=' +  (new Date()).getTime(),
	    paths: {
	        app: 'app'
	    }
	});
	requirejs([
		'app/main', 
		'app/preloader', 
		'app/events', 
		'app/selector', 
		'app/pages', 
		'app/nav'
	], function(Main, Preloader, Events, Selector, Pages, Nav){
		Main.init();
	});
})();