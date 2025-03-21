(function(i) {
    var e = function(e, t) {
        var n = i.extend({}, i.fn.nivoSlider.defaults, t);
        var a = {
            currentSlide: 0,
            currentImage: "",
            totalSlides: 0,
            running: false,
            paused: false,
            stop: false,
            controlNavEl: false
        };
        var r = i(e);
        r.data("nivo:vars", a).addClass("nivoSlider");
        var o = r.children();
        o.each(function() {
            var e = i(this);
            var t = "";
            if (!e.is("img")) {
                if (e.is("a")) {
                    e.addClass("nivo-imageLink");
                    t = e
                }
                e = e.find("img:first")
            }
            var n = n === 0 ? e.attr("width") : e.width(),
                r = r === 0 ? e.attr("height") : e.height();
            if (t !== "") {
                t.css("display", "none")
            }
            e.css("display", "none");
            a.totalSlides++
        });
        if (n.randomStart) {
            n.startSlide = Math.floor(Math.random() * a.totalSlides)
        }
        if (n.startSlide > 0) {
            if (n.startSlide >= a.totalSlides) {
                n.startSlide = a.totalSlides - 1
            }
            a.currentSlide = n.startSlide
        }
        if (i(o[a.currentSlide]).is("img")) {
            a.currentImage = i(o[a.currentSlide])
        } else {
            a.currentImage = i(o[a.currentSlide]).find("img:first")
        }
        if (i(o[a.currentSlide]).is("a")) {
            i(o[a.currentSlide]).css("display", "block")
        }
        var s = i("<img/>").addClass("nivo-main-image");
        s.attr("src", a.currentImage.attr("src")).show();
        r.append(s);
        i(window).resize(function() {
            r.children("img").width(r.width());
            s.attr("src", a.currentImage.attr("src"));
            s.stop().height("auto");
            i(".nivo-slice").remove();
            i(".nivo-box").remove()
        });
        r.append(i('<div class="nivo-caption"></div>'));
        var c = function(e) {
            var t = i(".nivo-caption", r);
            if (a.currentImage.attr("title") != "" && a.currentImage.attr("title") != undefined) {
                var n = a.currentImage.attr("title");
                if (n.substr(0, 1) == "#") n = i(n).html();
                if (t.css("display") == "block") {
                    setTimeout(function() {
                        t.html(n)
                    }, e.animSpeed)
                } else {
                    t.html(n);
                    t.stop().fadeIn(e.animSpeed)
                }
            } else {
                t.stop().fadeOut(e.animSpeed)
            }
        };
        c(n);
        var l = 0;
        if (!n.manualAdvance && o.length > 1) {
            l = setInterval(function() {
                h(r, o, n, false)
            }, n.pauseTime)
        }
        if (n.directionNav) {
            r.append('<div class="nivo-directionNav"><a class="nivo-prevNav">' + n.prevText + '</a><a class="nivo-nextNav">' + n.nextText + "</a></div>");
            i(r).on("click", "a.nivo-prevNav", function() {
                if (a.running) {
                    return false
                }
                clearInterval(l);
                l = "";
                a.currentSlide -= 2;
                h(r, o, n, "prev")
            });
            i(r).on("click", "a.nivo-nextNav", function() {
                if (a.running) {
                    return false
                }
                clearInterval(l);
                l = "";
                h(r, o, n, "next")
            })
        }
        if (n.controlNav) {
            a.controlNavEl = i('<div class="nivo-controlNav"></div>');
            r.after(a.controlNavEl);
            for (var d = 0; d < o.length; d++) {
                if (n.controlNavThumbs) {
                    a.controlNavEl.addClass("nivo-thumbs-enabled");
                    var f = o.eq(d);
                    if (!f.is("img")) {
                        f = f.find("img:first")
                    }
                    if (f.attr("data-thumb")) a.controlNavEl.append('<a class="nivo-control" rel="' + d + '"><img src="' + f.attr("data-thumb") + '" alt="" /></a>')
                } else {
                    a.controlNavEl.append('<a class="nivo-control" rel="' + d + '">' + (d + 1) + "</a>")
                }
            }
            i("a:eq(" + a.currentSlide + ")", a.controlNavEl).addClass("active");
            i("a", a.controlNavEl).bind("click", function() {
                if (a.running) return false;
                if (i(this).hasClass("active")) return false;
                clearInterval(l);
                l = "";
                s.attr("src", a.currentImage.attr("src"));
                a.currentSlide = i(this).attr("rel") - 1;
                h(r, o, n, "control")
            })
        }
        if (n.pauseOnHover) {
            r.hover(function() {
                a.paused = true;
                clearInterval(l);
                l = ""
            }, function() {
                a.paused = false;
                if (l === "" && !n.manualAdvance) {
                    l = setInterval(function() {
                        h(r, o, n, false)
                    }, n.pauseTime)
                }
            })
        }
        r.bind("nivo:animFinished", function() {
            s.attr("src", a.currentImage.attr("src"));
            a.running = false;
            i(o).each(function() {
                if (i(this).is("a")) {
                    i(this).css("display", "none")
                }
            });
            if (i(o[a.currentSlide]).is("a")) {
                i(o[a.currentSlide]).css("display", "block")
            }
            if (l === "" && !a.paused && !n.manualAdvance) {
                l = setInterval(function() {
                    h(r, o, n, false)
                }, n.pauseTime)
            }
            n.afterChange.call(this)
        });
        var v = function(e, t, n) {
            if (i(n.currentImage).parent().is("a")) i(n.currentImage).parent().css("display", "block");
            i('img[src="' + n.currentImage.attr("src") + '"]', e).not(".nivo-main-image,.nivo-control img").width(e.width()).css("visibility", "hidden").show();
            var a = i('img[src="' + n.currentImage.attr("src") + '"]', e).not(".nivo-main-image,.nivo-control img").parent().is("a") ? i('img[src="' + n.currentImage.attr("src") + '"]', e).not(".nivo-main-image,.nivo-control img").parent().height() : i('img[src="' + n.currentImage.attr("src") + '"]', e).not(".nivo-main-image,.nivo-control img").height();
            for (var r = 0; r < t.slices; r++) {
                var o = Math.round(e.width() / t.slices);
                if (r === t.slices - 1) {
                    e.append(i('<div class="nivo-slice" name="' + r + '"><img src="' + n.currentImage.attr("src") + '" style="position:absolute; width:' + e.width() + "px; height:auto; display:block !important; top:0; left:-" + (o + r * o - o) + 'px;" /></div>').css({
                        left: o * r + "px",
                        width: e.width() - o * r + "px",
                        height: a + "px",
                        opacity: "0",
                        overflow: "hidden"
                    }))
                } else {
                    e.append(i('<div class="nivo-slice" name="' + r + '"><img src="' + n.currentImage.attr("src") + '" style="position:absolute; width:' + e.width() + "px; height:auto; display:block !important; top:0; left:-" + (o + r * o - o) + 'px;" /></div>').css({
                        left: o * r + "px",
                        width: o + "px",
                        height: a + "px",
                        opacity: "0",
                        overflow: "hidden"
                    }))
                }
            }
            i(".nivo-slice", e).height(a);
            s.stop().animate({
                height: i(n.currentImage).height()
            }, t.animSpeed)
        };
        var u = function(e, t, n) {
            if (i(n.currentImage).parent().is("a")) i(n.currentImage).parent().css("display", "block");
            i('img[src="' + n.currentImage.attr("src") + '"]', e).not(".nivo-main-image,.nivo-control img").width(e.width()).css("visibility", "hidden").show();
            var a = Math.round(e.width() / t.boxCols),
                r = Math.round(i('img[src="' + n.currentImage.attr("src") + '"]', e).not(".nivo-main-image,.nivo-control img").height() / t.boxRows);
            for (var o = 0; o < t.boxRows; o++) {
                for (var c = 0; c < t.boxCols; c++) {
                    if (c === t.boxCols - 1) {
                        e.append(i('<div class="nivo-box" name="' + c + '" rel="' + o + '"><img src="' + n.currentImage.attr("src") + '" style="position:absolute; width:' + e.width() + "px; height:auto; display:block; top:-" + r * o + "px; left:-" + a * c + 'px;" /></div>').css({
                            opacity: 0,
                            left: a * c + "px",
                            top: r * o + "px",
                            width: e.width() - a * c + "px"
                        }));
                        i('.nivo-box[name="' + c + '"]', e).height(i('.nivo-box[name="' + c + '"] img', e).height() + "px")
                    } else {
                        e.append(i('<div class="nivo-box" name="' + c + '" rel="' + o + '"><img src="' + n.currentImage.attr("src") + '" style="position:absolute; width:' + e.width() + "px; height:auto; display:block; top:-" + r * o + "px; left:-" + a * c + 'px;" /></div>').css({
                            opacity: 0,
                            left: a * c + "px",
                            top: r * o + "px",
                            width: a + "px"
                        }));
                        i('.nivo-box[name="' + c + '"]', e).height(i('.nivo-box[name="' + c + '"] img', e).height() + "px")
                    }
                }
            }
            s.stop().animate({
                height: i(n.currentImage).height()
            }, t.animSpeed)
        };
        var h = function(e, t, n, a) {
            var r = e.data("nivo:vars");
            if (r && r.currentSlide === r.totalSlides - 1) {
                n.lastSlide.call(this)
            }
            if ((!r || r.stop) && !a) {
                return false
            }
            n.beforeChange.call(this);
            if (!a) {
                s.attr("src", r.currentImage.attr("src"))
            } else {
                if (a === "prev") {
                    s.attr("src", r.currentImage.attr("src"))
                }
                if (a === "next") {
                    s.attr("src", r.currentImage.attr("src"))
                }
            }
            r.currentSlide++;
            if (r.currentSlide === r.totalSlides) {
                r.currentSlide = 0;
                n.slideshowEnd.call(this)
            }
            if (r.currentSlide < 0) {
                r.currentSlide = r.totalSlides - 1
            }
            if (i(t[r.currentSlide]).is("img")) {
                r.currentImage = i(t[r.currentSlide])
            } else {
                r.currentImage = i(t[r.currentSlide]).find("img:first")
            }
            if (n.controlNav) {
                i("a", r.controlNavEl).removeClass("active");
                i("a:eq(" + r.currentSlide + ")", r.controlNavEl).addClass("active")
            }
            c(n);
            i(".nivo-slice", e).remove();
            i(".nivo-box", e).remove();
            var o = n.effect,
                l = "";
            if (n.effect === "random") {
                l = new Array("sliceDownRight", "sliceDownLeft", "sliceUpRight", "sliceUpLeft", "sliceUpDown", "sliceUpDownLeft", "fold", "fade", "boxRandom", "boxRain", "boxRainReverse", "boxRainGrow", "boxRainGrowReverse");
                o = l[Math.floor(Math.random() * (l.length + 1))];
                if (o === undefined) {
                    o = "fade"
                }
            }
            if (n.effect.indexOf(",") !== -1) {
                l = n.effect.split(",");
                o = l[Math.floor(Math.random() * l.length)];
                if (o === undefined) {
                    o = "fade"
                }
            }
            if (r.currentImage.attr("data-transition")) {
                o = r.currentImage.attr("data-transition")
            }
            r.running = true;
            var d = 0,
                f = 0,
                h = "",
                p = "",
                g = "",
                x = "";
            if (o === "sliceDown" || o === "sliceDownRight" || o === "sliceDownLeft") {
                v(e, n, r);
                d = 0;
                f = 0;
                h = i(".nivo-slice", e);
                if (o === "sliceDownLeft") {
                    h = i(".nivo-slice", e)._reverse()
                }
                h.each(function() {
                    var t = i(this);
                    t.css({
                        "top": "0px"
                    });
                    if (f === n.slices - 1) {
                        setTimeout(function() {
                            t.animate({
                                opacity: "1.0"
                            }, n.animSpeed, "", function() {
                                e.trigger("nivo:animFinished")
                            })
                        }, 100 + d)
                    } else {
                        setTimeout(function() {
                            t.animate({
                                opacity: "1.0"
                            }, n.animSpeed)
                        }, 100 + d)
                    }
                    d += 50;
                    f++
                })
            } else if (o === "sliceUp" || o === "sliceUpRight" || o === "sliceUpLeft") {
                v(e, n, r);
                d = 0;
                f = 0;
                h = i(".nivo-slice", e);
                if (o === "sliceUpLeft") {
                    h = i(".nivo-slice", e)._reverse()
                }
                h.each(function() {
                    var t = i(this);
                    t.css({
                        "bottom": "0px"
                    });
                    if (f === n.slices - 1) {
                        setTimeout(function() {
                            t.animate({
                                opacity: "1.0"
                            }, n.animSpeed, "", function() {
                                e.trigger("nivo:animFinished")
                            })
                        }, 100 + d)
                    } else {
                        setTimeout(function() {
                            t.animate({
                                opacity: "1.0"
                            }, n.animSpeed)
                        }, 100 + d)
                    }
                    d += 50;
                    f++
                })
            } else if (o === "sliceUpDown" || o === "sliceUpDownRight" || o === "sliceUpDownLeft") {
                v(e, n, r);
                d = 0;
                f = 0;
                var w = 0;
                h = i(".nivo-slice", e);
                if (o === "sliceUpDownLeft") {
                    h = i(".nivo-slice", e)._reverse()
                }
                h.each(function() {
                    var t = i(this);
                    if (f === 0) {
                        t.css("top", "0px");
                        f++
                    } else {
                        t.css("bottom", "0px");
                        f = 0
                    }
                    if (w === n.slices - 1) {
                        setTimeout(function() {
                            t.animate({
                                opacity: "1.0"
                            }, n.animSpeed, "", function() {
                                e.trigger("nivo:animFinished")
                            })
                        }, 100 + d)
                    } else {
                        setTimeout(function() {
                            t.animate({
                                opacity: "1.0"
                            }, n.animSpeed)
                        }, 100 + d)
                    }
                    d += 50;
                    w++
                })
            } else if (o === "fold") {
                v(e, n, r);
                d = 0;
                f = 0;
                i(".nivo-slice", e).each(function() {
                    var t = i(this);
                    var a = t.width();
                    t.css({
                        top: "0px",
                        width: "0px"
                    });
                    if (f === n.slices - 1) {
                        setTimeout(function() {
                            t.animate({
                                width: a,
                                opacity: "1.0"
                            }, n.animSpeed, "", function() {
                                e.trigger("nivo:animFinished")
                            })
                        }, 100 + d)
                    } else {
                        setTimeout(function() {
                            t.animate({
                                width: a,
                                opacity: "1.0"
                            }, n.animSpeed)
                        }, 100 + d)
                    }
                    d += 50;
                    f++
                })
            } else if (o === "fade") {
                v(e, n, r);
                p = i(".nivo-slice:first", e);
                p.css({
                    "width": e.width() + "px"
                });
                p.animate({
                    opacity: "1.0"
                }, n.animSpeed * 2, "", function() {
                    e.trigger("nivo:animFinished")
                })
            } else if (o === "slideInRight") {
                v(e, n, r);
                p = i(".nivo-slice:first", e);
                p.css({
                    "width": "0px",
                    "opacity": "1"
                });
                p.animate({
                    width: e.width() + "px"
                }, n.animSpeed * 2, "", function() {
                    e.trigger("nivo:animFinished")
                })
            } else if (o === "slideInLeft") {
                v(e, n, r);
                p = i(".nivo-slice:first", e);
                p.css({
                    "width": "0px",
                    "opacity": "1",
                    "left": "",
                    "right": "0px"
                });
                p.animate({
                    width: e.width() + "px"
                }, n.animSpeed * 2, "", function() {
                    p.css({
                        "left": "0px",
                        "right": ""
                    });
                    e.trigger("nivo:animFinished")
                })
            } else if (o === "boxRandom") {
                u(e, n, r);
                g = n.boxCols * n.boxRows;
                f = 0;
                d = 0;
                x = m(i(".nivo-box", e));
                x.each(function() {
                    var t = i(this);
                    if (f === g - 1) {
                        setTimeout(function() {
                            t.animate({
                                opacity: "1"
                            }, n.animSpeed, "", function() {
                                e.trigger("nivo:animFinished")
                            })
                        }, 100 + d)
                    } else {
                        setTimeout(function() {
                            t.animate({
                                opacity: "1"
                            }, n.animSpeed)
                        }, 100 + d)
                    }
                    d += 20;
                    f++
                })
            } else if (o === "boxRain" || o === "boxRainReverse" || o === "boxRainGrow" || o === "boxRainGrowReverse") {
                u(e, n, r);
                g = n.boxCols * n.boxRows;
                f = 0;
                d = 0;
                var S = 0;
                var b = 0;
                var I = [];
                I[S] = [];
                x = i(".nivo-box", e);
                if (o === "boxRainReverse" || o === "boxRainGrowReverse") {
                    x = i(".nivo-box", e)._reverse()
                }
                x.each(function() {
                    I[S][b] = i(this);
                    b++;
                    if (b === n.boxCols) {
                        S++;
                        b = 0;
                        I[S] = []
                    }
                });
                for (var y = 0; y < n.boxCols * 2; y++) {
                    var R = y;
                    for (var N = 0; N < n.boxRows; N++) {
                        if (R >= 0 && R < n.boxCols) {
                            (function(t, a, r, s, c) {
                                var l = i(I[t][a]);
                                var d = l.width();
                                var f = l.height();
                                if (o === "boxRainGrow" || o === "boxRainGrowReverse") {
                                    l.width(0).height(0)
                                }
                                if (s === c - 1) {
                                    setTimeout(function() {
                                        l.animate({
                                            opacity: "1",
                                            width: d,
                                            height: f
                                        }, n.animSpeed / 1.3, "", function() {
                                            e.trigger("nivo:animFinished")
                                        })
                                    }, 100 + r)
                                } else {
                                    setTimeout(function() {
                                        l.animate({
                                            opacity: "1",
                                            width: d,
                                            height: f
                                        }, n.animSpeed / 1.3)
                                    }, 100 + r)
                                }
                            })(N, R, d, f, g);
                            f++
                        }
                        R--
                    }
                    d += 100
                }
            }
        };
        var m = function(i) {
            for (var e, t, n = i.length; n; e = parseInt(Math.random() * n, 10), t = i[--n], i[n] = i[e], i[e] = t);
            return i
        };
        var p = function(i) {
            if (this.console && typeof console.log !== "undefined") {
                console.log(i)
            }
        };
        this.stop = function() {
            if (!i(e).data("nivo:vars").stop) {
                i(e).data("nivo:vars").stop = true;
                p("Stop Slider")
            }
        };
        this.start = function() {
            if (i(e).data("nivo:vars").stop) {
                i(e).data("nivo:vars").stop = false;
                p("Start Slider")
            }
        };
        n.afterLoad.call(this);
        return this
    };
    i.fn.nivoSlider = function(t) {
        return this.each(function(n, a) {
            var r = i(this);
            if (r.data("nivoslider")) {
                return r.data("nivoslider")
            }
            var o = new e(this, t);
            r.data("nivoslider", o)
        })
    };
    i.fn.nivoSlider.defaults = {
        effect: "sliceUp",
        slices: 15,
        boxCols: 8,
        boxRows: 4,
        animSpeed: 500,
        pauseTime: 3e3,
        startSlide: 0,
        directionNav: true,
        controlNav: true,
        controlNavThumbs: false,
        pauseOnHover: true,
        manualAdvance: false,
        prevText: "Prev",
        nextText: "Next",
        randomStart: false,
        beforeChange: function() {},
        afterChange: function() {},
        slideshowEnd: function() {},
        lastSlide: function() {},
        afterLoad: function() {}
    };
    i.fn._reverse = [].reverse
})(jQuery);