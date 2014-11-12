define(['./selector'], function(Selector) {
	'use strict';

	var W = Selector.w;
	var S = Selector.selector;
	var Pages = Pages || {};

	Pages.height = 0;
	Pages.width = 0;
	Pages.total = 0;
	Pages.timeout = null;

	var setPageHeightWidth = function setPageHeightWidth(page) {
		if(typeof page === 'object') {
			var width = W.innerWidth;
			var height = W.innerHeight;
			page.style.minHeight = height + 'px';
			page.style.width = (width - 4) + 'px';
			Pages.height = height;
			Pages.width = width;
		}
	};

	var setAllHeightsWidths = function setAllHeightsWidths() {
		var pages = S('.pages');
		Pages.total = pages.length;
		for(var i = 0; i < Pages.total; i++) {
			setPageHeightWidth(pages[i]);
		}
	};
	return {
		'setAllHeightsWidths' : setAllHeightsWidths
	};
});