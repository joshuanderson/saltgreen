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
	var overlays = S("*[data-overlay]", true);
	var overlayBg = S('#overlay-background');
	Events.addToElement(overlayBg, 'click', function() {
		overlayBg.className = 'hidden';
		W.setTimeout(function() {
			overlayBg.style.display = 'none';
		}, 1000);
	})
	if(overlays) {
		for(var i = 0; i < overlays.length; i++) {
			var overlay = overlays[i];
			Events.addToElement(overlay, 'click', function() {
				var overlayId = this.dataset.overlay;
				overlayBg.style.display = 'block';
				overlayBg.className = "";
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