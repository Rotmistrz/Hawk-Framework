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
        container: window,
        anchor: '#top' + hawk.anchorSufix,
        callback: function() {},
        delay: 0
    };

    options = hawk.mergeObjects(defaultOptions, options);

    setTimeout(function(){
        $(options.container).scrollTo(options.anchor, 800, {'axis': 'y', 'offset': 0, onAfter: function() { options.callback(); } });
    }, options.delay);
}

hawk.Dropdown = function(container, options) {
    this.container = $(container);
    this.containerClass;
    this.openClass;

    this.header;
    this.list;

    this.states = {
        open: 'open',
        closed: 'closed'
    };

    this.defaultOptions = {
        slideSpeed: 200,
        containerClass: 'dropdown',
        openClass: 'dropdown--open',
        headerClass: 'dropdown__header',
        listClass: 'dropdown__list'
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

        this.container.addClass(that.options.openClass);
        this.list.velocity("slideDown", {
            duration: that.options.slideSpeed
        });
        this.setOpen();
    }

    this.hide = function() {
        var that = this;

        this.container.removeClass(that.options.openClass);
        this.list.velocity("slideUp", {
            duration: that.options.slideSpeed
        });
        this.setClosed();
    }

    this.run = function() {
        var that = this;

        this.header = this.container.find('.' + this.options.headerClass);
        this.list = this.container.find('.' + this.options.listClass);

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
    
    this.buttons = $('.overlayer-button[data-overlayer-id=' + this.overlayerId + ']');

    this.contentContainer;
    this.closeButton;

    this.currentButton;

    this.defaultOptions = {
        fadeSpeed: 400,
        contentContainerClass: 'overlayer__content',
        closeButtonClass: 'overlayer__close',
        showCallback: function(container, button) {},
        hideCallback: function(container, button) {}
    };

    this.options = hawk.mergeObjects(this.defaultOptions, options);

    this.show = function(callback) {
        var that = this;

        $('body').css({ overflow: 'hidden' });

        this.container.velocity("fadeIn", {
            duration: that.options.fadeSpeed,
            complete: function() {
                if(that.options.showCallback !== undefined) {
                    that.options.showCallback(that.container, that.currentButton);
                }

                if(callback !== undefined) {
                    callback();
                }
            }
        });
    }

    this.hide = function(callback) {
        var that = this;

        this.container.velocity("fadeOut", {
            duration: that.options.fadeSpeed,
            complete: function() {
                $('body').css({ overflow: 'auto' });

                if(that.options.hideCallback !== undefined) {
                    that.options.hideCallback(that.container, that.currentButton);
                }

                if(callback !== undefined) {
                    callback();
                }

                that.currentButton = undefined;
            }
        });
    }

    this.setContent = function(content) {
        this.contentContainer.html(content);
    }

    this.run = function() {
        var that = this;

        this.contentContainer = this.container.find('.' + this.options.contentContainerClass).first();
        this.closeButton = this.container.find('.' + this.options.closeButtonClass);

        this.buttons.click(function(e) {
            e.stopPropagation();
            e.preventDefault();

            that.currentButton = $(this);

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
    
    this.buttons = $('.ajax-overlayer-button[data-overlayer-id=' + this.overlayerId + ']');

    this.contentContainer;
    this.closeButton;
    
    this.currentButton;

    this.defaultOptions = {
        fadeSpeed: 400,
        ajaxFilePath: "/ajax.php",
        contentContainerClass: 'overlayer__content',
        closeButtonClass: 'overlayer__close',
        showCallback: function(container, button) {},
        hideCallback: function(container, button) {}
    }

    this.options = hawk.mergeObjects(this.defaultOptions, options);

    this.show = function(callback) {
        var that = this;

        this.container.velocity("fadeIn", {
            duration: this.options.fadeSpeed,
            complete: function() {
                $('body').css({ 'overflow': 'hidden' });

                that.options.showCallback(that.container, that.currentButton);

                if(callback !== undefined) {
                    callback();
                }
            }
        });
    };

    this.hide = function(callback) {
        var that = this;

        this.container.velocity("fadeOut", {
            duration: this.options.fadeSpeed,
            complete: function() {
                $('body').css({ 'overflow': 'auto'});

                try {
                    history.pushState("", document.title, window.location.pathname + window.location.search);
                } catch(e) {
                    window.location.hash = "";
                }
                
                that.options.hideCallback(that.container, that.currentButton);

                if(callback !== undefined) {
                    callback();
                }

                tat.currentButton = undefined;
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

        this.contentContainer = this.container.find('.' + this.options.contentContainerClass);
        this.closeButton = $(this.container.find('.' + this.options.closeButtonClass));

        $(this.buttons).click(function(e) {
            e.preventDefault();
            e.stopPropagation();

            that.currentButton = $(this);

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
    this.contentContainer;
    this.contentWrapper;
    this.bookmarks;

    this.current; // current bookmark container
    this.currentHeight = 0;

    this.loading = false;

    var that = this;

    this.defaultOptions = {
        responsive: true,
        activeScroll: false,
        activeScrollWidth: 480,
        slideDuration: 200,
        fadeDuration: 200,
        activeBookmarkClass: 'active',
        bookmarks: that.container.find('.bookmarks-manager__bookmark-container'),
        contentContainer: that.container.find('.bookmarks-manager__content').first(),
        contentWrapper: that.container.find('.bookmarks-manager__content-wrapper').first(),
        bookmarkClass: 'bookmarks-manager__bookmark',
        contentClass: 'bookmarks-manager__bookmark-content',
        bookmarkActiveCallback: function(bookmarkContainer) {},
        bookmarkUnactiveCallback: function(bookmarkContainer) {},
        changeContentCallback: function(content) {},
        changeBookmarkCallback: function(bookmarkContainer) {}
    }

    this.options = hawk.mergeObjects(this.defaultOptions, options);

    this.isResponsive = function() {
        return this.options.responsive;
    }

    this.isSmallDevice = function() {
        return (this.isResponsive() && !this.contentContainer.is(':visible'));
    }

    this.changeContent = function(content, callback) {
        var container = this.contentContainer;

        var showing = function() {
            container.hide();
            container.html(content.show());

            container.velocity("slideDown", {
                duration: that.options.slideDuration,
                complete: function() {
                    container.velocity({ opacity: 1 }, {
                        duration: that.options.fadeDuration,
                        complete: function() {
                            var currentHeight = that.contentWrapper.outerHeight();

                            if(currentHeight > that.currentHeight) {
                                that.currentHeight = currentHeight;
                                that.contentWrapper.css({ 'min-height': that.currentHeight + "px" });
                            }

                            that.options.changeContentCallback(that.contentContainer);

                            that.loading = false;
                        }
                    });
                }
            });
        }

        if(container.css('opacity') != 0) {
            container.velocity({ opacity: 0 }, {
                duration: that.options.fadeDuration,
                complete: function() {
                    container.html('');
                    showing();
                }
            });
        } else {
            showing();
        }

        if(this.options.activeScroll && hawk.w < this.options.activeScrollWidth) {
            var id = this.contentContainer.attr('id');

            if(id !== undefined) {
                hawk.scrollToElement({ anchor: '#' + id });
            }
        }
        
        return this;
    }

    this.changeBookmark = function(bookmarkContainer) {
        this.unsetBookmarkActive();

        this.current = bookmarkContainer;

        var bookmark = this.current.find('.' + this.options.bookmarkClass);
        var content = this.current.find('.' + this.options.contentClass);

        this.setBookmarkActive(this.current);

        if(this.isSmallDevice()) {
            content.velocity("slideDown", {
                duration: that.options.slideDuration,
                complete: function() {
                    that.options.changeContentCallback(content);

                    that.loading = false;
                }
            });
        } else {
            this.changeContent(content.clone(true));
        }

        return this;
    }

    this.unsetBookmarkActive = function() {
        if(this.current !== undefined) {
            var current = this.current;
            current.find('.' + this.options.bookmarkClass).removeClass(this.options.activeBookmarkClass);

            current.find('.' + this.options.contentClass).velocity("slideUp", {
                duration: that.options.slideDuration
            });

            this.current = undefined;

            this.options.bookmarkUnactiveCallback(current);
        }

        return this;
    }

    this.setBookmarkActive = function(bookmarkContainer) {
        var bookmark = bookmarkContainer.find('.' + this.options.bookmarkClass);

        bookmark.addClass(this.options.activeBookmarkClass);

        this.options.bookmarkActiveCallback(bookmarkContainer);

        return this;
    }

    this.launchBookmark = function(n) {
        this.changeBookmark(this.bookmarks.eq(n));

        return this;
    }

    this.updateOptions = function(options) {
        this.options = hawk.mergeObjects(this.options, options);

        return this;
    }

    this.clear = function(callback) {
        //this.current = undefined;

        this.unsetBookmarkActive();
        this.contentContainer.velocity({ opacity: 0 }, {
            duration: 200,
            complete: function() {
                if(callback !== undefined) {
                    callback();
                }
            }
        });

        return this;
    }

    this.remindActiveBookmark = function() {
        if(this.isSmallDevice()) {

        }

        return this;
    }

    this.refresh = function() {
        var current = this.current;

        if(current !== undefined) {
            this.clear(function() {
                that.changeBookmark(current);
            });
        }
        
        return this;
    }

    this.run = function() {
        this.bookmarks = $(this.options.bookmarks);
        this.contentContainer = $(this.options.contentContainer);
        this.contentWrapper = $(this.options.contentWrapper);

        var doit;

        $(window).resize(function() {
            clearTimeout(doit);
            doit = setTimeout(function() {
                that.refresh();
            }, 100);
        });

        this.bookmarks.click(function() {
            if(that.loading == true) {
                return;
            }

            if(that.current !== undefined && that.current.is($(this))) {
                that.remindActiveBookmark();
            } else {
                that.changeBookmark($(this));
                that.loading = true;
            }
        });

        return this;
    }
}

hawk.DetailsList = function(container, options) {
    this.container = $(container);
    this.titles;
    this.contents;

    this.current;

    this.states = {
        open: 'open',
        closed: 'closed'
    }

    this.defaultOptions = {
        itemClass: 'details-list__item',
        titleClass: 'details-list__title',
        contentClass: 'details-list__content',
        activeClass: 'active',
        hideOther: true,
        duration: 200,
        showCallback: function(current) {
            var arrow = current.find('.details-list__arrow');
            arrow.removeClass('icon-arrow--down').addClass('icon-arrow--up');
        },
        hideCallback: function(current) {
            var arrow = current.find('.details-list__arrow');
            arrow.removeClass('icon-arrow--up').addClass('icon-arrow--down');
        }
    }

    this.options = hawk.mergeObjects(this.defaultOptions, options);

    this.show = function(title) {
        if(this.options.hideOther && this.current !== undefined) {
            var recent = this.current;
            this.hide(recent);
        }

        this.current = title;

        var that = this;

        var container = this.current.parents('.' + that.options.itemClass).first();
        container.addClass(this.options.activeClass);

        var content = this.current.siblings('.' + this.options.contentClass);

        this.options.showCallback(container);

        content.velocity("slideDown", {
            duration: that.options.duration,
            complete: function() {
                that.current.attr('data-state', that.states.open);
            }
        });
    }

    this.hide = function(title) {
        var that = this;

        var container = title.parents('.' + that.options.itemClass).first();
        container.removeClass(this.options.activeClass);

        this.options.hideCallback(container);

        var content = title.siblings('.' + this.options.contentClass);
        content.velocity("slideUp", {
            duration: that.options.duration,
            complete: function() {
                title.attr('data-state', that.states.closed);
            }
        });
    }

    this.run = function() {
        var that = this;

        this.titles = this.container.find('.' + this.options.titleClass);
        this.contents = this.container.find('.' + this.options.contentClass);

        this.contents.hide();

        this.titles.click(function() {
            if($(this).attr('data-state') == that.states.open) {
                that.hide($(this));
            } else {
                that.show($(this));
            }
        });
    }
}

hawk.run = function() { 
    var pageLoadingLayer = $('#page-loading-layer');
    pageLoadingLayer.velocity("fadeOut", {
        duration: 1000
    });

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

    var bookmarks = new this.BookmarksManager($('.bookmarks-manager').first());
    bookmarks.run();

    var detailsList = new this.DetailsList($('.details-list').first());
    detailsList.run();
}