/*-----------------------------------------------------------------------------------
/*
/* Main JS
/*
-----------------------------------------------------------------------------------*/

(function($) {

/*preloader*/
  	$(window).load(function() {
		  $("#status").fadeOut("slow");
		$("#preloader").delay(500).fadeOut("slow").remove();
	  })

/*navbar*/
   $(window).on('scroll', function() {

		var h = $('header').height();
		var y = $(window).scrollTop();
      var header = $('#main-header');

	   if ((y > h + 30 ) && ($(window).outerWidth() > 768 ) ) {
	      header.addClass('opaque');
	   }
      else {
         if (y < h + 30) {
            header.removeClass('opaque');
         }
         else {
            header.addClass('opaque');
         }
      }

	});

/*alerts*/

	$('.alert-box').on('click', '.close', function() {
	  $(this).parent().fadeOut(500);
	});	


/*smoothscroll, on click scroll to ->*/

  	$('.smoothscroll').on('click', function (e) {
		  e.preventDefault();
		  var target = this.hash,
    	$target = $(target);
		  $('html, body').stop().animate({
       	'scrollTop': $target.offset().top
      }, 800, 'swing', function () {
      	window.location.hash = target;
      });
	  });


/*navbar current*/
	var sections = $("section"),
	navigation_links = $("#nav-wrap a");
	if($("body").hasClass('homepage')) {
		sections.waypoint( {
			handler: function(event, direction) {
				var active_section;
				active_section = $(this);
				if (direction === "up") active_section = active_section.prev();
				var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');
				navigation_links.parent().removeClass("current");
				active_link.parent().addClass("current");
				},
			offset: '25%'
		});
	}
	/*flexslider*/
  	$(window).load(function() {  		

	  	$('#hero-slider').flexslider({
	   	namespace: "flex-",
	      controlsContainer: ".flex-container",
	      animation: 'fade',
	      controlNav: true,
	      directionNav: false,
	      smoothHeight: true,
	      slideshowSpeed: 7000,
	      animationSpeed: 600,
	      randomize: false
	   });	   

   });

 
/*contact us form*/

   $('form#contactForm button.submit').on('click', function() {
	   $('#image-loader').fadeIn();

	   var contactFname = $('#contactForm #contactFname').val();
	   var contactLname = $('#contactForm #contactLname').val();
	   var contactEmail = $('#contactForm #contactEmail').val();
	   var contactSubject = $('#contactForm #contactSubject').val();
	   var contactMessage = $('#contactForm #contactMessage').val();

	   var data = 'contactFname=' + contactFname  + '&contactLname=' + contactLname +
                 '&contactEmail=' + contactEmail + '&contactSubject=' + contactSubject + 
                 '&contactMessage=' + contactMessage;

      $.ajax({

	      type: "POST",
	      url: "inc/sendEmail.php",
	      data: data,
	      success: function(msg) {

			  if (msg == 'OK') {
               $('#image-loader').fadeOut();
               $('#message-warning').hide();
               $('#contactForm').fadeOut();
               $('#message-success').fadeIn();   
            }
            else {
               $('#image-loader').fadeOut();
               $('#message-warning').html(msg);
	            $('#message-warning').fadeIn();
            }
		  }
	  });
	  return false;
   });


/*i virsu mygtukas*/
	var pxShow = 600;
	var fadeInTime = 800;
	var fadeOutTime = 800;

	jQuery(window).scroll(function() {
		if (jQuery(window).scrollTop() >= pxShow) {
			jQuery("#go-top").fadeIn(fadeInTime);
		} else {
			jQuery("#go-top").fadeOut(fadeOutTime);
		}
	});
})(jQuery);