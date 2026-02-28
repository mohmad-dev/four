// This is where it all goes :)
$(document).ready(function() {
    resizeContentHeight();
    requestTick()

    currentScrollY = $(document).scrollTop();
    checkTagline(currentScrollY);

    setInterval(function() {
        checkTagline();
    }, 100);
});

$(window).on("load", function(e) {
    resizeContentHeight();
});

$('body,html').bind('scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove', function(e) {
    if (e.which > 0 || e.type == "mousedown" || e.type == "mousewheel" || e.type == "touchmove") {
        $("html,body").stop();
    }
});

$(window).resize(function() {
    resizeContentHeight();
});

function resizeContentHeight() {
    viewportHeight = window.innerHeight;
    viewportWidth = window.innerWidth;
    if (viewportWidth < 769) {
        bleedHeight = 0;
    } else {
        bleedHeight = (viewportHeight - 960) / 2;
    }
    $(".inner-before").css({
        height: bleedHeight
    });
    $(".background-section-before").css({
        height: bleedHeight * 0.8
    });
}


ticking = false
scrollControlling = false
lastScrollY = 0
scrolltimeout = null

$(window).scroll(function(e) {
    onScroll()
});


function onScroll() {
    $("html,body").clearQueue()
    currentScrollY = $(document).scrollTop();

    // magnet control	

    scrollPosition = "normal"
    if (lastScrollY > currentScrollY) {
        scrollPosition = "up"
    } else {
        scrollPosition = "down"
    }

    scrollFinished(scrollPosition)

    // animation
    requestTick();
    lastScrollY = currentScrollY;
}

function scrollFinished(scrollPosition) {
    //return;
    if (scrolltimeout) {
        clearTimeout(scrolltimeout);
    }
    scrolltimeout = setTimeout(function() {
        // magnet control	
        findMagnet(scrollPosition)
    }, 100);
}

function findMagnet(scrollPosition) {
    currentScrollY = $(document).scrollTop();

    magnetMasterTop = $(".magnet-master").offset().top;
    anchorTop = $(".fixed-anchor").offset().top;
    magnetFirstTop = $(".magnet-first").offset().top;
    magnetLastTop = $(".magnet-last").offset().top;

    if (magnetMasterTop < magnetFirstTop && scrollPosition == "up")
        return;

    if (magnetMasterTop > magnetLastTop && scrollPosition == "down")
        return;

    $(".magnet").each(function() {
        magnetTop = $(this).offset().top;
        anchorOffset = magnetMasterTop - anchorTop

        beforeDistance = 200
        afterDistance = 200

        if (magnetMasterTop > magnetTop - beforeDistance && magnetMasterTop <= magnetTop + afterDistance) {
            $("html,body").stop().clearQueue().animate({
                scrollTop: magnetTop - anchorOffset
            }, 300);
        }
    });
}

var subtitleTimer
var timer1, timer2, timer3, timer4, timer5, timer6, timer7;

function checkTagline(scrollY) {

    magnetMasterTop = $(".magnet-master").offset().top;

    // Switch tagline
    $(".anchor--tagline-change").each(function() {
        currentTaglineId = parseInt($(".tagline").attr("data-tagline-id"))
        sectionTaglineId = parseInt($(this).attr("data-tagline-id"))

        sectionHeight = $(this).height()
        sectionTop = $(this).offset().top;
        sectionBottom = sectionTop + sectionHeight
        if (magnetMasterTop > sectionTop && magnetMasterTop < sectionBottom) {
            if (currentTaglineId != sectionTaglineId) {
                that = this
                clearTimeout(subtitleTimer)
                $(".tagline").attr("data-tagline-id", sectionTaglineId)
                subtitleTimer = setTimeout(function() {
                    sectionTaglineId = parseInt($(that).attr("data-tagline-id"))
                    subtitle(".tagline-subtitle-" + sectionTaglineId);
                }, 200);
            }
        }

        if (currentTaglineId >= 2) {
            $(".tagline").addClass("tagline--ontop")
        } else {
            $(".tagline").removeClass("tagline--ontop")
        }
    });
}


function subtitle(classIn, classOut) {
    clearTimeout(timer1)
    clearTimeout(timer2)
    clearTimeout(timer3)
    clearTimeout(timer4)
    clearTimeout(timer5)
    clearTimeout(timer6)
    clearTimeout(timer7)

    $classOut = $(".tagline-subtitle").not(".cleaned")
    // $classOut = $(classOut)
    $classIn = $(classIn)

    $classOut.addClass("masked");

    timer1 = setTimeout(function() {
        $classOut.addClass("unmasked")
    }, 200);
    timer2 = setTimeout(function() {
        $classOut.addClass("cleaned")
    }, 400);

    timer3 = setTimeout(function() {
        $classIn.addClass("masked")
    }, 400);
    timer4 = setTimeout(function() {
        $classIn.addClass("unmasked")
    }, 600);
    timer5 = setTimeout(function() {
        $classIn.removeClass("cleaned")
    }, 600);
    timer6 = setTimeout(function() {
        $(".tagline-mask").hide();
        $(".tagline-subtitle").removeClass("masked");
        $(".tagline-subtitle").removeClass("unmasked");
    }, 1000);
    timer7 = setTimeout(function() {
        $(".tagline-mask").show()
    }, 1000);

}

function checkTaglinePosition(scrollY) {
    // Tagline bottom controll
    anchorTop = $(".fixed-anchor").offset().top;
    magnetLastTop = $(".magnet-last").offset().top;
    magnetMasterTop = $(".magnet-master").offset().top;
    anchorOffset = magnetMasterTop - anchorTop
    tippingPoint = magnetLastTop - anchorOffset
    if (scrollY > tippingPoint) {
        $(".tagline-content").css({
            "transform": "translate3d(0px, " + parseInt(tippingPoint - scrollY) + "px, 0px)"
        })
    } else {
        $(".tagline-content").css({
            "transform": "translate3d(0px, 0px, 0px)"
        })
    }
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(update);
        ticking = true
    }
}

function update() {
    documentTop = lastScrollY

    $(".background").css({
        "transform": "translate3d(0px, " + parseInt(documentTop * 0.2) + "px, 0px)"
    })
    $(".document-top").html(documentTop)
    // $(".section-1-slash").css({"transform": "translate3d(0px, 50px, 0px)"})

    checkTaglinePosition(documentTop);

    $(".slash-animation-item").each(function() {
        speed = parseFloat($(this).attr("data-speed"))
        start = parseInt($(this).attr("data-start"))
        startTablet = parseInt($(this).attr("data-start-tablet"))
        end = parseInt($(this).attr("data-end"))

        viewportWidth = window.innerWidth;
        if (viewportWidth <= 480) {
            if (startTablet) {
                if (startTablet > 480) {
                    start = startTablet - 480;
                } else {
                    start = startTablet
                }
            } else {
                if (start > 480) {
                    start = start - 480;
                } else {
                    start = start
                }
            }
        } else if (startTablet && viewportWidth <= 768) {
            start = startTablet;
        } else {
            start = start;
        }

        offsetX = parseInt(-documentTop * speed)
        offsetY = parseInt(documentTop * speed)

        if (start && start > 0) {
            if (documentTop < start) {
                offsetX = 0
                offsetY = 0
                $(this).hide()
            } else {
                offsetX += start * speed
                offsetY -= start * speed
                $(this).show()
            }
        }

        if (end && end > 0) {
            if (documentTop > end) return;
        }
        $(this).css({
            "transform": "translate3d(" + offsetX + "px, " + offsetY + "px, 0px)"
        })
    });

    $(".vertical-animation-item").each(function() {
        speed = parseFloat($(this).attr("data-speed"))
        start = parseInt($(this).attr("data-start"))
        range = parseInt($(this).attr("data-range"))

        scaleFrom = parseFloat($(this).attr("data-scale-from"))
        scaleTo = parseFloat($(this).attr("data-scale-to"))

        start = $(this).parent("div").offset().top - (window.innerHeight / 2)
        if (start < 0) start = 0
        end = start + range

        if (!scaleFrom || !scaleTo) {
            scale = 1;
        } else {
            if (documentTop < start) {
                scale = scaleFrom
            } else {
                dist = end - start;
                progress = (documentTop - start) / dist;
                scale = (scaleTo - scaleFrom) * progress + scaleFrom;
            }
        }

        offsetY = parseInt(documentTop * speed)

        if (start && start > 0) {
            if (documentTop < start) {
                offsetY = 0
            } else {
                offsetY -= start * speed
            }
        }

        if (end && end > 0) {
            if (documentTop > end) return;
        }

        $(this).css({
            "transform": "translate3d(0px, " + offsetY + "px, 0px) scale(" + scale + ")"
        })

    });


    $(".scroll-down-indicator").css({
        "transform": "translate3d(" + documentTop + "px, 0px, 0px)"
    })


    ticking = false
}