define(['./selector'], function(Selector) {
	'use strict';

	var W = Selector.w;
	var S = Selector.selector;
	var Pages = Pages || {};

	Pages.height = 0;
	Pages.width = 0;
	Pages.total = 0;
	Pages.timeout = null;

	var setPageHeightWidth = function setPageHeightWidth(page) {
		if(typeof page === 'object') {
			var width = W.innerWidth;
			var height = W.innerHeight;
			page.style.minHeight = height + 'px';
			page.style.width = (width - 4) + 'px';
			Pages.height = height;
			Pages.width = width;
		}
	};

	var setAllHeightsWidths = function setAllHeightsWidths() {
		var pages = S('.pages');
		Pages.total = pages.length;
		for(var i = 0; i < Pages.total; i++) {
			setPageHeightWidth(pages[i]);
		}
		//getBoundariesForScroll();
	};

/*
	var getBoundariesForScroll = function getBoundariesForScroll() {
		var Boundaries = [];
		var all = S(".pages");
		var totalHeight = 0;
		var endHeight = 0;
		var startHeight = 0;
		for(var i = 0; i < all.length; i++) {
			var _page = all[i];
			var _lastPage = Boundaries[i - 1] || { 'end' : 0 };
			
			startHeight = _lastPage.end;
			totalHeight = _page.offsetHeight + totalHeight;
			endHeight = Math.ceil(totalHeight - (_page.offsetHeight / 2));

			Boundaries.push({
				'height' : _page.offsetHeight,
				'start'  : startHeight,
				'end' 	 : endHeight,
				'snapTo' : (totalHeight - _page.offsetHeight)
			});
			//console.log("CN" + all[i].className + " | " + startHeight + " | " + endHeight + " | " + totalHeight);
		}
		Pages.Boundaries = Boundaries;
	};

	var _getDifference = function getDifference(a, b) { 
		return Math.abs(a - b); 
	};

	var setScrollPosition = function setScrollPosition(_scrollTo) {
		document.querySelector("#scroll-position").innerHTML = 'Scroll position: ' + _scrollTo + 'px';
	};

	var snapToPosition = function snapToPosition(event) {
		var Boundaries = Pages.Boundaries;
		var _scrollTo = document.body.scrollTop;
		//setScrollPosition(_scrollTo);
		for(var i = 0; i < Boundaries.length; i++) {
			var Boundary = Boundaries[i];
			if(_scrollTo > Boundary.start && _scrollTo <= Boundary.end) {
				var diffScroll = _getDifference(Boundary.snapTo, _scrollTo);
				var incr = Math.abs(diffScroll / 10);
				var scrollPos = _scrollTo;
				console.log("diffScroll = " + diffScroll + " | scrollPos = " + scrollPos + " | incr = " + incr + "\n");
				for(var v = 0; v < 10; v++) {
					var time = (500 * v);
					scrollPos = Math.ceil(scrollPos - incr);
					if(Boundary.snapTo > _scrollTo) {
						scrollPos = Math.ceil(scrollPos + incr);
					}
					console.log("scrollPos = " + scrollPos + " | i = " + i + " | time = " + time + "\n");

					W.setTimeout((function(time){
						console.log("Time: " + time + " ScrollPos: " + scrollPos);
						W.scrollTo(0, scrollPos);
					})(time), time);
				}
				
				//setScrollPosition(Boundary.snapTo);
				break;
			}
		}
	};


	var scrollDown = function scrollDown() {
		scrollDirection('down');
	};

	var scrollDirection = function scrollDirection(direction) {
		var newScrollPos = 0;
		var scrollDiff = 0;
		var scrollPos = W.scrollY;
		if(direction === 'home') {
			newScrollPos = 0;
		} else if(direction === 'up') {
			newScrollPos = scrollPos - Pages.height;
			scrollDiff = scrollPos - newScrollPos;
		} else if(direction === 'down') {
			newScrollPos = scrollPos + Pages.height;
		} else if(direction === 'end') {
			newScrollPos = 100000000;
		}
		if(scrollPos === 0 && newScrollPos < 0) {
			newScrollPos = 0;
		}
		var pageNumber = Math.ceil(scrollPos / Pages.height);
		if(pageNumber !== Pages.total) {
			pageNumber + 1;
		}
		var pageElement = S("#page-" + pageNumber);
		alert(document.getElementById("page-1").scrollTop);
		/*var scrollByNum = newScrollPos / 20;
		for(var i = 5000; i > 0; ) {
			setTimeout(function() {
				W.scrollBy(0, scrollByNum);
			}, i);
			i = i - 20;
		}*//*
		scrollTo(pageElement, newScrollPos, 5000);
	};

	var scrollTo = function scrollTo(element, to, duration) {
	    if (duration < 0) return;
	    var difference = to - element.scrollTop;
	    var perTick = difference / duration * 10;
	    setTimeout(function() {
	        element.scrollTop = element.scrollTop + perTick;
	        if (element.scrollTop === to) return;
	        scrollTo(element, to, duration - 10);
	    }, 10);
	};

	var mouseScroll = function mouseScroll(e) {
		var delta = (e.wheelDelta || -e.deltaY || -e.detail);
		var direction = Math.max(-1, Math.min(1, delta));
		if(direction < 0) {
			scrollDirection('down');
		} else {
			scrollDirection('up');
		}
	};

	var keyPress = function keyPress(e) {
		switch (e.which) {
			//up
			case 38:
			case 33:
				scrollDirection('up');
				break;
			//down
			case 40:
			case 34:
				scrollDirection('down');
				break;
			//Home
			case 36:
				scrollDirection('home');
				break;

			//End
			case 35:
				scrollDirection('end');
				break;
			default: return;
		}
	};
/*/
	return {
		'setAllHeightsWidths' : setAllHeightsWidths//,
		//'snapToPosition' : snapToPosition
	};
});