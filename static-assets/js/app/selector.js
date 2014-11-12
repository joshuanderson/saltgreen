define(function(){
	'use strict';
	var D = document;
	var W = window;
	var S = function S(obj) {
		var objSub = obj.substr(1, obj.length);
		var _t = function _t(tag) {
			return D.getElementsByTagName(tag);
		};
		
		var _i = function _i(id) {
			return D.getElementById(id);
		};
		
		var _c = function _c(className) {
			var allObjs = D.getElementsByClassName(className);
			if(allObjs.length === 0) {
				return null;
			} else {
				return allObjs;
			}
		};
		if(obj.indexOf('.') === 0) {
			return _c(objSub);
		} else if(obj.indexOf('#') === 0) {
			return _i(objSub);
		} else {
			return _t(obj);
		}
	};
	
	return {
		'd' : D,
		'selector' : S,
		'w' : W
	};
});