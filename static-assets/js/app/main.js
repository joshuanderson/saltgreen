define(['./selector', './preloader', './events', './pages', './nav'], function(Selector, Preloader, Events, Pages, Nav) {
	'use strict';
	var S = Selector.selector;
	var W = Selector.w;
	var Main = Main || {};
	var Scroll = new Nav(30, null);
	var _clearOverlay = function _clearOverlay(overlay) {
		overlay.style.display = 'block';
		overlay.className = '';
	};
	var _addOverlayClass = function _addOverlayClass(overlay) {
		overlay.className = 'hidden';
	};
	var _removeOverlayStyle = function _setOverlayStyle(overlay) {
		overlay.style.display = 'none';
	};

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
	var overlays = S('*[data-overlay]', true);
	var overlayBg = S('#overlay-background');
	var overlayContact = S('#overlay-contact');
	var overlayClose = S('#overlay-contact a.close', true);
	Events.addToElements([overlayBg, overlayClose], 'click', function() {
		_addOverlayClass(overlayBg);
		_addOverlayClass(overlayContact);
		W.setTimeout(function() {
			_removeOverlayStyle(overlayContact);
			_removeOverlayStyle(overlayBg);
		}, 1000);
	});
	if(overlays) {
		for(var i = 0; i < overlays.length; i++) {
			var overlay = overlays[i];
			Events.addToElement(overlay, 'click', function() {
				var overlayId = this.dataset.overlay;
				_clearOverlay(S('#overlay-' + overlayId));
				_clearOverlay(overlayBg);
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