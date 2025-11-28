// script.js

$(document).ready(function() {
    
    // Smooth scrolling for navigation links
    $('a.nav-link[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1200, 'easeInOutExpo');
        }
    });

    // Animate sections on scroll
    function isElementInView(elem) {
        var $elem = $(elem);
        var scroll_top = $(window).scrollTop();
        var doc_height = $(window).height();
        var elem_top = $elem.offset().top;
        var elem_height = $elem.height();
        var elem_bottom = elem_top + elem_height;

         var buffer = 100;
        return (elem_top < (scroll_top + doc_height) && elem_bottom > scroll_top);
    }
    
    function checkAnimations() {
        $('.animated-section').each(function() {
            if (isElementInView(this)) {
                $(this).addClass('in-view');
            }
        });
         var skillsSection = $('#skills');
        if (isElementInView(skillsSection)) {
            $('.progress-bar').each(function() {
                var progressBar = $(this);
                if (!progressBar.hasClass('animated')) {
                    var width = progressBar.attr('aria-valuenow') + '%';
                    progressBar.css('width', width); /* Set the width directly to trigger transition */
                    progressBar.addClass('animated');
                }
            });
        }
    }

    $(window).on('scroll', checkAnimations);
    checkAnimations();

    // Back to top button functionality
    var mybutton = $("#backToTop");
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            mybutton.fadeIn();
        } else {
            mybutton.fadeOut();
        }
    });

    mybutton.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 800, 'easeInOutExpo');
    });

    // Handle "Send" button click in the modal
    $('#sendMessageBtn').on('click', function(e) {
        e.preventDefault();
        
        var name = $('#contactName').val();
        var email = $('#contactEmail').val();
        var subject = $('#contactSubject').val();
        var message = $('#contactMessage').val();
        
        // Use a simple mailto link
        var mailtoLink = "mailto:yuandeleon027@gmail.com" +
                         "?subject=" + encodeURIComponent(subject) +
                         "&body=" + encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message);
        
        // Open the user's default email client
        window.location.href = mailtoLink;
        
        // Hide the modal after triggering the email client
        $('#contactModal').modal('hide');
    });
});