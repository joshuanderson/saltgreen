define(['./selector', './preloader', './events', './pages', './nav'], function(Selector, Preloader, Events, Pages, Nav) {
	'use strict';
	var S = Selector.selector;
	var W = Selector.w;
	var Main = Main || {};
	var Scroll = new Nav(30, null);
	Events.addToWindow('resize', Pages.setAllHeightsWidths);
	var menuItems = S(".menu-item");

	if(menuItems) {
		for(var i = 0; i < menuItems.length; i++) {
			var menuItem = menuItems[i];
			Events.addToElement(menuItem, 'click', function() {
				var pageId = this.dataset.page;
				if(pageId) {
					Scroll.anim(pageId);
				}
			});
		}
	}

	return { 
		init : function() {
			Preloader.init(function(){
				Pages.setAllHeightsWidths();
			});
		}
	};
});