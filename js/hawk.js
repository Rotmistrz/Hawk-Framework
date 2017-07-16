var hawk = {};

hawk = {
    w: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    h: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,

    hash: window.location.hash,
    anchorSufix: '-anchor',
}

hawk.mergeObjects = function(mainObject, object) {
    var result = {};

    if(object === undefined) {
        return mainObject;
    }

    for (var property in mainObject) {
        if (mainObject.hasOwnProperty(property)) {
            result[property] = (object.hasOwnProperty(property)) ? object[property] : mainObject[property];
        }

        //console.log("object." + property + ": " + result[property]);
    }

    return result;
}

hawk.scrollToElement = function(options) {
    var defaultOptions = {
        anchor: '#top' + hawk.anchorSufix,
        callback: function() {},
        delay: 0
    };

    options = hawk.mergeObjects(defaultOptions, options);

    setTimeout(function(){
        $.scrollTo(options.anchor, 800, {'axis': 'y', 'offset': 0, onAfter: function() { options.callback(); } });
    }, options.delay);
}

hawk.Dropdown = function(element, options) {
    this.container = $(element);
    this.containerClass = 'dropdown';
    this.openClass = this.containerClass + '--open';

    this.header = this.container.find('.' + this.containerClass + '__header');
    this.list = this.container.find('.' + this.containerClass + '__list');

    this.states = {
        open: 'open',
        closed: 'closed'
    };

    this.defaultOptions = {
        slideSpeed: 200
    };

    this.options = hawk.mergeObjects(this.defaultOptions, options);

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
        var that = this;

        this.container.addClass(that.openClass);
        this.list.slideDown(that.options.slideSpeed);
        this.setOpen();
    }

    this.hide = function() {
        var that = this;

        this.container.removeClass(that.openClass);
        this.list.slideUp(that.options.slideSpeed);
        this.setClosed();
    }

    this.run = function() {
        var that = this;

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
    var dropdowns = $('.dropdown');
    var that = this;

    dropdowns.each(function() {
        var dropdown = new that.Dropdown($(this));
        dropdown.run();
    });
}

hawk.OverlayerManager = function(id, options) {
    this.container = $('#' + id);
    this.overlayerId = this.container.attr('data-overlayer-id');
    this.contentContainer = this.container.find('.overlayer__content').first();

    this.buttons = $('.overlayer-button[data-overlayer-id=' + this.overlayerId + ']');
    this.closeButton = this.container.find('.overlayer__close');

    this.defaultOptions = {
        fadeSpeed: 400
    };

    this.options = hawk.mergeObjects(this.defaultOptions, options);

    this.show = function(callback) {
        var that = this;

        $('body').css({ overflow: 'hidden' });

        this.container.fadeIn(that.options.fadeSpeed, function() {
            if(callback !== undefined) {
                callback();
            }
        });
    }

    this.hide = function(callback) {
        var that = this;

        this.container.fadeOut(that.options.fadeSpeed, function() {
            $('body').css({ overflow: 'auto' });

            if(callback !== undefined) {
                callback();
            }
        });
    }

    this.setContent = function(content) {
        this.contentContainer.html(content);
    }

    this.run = function() {
        var that = this;

        this.buttons.click(function(e) {
            e.stopPropagation();
            e.preventDefault();

            var id = $(this).attr('data-id');

            var current = $('.overlayer-content[data-id=' + id + ']').first();

            that.setContent(current.html());

            that.show();
        });

        that.container.click(function() {
            that.hide();
        });

        that.container.find('.overlayer__inner, .overlayer__inner :not(.overlayer__close, .overlayer__close *)').click(function(e) {
            e.stopPropagation();
            return;
        });

        this.closeButton.click(function() {
            that.hide();
        });
    }
}

hawk.AjaxOverlayerManager = function(id, options) {
    this.container = $('#' + id);
    this.overlayerId = parseInt(this.container.attr('data-overlayer-id'));
    this.contentContainer = this.container.find('.overlayer__content');
    this.buttons = $('.ajax-overlayer-button[data-overlayer-id=' + this.overlayerId + ']');
    this.closeButton = $(this.container.find('.overlayer__close'));
    
    this.defaultOptions = {
        fadeSpeed: 400,
        ajaxFilePath: "/ajax.php"
    }

    this.options = hawk.mergeObjects(this.defaultOptions, options);

    this.show = function(callback) {
        this.container.fadeIn(this.options.fadeSpeed, function() {
            $('body').css({ 'overflow': 'hidden' });

            if(callback !== undefined) {
                callback();
            }
        });
    };

    this.hide = function(callback) {
        this.container.fadeOut(this.options.fadeSpeed, function() {
            $('body').css({ 'overflow': 'auto'});

            history.pushState("", document.title, window.location.pathname + window.location.search);

            if(callback !== undefined) {
                callback();
            }
        });
    }

    this.changeContent = function(content) {
        this.contentContainer.html(content);
    }

    this.loadContent = function(id) {
        var that = this;
        var lang = $('html').attr('lang');

        $.ajax({
            type: "POST",
            url: that.options.ajaxFilePath,
            dataType: "json",
            data: { 'action': 'load-overlayer', 'id': id, 'lang': lang },
            success: function(result) {
                if(result.error > 0) {
                    return;
                }

                that.changeContent(result['html']);

                that.show(function() {
                    that.closeButton.click(function() {
                        that.hide();
                        $(that.container).find('iframe').attr('src', 0);
                    });

                    window.location.hash = result['anchor'];
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

        this.closeButton.click(function(e) {
            e.preventDefault();

            that.hide(function() { $('body').css('overflow', 'auto'); });
        });

        var hash = window.location.hash;
        
        var pattern = /n_[0-9]+(-[a-zA-Z0-9]+)+/

        if(pattern.test(hash)) {
            var parts = hash.split('_');

            hash = parts[1];

            parts = hash.split('-');

            this.loadContent(parts[0]); 
        }
    };
}

hawk.MoreContentManager = function(id, options) {
    this.id = id;
    this.moreButton = $('.more-button[data-id=' + this.id + ']');
    this.lessButton = $('.less-button[data-id=' + this.id + ']');

    this.contents = $('.more-content[data-id=' + this.id + ']');

    this.states = {
        hidden: 'hidden',
        visible: 'visible'
    };

    this.defaultOptions = {
        slideSpeed: 200,
        buttonFadeSpeed: 400
    };

    this.options = hawk.mergeObjects(this.defaultOptions, options);

    this.state;

    if(this.moreButton === undefined || this.lessButton === undefined || this.contents === undefined) {
        return false;
    }

    this.show = function() {
        var that = this;

        this.contents.slideDown(that.options.slideSpeed, function() {
            that.moreButton.fadeOut(that.options.buttonFadeSpeed, function() {
                that.lessButton.fadeIn(that.options.buttonFadeSpeed);
            });

            that.state = that.states.visible;
        });
    }

    this.hide = function() {
        var that = this;

        this.contents.slideUp(that.options.slideSpeed, function() {
            that.lessButton.fadeOut(that.options.buttonFadeSpeed, function() {
                that.moreButton.fadeIn(that.options.buttonFadeSpeed);
            });

            that.state = that.states.hidden;
        });
    }

    this.run = function() {
        var that = this;

        this.lessButton.hide();
        this.moreButton.show();
        this.contents.hide();

        this.moreButton.click(function(e) {
            e.preventDefault();
            e.stopPropagation();

            that.show();
        });

        this.lessButton.click(function(e) {
            e.preventDefault();
            e.stopPropagation();

            that.hide();
        });
    }
}

hawk.initializeMoreContentManagers = function() {
    var contents = $('.more-content');
    var that = this;

    contents.each(function() {
        var id = $(this).attr('data-id');

        var moreContents;

        if(moreContents = new that.MoreContentManager(id)) {
            moreContents.run();
        }
    });
}

hawk.SlideMenu = function(id, options) {
    this.menu = $('#' + id);
    this.wrapper = this.menu.find('> div');

    this.mode;
    this.direction;
    this.state;

    this.toggler;
    this.close;
    this.directionClassName;
    this.modeClassName;
    this.openClassName;

    this.states = {
        closed: 'closed',
        open: 'open'
    };

    this.modes = {
        slideFade: 'slide-fade',
        slide: 'slide',
        fade: 'fade'
    };

    this.directions = {
        top: 'top',
        right: 'right',
        bottom: 'bottom',
        left: 'left'
    };

    this.defaultOptions = {
        slideDuration: 500,
        fadeDuration: 500,
        direction: 'top',
        mode: 'slide',
        toggler: $('.menu-toggler'),
        close: this.menu.find('.menu-close'),
        mainClass: 'slide-menu',
    };

    this.options = hawk.mergeObjects(this.defaultOptions, options);

    this.show = function() {
        var that = this;

        if(this.options.mode == this.modes.fade) {
            this.menu.fadeIn(this.options.fadeDuration);
        }

        this.menu.addClass(this.openClassName);
        this.state = this.states.open;

        this.toggler.find('.icon-hamburger').addClass('open');
    }

    this.hide = function() {
        var that = this;

        if(this.options.mode == this.modes.fade) {
            this.menu.fadeOut(this.options.fadeDuration);
        }

        this.menu.removeClass(this.openClassName);
        this.state = this.states.closed;

        this.options.toggler.find('.icon-hamburger').removeClass('open');
    }

    this.totalDuration = function() {
        if(this.options.mode == this.modes.slide) {
            return this.options.slideDuration;
        } else if(this.options.mode == this.modes.slideFade) {
            return this.options.slideDuration + this.options.fadeDuration;
        } else if(this.options.mode == this.modes.fade) {
            return this.options.fadeDuration;
        } else {
            return 0;
        }
    }

    this.run = function() {
        var that = this;

        this.toggler = this.options.toggler;
        this.close = this.options.close;

        this.modeClassName = this.options.mainClass + "--" + this.options.mode;
        this.directionClassName = this.options.mainClass + "--" + this.options.direction;
        this.openClassName = this.options.mainClass + "--open";

        this.menu.addClass(this.directionClassName);
        this.menu.addClass(this.modeClassName);

        this.hide();

        this.toggler.click(function() {
            if(that.state == that.states.open) {
                that.hide();
            } else {
                that.show();
            }
        });

        this.close.click(function() {
            that.hide();
        });
    }
}

hawk.initializeAnchors = function(options) {
    var that = this;

    var defaultOptions = {
        delay: 100,
        menu: undefined
    }

    options = hawk.mergeObjects(defaultOptions, options);

    $('a').unbind('click').click(function(e) {
        var regex = /#{1}.+$/;
        var link = this;

        var href = $(this).attr('href');
        var anchor;
        var extraDelay = 0;

        if(anchor = regex.exec(href)) {
            if($(anchor + that.anchorSufix).length) {
                e.preventDefault();

                if(options.menu !== undefined && $(link).parents(options.menu).length) {
                    extraDelay = options.menu.totalDuration();

                    options.menu.hide();   
                }

                var finalDelay = options.delay + extraDelay;

                that.scrollToElement({ anchor: anchor + that.anchorSufix, callback: function() { window.location.hash = anchor; }, delay: finalDelay });
            }
        }
    });
}

hawk.BookmarksManager = function(container, options) {
    this.container = $(container);
    this.contentContainer = this.container.find('.bookmarks-manager__content').first();
    this.bookmarks = this.container.find('.bookmarks-manager__bookmark');

    this.current;

    this.isSmallDevice = 0;

    this.defaultOptions = {
        smallDeviceWidth: 768,
        activeBookmarkClass: 'active'
    }

    this.checkDeviceSize = function() {
        if(hawk.w < this.options.smallDeviceWidth) {
            this.isSmallDevice = 1;
        } else {
            this.isSmallDevice = 0;
        }
    }

    this.options = hawk.mergeObjects(this.defaultOptions, options);

    this.setBookmarkActive = function(bookmark, callback) {
        this.current = $(bookmark);
        this.current.addClass(this.options.activeBookmarkClass);

        if(callback !== undefined) {
            callback();
        }
    }

    this.refresh = function() {
        this.checkDeviceSize();
    }

    this.run = function() {
        var that = this;

        $(window).resize(function() {
            that.refresh();
        });
    }
}

hawk.run = function() { 
    if(this.hash.length != 0) {
        this.scrollToElement({ anchor: this.hash + this.anchorSufix, delay: 200 });
    }

    this.initializeDropdowns();
    this.initializeMoreContentManagers();

    var overlayer = new this.OverlayerManager('overlayer');
    overlayer.run();

    var ajaxOverlayer = new this.AjaxOverlayerManager('overlayer');
    ajaxOverlayer.run();

    var mainmenu = new this.SlideMenu('main-menu', { mode: 'slide-fade', direction: 'right' });
    mainmenu.run();

    this.initializeAnchors({ menu: mainmenu, delay: 100 });
}