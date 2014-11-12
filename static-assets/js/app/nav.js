define(['./selector'], function(Selector) {
  'use strict';

  (function(){
    window.setTimeout = window.setTimeout;
  })();

  var smoothScr = function smoothScr() {
  };

  smoothScr.prototype = {
    iterr: 30, // set timeout miliseconds ..decreased with 1ms for each iteration
    tm: null, //timeout local variable
    stopShow: function() {
      clearTimeout(this.tm); // stopp the timeout
      this.iterr = 30; // reset milisec iterator to original value
    },
    getRealTop: function(el) {
      var elm = el;
      var realTop = 0;
      do {
        realTop += elm.offsetTop;
        elm = elm.offsetParent;
      }
      while (elm);
      return realTop;
    },
    getPageScroll: function() {
      var pgYoff = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
      return pgYoff;
    },
    anim: function(id) {
      this.stopShow();
      var element = document.getElementById(id) || null;
      if(element === null) {
        return;
      }
      var eOff, pOff, tOff, scrVal, pos, dir, step;
      var self = this;
      eOff = element.offsetTop;

      tOff = this.getRealTop(element.parentNode);

      pOff = this.getPageScroll(); // page offsetTop

      if (pOff === null || isNaN(pOff) || pOff === 'undefined') {
        pOff = 0;
      }
      scrVal = eOff - pOff; 
      if (scrVal > tOff) {
        pos = (eOff - tOff - pOff);
        dir = 1;
      }
      if (scrVal < tOff) {
        pos = (pOff + tOff) - eOff;
        dir = -1;
      }
      if (scrVal !== tOff) {
        step = ~~((pos / 4) + 1) * dir;

        if (this.iterr > 1) {
          this.iterr -= 1;
        } else {
          this.itter = 0; // decrease the timeout timer value but not below 0
        }
        window.scrollBy(0, step);
        this.tm = window.setTimeout(function() {
          self.anim(id);
        }, this.iterr);
      }
      if (scrVal === tOff) {
        this.stopShow(); // reset function values
        return;
      }
    }
  };

  return smoothScr.prototype;
});