(function() {
    window.Fdjs || (window.Fdjs = {});

    Fdjs.Carousel = (function() {
        Carousel.prototype._initPos = 0;

        function Carousel(_id, options) {
            var $carousel, $scroll, hammer;
            this._id = _id;
            this._itemNumber = options && options.itemNumber ? options.itemNumber : 5;
            this._itemWidth = options && options.itemWidth ? options.itemWidth : 260;
            this._itemGap = options && options.itemGap ? options.itemGap : 20;
            hammer = new Hammer(document.getElementById(this._id));
            hammer.get("pan").set({
                direction: Hammer.DIRECTION_HORIZONTAL
            });
            $carousel = $("#" + this._id);
            $scroll = $carousel.find(".scroller");
            $(window).resize((function(_this) {
                return function() {
                    _this._initPos = 0;
                    return $scroll.css({
                        left: 0
                    });
                };
            })(this));
            hammer.on("pan", (function(_this) {
                return function(e) {
                    var finalPos, i, itemGap, itemNumber, itemWidth, j, maxPos, minPos, newPos, pos, railsWidth, ref, scrollerWidth, shift;
                    e.preventDefault();
                    railsWidth = parseInt($carousel.width());
                    itemNumber = _this._itemNumber;
                    itemWidth = _this._itemWidth;
                    itemGap = _this._itemGap;
                    scrollerWidth = itemWidth * itemNumber + itemGap * (itemNumber - 1);
                    if ((railsWidth - scrollerWidth) > 0) {
                        return false;
                    }
                    if ((_this._initPos + e.deltaX) > 0 || (_this._initPos + e.deltaX) < (railsWidth - scrollerWidth)) {
                        newPos = _this._initPos + e.deltaX / 2;
                    } else {
                        newPos = _this._initPos + e.deltaX;
                    }
                    $scroll.css("left", newPos);
                    if (e.isFinal) {
                        finalPos = parseInt($scroll.css("left"));
                        shift = e.additionalEvent === "panleft" ? itemWidth / 3 : -itemWidth / 3;
                        for (i = j = 0, ref = itemNumber - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
                            pos = -i * (itemWidth + itemGap);
                            minPos = pos + (itemWidth + itemGap) / 2;
                            maxPos = pos - (itemWidth + itemGap) / 2;
                            if ((minPos + shift >= finalPos && finalPos > maxPos + shift)) {
                                finalPos = pos;
                                break;
                            }
                        }
                        if (finalPos > 0) {
                            finalPos = 0;
                        }
                        if (finalPos < (railsWidth - scrollerWidth)) {
                            finalPos = railsWidth - scrollerWidth;
                        }
                        $scroll.animate({
                            left: finalPos
                        }, 200);
                        return _this._initPos = finalPos;
                    }
                };
            })(this));
        }

        return Carousel;

    })();

}).call(this);