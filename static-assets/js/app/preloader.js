define(['./selector'], function (Selector) {
    'use strict';
    var S = Selector.selector;
    var W = Selector.w;
    var totalImagesLoaded = 0;
    var _callback = function () {
    };
    var images = [
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
    var imagesList = [];
    var last = images.length - 1;
    var divs = S('.not-loaded');
    var _resetDivDisplay = function _resetDivDisplay() {
        S('#loading-overlay').style.display = 'none';
    };
    var hidePreloader = function hidePreloader() {
        var seconds = 1000;
        for (var i = 0; i < divs.length; i++) {
            var div = divs[i];
            div.className = 'loaded';
            W.setTimeout(_resetDivDisplay, seconds);
            _callback();
            seconds = seconds + 1000;
        }
    };
    var notifyImageLoaded = function notifyImageLoaded() {
        totalImagesLoaded++;
        if (totalImagesLoaded === images.length) {
            hidePreloader();
        }
    };
    var preloadImages = function preloadImages(callback) {
        _callback = callback;
        for (var i = 0; i < images.length; i++) {
            imagesList[i] = new Image();
            imagesList[i].src = 'static-assets/img/' + images[i];
            imagesList[i].onload = notifyImageLoaded;
        }
    };
    return {
        'init': preloadImages,
        'hidePreloader': hidePreloader
    };
});