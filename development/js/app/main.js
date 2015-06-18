import Selector from './selector';
import Preloader from './preloader';
import Events from './events';
import Pages from './pages';
import Nav from './nav';

class Main {

		constructor () {
			this._selector = new Selector();
			this._preloader = new Preloader();
			this._events = new Events(this._isArray);
			this._pages = new Pages();
			this._nav = new Nav(30, null);

			this._preloader.preloadImages(() => {
				this._pages.setAllHeightsWidths();
				this.addPageResizeEvents();
				this.addMenuItemsEvents();
				this.addCloseOverlayEvents();
				this.addOverlayEvents();
				this.addMobileMenuEvents();
				this.checkHash();
			});
		}

		_isArray (array) {
			return !!array.length || false;
		}

		_clearOverlay (overlay) {
			overlay.style.display = 'block';
			overlay.className = '';
		}

		_addOverlayClass (overlay) {
			if (this._isArray(overlay)) {
				for (var i = 0; i < overlay.length; i++) {
					overlay[ i ].className = 'hidden';
				}
			} else {
				overlay.className = 'hidden';
			}
		}

		_removeOverlayStyle (overlay) {
			if (this._isArray(overlay)) {
				for (var i = 0; i < overlay.length; i++) {
					overlay[ i ].style.display = 'none';
				}
			} else {
				overlay.style.display = 'none';
			}
		}

		addPageResizeEvents () {
			this._events.addToWindow('resize', () => {
				this._pages.setAllHeightsWidths();
			});
		}

		addMenuItemsEvents () {
			var menuItems = this._selector.find(".menu-item");
			var animateNavigation = (event) => {
				var { dataset, innerHTML } = event.srcElement;

				pageId = dataset.page;

				console.log(pageId);

				if (pageId) {
					this._nav.anim('#' + pageId);

					if (ga) {
						ga('send', 'pageview', { title: innerHTML });
					}
				}
			};
			var menuItem, pageId;

			if (menuItems) {
				for (var j = 0; j < menuItems.length; j++) {
					menuItem = menuItems[j];

					this._events.addToElement(menuItem, 'click', animateNavigation);
				}
			}
		}

		addCloseOverlayEvents () {
			var overlayBg = this._selector.find('#overlay-background');
			var overlayContact = this._selector.find('#overlay-contact');
			var overlayTestimonials = this._selector.find('#overlay-testimonials');
			var overlayClose = this._selector.find('#overlay-contact a.close', true);


			this._events.addToElements([ overlayBg, overlayClose ], 'click', () => {
				this._addOverlayClass([ overlayBg, overlayContact, overlayTestimonials ]);
				this.resetHash();
				this._selector.w.setTimeout(() => {
					this._removeOverlayStyle([ overlayContact, overlayBg, overlayTestimonials ]);
				}, 2000);

			});
		}


		addMobileMenuEvents () {
			var mobileMenu = this._selector.find('.mobile-menu');


			this._events.addToElements(mobileMenu, 'click', () => {
				var mobileMenu = this._selector.find('#menu');

				if (mobileMenu.className === 'on') {
					mobileMenu.className = '';
				} else {
					mobileMenu.className = 'on';
				}
			});
		}

		addOverlayEvents () {
			var overlays = this._selector.find('*[data-overlay]', true);
			var overlayBg = this._selector.find('#overlay-background');
			var clearOverlay = () => {
				overlayId = this.dataset.overlay;

				this._clearOverlay(this._selector.find('#overlay-' + overlayId));
				this._clearOverlay(overlayBg);
			};
			var overlay, overlayId;

			if (overlays) {
				for (var i = 0; i < overlays.length; i++) {
					overlay = overlays[ i ];

					this._events.addToElement(overlay, 'click', clearOverlay);
				}
			}
		}

		checkHash () {
			var hash = location.hash;
			var object;

			if (hash === '') {
				this.resetHash();
			} else {
				object = this._selector.find('a[href="' + hash + '"]', true);
				if (this._isArray(object)) {
					object[0].click();
				}

			}
		}

		resetHash () {
			location.hash = '#/home';
		}
}

export default Main;
