import Selector from './selector';

class Pages {

	constructor () {
		this._selector = new Selector();
		this._height = 0;
		this._width = 0;
		this.total = 0;
		this.timeout = null;
	};

	setPageHeightWidth (page) {
		if (typeof page === 'object') {
			var {
				innerWidth: width,
				innerHeight: height
			} = this._selector.getWindow();

			page.style.minHeight = height + 'px';
			page.style.width = (width - 4) + 'px';

			this._height = height;
			this._width = width;
		}
	}

	setAllHeightsWidths () {
		var pages = this._selector.find('.pages');

		this.total = pages.length;

		for (var i = 0; i < this.total; i++) {
			this.setPageHeightWidth(pages[i]);
		}
	}

}

export default Pages;
