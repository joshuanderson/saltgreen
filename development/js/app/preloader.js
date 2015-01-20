define(['./selector'], function (Selector) {
    'use strict';

    var Preloader = function (Selector) {
        this.selector = Selector;
        this.totalImagesLoaded = 0;
        this.imagesToLoad = [
        'loading.gif',
        'intro-background.jpg',
        'projects-background.jpg',
        'welcome-background.jpg',
        'wwd-background.jpg',
        'wwd-mobile-background.jpg',
        'arrow.png',
        'logo-intro-bar.png',
        'logo-intro-mobile.png',
        'logo-transparent.png',
        'logo-white.png',
        'projects-title.png',
        'saltgreen-logo-57.png',
        'saltgreen-logo-72.png',
        'saltgreen-logo-114.png',
        'saltgreen-logo-160.png',
        'small-left-hand-logo.png',
        'welcome-title.png',
        'wwd-title.png'
        ];
        this.imagesLoadedList = [];
        this.totalImages = this.imagesToLoad.length;
        this.seconds = 1000;
        this.finished = function () { alert("none"); };
    };

    Preloader.prototype.resetDivDisplay = function () {
        this.selector.find('#loading-overlay').style.display = 'none';
    };

    Preloader.prototype.hidePreloader = function (callback) {
        var divs = this.selector.find('.not-loaded');
        var preloader = this;
        var div;

        for (var i = 0; i < divs.length; i++) {
            div = divs[i];
            div.className = 'loaded';

            this.selector.w.setTimeout((function() {
                preloader.resetDivDisplay();
            }), this.seconds);

            callback();
            this.seconds = this.seconds + 1000;
        }
    };

    Preloader.prototype.preloadImages = function (callback) {

        var _notifyImageLoaded = function (callback) {
            this.totalImagesLoaded++;

            if (this.totalImagesLoaded === this.totalImages) {
                this.hidePreloader(callback);
            }
        };

        for (var i = 0; i < this.totalImages; i++) {
            this.imagesLoadedList[i] = new Image();
            this.imagesLoadedList[i].src = 'static-assets/img/' + this.imagesToLoad[i];
            this.imagesLoadedList[i].onload = _notifyImageLoaded.call(this, callback);
        }
    };

    return Preloader;
});
