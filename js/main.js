'use strict';

$(document).ready(function() {

    var hawk = {};

    hawk = {
        w: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        h: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,

        hash: window.location.hash,
        anchorSufix: '-anchor',
    }

    hawk.scrollToElement = function(options) {
        const defaultOptions = {
            anchor: '#top' + hawk.anchorSufix,
            callback: function() {},
            delay: 0
        };

        options = Object.assign(defaultOptions, options);

        setTimeout(function(){
            $.scrollTo(options.anchor, 800, {'axis': 'y', 'offset': 0, onAfter: function() { options.callback(); } });
        }, options.delay);
    }

    hawk.Dropdown = function(element) {
        this.container = $(element);
        this.containerClass = 'dropdown';
        this.openClass = this.containerClass + '--open';

        this.header = this.container.find('.' + this.containerClass + '__header');
        this.list = this.container.find('.' + this.containerClass + '__list');

        this.states = {
            open: 'open',
            closed: 'closed'
        };

        this.options = {
            slideSpeed: 200
        };

        this.state = this.states.open;

        this.setOpen = function() {
            this.state = this.states.open;
        }

        this.setClosed = function() {
            this.state = this.states.closed;
        }

        this.isOpen = function() {
            if(this.state == this.states.open) {
                return true;
            } else {
                return false;
            }
        }

        this.show = function() {
            const that = this;

            this.container.addClass(that.openClass);
            this.list.slideDown(that.options.slideSpeed);
            this.setOpen();
        }

        this.hide = function() {
            const that = this;

            this.container.removeClass(that.openClass);
            this.list.slideUp(that.options.slideSpeed);
            this.setClosed();
        }

        this.run = function() {
            const that = this;

            this.hide();

            this.container.click(function(e) {
                e.stopPropagation();
            });

            this.header.click(function(e) {
                e.preventDefault();
                e.stopPropagation();

                if(that.isOpen()) {
                    that.hide();
                } else {
                    that.show();
                }
            });

            $('*').not(this.container).not(this.header).not(this.header.find('*')).not(this.list).not(this.list.find('*')).click(function() {
                that.hide();
            });
        }
    }

    hawk.initializeDropdowns = function() {
        const dropdowns = $('.dropdown');
        const that = this;

        dropdowns.each(function() {
            const dropdown = new that.Dropdown($(this));
            dropdown.run();
        });
    }

    hawk.OverlayerManager = function(id) {
        this.container = $('#' + id);
        this.overlayerId = this.container.attr('data-overlayer-id');
        this.contentContainer = this.container.find('.overlayer__content').first();

        this.buttons = $('.overlayer-button[data-overlayer-id=' + this.overlayerId + ']');
        this.contents = $('.overlayer-content[data-overlayer-id=' + this.overlayerId + ']');

        this.options = {
            fadeSpeed: 400
        };

        this.show = function(callback) {
            const that = this;

            this.container.fadeIn(that.options.fadeSpeed, function() {
                if(callback !== undefined) {
                    callback();
                }
            });
        }

        this.hide = function(callback) {
            const that = this;

            this.container.fadeOut(that.options.fadeSpeed, function() {
                if(callback !== undefined) {
                    callback();
                }
            });
        }

        this.setContent = function(content) {
            this.contentContainer.html(content);
        }

        this.run = function() {
            const that = this;

            this.buttons.click(function(e) {
                e.stopPropagation();
                e.preventDefault();


            });
        }
    }

    hawk.run = function() { 
        if(this.hash.length != 0) {
            this.scrollToElement({ anchor: this.hash + this.anchorSufix, delay: 200 });
        }

        this.initializeDropdowns();
    }

    hawk.run();

    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    var rwdWidth = 500;

    $('.site-header .layer').css({'height': h + "px"});

    var scrollToElement = function(anchor, callback, delay) {
        setTimeout(function(){
            $.scrollTo(anchor, 800, {'axis': 'y', 'offset': 0, onAfter: function() { callback(); } });
        }, delay);
    }

    var hash = window.location.hash;
    var anchor_str = '-anchor';

    /**if(hash.length != 0) {
        scrollToElement(hash + anchor_str, function() {}, 200);
    }
**/
    // baguetteBox.run('.gallery');

    function SlideMenu(id) {
        this.menu = $('#' + id);
        this.wrapper = this.menu.find('> div');
        this.duration = 500;

        this.wrapper.css({opacity: 0});

        this.show = function() {
            var that = this;

            this.menu.show({
                effect: 'slide',
                duration: this.duration,
                direction: 'right',
                complete: function () {
                        setTimeout(function() { that.wrapper.animate({opacity: 1}, 200); }, 100);
                    }
            });
        };

        this.hide = function() {
            var that = this;

            this.wrapper.animate({opacity: 0}, 200, function() {
                    setTimeout(function() { that.menu.hide({
                        duration: that.duration,
                        effect: 'slide',
                        direction: 'right'
                    });
                }, 200);
            });
        };

        this.run = function() {
            var that = this;
            $('.menu-toggler').click(function() {
                that.show();
            });

            $('.menu-close').click(function() {
                that.hide();
            });
        }
    }

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

    function OverlayerManager(id) {
        this.container = $('#' + id);
        this.overlayerId = parseInt(this.container.attr('data-overlayer-id'));
        this.overlayerInner = this.container.find('.overlayer-inner');
        this.contentContainer = this.container.find('.overlayer-content');
        this.buttons = $('.overlayer-button[data-overlayer-id=' + this.overlayerId + ']');
        this.closeButton = $(this.container.find('.close-icon'));

        this.show = function(callback) {
            this.container.fadeIn(400, function() {
                if(callback !== undefined) {
                    callback();
                }

                $('body').css('overflow', 'hidden');
            });
        };

        this.hide = function(callback) {
            this.container.fadeOut(400, function() {
                if(callback !== undefined) {
                    callback();
                }

                $('body').css('overflow', 'auto');
            });
        }

        this.changeContent = function(content) {
            this.contentContainer.html(content);
        };

        this.run = function() {
            var that = this;

            $(this.buttons).click(function(e) {
                e.preventDefault();
                e.stopPropagation();

                var id = $(this).attr('data-id');

                that.changeContent($('.for-overlayer[data-id=' + id + ']').html());
                that.show(function() {
                    /**$(that.container).click(function() {
                        that.hide(function() { $('body').css('overflow', 'auto'); });
                    });

                    $(that.container.find('.overlayer-inner :not(.close-icon, .close-icon *)')).click(function(e) {
                        e.stopPropagation();
                        return;
                    });**/
                });
            });

            this.container.find('.close-icon').click(function() {
                that.hide();
            });

            $('html').click(function() {
                that.hide();
            });

            this.overlayerInner.click(function(e) {
                e.stopPropagation();
            });
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

    var bookmarks = new BookmarksSlider('step-by-step');
    bookmarks.run();

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

    var faq = new RollingOutList('faq');
    faq.run();

    $('.quotes .slider').unslider({
        autoplay: true,
        delay: 8000,
        arrows: false,
        animateHeight: true
    });

    var anchorsInitialize = function() {
        $('a').click(function(e) {
            var regex = /#{1}.+$/;
            var link = this;

            var href = $(this).attr('href');
            var anchor;

            if(anchor = regex.exec(href)) {
                if($(anchor + anchor_str).length) {
                    e.preventDefault();

                    var delay = 300;

                    if($(link).parents('#main-menu').length) {
                        var extra_delay = mainmenu.duration;
                        delay = delay + extra_delay + 100;

                        mainmenu.hide();   
                    }

                    if($(link).parents('#overlayer').length) {
                        var extra_delay = overlayer.duration;
                        delay = delay + extra_delay;

                        overlayer.hide();   
                    }

                    scrollToElement(anchor + anchor_str, function() { window.location.hash = anchor; }, delay);
                }
            }
        });
    };

    anchorsInitialize();

    /**if(!detectIE()) {
        $('.section-02').parallax({ imageSrc: '/img/bg-02.jpg' });
    } else {
        $('.section-02').css({ 'background': 'url(/img/bg-02.jpg) no-repeat center', 'background-size': 'cover' });
    }**/
    
    //$('.section-06').parallax({ imageSrc: '/img/bg-03.jpg' }); 

    var reloadFunctions = function() {
        jQuery(window).trigger('resize').trigger('scroll');
    }

    $( "select" ).change(function () {
        var selected = $(this).find("option:selected");

        if(selected.val() == '0') {
            $(this).addClass('placeholder');
        } else {
            $(this).removeClass('placeholder');
        }
      })
      .change();

    $("#form-contact").submit(function(e) {
        e.preventDefault();

        var lang = $('html').attr('lang');
        var form = $(this);

        var nameField = form.find('#name');
        var emailField = form.find('#email');

        var name = nameField.val();
        var email = emailField.val();

        if(form.attr('disabled') == 'disabled') return false;

        $.ajax({
                type: "POST",
                url: "/ajax.php",
                dataType: "json",
                data: { 'action': 'mail', 'name': name, 'email': email },
                success: function(result)
                {
                    var showMessage = function() {
                        form.find('.form-info').html(result.message).fadeIn();
                    }

                    form.find('.form-info').fadeOut(200, function() {
                        if(!result.error) {
                            ga('send', 'pageview', 'wyslano-formularz');

                            form.find('button').animate({ opacity: 0 }, 200, function() { showMessage(); });
                            form.attr('disabled', 'disabled');
                            nameField.attr('disabled', 'disabled');
                            emailField.attr('disabled', 'disabled');
                        } else {
                            showMessage();
                        }
                    });
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            }); 
    });

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

    var subject = new choisesList('subject');
    subject.run();


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

    refreshHeaderVideo();

    $(window).resize(function() {
        w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            
        $('.site-header .layer').css({'height': h + "px"});

        refreshHeaderVideo();
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

        $('.ga-to-check').viewportChecker({
        classToAdd: '', // Class to add to the elements when they are visible,
        classToAddForFullView: '', // Class to add when an item is completely visible in the viewport
        classToRemove: '', // Class to remove before adding 'classToAdd' to the elements
        removeClassAfterAnimation: false, // Remove added classes after animation has finished
        offset: 0, // The offset of the elements (let them appear earlier or later). This can also be percentage based by adding a '%' at the end
        invertBottomOffset: true, // Add the offset as a negative number to the element's bottom
        repeat: false, // Add the possibility to remove the class if the elements are not visible
        callbackFunction: function(elem, action){
            var dataga = $(elem).attr('data-ga-id');

            ga('send', 'pageview', dataga);
        }, // Callback to do after a class was added to an element. Action will return "add" or "remove", depending if the class was added or removed
        scrollHorizontal: false // Set to true if your website scrolls horizontal instead of vertical.
    });
});

