(function(D, W) {
	"use strict";

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
		if(obj.indexOf(".") === 0) {
			return _c(objSub);
		} else if(obj.indexOf("#") === 0) {
			return _i(objSub);
		} else {
			return _t(obj);
		}
	};

	var setPageHeightWidth = function setPageHeightWidth(page) {
		if(typeof page === "object") {
			var width = W.innerWidth;
			var height = W.innerHeight;
			page.style.height = height + "px";
			page.style.width = width + "px";
		}
	};

	var setAllPagesHeightWidth = function setAllPagesHeightWidth() {
		var pages = S(".pages");
		for(var i = 0; i < pages.length; i++) {
			setPageHeightWidth(pages[i]);
		}	
	};

	var addEvent = function addEvent(elem, type, eventHandle) {
	    if(elem == null || (typeof elem == "undefined")) {
	    	return;
	    }
	    if(elem.addEventListener) {
	        elem.addEventListener(type, eventHandle, false);
	    } else if (elem.attachEvent) {
	        elem.attachEvent("on" + type, eventHandle);
	    } else {
	        elem["on" + type] = eventHandle;
	    }
	};

	setAllPagesHeightWidth();
	addEvent(W, "resize", setAllPagesHeightWidth);

	var div = S(".not-loaded");
	var hidePreloader = function hidePreloader() {
		var seconds = 1000;
		for(var i = 0; i < div.length; i++) {
			div[i].className = div[i].className + " loaded";
			W.setTimeout(function() {
				div[i].style.display = "none";
			}, seconds);
			seconds = seconds + 1000;
		}
	};
	var preloadImages = (function preloadImages() {
		var imageObj = new Image();
		var images = [
			"loading.gif",
			"intro-background.jpg",
			"welcome-background.jpg",
			"logo-intro-bar.png",
			"logo-transparent.png",
			"logo-white.png",
			"welcome-title.png"
		];
		for(var i = 0; i < images.length; i++) {
			imageObj.src = "static-assets/img/" + images[i];
		}
		hidePreloader();
	})();

})(document, window);
