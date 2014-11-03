//PIXELATE ON SCROLL CODE

$(document).ready(function() {
	var imgPixelate = $('#js-pixelate-scroll');

	if (imgPixelate.length > 0) {

		var ctx = jsPixelateCanvas.getContext('2d'),
		    img = new Image;
		    //value = factor.value;

		img.onload = function() {
			pixelate(0);
		};

		var imgPixelateId = imgPixelate.attr('src');
		img.src = imgPixelateId;

		function pixelate(value) {

			if (value === 0) {
				value = 1;
			}
		    /// calculate the factor
		    var fw = (img.width / value)|0,
		        fh = (img.height / value)|0;
		    
		    /// turn off image smoothing (prefixed in some browsers)
		    ctx.imageSmoothingEnabled =
		    ctx.mozImageSmoothingEnabled =
		    ctx.msImageSmoothingEnabled =
		    ctx.webkitImageSmoothingEnabled = false;
		    
		    /// draw mini-version of image
		    ctx.drawImage(img, 0, 0, fw, fh);
		    
		    /// draw the mini-version back up, voila, pixelated
		    ctx.drawImage(jsPixelateCanvas, 0, 0, fw, fh, 0, 0, img.width, img.height);
		}

	(function () {
	    var previousScroll = 0;

	    $(window).scroll(function(){
	       var currentScroll = $(this).scrollTop();
	       if (currentScroll > previousScroll){
				$('#js-panel-fullwidth .panel-fullwidth-content').addClass('panel-fullwidth-img-text');
	       } else {
					$('#js-panel-fullwidth .panel-fullwidth-content').removeClass('panel-fullwidth-img-text');
	       }
	       previousScroll = currentScroll;
	    });
	}());

	$(document).scroll(function() {
		var scrollTop = $(window).scrollTop();
		if (scrollTop > 450) {
			return;
		}
		var pixelateValue = parseInt(scrollTop / 12); 
		pixelate(pixelateValue);

	});
	}
});

/*
 * pixelate.js
 * 43081j
 * Pixelate images with ease
 * License: MIT
 */
(function(window, $) {
	var pixelate = function() {
		var defaults = {
			value: 0.05,
			reveal: true,
			revealonclick: false
		};
		var options = arguments[1] || {};
		var element = this, //arguments[0],
			elementParent = element.parentNode;
		if(typeof options !== 'object') {
			options = { value: parseInt(arguments[1]) };
		}
		options = (function() {
			var opts = {};
			for(var k in defaults) {
				if(element.hasAttribute('data-' + k)) {
					opts[k] = element.getAttribute('data-' + k);
					continue;
				}
				if(k in options) {
					opts[k] = options[k];
					continue;
				}
				opts[k] = defaults[k];
			}
			return opts;
		})();
		var display = element.style.display,
			imgWidth = element.width,
			imgHeight = element.height,
			revealed = false;
		var canv = document.createElement('canvas');
		canv.width = imgWidth;
		canv.height = imgHeight;
		var ctx = canv.getContext('2d');
		ctx.mozImageSmoothingEnabled = false;
		ctx.webkitImageSmoothingEnabled = false;
		ctx.imageSmoothingEnabled = false;
		var width = imgWidth * options.value,
			height = imgHeight * options.value;
		ctx.drawImage(element, 0, 0, width, height);
		ctx.drawImage(canv, 0, 0, width, height, 0, 0, canv.width, canv.height);
		element.style.display = 'none';
		elementParent.insertBefore(canv, element);
		if(options.revealonclick !== false && options.revealonclick !== 'false') {
			/*
			 * Reveal on click
			 */
			canv.addEventListener('click', function(e) {
				revealed = !revealed;
				if(revealed) {
					ctx.drawImage(element, 0, 0, imgWidth, imgHeight);
				} else {
					ctx.drawImage(element, 0, 0, width, height);
					ctx.drawImage(canv, 0, 0, width, height, 0, 0, canv.width, canv.height);
				}
			});
		}
		if(options.reveal !== false && options.reveal !== 'false') {
			/*
			 * Reveal on hover
			 */
			canv.addEventListener('mouseenter', function(e) {
				if(revealed) return;
				ctx.drawImage(element, 0, 0, imgWidth, imgHeight);
			});
			canv.addEventListener('mouseleave', function(e) {
				if(revealed) return;
				ctx.drawImage(element, 0, 0, width, height);
				ctx.drawImage(canv, 0, 0, width, height, 0, 0, canv.width, canv.height);
			});
		}
	};
	window.HTMLImageElement.prototype.pixelate = pixelate;
	if(typeof $ === 'function') {
		$.fn.extend({
			pixelate: function() {
				return this.each(function() {
					pixelate.apply(this, arguments);
				});
			}
		});
	}
	document.addEventListener('DOMContentLoaded', function(e) {
		var img = document.querySelectorAll('img[data-pixelate]');
		for(var i = 0; i < img.length; i++) {
			img[i].addEventListener('load', function() {
				this.pixelate();
			});
		};
	});
})(window, typeof jQuery === 'undefined' ? null : jQuery);




/*!
 * headroom.js v0.7.0 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */

!function(a,b){"use strict";function c(a){this.callback=a,this.ticking=!1}function d(b){return b&&"undefined"!=typeof a&&(b===a||b.nodeType)}function e(a){if(arguments.length<=0)throw new Error("Missing arguments in extend function");var b,c,f=a||{};for(c=1;c<arguments.length;c++){var g=arguments[c]||{};for(b in g)f[b]="object"!=typeof f[b]||d(f[b])?f[b]||g[b]:e(f[b],g[b])}return f}function f(a){return a===Object(a)?a:{down:a,up:a}}function g(a,b){b=e(b,g.options),this.lastKnownScrollY=0,this.elem=a,this.debouncer=new c(this.update.bind(this)),this.tolerance=f(b.tolerance),this.classes=b.classes,this.offset=b.offset,this.scroller=b.scroller,this.initialised=!1,this.onPin=b.onPin,this.onUnpin=b.onUnpin,this.onTop=b.onTop,this.onNotTop=b.onNotTop}var h={bind:!!function(){}.bind,classList:"classList"in b.documentElement,rAF:!!(a.requestAnimationFrame||a.webkitRequestAnimationFrame||a.mozRequestAnimationFrame)};a.requestAnimationFrame=a.requestAnimationFrame||a.webkitRequestAnimationFrame||a.mozRequestAnimationFrame,c.prototype={constructor:c,update:function(){this.callback&&this.callback(),this.ticking=!1},requestTick:function(){this.ticking||(requestAnimationFrame(this.rafCallback||(this.rafCallback=this.update.bind(this))),this.ticking=!0)},handleEvent:function(){this.requestTick()}},g.prototype={constructor:g,init:function(){return g.cutsTheMustard?(this.elem.classList.add(this.classes.initial),setTimeout(this.attachEvent.bind(this),100),this):void 0},destroy:function(){var a=this.classes;this.initialised=!1,this.elem.classList.remove(a.unpinned,a.pinned,a.top,a.initial),this.scroller.removeEventListener("scroll",this.debouncer,!1)},attachEvent:function(){this.initialised||(this.lastKnownScrollY=this.getScrollY(),this.initialised=!0,this.scroller.addEventListener("scroll",this.debouncer,!1),this.debouncer.handleEvent())},unpin:function(){var a=this.elem.classList,b=this.classes;(a.contains(b.pinned)||!a.contains(b.unpinned))&&(a.add(b.unpinned),a.remove(b.pinned),this.onUnpin&&this.onUnpin.call(this))},pin:function(){var a=this.elem.classList,b=this.classes;a.contains(b.unpinned)&&(a.remove(b.unpinned),a.add(b.pinned),this.onPin&&this.onPin.call(this))},top:function(){var a=this.elem.classList,b=this.classes;a.contains(b.top)||(a.add(b.top),a.remove(b.notTop),this.onTop&&this.onTop.call(this))},notTop:function(){var a=this.elem.classList,b=this.classes;a.contains(b.notTop)||(a.add(b.notTop),a.remove(b.top),this.onNotTop&&this.onNotTop.call(this))},getScrollY:function(){return void 0!==this.scroller.pageYOffset?this.scroller.pageYOffset:void 0!==this.scroller.scrollTop?this.scroller.scrollTop:(b.documentElement||b.body.parentNode||b.body).scrollTop},getViewportHeight:function(){return a.innerHeight||b.documentElement.clientHeight||b.body.clientHeight},getDocumentHeight:function(){var a=b.body,c=b.documentElement;return Math.max(a.scrollHeight,c.scrollHeight,a.offsetHeight,c.offsetHeight,a.clientHeight,c.clientHeight)},getElementHeight:function(a){return Math.max(a.scrollHeight,a.offsetHeight,a.clientHeight)},getScrollerHeight:function(){return this.scroller===a||this.scroller===b.body?this.getDocumentHeight():this.getElementHeight(this.scroller)},isOutOfBounds:function(a){var b=0>a,c=a+this.getViewportHeight()>this.getScrollerHeight();return b||c},toleranceExceeded:function(a,b){return Math.abs(a-this.lastKnownScrollY)>=this.tolerance[b]},shouldUnpin:function(a,b){var c=a>this.lastKnownScrollY,d=a>=this.offset;return c&&d&&b},shouldPin:function(a,b){var c=a<this.lastKnownScrollY,d=a<=this.offset;return c&&b||d},update:function(){var a=this.getScrollY(),b=a>this.lastKnownScrollY?"down":"up",c=this.toleranceExceeded(a,b);this.isOutOfBounds(a)||(a<=this.offset?this.top():this.notTop(),this.shouldUnpin(a,c)?this.unpin():this.shouldPin(a,c)&&this.pin(),this.lastKnownScrollY=a)}},g.options={tolerance:{up:0,down:0},offset:0,scroller:a,classes:{pinned:"headroom--pinned",unpinned:"headroom--unpinned",top:"headroom--top",notTop:"headroom--not-top",initial:"headroom"}},g.cutsTheMustard="undefined"!=typeof h&&h.rAF&&h.bind&&h.classList,a.Headroom=g;}(window,document);


/*!
 * headroom.js v0.7.0 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */

!function(a){a&&(a.fn.headroom=function(b){return this.each(function(){var c=a(this),d=c.data("headroom"),e="object"==typeof b&&b;e=a.extend(!0,{},Headroom.options,e),d||(d=new Headroom(this,e),d.init(),c.data("headroom",d)),"string"==typeof b&&d[b]()})},a("[data-headroom]").each(function(){var b=a(this);b.headroom(b.data())}))}(window.Zepto||window.jQuery);


$(document).ready(function(){
    //menu: off canvas
    $('.nav-menu-trigger').click(function(event){
        event.stopPropagation();
        $(this).toggleClass('nav-menu-triggered');
        $('.nav-menu').toggleClass('nav-menu-open');
        $('main').toggleClass('main-offcanvas');
    });

    $(window).click(function(){
    	$('.nav-menu-trigger').removeClass('nav-menu-triggered');
        $('.nav-menu').removeClass('nav-menu-open');
        $('main').removeClass('main-offcanvas');
    });

    //menu: current link styling   	
	  function stripTrailingSlash(str) {
	    if(str.substr(-1) == '/') {
	      return str.substr(0, str.length - 1);
	    }
	    return str;
	  }

	  var url = window.location.pathname;  
	  var activePage = stripTrailingSlash(url);

	  $('.nav-menu a').each(function(){  
	    var currentPage = stripTrailingSlash($(this).attr('href'));

	    if (activePage == currentPage) {
	      $(this).addClass('nav-active'); 
	    } 
	  });

    //red pixel cube at end of blog post
    $(".blog-post-info").children().last().addClass('icon-decorative-pixel');

    //header: sticky
    $(".nav").headroom({
	  	"offset": 205,
	  	"tolerance": 5,
	  	"classes": {
	    	"initial": "animated",
	    	"pinned": "slideDown",
	    	"unpinned": "slideUp"
	  	}
	});

	$('.img-pixelate-hover').load(function(){
		$(this).pixelate({
			value : 0.7
		});
	});
});
