(function(D, W) {
	"use strict";
	var Page = {
		height: 0,
		width: 0
	};
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
			page.style.minHeight = height + "px";
			page.style.width = width + "px";
			Page.height = height;
			Page.width = width;
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
	(function () {
		var totalImagesLoaded = 0;
		var images = [
			"loading.gif",
			"intro-background.jpg",
			"welcome-background.jpg",
			"logo-intro-bar.png",
			"logo-transparent.png",
			"logo-white.png",
			"welcome-title.png"
		];
		var imagesList = [];
		var last = images.length - 1;
		var divs = S(".not-loaded");
		var hidePreloader = function hidePreloader() {
			var seconds = 1000;
			for(var i = 0; i < divs.length; i++) {
				var div = divs[i];
				div.className = div.className + " loaded";
				W.setTimeout(function() {
					S("#loading-overlay").style.display = "none";
				}, seconds);
				seconds = seconds + 1000;
			}
		};
		var notifyImageLoaded = function notifyImageLoaded() {
			totalImagesLoaded++;
			if(totalImagesLoaded === images.length) {
				hidePreloader();
			}
		};
		for(var i = 0; i < images.length; i++) {
			imagesList[i] = new Image();
			imagesList[i].src = "static-assets/img/" + images[i];
			imagesList[i].onload = notifyImageLoaded;
		}
	})();

	var keyPress = function keyPress(e) {
		switch (e.which) {
			//up
			case 38:
			case 33:
				scrollDirection("up");
				break;
			//down
			case 40:
			case 34:
				scrollDirection("down");
				break;
			//Home
			case 36:
				//$.fn.fullpage.moveTo(1);
				break;

			//End
			case 35:
				//$.fn.fullpage.moveTo( $('.fp-section').length );
				break;
			default: return;
		}
	};

	var MouseWheel = function MouseWheel(e) {
		var direction = Math.max(-1, Math.min(1, (e.wheelDelta || -e.deltaY || -e.detail)));
		if(direction < 0) {
			scrollDirection("down");
		} else {
			scrollDirection("up");
		}
	}
	var scrollDirection = function scrollDirection(direction) {
		var newScrollPos = 0;
		var scrollPos = W.scrollY;
		if(direction === "up") {
			newScrollPos = scrollPos - Page.height;
		} else if(direction === "down") {
			newScrollPos = scrollPos + Page.height;
		}
		if(scrollPos === 0 && newScrollPos < 0) {
			newScrollPos = 0;
		}
		console.log("****************************************");
		console.log(scrollPos);
		console.log(newScrollPos);
		console.log("****************************************");
		W.scrollTo(0, newScrollPos);
	}

	setAllPagesHeightWidth();
	addEvent(W, "resize", setAllPagesHeightWidth);
	addEvent(W, "mousewheel", MouseWheel);
	addEvent(W, "wheel", MouseWheel);
	addEvent(W, "touchstart", function(e) {
		console.log(e);
	});
	addEvent(W, "touchmove", function(e) {
		console.log(e);
	});
	addEvent(D, "keydown", keyPress);
})(document, window);
