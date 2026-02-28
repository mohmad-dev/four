(function() {
    var onScroll, requestTick, siteLastScrollY, sitesiteTicking, toggleFeatures, toggleNavigation, update;

    toggleNavigation = function() {
        var opened;
        opened = $(".mobile-nav").hasClass("mobile-nav--opened");
        if (opened) {
            $(".mobile-nav").removeClass("mobile-nav--opened");
            $(".main-container").removeClass("mobile-nav--opened");
            $(".navigation-toggle").removeClass("mobile-nav--opened");
            return $("body").removeClass("mobile-nav--opened");
        } else {
            $(".mobile-nav").addClass("mobile-nav--opened");
            $(".main-container").addClass("mobile-nav--opened");
            $(".navigation-toggle").addClass("mobile-nav--opened");
            return $("body").addClass("mobile-nav--opened");
        }
    };

    toggleFeatures = function(e) {
        $(".js-highlight-features li").removeClass("active");
        return $(e.currentTarget).addClass("active");
    };

    $(document).ready(function() {
        var quotesCarousel, quotesCarouselVip;
        $(".js-highlight-features li").on("click", toggleFeatures);
        $(".navigation-toggle").on("click", toggleNavigation);
        quotesCarousel = document.getElementById('quotes-carousel');
        if (quotesCarousel) {
            new Fdjs.Carousel("quotes-carousel", {
                itemNumber: 3
            });
        }
        quotesCarouselVip = document.getElementById('quotes-carousel-vip');
        if (quotesCarouselVip) {
            return new Fdjs.Carousel("quotes-carousel-vip", {
                itemNumber: 4
            });
        }
    });

    siteLastScrollY = null;

    sitesiteTicking = false;

    $(window).scroll(function() {
        return onScroll();
    });

    onScroll = function() {
        var currentScrollY;
        currentScrollY = $(document).scrollTop();
        requestTick();
        return siteLastScrollY = currentScrollY;
    };

    requestTick = function() {
        var siteTicking;
        if (!siteTicking) {
            requestAnimationFrame(update);
            return siteTicking = true;
        }
    };

    update = function() {
        var documentTop, siteTicking;
        documentTop = siteLastScrollY;
        $(".parallax-box").each(function() {
            var end, offsetY, speed, start;
            speed = $(this).height() * 0.25 / window.innerHeight;
            start = $(this).offset().top - window.innerHeight;
            if (start < 0) {
                start = 0;
            }
            if ($(this).offset().top < window.innerHeight) {
                speed = speed * window.innerHeight / $(this).offset().top;
            }
            end = start + window.innerHeight + $(this).height();
            offsetY = parseInt(documentTop * speed);
            if (start && start > 0) {
                if (documentTop < start) {
                    offsetY = 0;
                } else {
                    offsetY -= start * speed;
                }
            }
            if (end && end > 0) {
                if (documentTop > end) {
                    return;
                }
            }
            return $(this).children(".parallax-box-content").css({
                "transform": "translate3d(0px, " + offsetY + "px, 0px)"
            });
        });
        return siteTicking = false;
    };

}).call(this);