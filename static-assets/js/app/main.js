define(['./selector', './preloader', './events', './pages', './nav'], function(Selector, Preloader, Events, Pages, Nav) {
	'use strict';
	var S = Selector.selector;
	var W = Selector.w;
	var Main = Main || {};
	
	Events.addToWindow('resize', Pages.setAllHeightsWidths);

	return { 
		init : function() {
			Preloader.init(function(){
				Pages.setAllHeightsWidths();
			});
		}
	};
});