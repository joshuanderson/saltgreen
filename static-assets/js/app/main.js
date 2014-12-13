define(['./selector', './preloader', './events', './pages', './nav'], function (Selector, Preloader, Events, Pages, Nav) {
    'use strict';
    var S = Selector.selector;
    var W = Selector.w;
    var Main = Main || {};
    var Scroll = new Nav(30, null);
    var overlays = S('*[data-overlay]', true);
    var overlayBg = S('#overlay-background');
    var overlayContact = S('#overlay-contact');
    var overlayTestimonials = S('#overlay-testimonials');
    var overlayClose = S('#overlay-contact a.close', true);
    var mobileMenu = S('.mobile-menu');
    var mobileMenuById = S('#mobile-menu');
    var _isArray = function _isArray(array) {
        var isArray = !!array.length || false;
        return isArray;
    }
    var _clearOverlay = function _clearOverlay(overlay) {
        overlay.style.display = 'block';
        overlay.className = '';
    };
    var _addOverlayClass = function _addOverlayClass(overlay) {
        if (_isArray(overlay)) {
            for (var i = 0; i < overlay.length; i++) {
                overlay[i].className = 'hidden';
            }
        } else {
            overlay.className = 'hidden';
        }
    };
    var _removeOverlayStyle = function _removeOverlayStyle(overlay) {
        if (_isArray(overlay)) {
            for (var i = 0; i < overlay.length; i++) {
                overlay[i].style.display = 'none';
            }
        } else {
            overlay.style.display = 'none';
        }
    };
    var _hasClass = function _hasClass(obj, classToCheck) {
        var className = obj.className || false;
        if(className) {
            return (className.indexOf(classToCheck) !== -1);
        } else {
            return false;
        }
    };
    var _toggleClass = function _toggleClass(obj, classToToggle) {
        if(_hasClass(obj, classToToggle)) {
            obj.className = obj.className.replace(classToToggle, '');
        } else {
            obj.className = obj.className + ' ' + classToToggle;
        }
    };

    Events.addToWindow('resize', Pages.setAllHeightsWidths);

    var menuItems = S(".menu-item");

    if (menuItems) {
        for (var i = 0; i < menuItems.length; i++) {
            var menuItem = menuItems[i];
            Events.addToElement(menuItem, 'click', function () {
                var pageId = this.dataset.page;
                if (pageId) {
                    Scroll.anim(pageId);
                }
            });
        }
    }
    Events.addToElements([overlayBg, overlayClose], 'click', function () {
        _addOverlayClass([overlayBg, overlayContact, overlayTestimonials]);
        W.setTimeout(function () {
            _removeOverlayStyle([overlayContact, overlayBg, overlayTestimonials]);
        }, 2000);
    });
    Events.addToElements(mobileMenu, 'click', function () {
        _toggleClass(mobileMenuById, 'on');
    });

    if (overlays) {
        for (var i = 0; i < overlays.length; i++) {
            var overlay = overlays[i];
            Events.addToElement(overlay, 'click', function () {
                var overlayId = this.dataset.overlay;
                _clearOverlay(S('#overlay-' + overlayId));
                _clearOverlay(overlayBg);
            });
        }
    }

    return {
        init: function () {
            Preloader.init(function () {
                Pages.setAllHeightsWidths();
            });
        }
    };
});