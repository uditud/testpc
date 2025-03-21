jQuery(window).load(function() {
    if (jQuery("#slider") > 0) {
        jQuery(".nivoSlider").nivoSlider({
            effect: "fade"
        })
    } else {
        jQuery("#slider").nivoSlider({
            effect: "fade"
        })
    }
});
var ww = jQuery(window).width();
jQuery(document).ready(function() {
    jQuery(".sitenav li a").each(function() {
        if (jQuery(this).next().length > 0) {
            jQuery(this).addClass("parent")
        };
    });
    jQuery(".toggleMenu").click(function(e) {
        e.preventDefault();
        jQuery(this).toggleClass("active");
        jQuery(".sitenav").slideToggle("fast")
    });
    adjustMenu()
});
jQuery(window).bind("resize orientationchange", function() {
    ww = jQuery(window).width();
    adjustMenu()
});
var adjustMenu = function() {
    if (ww < 767) {
        jQuery(".toggleMenu").css("display", "block");
        if (!jQuery(".toggleMenu").hasClass("active")) {
            jQuery(".sitenav").hide()
        } else {
            jQuery(".sitenav").show()
        }
        jQuery(".sitenav li").unbind("mouseenter mouseleave")
    } else {
        jQuery(".toggleMenu").css("display", "none");
        jQuery(".sitenav").show();
        jQuery(".sitenav li").removeClass("hover");
        jQuery(".sitenav li a").unbind("click");
        jQuery(".sitenav li").unbind("mouseenter mouseleave").bind("mouseenter mouseleave", function() {
            jQuery(this).toggleClass("hover")
        })
    }
};
jQuery(window).scroll(function() {
    jQuery(".services-wrap").each(function() {
        var e = jQuery(this).offset().top;
        var n = jQuery(window).scrollTop();
        if (e < n + 400) {
            jQuery(this).addClass("fadeInLeft")
        }
    });
    jQuery(".welcomewrap").each(function() {
        var e = jQuery(this).offset().top;
        var n = jQuery(window).scrollTop();
        if (e < n + 400) {
            jQuery(this).addClass("fadeInRight")
        }
    })
});
jQuery(document).ready(function() {
    jQuery(".srchicon").click(function() {
        jQuery(".searchtop").toggle();
        jQuery(".topsocial").toggle()
    })
});
jQuery(document).ready(function() {
    jQuery(".colsxx-4 h5").each(function(e, n) {
        var i = jQuery(n);
        var u, r, t;
        u = i.html().split(/\s+/);
        r = u.pop();
        t = u.join(" ");
        i.html([t, " <span>", r, "</span>"].join(""))
    })
});