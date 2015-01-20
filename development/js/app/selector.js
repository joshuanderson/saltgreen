define(function () {
    'use strict';

    var Selector = function () {
        this.d = document;
        this.w = window;
    };

    Selector.prototype.getByQuerySelector = function (object) {
        var objects = this.d.querySelectorAll(object);

        if (objects.length === 1) {
            return this.d.querySelector(object);
        }

        return objects;
    };

    Selector.prototype._getByTag = function (tagName) {
        return this.d.getElementsByTagName(tagName);
    };

    Selector.prototype._getById = function (id) {
        return this.d.getElementById(id);
    };

    Selector.prototype._getByClass = function (className) {
        var objects = this.d.getElementsByClassName(className);

        if (objects.length === 0) {
            return null;
        }

        return objects;
    };

    Selector.prototype.find = function (object, querySelector) {
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
    };

    return Selector;
});
