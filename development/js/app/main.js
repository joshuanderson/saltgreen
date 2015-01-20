define([
	'./selector',
	'./preloader',
	'./events',
	'./pages',
	'./nav'
	], function (Selector, Preloader, Events, Pages, Nav) {
		'use strict';

		var Main = function (Selector, Preloader, Events, Pages, Nav) {
			this.selector = new Selector();
			this.preloader = new Preloader(this.selector);
			this.events = new Events(this, this.selector);
			this.pages = new Pages(this.selector)
			this.nav = new Nav(this.selector, 30, null);
		};

		Main.prototype._isArray = function (array) {
			return !!array.length || false;
		};

		Main.prototype._clearOverlay = function (overlay) {
			overlay.style.display = 'block';
			overlay.className = '';
		};

		Main.prototype._addOverlayClass = function (overlay) {
			if (this._isArray(overlay)) {
				for (var i = 0; i < overlay.length; i++) {
					overlay[ i ].className = 'hidden';
				}
			} else {
				overlay.className = 'hidden';
			}
		};

		Main.prototype._removeOverlayStyle = function (overlay) {
			if (this._isArray(overlay)) {
				for (var i = 0; i < overlay.length; i++) {
					overlay[ i ].style.display = 'none';
				}
			} else {
				overlay.style.display = 'none';
			}
		};

		Main.prototype.addPageResizeEvents = function () {
			var self = this;
			this.events.addToWindow('resize', function () {
				self.pages.setAllHeightsWidths();
			});
		};

		Main.prototype.addMenuItemsEvents = function () {
			var menuItems = this.selector.find(".menu-item");
			var self = this;
			var menuItem, pageId;

			if (menuItems) {
				for (var j = 0; j < menuItems.length; j++) {
					menuItem = menuItems[j];

					this.events.addToElement(menuItem, 'click', function () {
						pageId = this.dataset.page;

						if (pageId) {
							self.nav.anim('#' + pageId);
						}
					});
				}
			}
		};

		Main.prototype.addCloseOverlayEvents = function () {
			var overlayBg = this.selector.find('#overlay-background');
			var overlayContact = this.selector.find('#overlay-contact');
			var overlayTestimonials = this.selector.find('#overlay-testimonials');
			var overlayClose = this.selector.find('#overlay-contact a.close', true);
			var self = this;

			this.events.addToElements([ overlayBg, overlayClose ], 'click', function () {
				self._addOverlayClass([ overlayBg, overlayContact, overlayTestimonials ]);

				self.selector.w.setTimeout(function () {
					self._removeOverlayStyle([ overlayContact, overlayBg, overlayTestimonials ]);
				}, 2000);

			});
		};


		Main.prototype.addMobileMenuEvents = function () {
			var mobileMenu = this.selector.find('.mobile-menu');
			var self = this;

			this.events.addToElements(mobileMenu, 'click', function () {
				var mobileMenu = self.selector.find('#mobile-menu');

				if (mobileMenu.className === 'on') {
					mobileMenu.className = '';
				} else {
					mobileMenu.className = 'on';
				}
			});
		};


		Main.prototype.addOverlayEvents = function () {
			var overlays = this.selector.find('*[data-overlay]', true);
			var overlayBg = this.selector.find('#overlay-background');
			var self = this;
			var overlay, overlayId;

			if (overlays) {
				for (var i = 0; i < overlays.length; i++) {
					overlay = overlays[ i ];

					this.events.addToElement(overlay, 'click', function () {
						overlayId = this.dataset.overlay;

						self._clearOverlay(self.selector.find('#overlay-' + overlayId));
						self._clearOverlay(overlayBg);
					});
				}
			}
		};

		Main.prototype.init = function () {
			var self = this;
			this.preloader.preloadImages(function() {
				self.pages.setAllHeightsWidths();
				self.addPageResizeEvents();
				self.addMenuItemsEvents();
				self.addCloseOverlayEvents();
				self.addOverlayEvents();
				self.addMobileMenuEvents();
			});
		};

		return Main;
	});
