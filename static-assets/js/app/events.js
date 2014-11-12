define(['./selector'], function(Selector) {
	'use strict';
	var W = Selector.w;
	var D = Selector.d;
	var addEvent = function addEvent(elem, type, eventHandle) {
	    if(elem === null || (typeof elem === 'undefined')) {
	    	return;
	    }
	    if(elem.addEventListener) {
	        elem.addEventListener(type, eventHandle, false);
	    } else if (elem.attachEvent) {
	        elem.attachEvent('on' + type, eventHandle);
	    } else {
	        elem['on' + type] = eventHandle;
	    }
	};
	var addToWindow = function addToWindow(type, callback) {
		addEvent(W, type, callback);
	};
	var addToDocument = function addToDocument(type, callback) {
		addEvent(D, type, callback);
	};
	var addToElement = function addToElement(element, type, callback) {
		addEvent(element, type, callback);
	};
	return {
		'addToWindow' : addToWindow,
		'addToDocument' : addToDocument,
		'addToElement' : addToElement
	};
});