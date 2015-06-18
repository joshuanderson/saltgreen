import Selector from './selector';

class Preloader {

	constructor () {
		this._selector = new Selector();
		this._totalImagesLoaded = 0;
		this._imagesToLoad = [
			'loading.gif',
			'arrow.png',
			'contact-logos.png',
			'intro-background.jpg',
			'logo-intro-bar.png',
			'logo-intro-mobile.png',
			'logo-transparent.png',
			'logo-white.png',
			'projects-background.jpg',
			'projects-title.png',
			'saltgreen-logo-114.png',
			'saltgreen-logo-160.png',
			'saltgreen-logo-57.png',
			'saltgreen-logo-72.png',
			'small-left-hand-logo.png',
			'welcome-background.jpg',
			'welcome-title.png',
			'what-we-do-background.jpg',
			'what-we-do-mobile-background.jpg',
			'what-we-do-title.png'
		];
		this._imagesLoadedList = [];
		this._totalImages = this._imagesToLoad.length;
		this._seconds = 1000;
		this._finished = () => {};
	}

	resetDivDisplay () {
		this._selector.find('#loading-overlay').style.display = 'none';
	}

	hidePreloader (callback) {
		var divs = this._selector.find('.not-loaded');
		var win = this._selector.getWindow();
		var div;

		for (var i = 0; i < divs.length; i++) {
			div = divs[i];
			div.className = 'loaded';

			callback();
			this._seconds = this._seconds + 1000;
		}
	}

	preloadImages (callback) {

		var _notifyImageLoaded = (callback) => {
			this._totalImagesLoaded++;

			if (this._totalImagesLoaded === this._totalImages) {
				this.hidePreloader(callback);
			}
		}

		for (var i = 0; i < this._totalImages; i++) {
			this._imagesLoadedList[i] = new Image();
			this._imagesLoadedList[i].src = 'static-assets/img/' + this._imagesToLoad[i];
			this._imagesLoadedList[i].onload = _notifyImageLoaded.call(this, callback);
		}
	}
}

export default Preloader;
