define(['./selector'], function (Selector) {
    'use strict';

    var Events = function (Main, Selector) {
        this.main = Main;
        this.selector = Selector;
    };

    Events.prototype.add = function (elem, type, eventHandle) {
        if (elem === null || (typeof elem === 'undefined')) {
            return;
        }
        if (elem.addEventListener) {
            elem.addEventListener(type, eventHandle, false);
        } else if (elem.attachEvent) {
            elem.attachEvent('on' + type, eventHandle);
        } else {
            elem['on' + type] = eventHandle;
        }
    };

    Events.prototype.addToWindow = function (type, callback) {
        this.add(this.selector.w, type, callback);
    };

    Events.prototype.addToDocument = function (type, callback) {
        this.add(this.selector.d, type, callback);
    };

    Events.prototype.addToElement = function (element, type, callback) {
        this.add(element, type, callback);
    };

    Events.prototype.addToElements = function (elements, type, callback) {
        if (this.main._isArray(elements)) {
            for (var i = 0; i < elements.length; i++) {
                this.add(elements[i], type, callback);
            }
        }
    };

    return Events;
});
