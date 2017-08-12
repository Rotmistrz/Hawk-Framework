'use strict';

var getCurrentValue = function(el, prop) {
    var style = el.currentStyle || window.getComputedStyle(el);

    return style[prop];
}

var hawkSlideDown = function(element, time) {
    var currentHeight;
    var currentPaddingTop;
    var currentPaddingBottom;
    var currentMaxHeight;

    element.style.display = "block";

    var totalHeight = element.scrollHeight;

    var a = parseFloat(totalHeight / time);

    console.log(a);

    var paddingTop = parseInt(getCurrentValue(element, "padding-top"));
    var paddingBottom = parseInt(getCurrentValue(element, "padding-bottom"));

    element.style.overflow = "hidden";
    element.style.maxHeight = 0;
    element.style.paddingTop = 0;
    element.style.paddingBottom = 0;

    var interval = setInterval(function() {
        currentPaddingTop = parseFloat(element.style.paddingTop);
        currentPaddingBottom = parseFloat(element.style.paddingBottom);
        currentMaxHeight = parseFloat(element.style.maxHeight);

        if(paddingTop > currentPaddingTop + a) {
            element.style.paddingTop = currentPaddingTop + a + "px";
        }

        if(totalHeight > currentMaxHeight + a) {
            element.style.maxHeight = currentMaxHeight + a + "px";
        }

        if(paddingBottom > currentPaddingBottom + a) {
            element.style.paddingBottom = currentPaddingBottom + a + "px";
        }

        if(currentPaddingTop + currentMaxHeight + currentPaddingBottom >= element.scrollHeight) {
            element.style.maxHeight = "100%";
            element.style.overflow = "auto";
            clearInterval(interval);
        }
        
    }, 1);
}

// hawkSlideDown(document.getElementById('home-anchor'), 500);

$(document).ready(function() {

    hawk.run();

    baguetteBox.run('.baguette-box');

    function AjaxOverlayerManager(id) {
        this.container = $('#' + id);
        this.overlayerId = parseInt(this.container.attr('data-overlayer-id'));
        this.contentContainer = this.container.find('.overlayer-body');
        this.buttons = $('.overlayer-button[data-overlayer-id=' + this.overlayerId + ']');
        this.closeButton = $(this.container.find('.close-icon'));
        this.duration = 400;

        this.show = function(callback) {
            this.container.fadeIn(this.duration, function() {
                $('body').css('overflow', 'hidden');

                if(callback !== undefined) {
                    callback();
                }
            });
        };

        this.hide = function(callback) {
            this.container.fadeOut(this.duration, function() {
                $('body').css('overflow', 'auto');

                if(callback !== undefined) {
                    callback();
                }
            });
        }

        this.changeContent = function(content) {
            this.contentContainer.html(content);
        };

        this.loadContent = function(id) {
            var that = this;
            var lang = $('html').attr('lang');

            $.ajax({
                type: "POST",
                url: "/ajax.php",
                dataType: "json",
                data: { 'action': 'load-overlayer', 'id': id, 'lang': lang },
                success: function(result)
                {
                    if(result.error > 0) {
                        return;
                    }

                    ga('send', 'pageview', 'warstwa-' + result['anchor']);

                    that.changeContent(result['html']);
                    that.show(function() {
                        that.closeButton.click(function() {
                            that.hide();
                            $(that.container).find('iframe').attr('src', 0);
                        });

                        window.location.hash = result['anchor'];

                        anchorsInitialize();
                    });
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            });
        }

        this.run = function() {
            var that = this;

            $(this.buttons).click(function(e) {
                e.preventDefault();
                e.stopPropagation();

                var id = $(this).attr('data-id');

                that.loadContent(id);
            });

            this.container.find('.close-icon').click(function() {
                that.hide(function() { $('body').css('overflow', 'auto'); });
            });

            var hash = window.location.hash;
            
            var pattern = /n_[0-9]+(-[a-zA-Z0-9]+)+/
            if(pattern.test(hash)) {
                var parts = hash.split('_');

                hash = parts[1];

                parts = hash.split('-');

                console.log(parts[0]);
                this.loadContent(parts[0]); 
            }
        };
    }


    function BookmarksSlider(container) {
        this.container = $('#' + container);
        this.id = container;
        this.current;
        this.recent = null;
        this.isResponsive = 0;

        this.options = {
            responsiveWidth: 850,
            responsiveClassname: 'bookmarks-responsive',
            duration: 400
        };

        this.removeActiveBookmark = function() {
            var current = $(this.container).find('.active');
            var bookmark = current.find('.bookmark');
            var that = this;

            current.removeClass('active');

            current.find('.underline').animate({ left: '-100%' }, 300); 
        }

        this.setActiveBookmark = function(element, callback) {
            var that = this;
            this.current = $(element);
            
            that.current.addClass('active');

            that.current.find('.underline').animate({ left: 0 }, 300); 
        }

        this.changeSlide = function() {
            var content = $(this.current).find('.for-slide').html();

            this.removeActiveBookmark();
            this.setActiveBookmark($(this.current), function() {
                /**if(w < 992) {
                    scrollToElement('#' + that.id + '-content', function() {}, 0);
                }**/
            });

            this.changeSlideContent(content);
        }

        this.changeSlideContent = function(content) {
            var that = this;
            var content_container = $(this.container).find('.current-bookmark-content');

            if(content_container.is(':visible')) {
                content_container.animate({opacity: 0}, that.options.duration, function() {
                    $(this).html(content);
                    var thisthat = $(this);

                    setTimeout(function() {
                        $(thisthat).animate({opacity: 1}, that.options.duration);
                    }, 200);
                });  
            } else {
                /**this.container.find('.bookmark-content').animate({ opacity: 0 }, that.options.duration).html('');

                $(this.current.find('.bookmark-content').get(0)).css({ opacity: 0 }).html(content).animate({ opacity: 1 }, that.options.duration);**/

                if(that.recent !== null) {
                    that.recent.find('.for-slide').slideUp(400, function() {
                        that.current.find('.for-slide').slideDown(400);
                    });
                } else {
                    that.current.find('.for-slide').slideDown(400);
                }
                

                
            }
        }

        this.isActiveBookmark = function(bookmark) {
            if( $(bookmark).is($(this.current)) ) {
                return true;
            } else {
                return false;
            }
        }

        this.remindActiveBookmark = function() {
            var that = this;
        }

        this.setResponsive = function() {
            this.container.addClass(this.options.responsiveClassname);
            this.container.find('.current-bookmark-content').hide();
            this.isResponsive = 1;
        }

        this.unsetResponsive = function() {
            this.container.removeClass(this.options.responsiveClassname);
            this.container.find('.current-bookmark-content').show();
            this.container.find('.bookmark-content').each(function() {
                $(this).empty();
            });
            this.isResponsive = 0;
        }

        this.toggleResponsive = function() {
            if(this.isResponsive == 0) {
                this.setResponsive();
            } else {
                this.unsetResponsive();
            }

            this.changeSlide();
        }

        this.checkResponsive = function() {
            if((w < this.options.responsiveWidth && this.isResponsive == 0) || (w > this.options.responsiveWidth && this.isResponsive == 1)) {
                this.toggleResponsive();
            }
        }

        this.setFirstBookmarkActive = function() {
            this.current = $(this.container).find('.bookmarks > li:first-child');
            this.changeSlide();
        }

        this.run = function() {
            var that = this;

            this.checkResponsive();

            this.container.find('.bookmarks > li.single-bookmark-container').click(function() {
                if(that.isActiveBookmark(this)) {
                    that.remindActiveBookmark();
                    return;
                }

                that.recent = that.current;
                that.current = this;
                
                that.changeSlide();
            });

            this.setFirstBookmarkActive();
            
            $(window).resize(function() {
                that.checkResponsive();

                if(!that.isResponsive) {
                    that.container.find('.for-slide').css({ 'display': 'none' });
                }
            });
        }
    }

    function RollingOutList(id) {
        this.id = id;
        this.container = $('#' + id);
        this.questions = this.container.find('.question');
        this.answers = this.container.find('.answer');
        this.current;

        this.options = {
            duration: 400,

            arrow: {
                downwardsAngle: 135,
                upwardsAngle: -45,
                downwardsTopDistance: 14,
                upwardsTopDistance: 17,
                duration: 200
            }
        }

        this.hide = function(question) {
            var that = this;

            $(question).siblings('.answer').slideUp(that.options.duration);

            var arrow = $(question).find('.arrow');
            arrow.animate({ opacity: 0 }, that.options.arrow.duration, function() {
                arrow.css({ 'transform': 'rotate(' + that.options.arrow.downwardsAngle + 'deg)', top: that.options.arrow.downwardsTopDistance + 'px' });

                arrow.animate({ opacity: 1 });
            });
        }

        this.show = function(question) {
            var that = this;
            var recent = this.current;
            var arrow = $(question).find('.arrow');

            this.current = question;
            this.hide(recent);

            $(question).siblings('.answer').slideDown(that.options.duration);
            arrow.animate({ opacity: 0 }, that.options.arrow.duration, function() {
                arrow.css({ 'transform': 'rotate(' + that.options.arrow.upwardsAngle + 'deg)', top: that.options.arrow.upwardsTopDistance + 'px' });

                arrow.animate({ opacity: 1 });
            });
        }

        this.run = function() {
            var that = this;

            this.answers.hide();

            this.questions.click(function() {
                if(that.current !== this) {
                    that.show(this);
                } else {
                    that.hide(this);
                }
            });
        }
    }


    var reloadFunctions = function() {
        jQuery(window).trigger('resize').trigger('scroll');
    }

    /**var chosen;
    var current;
    var currentChoiseList;

    $('.choises').hide();
    $('.choise-list .choise').click(function() {
        $(this).siblings('.choises').slideToggle(200);
    });
    $('.choises label').click(function() {
        chosen = $(this).find('div').clone();
        chosen.hide();

        currentChoiseList = $(this).parents('.choise-list');
        current = currentChoiseList.find('.choise');

        current.find('div').hide({
            effect: 'slide',
            duration: 200,
            direction: 'left',
            complete: function () {
                $(current).html('').append(chosen);
                chosen.show({
                    effect: 'slide',
                    direction: 'left',
                    complete: function() {
                        currentChoiseList.find('.choises').slideUp(200);
                    }
                });
            }
        });
    });**/

    function choisesList(container) {
        this.container = $('#' + container);
        this.chosen;
        this.current;
        this.currentChoiseList;
        this.choises = $('.choises');
        this.choise = this.container.find('.choise');

        this.setChosen = function(element) {
            var that = this;

            $(element).hide();
            this.choises.slideUp(200);

            this.choise.find('div').hide({
                effect: 'slide',
                duration: 200,
                direction: 'left',
                complete: function () {
                    $(that.choise).html('').append(element);
                    $(element).show({
                        effect: 'slide',
                        direction: 'left',
                        complete: function() {
                            
                        }
                    });
                }
            });
        }

        this.run = function() {
            var that = this;

            this.choises.hide();
            
            this.choise.click(function() {
                if(that.container.attr('disabled') != 'disabled') {
                    that.choises.slideToggle(200);
                }
            });

            this.choises.find('label').click(function() {
                that.chosen = $(this).find('div').clone();

                that.setChosen(that.chosen);
            });
        }  
    }

    var refreshHeaderVideo = function() {
        var newWidth = h*1.78;
        var widthDifference = newWidth - w;

        var newHeight = w/1.78;
        var heightDifference = newHeight - h;

        if(w < h*1.77777) {
            $('.site-header .vimeo').css({ padding: 0, height: h + 'px', width: newWidth + 'px', margin: '0 0 0 -' + widthDifference/2 + 'px' });
        } else {
            $('.site-header .vimeo').css({ padding: 0, height: newHeight + 'px', width: w + 'px', margin: -heightDifference/2 + 'px 0 0 0' });
        }
    }


    $(window).resize(function() {
            
    });

    function detectIE() {
          var ua = window.navigator.userAgent;

          // Test values; Uncomment to check result …

          // IE 10
          // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
          
          // IE 11
          // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
          
          // Edge 12 (Spartan)
          // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
          
          // Edge 13
          // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

          var msie = ua.indexOf('MSIE ');
          if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
          }

          var trident = ua.indexOf('Trident/');
          if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
          }

          var edge = ua.indexOf('Edge/');
          if (edge > 0) {
            // Edge (IE 12+) => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
          }

          // other browser
          return false;
        }
});

