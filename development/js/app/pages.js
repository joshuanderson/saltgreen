define(['./selector'], function (Selector) {
	'use strict';

	var Pages = function (Selector) {
		this.selector = Selector;
		this.height = 0;
		this.width = 0;
		this.total = 0;
		this.timeout = null;
	};

	Pages.prototype.setPageHeightWidth = function (page) {
		if (typeof page === 'object') {
			var width = this.selector.w.innerWidth;
			var height = this.selector.w.innerHeight;

			page.style.minHeight = height + 'px';
			page.style.width = (width - 4) + 'px';

			this.height = height;
			this.width = width;
		}
	};

	Pages.prototype.setAllHeightsWidths = function () {
		var pages = this.selector.find('.pages');

		this.total = pages.length;

		for (var i = 0; i < this.total; i++) {
			this.setPageHeightWidth(pages[i]);
		}
	};

	return Pages;
});
