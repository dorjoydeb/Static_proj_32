(function($) {
  "use strict";

//------------------------------------- Waiting for the entire site to load ------------------------------------------------//

jQuery(window).load(function() { 
		jQuery("#loaderInner").fadeOut(); 
		jQuery("#loader").delay(200).fadeOut("slow"); 
});

$(document).ready(function(){
	
	
//------------------------------------- Dropdown menu setup ------------------------------------------------//





$('.menu li, .cart li').on('mouseover', function(){
	
	$(this).children('ul.dropDown').stop(true,true).fadeIn(200);
	$(this).children('ul.dropDown').css( "display", "block" );
	
}).on('mouseleave', function(){
	$(this).children('ul.dropDown').stop(true,true).fadeOut(200);
});


		
		
//------------------------------------- End dropdown menu setup ------------------------------------------------//





//------------------------------------- Site slider ------------------------------------------------//

$('.main-slider').flexslider({
	animation: "fade",
	slideshow: true,
	directionNav:true
});



$('.slider').flexslider({
	animation: "fade",
	slideshow: true,
	directionNav:true,
	controlNav:false
	
});


$('.work-slider, .prod-slider').flexslider({
	animation: "slide",
	slideshow: true,
	directionNav:false,
	controlNav: "thumbnails"
	
});



$('.testi-slider').flexslider({
	animation: "slide",
	slideshow: true,
	directionNav:false,
	controlNav: false,
	animationSpeed: 800
});

//------------------------------------- End site slider------------------------------------------------//
		


//------------------------------------- Hover effect and portfolio setup------------------------------------------------//




$('.prod-info', '.product-container').css({ opacity: 0 });
$('.work-info', '.works-holder').css({ opacity: 0 });


$('.work-info, .prod-info').hover( function(){ 
	$(this).stop().animate({ opacity: 1 }, 'slow');
}, function(){ 
	$(this).stop().animate({ opacity: 0 }, 'slow'); 
});


$('.work-info, .prod-info').hover(function () {
	
   var workInfo = $(this).find('.work-info');
   var offset1 = ($(this).height() / 2) - (workInfo.height() / 2);

   var prodInfo = $(this).find('.prod-info');
   var offset2 = ($(this).height() / 2) - (prodInfo.height() / 2);

   $(this).find('.info-inner ').css('bottom', offset1 -38);
   $(this).find('.prod-inner ').css('bottom', offset2 -60);

});



$('.venobox').venobox({
    titleattr: 'data-title',
	numeratio:true
 });





var socials = $(".socials li a");
$(".socials li a").hover(function(){
	
	socials.stop().animate({opacity:0.4},"fast");
	$(this).stop().animate({opacity:1},"fast")},
	
	function(){
		socials.stop().animate({opacity:1},"fast")
});


var socialsWork = $(".socials-work li a");
$(".socials-work li a").hover(function(){
	
	socialsWork.stop().animate({opacity:0.4},"fast");
	$(this).stop().animate({opacity:1},"fast")},
	
	function(){
		socialsWork.stop().animate({opacity:1},"fast")
});





//---------------------------------- Filtred portfolio -----------------------------------------//


$('.filter li a').click(function (e) {
	
		e.preventDefault();
		$(this).addClass('active');
		$(this).parent().siblings().find('a').removeClass('active');
		
		
		
        var filters = $(this).attr('data-filter');
        $(this).closest('.works').find('.work').removeClass('disable');

        if (filters !== 'all') {
        
        
        
        
        var selected =  $(this).closest('.works').find('.work');
        
        for(var i = 0; i < selected.length; i++){
        
        if (!selected.eq(i).hasClass(filters)) {
                    selected.eq(i).addClass('disable');
				}
        
        }	
            
   }
   

});



//---------------------------------- End filtred portfolio -----------------------------------------//



//------------------------------------- End hover effect and portfolio setup------------------------------------------------//



//------------------------------------- Masonry work------------------------------------------------//



$(window).load(function() { 

// Masonry items
var $container = $('.works-holder.masonry');  
	$container.masonry({
	itemSelector : '.work.masonry'
});
	
});





//------------------------------------- End masonry work------------------------------------------------//



//------------------------------------- Elements alignment and background image setup -----------------------------------------------//




$('.hero').css('height', $(window).height());


for(var i = 0; i < $('.vertical-align').length; i++){
	$('.vertical-align').eq(i).css("margin-top",($('.vertical-align').parent().height()- $('.vertical-align').height())/2-25);
}

	
for(var i = 0; i < $('.background-image').length; i++){	
    
    var path = $('.background-image').eq(i).children('img').attr('src');
    $('.background-image').eq(i).css('background', 'url("' + path + '")');
    $('.background-image').eq(i).children('img').hide();
    $('.background-image').eq(i).css('background-position', 'initial');
   
}
	



//------------------------------------- End elements alignment and background image setup -----------------------------------------------//





//---------------------------------- Form validation-----------------------------------------//




$('.submit').click(function(){ 

	$('input#name').removeClass("errorForm");
	$('textarea#message').removeClass("errorForm");
	$('input#email').removeClass("errorForm");
	
	var error = false; 
	var name = $('input#name').val(); 
	if(name == "" || name == " ") { 
		error = true; 
		$('input#name').addClass("errorForm");
	}
	
	
		var msg = $('textarea#message').val(); 
		if(msg == "" || msg == " ") {
			error = true;
			$('textarea#message').addClass("errorForm");
			
		}
	
	var email_compare = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i; 
	var email = $('input#email').val(); 
	if (email == "" || email == " ") { 
		$('input#email').addClass("errorForm");
		error = true;
	}else if (!email_compare.test(email)) { 
		$('input#email').addClass("errorForm");
		error = true;
	}

	if(error == true) {
		return false;
	}

	var data_string = $('.contact-form form, .reply-form form, .review-form form').serialize(); 
	

	$.ajax({
		type: "POST",
		url: $('.contact-form form, .reply-form form, .review-form form').attr('action'),
		data: data_string,
		
		success: function(message) {
				if(message == 'SENDING'){
					$('#success').fadeIn('slow');
				}
				else{
					$('#error').fadeIn('slow');
				}
					}
			
	});

	return false; 
});



//---------------------------------- End form validation-----------------------------------------//


//---------------------------------- Dropdown products-----------------------------------------//


function DropDown(el) {
				this.dropdown = el;
				this.opts = this.dropdown.find('ul.dropdown > li');
				this.val = [];
				this.index = [];
				this.initEvents();
			}
			DropDown.prototype = {
				initEvents : function() {
					var obj = this;

					obj.dropdown.on('click', function(event){
						$(this).toggleClass('active');
						event.stopPropagation();
					});

					obj.opts.children('label').on('click',function(event){
						var opt = $(this).parent(),
							chbox = opt.children('input'),
							val = chbox.val(),
							idx = opt.index();

						($.inArray(val, obj.val) !== -1) ? obj.val.splice( $.inArray(val, obj.val), 1 ) : obj.val.push( val );
						($.inArray(idx, obj.index) !== -1) ? obj.index.splice( $.inArray(idx, obj.index), 1 ) : obj.index.push( idx );
					});
				},
				getValue : function() {
					return this.val;
				},
				getIndex : function() {
					return this.index;
				}
			}

			$(function() {

				var dropdown = new DropDown( $('.dropdown-holder') );


});

//---------------------------------- End dropdown products -----------------------------------------//



//---------------------------------- Tabbed content -----------------------------------------//


 $(".tabs li").click(function(e){
        if (!$(this).hasClass("active")) {
            var tabNum = $(this).index();
            var nthChild = tabNum+1;
            $(".tabs li.active").removeClass("active");
            $(this).addClass("active");
            $(".tab li.active").removeClass("active");
            $(".tab li:nth-child("+nthChild+")").addClass("active");
        }
    });

//---------------------------------- End tabbed content-----------------------------------------//


//---------------------------------- Instagram feed -----------------------------------------//

jQuery.fn.spectragram.accessData={
	accessToken:'305801553.467ede5.94e8f22591af44eea81bdbd1ca3bff04',
	clientID:'e659391279a64365a13bfb26b4caf15d'}
	
$('.instaFeed').spectragram('getUserFeed', {
		query: 'insideenvato', //Change the instagram feed user to display the feed that you want.
		size: 'large',
		max: 20
});


//---------------------------------- End instagram feed -----------------------------------------//



//--------------------------------- Mobile menu --------------------------------//


var mobileBtn = $('.mobile-btn');
	var nav = $('nav.main-nav');
	var navHeight= nav.height();
	

$(mobileBtn).click(function(e) {
		e.preventDefault();
		nav.slideToggle();


});

$(window).resize(function(){
		var w = $(window).width();
		if(w > 320 && nav.is(':hidden')) {
			nav.removeAttr('style');
		}

});


//--------------------------------- End mobile menu --------------------------------//




});


})(jQuery);
