/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - http://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function ($, Drupal, window, document, undefined) {

	jQuery(document).ready(function($) {
	  // Code that uses jQuery's $ can follow here.
	  	
	  	/**
		 * Set cookie to flag first page visitors
		 * 
		 */
	  	var cookieVisitNew = readCookie('divineus[visit][new]');
	  	
	  	if (cookieVisitNew === false) {
	  		createCookie('divineus[visit][new]',1,365);
	  	} else if (cookieVisitNew > 0) {
	  		createCookie('divineus[visit][new]',0,365);	
	  	}
	  	
	  	/**
		 * reveal full header on small screens
		 * 
		 */
		
	    $("#block-block-10 a, #block-block-38").click(
	    	function(e) {
	    		e.preventDefault();
	    		$("#block-search-form, #block-block-9, #block-block-4, .region-nav").toggle('slow');
	    	}
	    );
	    
	    
	  	/**
		 * send visitors to divine uk to new window
		 * 
		 */
		$(" a[href^='http://www.divinechocolate.com/uk']").attr("target","_blank");
		
	  	/**
		 * Shopping cart
		 * 
		 */
		$("#block-block-4").mouseenter(function(){
	    	$('#block-commerce-cart-cart').show();
	    }).mouseleave(function(){
	    	window.setTimeout(function () {
               if ($('#block-commerce-cart-cart').is(':hover')) {
	 	  			$('#block-commerce-cart-cart').mouseleave(function(){
	 	  				$(this).hide();
	 	  			});
			    } else {
	 				$('#block-commerce-cart-cart').hide();
			    }
            },00);
	    });
	 	
 	  	
 	  	/**
		 * Quantity incrementor 	
		 * 
		 */  	
 	  	$(".form-item-quantity").prepend('<div class="dec incrementor-button">-</div>').append('<div class="inc incrementor-button">+</div>');
 	  	
 	  	$(".incrementor-button").click(function() {
		    var $button = $(this);
		    var oldValue = $button.parent().find("input").val();
		
		    if ($button.text() == "+") {
			  var newVal = parseFloat(oldValue) + 1;
			  // AJAX save would go here
			} else {
			  // Don't allow decrementing below zero
			  if (oldValue > 1) {
			      var newVal = parseFloat(oldValue) - 1;
			      // AJAX save would go here
			  } else {
			  	var newVal = oldValue;
			  }
			}
			$button.parent().find("input").val(newVal);
		});
		
		/**
		 * front page product carousel	
		 * 
		 */  
 	  	$('.front .view-product-catalog .views-row-3').addClass('highlight');
 	  	 	  	
 	  	$('.front .view-product-catalog .views-row').hover(
 	  		function() {
 	  			$('.front .view-product-catalog .views-row').removeClass('highlight');
	 			$(this).addClass('highlight');
	 	  	}
 	  	);
 	  	
 	  	/**
		 * //toggle additional information on product display
		 * 
		 */  
 	  	$(".field-name-field-contains .field-items, .field-name-field-may-contain .field-items, .field-name-field-ingredients .field-items, .field-name-field-nutritional-information").hide();
 	  	$(".field-name-field-contains .field-label, .field-name-field-may-contain .field-label").click(
 	  		function() {
 	  			$(this).parent().children('.field-items').toggle();
 	  			
 	  		}
 	  	);
 	  	$(".field-name-field-ingredients .field-label").click(
 	  		function() {
 	  			$(this).parent().children('.field-items').toggle();
 	  			$('.field-name-field-nutritional-information').toggle();
 	  		}
 	  	);
 	  	
 	  	/**
		 * add span to numbered list to enable different coloured numbers
		 * 
		 */  
 	  	$(".field-name-field-body-recipe ol li").wrapInner('<span> </span>');
 	  	
 	  		
 	  	/**
		 * infield label - need to refactor this into a function or some such!
		 * 
		 */ 
		 
		 
		$(".newsletter-signup input, #block-webform-client-block-399 input, #block-webform-client-block-532 input").focus(function() {
			$(this).parent().children('label').addClass('dim');
		});
		
		$("#block-search-form .form-item-search-block-form input").focus(function() {
			$("#block-search-form").animate({"width": "12em"}, "slow");
			$(this).parent().children('label').addClass('dim').html('type here');
			$(this).attr('style',"width: 9.4em;");
			
		});
		
		
		$(".newsletter-signup input, #block-webform-client-block-399 input, #block-webform-client-block-532 input, #block-search-form .form-item-search-block-form input").keydown(function() {
			if(!$(this).val()) {
				$(this).parent().children('label').hide();
			}
		});
		
		$("#block-search-form .form-item-search-block-form input").blur(function() {
			$(this).parent().children('label').removeClass('dim').html('Search');;
			$("#block-search-form").animate({"width": "8em"}, "slow");
			$("#block-search-form").removeAttr("style");
			$(this).removeAttr("style");
		});//end infield
		
		$(".newsletter-signup input, #block-webform-client-block-399 input, #block-webform-client-block-532 input").blur(function() {
			$(this).parent().children('label').removeClass('dim');
			$("#block-search-form").animate({"width": "8em"}, "slow");
			$("#block-search-form").removeAttr("style");
			$(this).removeAttr("style");
		});//end infield
		
		
		
		
		/**
		 * show email prompt
		 * 
		 */  
		var cookieDataEmail = readCookie('divineus[data][email]');
		var cookiePromptEmail = readCookie('divineus[prompt][email]');
	  	var cookieVisitNew = readCookie('divineus[visit][new]');
	  	
	  	if (cookieDataEmail === false && cookiePromptEmail === false && cookieVisitNew == 0) {
	  		createCookie('divineus[prompt][email]',1,120);
	  		$("#block-webform-client-block-532").animate({"bottom":"0"},"slow");
			$("#block-webform-client-block-532 .close").click(
				function() {
					$(this).parent().animate({"bottom":"-14em"},"slow");
					$(this).parent().addClass('hidden');
				}
			);
	  	}
		
		
		/**
		 * sub-nav drop-down
		 * 
		 */  
		$(".subnav-reveal .sidebars .block-menu > ul > li ul").hide();
		
		$(".sidebars .block-menu > ul > li").hover(
			function() {
 	  			$(".subnav-reveal .sidebars .block-menu > ul > li ul").addClass('sub-nav-over');
 	  			$(".subnav-reveal .sidebars .block-menu > ul > li ul").width($(this).width());
 	  			$(".subnav-reveal .sidebars .block-menu > ul > li ul").show();
	 	  	},
	 	  	function () {
	 	  		$(".subnav-reveal .sidebars .block-menu > ul > li ul").hide();
	 	  	}
 	  	);
		/**
		* functions
		* 2. Cookie
		* 3. youtube resizing
		*/
		
		$.fn.infield = function() {
			
		};
		  
		function createCookie(name,value,days) {
			if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
			document.cookie = name+"="+value+expires+"; path=/";
		}
		
		function readCookie(name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
			}
			return false;
		}
		
		function eraseCookie(name) {
			createCookie(name,"",-1);
		}
		
		(function() {
		    var iframes = document.getElementsByTagName('iframe');
		    
		    for (var i = 0; i < iframes.length; i++) {
		        var iframe = iframes[i];
		        var players = /www.youtube.com|player.vimeo.com/;
		        if(iframe.src.search(players) !== -1) {
		            var videoRatio = (iframe.height / iframe.width) * 100;
		            
		            iframe.style.position = 'absolute';
		            iframe.style.top = '0';
		            iframe.style.left = '0';
		            iframe.width = '100%';
		            iframe.height = '100%';
		            
		            var div = document.createElement('div');
		            div.className = 'video-wrap';
		            div.style.width = '100%';
		            div.style.position = 'relative';
		            div.style.paddingTop = videoRatio + '%';
		            
		            var parentNode = iframe.parentNode;
		            parentNode.insertBefore(div, iframe);
		            div.appendChild(iframe);
		        }
		    }
		})();
	  
		
	});//end document ready
	


})(jQuery, Drupal, this, this.document);
