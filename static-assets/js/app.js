(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _appMain = require('./app/main');

var _appMain2 = _interopRequireDefault(_appMain);

var main = new _appMain2['default']();

},{"./app/main":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _selector = require('./selector');

var _selector2 = _interopRequireDefault(_selector);

var _main = require('./main');

var _main2 = _interopRequireDefault(_main);

var Events = (function () {
	function Events(isArray) {
		_classCallCheck(this, Events);

		this._selector = new _selector2['default']();
		this._isArray = isArray;
	}

	_createClass(Events, [{
		key: 'add',
		value: function add(elem, type, eventHandle) {
			if (elem === null || typeof elem === 'undefined') {
				return;
			}

			if (elem.addEventListener) {
				elem.addEventListener(type, eventHandle, false);
			} else if (elem.attachEvent) {
				elem.attachEvent('on' + type, eventHandle);
			} else {
				elem['on' + type] = eventHandle;
			}
		}
	}, {
		key: 'addToWindow',
		value: function addToWindow(type, callback) {
			var win = this._selector.getWindow();

			this.add(win, type, callback);
		}
	}, {
		key: 'addToDocument',
		value: function addToDocument(type, callback) {
			this.add(this.selector.d, type, callback);
		}
	}, {
		key: 'addToElement',
		value: function addToElement(element, type, callback) {
			this.add(element, type, callback);
		}
	}, {
		key: 'addToElements',
		value: function addToElements(elements, type, callback) {
			if (this._isArray(elements)) {
				for (var i = 0; i < elements.length; i++) {
					this.add(elements[i], type, callback);
				}
			}
		}
	}]);

	return Events;
})();

exports['default'] = Events;
module.exports = exports['default'];

},{"./main":3,"./selector":7}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _selector = require('./selector');

var _selector2 = _interopRequireDefault(_selector);

var _preloader = require('./preloader');

var _preloader2 = _interopRequireDefault(_preloader);

var _events = require('./events');

var _events2 = _interopRequireDefault(_events);

var _pages = require('./pages');

var _pages2 = _interopRequireDefault(_pages);

var _nav = require('./nav');

var _nav2 = _interopRequireDefault(_nav);

var Main = (function () {
	function Main() {
		var _this = this;

		_classCallCheck(this, Main);

		this._selector = new _selector2['default']();
		this._preloader = new _preloader2['default']();
		this._events = new _events2['default'](this._isArray);
		this._pages = new _pages2['default']();
		this._nav = new _nav2['default'](30, null);

		this._preloader.preloadImages(function () {
			_this._pages.setAllHeightsWidths();
			_this.addPageResizeEvents();
			_this.addMenuItemsEvents();
			_this.addCloseOverlayEvents();
			_this.addOverlayEvents();
			_this.addMobileMenuEvents();
			_this.checkHash();
		});
	}

	_createClass(Main, [{
		key: '_isArray',
		value: function _isArray(array) {
			return !!array.length || false;
		}
	}, {
		key: '_clearOverlay',
		value: function _clearOverlay(overlay) {
			overlay.style.display = 'block';
			overlay.className = '';
		}
	}, {
		key: '_addOverlayClass',
		value: function _addOverlayClass(overlay) {
			if (this._isArray(overlay)) {
				for (var i = 0; i < overlay.length; i++) {
					overlay[i].className = 'hidden';
				}
			} else {
				overlay.className = 'hidden';
			}
		}
	}, {
		key: '_removeOverlayStyle',
		value: function _removeOverlayStyle(overlay) {
			if (this._isArray(overlay)) {
				for (var i = 0; i < overlay.length; i++) {
					overlay[i].style.display = 'none';
				}
			} else {
				overlay.style.display = 'none';
			}
		}
	}, {
		key: 'addPageResizeEvents',
		value: function addPageResizeEvents() {
			var _this2 = this;

			this._events.addToWindow('resize', function () {
				_this2._pages.setAllHeightsWidths();
			});
		}
	}, {
		key: 'addMenuItemsEvents',
		value: function addMenuItemsEvents() {
			var _this3 = this;

			var menuItems = this._selector.find('.menu-item');
			var animateNavigation = function animateNavigation(event) {
				var _event$srcElement = event.srcElement;
				var dataset = _event$srcElement.dataset;
				var innerHTML = _event$srcElement.innerHTML;

				pageId = dataset.page;

				console.log(pageId);

				if (pageId) {
					_this3._nav.anim('#' + pageId);

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
	}, {
		key: 'addCloseOverlayEvents',
		value: function addCloseOverlayEvents() {
			var _this4 = this;

			var overlayBg = this._selector.find('#overlay-background');
			var overlayContact = this._selector.find('#overlay-contact');
			var overlayTestimonials = this._selector.find('#overlay-testimonials');
			var overlayClose = this._selector.find('#overlay-contact a.close', true);

			this._events.addToElements([overlayBg, overlayClose], 'click', function () {
				_this4._addOverlayClass([overlayBg, overlayContact, overlayTestimonials]);
				_this4.resetHash();
				_this4._selector.w.setTimeout(function () {
					_this4._removeOverlayStyle([overlayContact, overlayBg, overlayTestimonials]);
				}, 2000);
			});
		}
	}, {
		key: 'addMobileMenuEvents',
		value: function addMobileMenuEvents() {
			var _this5 = this;

			var mobileMenu = this._selector.find('.mobile-menu');

			this._events.addToElements(mobileMenu, 'click', function () {
				var mobileMenu = _this5._selector.find('#menu');

				if (mobileMenu.className === 'on') {
					mobileMenu.className = '';
				} else {
					mobileMenu.className = 'on';
				}
			});
		}
	}, {
		key: 'addOverlayEvents',
		value: function addOverlayEvents() {
			var _this6 = this;

			var overlays = this._selector.find('*[data-overlay]', true);
			var overlayBg = this._selector.find('#overlay-background');
			var clearOverlay = function clearOverlay() {
				overlayId = _this6.dataset.overlay;

				_this6._clearOverlay(_this6._selector.find('#overlay-' + overlayId));
				_this6._clearOverlay(overlayBg);
			};
			var overlay, overlayId;

			if (overlays) {
				for (var i = 0; i < overlays.length; i++) {
					overlay = overlays[i];

					this._events.addToElement(overlay, 'click', clearOverlay);
				}
			}
		}
	}, {
		key: 'checkHash',
		value: function checkHash() {
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
	}, {
		key: 'resetHash',
		value: function resetHash() {
			location.hash = '#/home';
		}
	}]);

	return Main;
})();

exports['default'] = Main;
module.exports = exports['default'];

},{"./events":2,"./nav":4,"./pages":5,"./preloader":6,"./selector":7}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _selector = require('./selector');

var _selector2 = _interopRequireDefault(_selector);

var Nav = (function () {
	function Nav(iterr, tm) {
		_classCallCheck(this, Nav);

		this.selector = new _selector2['default']();
		this.iterr = iterr;
		this.tm = tm;
	}

	_createClass(Nav, [{
		key: 'stopShow',
		value: function stopShow() {
			clearTimeout(this.tm);

			this.iterr = 30;
		}
	}, {
		key: 'getRealTop',
		value: function getRealTop(el) {
			var elm = el;
			var realTop = 0;

			do {
				realTop += elm.offsetTop;
				elm = elm.offsetParent;
			} while (elm);

			return realTop;
		}
	}, {
		key: 'getPageScroll',
		value: function getPageScroll() {
			var pgYoff = this.selector.w.pageYOffset || this.selector.d.body.scrollTop || this.selector.d.documentElement.scrollTop;

			return pgYoff;
		}
	}, {
		key: 'anim',
		value: function anim(id) {
			var element = this.selector.find(id) || null;
			var eOff, pOff, tOff, scrVal, pos, dir, step;
			var self = this;

			this.stopShow();

			if (element === null) {
				return;
			}

			eOff = element.offsetTop;
			tOff = this.getRealTop(element.parentNode);
			pOff = this.getPageScroll();

			if (pOff === null || isNaN(pOff) || pOff === 'undefined') {
				pOff = 0;
			}

			scrVal = eOff - pOff;

			if (scrVal < tOff) {
				pos = pOff + tOff - eOff;
				dir = -1;
			}

			if (scrVal > tOff) {
				pos = eOff - tOff - pOff;
				dir = 1;
			}

			if (scrVal !== tOff) {
				step = ~ ~(pos / 4 + 1) * dir;

				if (this.iterr > 1) {
					this.iterr -= 1;
				} else {
					this.itter = 0;
				}

				this.selector.w.scrollBy(0, step);
				this.tm = this.selector.w.setTimeout(function () {
					self.anim(id);
				}, this.iterr);
			}

			if (scrVal === tOff) {
				this.stopShow();
				return;
			}
		}
	}]);

	return Nav;
})();

exports['default'] = Nav;
module.exports = exports['default'];

},{"./selector":7}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _selector = require('./selector');

var _selector2 = _interopRequireDefault(_selector);

var Pages = (function () {
	function Pages() {
		_classCallCheck(this, Pages);

		this._selector = new _selector2['default']();
		this._height = 0;
		this._width = 0;
		this.total = 0;
		this.timeout = null;
	}

	_createClass(Pages, [{
		key: 'setPageHeightWidth',
		value: function setPageHeightWidth(page) {
			if (typeof page === 'object') {
				var _selector$getWindow = this._selector.getWindow();

				var width = _selector$getWindow.innerWidth;
				var height = _selector$getWindow.innerHeight;

				page.style.minHeight = height + 'px';
				page.style.width = width - 4 + 'px';

				this._height = height;
				this._width = width;
			}
		}
	}, {
		key: 'setAllHeightsWidths',
		value: function setAllHeightsWidths() {
			var pages = this._selector.find('.pages');

			this.total = pages.length;

			for (var i = 0; i < this.total; i++) {
				this.setPageHeightWidth(pages[i]);
			}
		}
	}]);

	return Pages;
})();

exports['default'] = Pages;
module.exports = exports['default'];

},{"./selector":7}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _selector = require('./selector');

var _selector2 = _interopRequireDefault(_selector);

var Preloader = (function () {
	function Preloader() {
		_classCallCheck(this, Preloader);

		this._selector = new _selector2['default']();
		this._totalImagesLoaded = 0;
		this._imagesToLoad = ['loading.gif', 'arrow.png', 'contact-logos.png', 'intro-background.jpg', 'logo-intro-bar.png', 'logo-intro-mobile.png', 'logo-transparent.png', 'logo-white.png', 'projects-background.jpg', 'projects-title.png', 'saltgreen-logo-114.png', 'saltgreen-logo-160.png', 'saltgreen-logo-57.png', 'saltgreen-logo-72.png', 'small-left-hand-logo.png', 'welcome-background.jpg', 'welcome-title.png', 'what-we-do-background.jpg', 'what-we-do-mobile-background.jpg', 'what-we-do-title.png'];
		this._imagesLoadedList = [];
		this._totalImages = this._imagesToLoad.length;
		this._seconds = 1000;
		this._finished = function () {};
	}

	_createClass(Preloader, [{
		key: 'resetDivDisplay',
		value: function resetDivDisplay() {
			this._selector.find('#loading-overlay').style.display = 'none';
		}
	}, {
		key: 'hidePreloader',
		value: function hidePreloader(callback) {
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
	}, {
		key: 'preloadImages',
		value: function preloadImages(callback) {
			var _this = this;

			var _notifyImageLoaded = function _notifyImageLoaded(callback) {
				_this._totalImagesLoaded++;

				if (_this._totalImagesLoaded === _this._totalImages) {
					_this.hidePreloader(callback);
				}
			};

			for (var i = 0; i < this._totalImages; i++) {
				this._imagesLoadedList[i] = new Image();
				this._imagesLoadedList[i].src = 'static-assets/img/' + this._imagesToLoad[i];
				this._imagesLoadedList[i].onload = _notifyImageLoaded.call(this, callback);
			}
		}
	}]);

	return Preloader;
})();

exports['default'] = Preloader;
module.exports = exports['default'];

},{"./selector":7}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Selector = (function () {
	function Selector() {
		_classCallCheck(this, Selector);

		this._document = document;
		this._window = window;
	}

	_createClass(Selector, [{
		key: 'getWindow',
		value: function getWindow() {
			return this._window;
		}
	}, {
		key: 'getDocument',
		value: function getDocument() {
			return this._document;
		}
	}, {
		key: 'getByQuerySelector',
		value: function getByQuerySelector(object) {
			var objects = this._document.querySelectorAll(object);

			if (objects.length === 1) {
				return this._document.querySelector(object);
			}

			return objects;
		}
	}, {
		key: '_getByTag',
		value: function _getByTag(tagName) {
			return this._document.getElementsByTagName(tagName);
		}
	}, {
		key: '_getById',
		value: function _getById(id) {
			return this._document.getElementById(id);
		}
	}, {
		key: '_getByClass',
		value: function _getByClass(className) {
			var objects = this._document.getElementsByClassName(className);

			if (objects.length === 0) {
				return null;
			}

			return objects;
		}
	}, {
		key: 'find',
		value: function find(object, querySelector) {
			var objectSubstr;

			querySelector = querySelector || false;

			if (querySelector) {
				return this.getByQuerySelector(object);
			}

			objectSubstr = object.substr(1, object.length);

			if (object.indexOf('.') === 0) {
				return this._getByClass(objectSubstr);
			} else if (object.indexOf('#') === 0) {
				return this._getById(objectSubstr);
			}

			return this._getByTag(object);
		}
	}]);

	return Selector;
})();

exports['default'] = Selector;
module.exports = exports['default'];

},{}]},{},[1]);
