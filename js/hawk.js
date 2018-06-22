var Hawk = {};

Hawk = {
    w: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    h: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,

    hash: window.location.hash,
    anchorSufix: '-anchor',
}

Hawk.Validator = {};

Hawk.Validator.isEmail = function(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {  
        return true;  
    } else {
        return false;
    }
}

Hawk.Validator.isPhoneNumber = function(number) {
    if (/^\+?[0-9\s]+$/.test(number)) {
        return true;
    } else {
        return false;
    }
}

Hawk.Validator.isNotEmpty = function(value) {
    if (value.length > 0) {
        return true;
    } else {
        return false;
    }
}

Hawk.Validator.longerThan = function(str, length) {
    if (str.length > length) {
        return true;
    } else {
        return false;
    }
}

Hawk.Validator.isSomethingChecked = function(field) {
    if (field.is(':checked')) {
        return true;
    } else {
        return false;
    }
}

Hawk.isInObject = function(value, obj) {
    for (var k in obj) {
        if (!obj.hasOwnProperty(k)) {
            continue;
        }

        if (obj[k] === value) {
            return true;
        }
    }

    return false;
}

Hawk.mergeObjects = function(mainObject, object) {
    var result = {};

    if (object === undefined) {
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

Hawk.scrollToElement = function(options) {
    var defaultOptions = {
        container: window,
        anchor: '#top' + Hawk.anchorSufix,
        callback: function() {},
        delay: 0,
        duration: 800,
        offset: 0
    };

    options = Hawk.mergeObjects(defaultOptions, options);

    setTimeout(function(){
        $(options.container).scrollTo(options.anchor, options.duration, {'axis': 'y', 'offset': options.offset, onAfter: function() { options.callback(); } });
    }, options.delay);

    return this;
}

Hawk.DropdownConstants = {
    modes: {
        PLAIN: 0,
        CHECKBOX: 1,
        RADIO: 2
    },

    types: {
        OVERLAYER: 0,
        EXPANDING: 1
    }
}

Hawk.Dropdown = function(container, options) {
    this.container = $(container).first();

    this.header;
    this.title;
    this.list;
    this.listContainer;

    this.fields;

    this.states = {
        CLOSED: 0,
        OPEN: 1
    }

    this.defaultOptions = {
        slideSpeed: 200,

        mode: Hawk.DropdownConstants.modes.PLAIN,
        type: Hawk.DropdownConstants.types.OVERLAYER,

        containerClass: 'dropdown',
        expandingTypeClass: 'dropdown--expanding',
        openClass: 'dropdown--open',
        headerClass: 'dropdown__header',
        titleClass: 'dropdown__title',
        listClass: 'dropdown__list',
        listContainerClass: 'dropdown__list-container',

        onShow: function(dropdown) {},
        onHide: function(dropdown) {},
        onRadioSelected: function(dropdown, radio) {
            var description = radio.parent().find('.dropdown-item__description').html();

            dropdown.title.html(description);

            dropdown.hide();
        }
    };

    this.options = Hawk.mergeObjects(this.defaultOptions, options);

    this.state = this.states.CLOSED;

    this.mode = this.options.mode;
    this.type = this.options.type;

    this.setOpen = function() {
        this.state = this.states.OPEN;

        return this;
    }

    this.setClosed = function() {
        this.state = this.states.CLOSED;

        return this;
    }

    this.isOpen = function() {
        return this.state == this.states.OPEN;
    }

    this.show = function() {
        var that = this;

        this.container.addClass(that.options.openClass);

        this.listContainer.velocity("slideDown", {
            duration: that.options.slideSpeed,
            complete: function() {
                if (typeof that.options.onShow === 'function') {
                    that.options.onShow(that);
                }
            }
        });

        this.setOpen();

        return this;
    }

    this.hide = function() {
        var that = this;

        this.container.removeClass(that.options.openClass);

        this.listContainer.velocity("slideUp", {
            duration: that.options.slideSpeed,
            complete: function() {
                if (typeof that.options.onHide === 'function') {
                    that.options.onHide(that);
                }
            }
        });

        this.setClosed();

        return this;
    }

    this.run = function() {
        var that = this;

        this.header = this.container.find('.' + this.options.headerClass);
        this.title = this.container.find('.' + this.options.titleClass);
        this.list = this.container.find('.' + this.options.listClass);
        this.listContainer = this.container.find('.' + this.options.listContainerClass);

        this.fields = this.list.find('input[type="radio"]');

        if (this.options.type == Hawk.DropdownConstants.types.EXPANDING) {
            this.container.addClass(this.options.expandingTypeClass);
        }

        this.hide();

        this.container.click(function(e) {
            e.stopPropagation();
        });

        this.header.click(function(e) {
            e.preventDefault();
            e.stopPropagation();

            if (that.isOpen()) {
                that.hide();
            } else {
                that.show();
            }
        });

        this.container.parent().click(function() {
            if (that.isOpen()) {
                that.hide();
            }
        });

        if (this.fields.length > 0) {
            this.fields.change(function() {
                if (typeof that.options.onRadioSelected == 'function') {
                    that.options.onRadioSelected(that, $(this));
                }
            });
        }

        return this;
    }
}

Hawk.initializeDropdowns = function() {
    var dropdowns = $('.dropdown');
    var that = this;

    dropdowns.each(function() {
        var dropdown = new that.Dropdown($(this));
        dropdown.run();
    });

    return this;
}

Hawk.OverlayerManager = function(id, options) {
    this.container = $('#' + id);
    this.overlayerId = this.container.attr('data-overlayer-id');
    
    this.buttons = $('.overlayer-button[data-overlayer-id=' + this.overlayerId + ']');

    this.inner;
    this.contentContainer;
    this.closeButton;

    this.currentButton;

    this.defaultOptions = {
        fadeSpeed: 400,
        slideSpeed: 500,
        innerClass: 'overlayer__inner',
        contentContainerClass: 'overlayer__content',
        closeButtonClass: 'overlayer__close',
        showCallback: function(container, button) {},
        hideCallback: function(container, button) {}
    };

    this.options = Hawk.mergeObjects(this.defaultOptions, options);

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

        return this;
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

        return this;
    }

    this.setContent = function(content) {
        var that = this;

        this.contentContainer.html(content).delay(100);
        this.contentContainer.velocity("slideDown", {
            duration: that.options.slideSpeed
        });

        return this;
    }

    this.run = function() {
        var that = this;

        this.inner = this.container.find('.' + this.options.innerClass);
        this.contentContainer = this.container.find('.' + this.options.contentContainerClass).first();
        this.closeButton = this.container.find('.' + this.options.closeButtonClass);

        this.buttons.click(function(e) {
            e.stopPropagation();
            e.preventDefault();

            that.currentButton = $(this);

            var id = $(this).attr('data-id');

            var current = $('.overlayer-content[data-id=' + id + ']').first();

            that.show();

            that.setContent(current.html());
        });

        that.container.click(function() {
            that.hide();
        });

        this.container.find('.' + that.options.innerClass + ', .' + that.options.innerClass + ' :not(.' + that.options.closeButtonClass + ', .' + that.options.closeButtonClass + ' *)').click(function(e) {
            e.stopPropagation();
            return;
        });

        this.closeButton.click(function() {
            that.hide();
        });

        return this;
    }
}

Hawk.AjaxOverlayerManager = function(id, options) {
    this.container = $('#' + id);
    this.overlayerId = parseInt(this.container.attr('data-overlayer-id'));
    
    this.buttons = $('.ajax-overlayer-button[data-overlayer-id=' + this.overlayerId + ']');

    this.inner;
    this.contentContainer;
    this.closeButton;
    this.spinnerLayer;
    
    this.currentButton;

    this.open = false;

    this.defaultOptions = {
        fadeSpeed: 400,
        slideSpeed: 400,
        ajaxFilePath: "/ajax.php",
        innerClass: 'overlayer__inner',
        contentContainerClass: 'overlayer__content',
        closeButtonClass: 'overlayer__close',
        spinnerLayerClass: 'overlayer__spinner-layer',
        showCallback: function(container, button) {},
        hideCallback: function(container, button) {},
        autoloadFunction: function(overlayerManager, hash) {
            var pattern = /n_[0-9]+(-[a-zA-Z0-9]+)+/

            if(pattern.test(hash)) {
                var parts = hash.split('_');

                hash = parts[1];

                parts = hash.split('-');

                overlayerManager.loadContent(parts[0]); 
            }
        }
    }

    this.options = Hawk.mergeObjects(this.defaultOptions, options);

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

        return this;
    };

    this.hide = function(callback) {
        var that = this;

        try {
            history.pushState("", document.title, window.location.pathname + window.location.search);
        } catch(e) {
            window.location.hash = "";
        }

        this.container.velocity("fadeOut", {
            duration: this.options.fadeSpeed,
            complete: function() {
                $('body').css({ 'overflow': 'auto'});
                that.contentContainer.html('').hide();

                that.options.hideCallback(that.container, that.currentButton);

                if(callback !== undefined) {
                    callback();
                }

                that.currentButton = undefined;

                that.open = false;

                $(window).unbind('popstate').on('popstate', function() {
                    
                });
            }
        });

        return this;
    }

    this.changeContent = function(content) {
        var that = this;

        this.contentContainer.html(content);
        this.contentContainer.velocity("slideDown", {
            duration: that.options.slideSpeed
        });

        return this;
    }

    this.loadContent = function(id) {
        var that = this;
        var lang = $('html').attr('lang');

        that.show();
        that.spinnerLayer.show();

        $.ajax({
            type: "POST",
            url: that.options.ajaxFilePath,
            dataType: "json",
            data: { 'action': 'load-overlayer', 'id': id, 'lang': lang },
            success: function(result) {
                if(result.error > 0) {
                    // here should appear error layer
                    return;
                }

                that.changeContent(result['html']);

                window.location.hash = result['anchor'];

                $(window).unbind('popstate').on('popstate', function() {
                    that.hide();
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // here should appear error layer
                //alert(errorThrown);
            },
            complete: function() {
                that.spinnerLayer.hide();
            }
        });
        
        return this;
    }

    this.run = function() {
        var that = this;

        this.inner = this.container.find('.' + this.options.innerClass);
        this.contentContainer = this.container.find('.' + this.options.contentContainerClass);
        this.closeButton = $(this.container.find('.' + this.options.closeButtonClass));
        this.spinnerLayer = $(this.container.find('.' + this.options.spinnerLayerClass));

        $(this.buttons).click(function(e) {
            e.preventDefault();
            e.stopPropagation();

            if(!that.open) {
                that.currentButton = $(this);

                var id = $(this).attr('data-id');

                that.loadContent(id);
            }
        });

        this.container.click(function() {
            that.hide();
        });

        this.container.find('.' + that.options.innerClass + ', .' + that.options.innerClass + ' :not(.' + that.options.closeButtonClass + ', .' + that.options.closeButtonClass + ' *)').click(function(e) {
            e.stopPropagation();
            return;
        });

        this.closeButton.click(function(e) {
            e.preventDefault();

            that.hide();
        });

        var hash = window.location.hash;
        
        this.options.autoloadFunction(this, hash);

        return this;
    };
}

Hawk.MoreContentManager = function(id, options) {
    this.id = id;
    this.button = $('.more-content-button[data-id=' + this.id + ']');
    this.contents = $('.more-content[data-id=' + this.id + ']');

    this.states = {
        hidden: 'hidden',
        visible: 'visible'
    };

    this.defaultOptions = {
        slideSpeed: 400,
        showButtonCallback: function(button) {
            button.velocity({ opacity: 0 }, {
                duration: 400,
                complete: function() {
                    
                }
            });
        },
        hideButtonCallback: function(button) {}
    };

    this.options = Hawk.mergeObjects(this.defaultOptions, options);

    this.state;

    if(this.button === undefined || this.contents === undefined) {
        return false;
    }

    this.show = function() {
        var that = this;

        this.contents.velocity("slideDown", {
            duration: that.options.slideSpeed,
            complete: function() {
                that.contents.velocity({ opacity: 1 }, {
                    duration: 400
                });

                that.options.showButtonCallback(that.button);
                that.state = that.states.visible;
            }
        });

        return this;
    }

    this.hide = function() {
        var that = this;

        that.contents.velocity({ opacity: 0 }, {
            duration: 400,
            complete: function() {
                that.contents.velocity("slideUp", {
                    duration: that.options.slideSpeed,
                    complete: function() {
                        that.options.hideButtonCallback(that.button);
                        that.state = that.states.hidden;
                    }
                });
            }
        });
        
        return this;
    }

    this.run = function() {
        var that = this;

        this.button.show();
        this.contents.hide().css({ opacity: 0 });

        this.state = this.states.hidden;

        this.button.click(function(e) {
            e.preventDefault();
            e.stopPropagation();

            if(that.state == that.states.hidden) {
                that.show();
            } else {
                that.hide();
            }
        });

        return this;
    }
}

Hawk.initializeMoreContentManagers = function(callbacks) {
    var contents = $('.more-content');
    var that = this;

    contents.each(function() {
        var id = $(this).attr('data-id');

        var moreContents = new that.MoreContentManager(id, callbacks);

        if(moreContents) {
            moreContents.run();
        }
    });

    return this;
}

Hawk.SlideMenu = function(id, options) {
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
        showCallback: function(menu) {},
        hideCallback: function(menu, hideCall) {
            hideCall();
        }
    };

    this.options = Hawk.mergeObjects(this.defaultOptions, options);

    this.show = function() {
        var that = this;

        var timeRemaining = this.totalDuration();

        setTimeout(function() {
            that.options.showCallback(that.menu);
        }, timeRemaining);

        if(this.options.mode == this.modes.fade) {
            this.menu.velocity("fadeIn", {
                duration: this.options.fadeDuration
            });
        }

        this.menu.addClass(this.openClassName);
        this.state = this.states.open;

        this.toggler.find('.icon-hamburger').addClass('open');

        return this;
    }

    this.hide = function() {
        var that = this;

        this.options.hideCallback(this.menu, function() {
            if(that.options.mode == that.modes.fade) {
                that.menu.velocity("fadeOut", {
                    duration: that.options.fadeDuration
                });
            }

            that.menu.removeClass(that.openClassName);
        });

        this.state = this.states.closed;

        this.options.toggler.find('.icon-hamburger').removeClass('open');

        return this;
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

        return this;
    }
}

Hawk.initializeAnchors = function(options) {
    var that = this;

    var defaultOptions = {
        delay: 100,
        menu: undefined
    }

    options = Hawk.mergeObjects(defaultOptions, options);

    $('a').unbind('click').click(function(e) {
        var regex = /#{1}.+$/;
        var link = this;

        var href = $(this).attr('href');
        var anchor;
        var extraDelay = 0;

        if(anchor = regex.exec(href)) {
            if($(anchor + that.anchorSufix).length) {
                e.preventDefault();

                if(options.menu !== undefined && $(link).parents(options.menu.menu).length) {
                    extraDelay = options.menu.totalDuration();

                    options.menu.hide();   
                }

                var finalDelay = options.delay + extraDelay;

                that.scrollToElement({ anchor: anchor + that.anchorSufix, callback: function() { window.location.hash = anchor; }, delay: finalDelay });
            }
        }
    });

    return this;
}

Hawk.BookmarksManager = function(container, options) {
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

    this.options = Hawk.mergeObjects(this.defaultOptions, options);

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
                            var currentHeight = that.contentContainer.outerHeight();

                            that.currentHeight = currentHeight;
                            that.contentWrapper.css({ 'min-height': that.currentHeight + "px" });

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

        if(this.options.activeScroll && Hawk.w < this.options.activeScrollWidth) {
            var id = this.contentContainer.attr('id');

            if(id !== undefined) {
                Hawk.scrollToElement({ anchor: '#' + id });
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
        this.options = Hawk.mergeObjects(this.options, options);

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

        var refresh;

        $(window).resize(function() {
            clearTimeout(refresh);
            refresh = setTimeout(function() {
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

Hawk.DetailsList = function(container, options) {
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

    this.options = Hawk.mergeObjects(this.defaultOptions, options);

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

        return this;
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

        return this;
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

        return this;
    }
}

Hawk.CategorizedItems = function(container, options) {
    this.container = $(container);
    this.categories = this.container.find('[data-category-id]');
    this.items;
    this.noItems;
    this.contentContainer;
    this.content;

    this.selectedItems;
    this.recentItems;
    this.currentCategory;
    this.currentBookmark;

    this.defaultOptions = {
        allId: 'all',
        prefix: "cat-",
        amountInRow: {
            0: 1,
            550: 2,
            768: 3,
            1100: 4
        },
        itemClass: "categorized-items__item",
        noItemsClass: "categorized-items__no-items",
        contentContainerClass: "categorized-items__contents-container",
        contentClass: "categorized-items__contents",
        activeBookmarkClass: "active",
        slideSpeed: 500,
        fadeSpeed: 200,
        smallDeviceWidth: 480,
        scrollOnSmallDevice: true
    };

    this.options = Hawk.mergeObjects(this.defaultOptions, options);

    this.loadCategory = function(id) {
        var that = this;

        this.currentCategory = id;
        this.recentItems = this.selectedItems;

        if(this.currentCategory == this.options.allId) {
            this.selectedItems = this.items;
        } else {
            this.selectedItems = this.items.filter('.cat-' + this.currentCategory);
        }

        this.activateBookmark(this.currentCategory);

        if(that.selectedItems.length > 0) {
            var itemsPerRow = this.countItemsPerRow();

            var rowAmount = Math.ceil(this.selectedItems.length/itemsPerRow);
            var itemHeight = this.selectedItems.first().outerHeight();

            var necessaryHeight = rowAmount * itemHeight;

            if(necessaryHeight < this.contentContainer.outerHeight()) {
                this.contentContainer.css({ 'min-height': necessaryHeight + "px" });
            }

            that.content.velocity("slideUp", {
                duration: that.options.slideSpeed,
                complete: function() {
                    that.noItems.hide();
                    that.items.hide();
                    that.selectedItems.show();

                    if(that.options.scrollOnSmallDevice && Hawk.w < that.options.smallDeviceWidth) {
                        var containerId = that.contentContainer.attr('id');

                        if(containerId !== undefined) {
                            console.log(containerId);

                            Hawk.scrollToElement({ anchor: '#' + containerId });
                        }                        
                    }

                    that.content.velocity("slideDown", {
                        duration: that.options.slideSpeed,
                        complete: function() {
                            that.contentContainer.css({ 'min-height': necessaryHeight + "px" });
                        }
                    });
                }
            });
        } else {
            var containerMinHeight = that.noItems.outerHeight();
            this.contentContainer.css( { 'min-height': containerMinHeight + "px" });

            that.content.velocity("slideUp", {
                duration: that.options.slideSpeed,
                complete: function() {
                    that.items.hide();
                    that.noItems.show();

                    that.content.velocity("slideDown", {
                        duration: that.options.slideSpeed
                    });
                }
            });
        }

        return this;
    }

    this.activateBookmark = function(id) {
        if(this.currentBookmark !== undefined) {
            this.currentBookmark.removeClass(this.options.activeBookmarkClass);
        }
        
        this.currentBookmark = this.categories.filter('[data-category-id="' + id + '"]');
        this.currentBookmark.addClass(this.options.activeBookmarkClass);

        return this;
    }

    this.countItemsPerRow = function() {
        var amount = 0;

        var object = this.options.amountInRow;

        for (var property in object) {
            if (object.hasOwnProperty(property)) {
                if(property > Hawk.w) {
                    return amount;
                }

                amount = object[property];
            }
        }

        return amount;
    }

    this.refresh = function() {
        var itemsPerRow = this.countItemsPerRow();
        var itemWidth = 1/itemsPerRow * 100;

        this.items.css({ width: itemWidth + "%" });

        return this;
    }

    this.run = function() {
        var that = this;

        this.items = this.container.find('.' + this.options.itemClass);
        this.noItems = this.container.find('.' + this.options.noItemsClass);
        this.content = this.container.find('.' + this.options.contentClass);
        this.contentContainer = this.container.find('.' + this.options.contentContainerClass);

        this.selectedItems = this.items;
        this.noItems.hide();

        this.refresh();

        var refresh;

        $(window).resize(function() {
            clearTimeout(refresh);
            refresh = setTimeout(function() {
                that.refresh();
            }, 100);
        });

        this.categories.click(function() {
            var id = $(this).attr('data-category-id');

            that.loadCategory(id);
        });

        this.loadCategory(this.options.allId);

        return this;
    }
}

Hawk.formFieldTypes = {
    TEXT: 'text',
    CHECKBOX: 'checkbox',
    RADIO: 'radio',
    TEXTAREA: 'textarea'
};

Hawk.FormField = function(name, type, wrapperClass, required, callback) {
    var that = this;

    this.name = name;
    this.type = type;
    this.wrapperClass = wrapperClass;
    this.required = required;
    this.callback = callback;

    this.wrapper;
    this.field;

    this.errorClass = "error";

    this.bind = function(form) {
        if (this.type == Hawk.formFieldTypes.TEXTAREA) {
            this.field = $(form).find('textarea[name="' + this.name + '"]');
        } else if (this.type == Hawk.formFieldTypes.CHECKBOX) {
            this.field = $(form).find('input[name="' + this.name + '"]');

            if(this.field.length == 0) {
                this.field = $(form).find('input[name="' + this.name + '[]"]');
            }
        } else {
            this.field = $(form).find('input[name="' + this.name + '"]');
        }
        
        if (this.field.length > 0) {
            this.wrapper = this.field.parents('.' + this.wrapperClass);
        }
    }

    this.isBinded = function() {
        return (this.wrapper !== undefined && this.field !== undefined);
    }

    this.disable = function() {
        if (this.isBinded()) {
            this.field.attr('disabled', 'disabled');
        }

        return this;
    }

    this.validate = function() {
        if (callback !== undefined) {
            if(that.type == Hawk.formFieldTypes.CHECKBOX || that.type == Hawk.formFieldTypes.RADIO) {
                return callback(that.field);
            } else {
                return callback(that.field.val());
            }
        }

        return true;
    }

    this.markIncorrect = function() {
        this.wrapper.addClass(this.errorClass);

        return this;
    }

    this.clear = function() {
        this.wrapper.removeClass(this.errorClass);

        return this;
    }

    this.run = function(form) {
        this.bind(form);

        this.field.change(function() {
            if (that.validate()) {
                that.clear();
            } else {
                that.markIncorrect();
            }
        });
    }
}

Hawk.FormSender = function(id, fields, options) {
    var that = this;

    this.id = id;
    this.rawForm = document.getElementById(this.id);
    this.form = $(this.rawForm);

    this.fields = fields;

    this.defaultOptions = {
        ajaxPath: '/ajax.php',
        extraData: {},
        incorrectFieldClass: 'error',
        button: that.form.find('button[type="submit"]'),
        infoContainerClass: 'form__info-container',
        infoWrapperClass: 'form__info-wrapper',
        infoClass: 'form__info',
        spinnerClass: 'form__spinner',
        correctCallback: function() {},
        errorCallback: function() {},
        callback: function() {}
    };

    this.options = Hawk.mergeObjects(this.defaultOptions, options);

    this.infoContainer = this.form.find('.' + this.options.infoContainerClass);
    this.infoWrapper = this.form.find('.' + this.options.infoWrapperClass);
    this.info = this.form.find('.' + this.options.infoClass);
    this.spinner = this.form.find('.' + this.options.spinnerClass);
    this.button = this.options.button;

    this.validate = function() {
        var result = true;

        for (var i in this.fields) {
            var current = this.fields[i];

            if (!current.validate()) {
                current.markIncorrect();

                result = false;
            } else {
                current.clear();
            }
        }

        return result;
    }

    this.clear = function() {
        for (var i in this.fields) {
            var current = this.fields[i];

            current.clear();
        }

        return this;
    }

    this.checkFields = function(incorrectFields) {
        for (var i in this.fields) {
            var current = this.fields[i];

            if (Hawk.isInObject(current.name, incorrectFields)) {
                current.markIncorrect();
            } else {
                current.clear();
            }
        }

        return this;
    }

    this.changeMessage = function(message) {
        var showing = function() {
            that.info.html(message);

            that.infoWrapper.velocity("slideDown", {
                duration: 200,
                complete: function() {
                    that.infoContainer.css({ 'min-height': that.infoContainer.outerHeight() + "px" });

                    that.showMessage();
                }
            });
        }

        if (this.infoWrapper.is(':hidden')) {
            showing();
        } else {
            that.hideMessage(showing);
        }

        return this;
    }

    this.showMessage = function(message) {
        that.info.velocity({ opacity: 1 }, {
            duration: 200
        });

        return this;
    }

    this.hideMessage = function(callback) {
        this.info.velocity({ opacity: 0 }, {
            duration: 200,
            complete: function() {
                if (callback !== undefined) {
                    callback();
                }
            }
        });

        return this;
    }

    this.clearMessage = function(callback) {
        this.info.velocity({ opacity: 0 }, {
            duration: 200,
            complete: function() {
                that.infoWrapper.velocity("slideUp", {
                    duration: 200,
                    complete: function() {
                        that.infoContainer.css({ 'min-height': 0 });

                        if (callback !== undefined) {
                            callback();
                        }
                    }
                });
            }
        });

        return this;
    }

    this.hideButton = function() {
        this.button.velocity({ opacity: 0 }, {
            duration: 200,
            complete: function() {
                that.button.css({ visibility: 'hidden' });
            }
        });
    }

    this.disable = function() {
        this.form.attr('disabled', 'disabled');

        this.form.find('input, textarea').attr('disabled', 'disabled');

        return this;
    }

    this.send = function() {
        this.spinner.show();

        var data = new FormData(that.rawForm);

        for (var key in that.options.extraData) {
            data.append(key, that.options.extraData[key]);
        }

        $.ajax({
            url: that.options.ajaxPath,
            type: 'POST',
            data: data,
            cache: false,
            processData: false, // Don't process the files
            contentType: false,
            dataType: 'json',
            success: function(result) {
                console.log(result);

                if (!result.error) {
                    that.changeMessage(result.message);
                    
                    that.clear();

                    that.hideButton();

                    that.disable();
                } else {
                    that.checkFields(result.errorFields);

                    that.changeMessage(result.message);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('ERRORS: ' + textStatus);

                that.changeMessage("Wystąpił nieoczekiwany problem podczas wysyłania wiadomości. Proszę spróbować ponownie później.");
            },
            complete: function(jqXHR) {
                that.spinner.hide();
            }
        });  
    }

    this.bindFields = function() {
        for (var i in this.fields) {
            var current = this.fields[i];

            current.run(that.form);
        }

        return this;
    }

    this.run = function() {
        this.bindFields();

        this.form.submit(function(e) {
            e.preventDefault();

            that.send();
        });
    }
}

Hawk.refresh = function() {
    this.w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    this.h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeigh;

    return this;
}

Hawk.run = function() {
    var that = this;

    var pageLoadingLayer = $('#page-loading-layer');
    pageLoadingLayer.velocity("fadeOut", {
        duration: 1000
    });

    if(this.hash.length != 0) {
        this.scrollToElement({ anchor: this.hash + this.anchorSufix, delay: 200 });
    }

    $(window).resize(function() {
        that.refresh();
    });

    //this.initializeDropdowns();
    var defaultDropdown = new this.Dropdown($('#default-dropdown'), {
        onShow: function(defaultDropdown) {
            console.log("Otwarto");
        },
        onHide: function(defaultDropdown) {
            console.log("Ukryto");
        }
    });
    defaultDropdown.run();

    var expandingDropdown = new this.Dropdown($('#expanding-dropdown'), {
        type: Hawk.DropdownConstants.types.EXPANDING
    });
    expandingDropdown.run();

    var radioDropdown = new this.Dropdown($('#radio-dropdown'));
    radioDropdown.run();

    this.initializeMoreContentManagers({
        showButtonCallback: function(button) {
            button.velocity({ opacity: 0 }, {
                duration: 400,
                complete: function() {
                    button.find('.simple-button__inner').html("See less");
                    button.find('.simple-button__icon-top').css({ opacity: 1 });
                    button.find('.simple-button__icon-bottom').css({ opacity: 0 });
                    button.delay(100).velocity({ opacity: 1 });
                }
            });
        },
        hideButtonCallback: function(button) {
            button.velocity({ opacity: 0 }, {
                duration: 400,
                complete: function() {
                    button.find('.simple-button__inner').html("See more");
                    button.find('.simple-button__icon-top').css({ opacity: 0 });
                    button.find('.simple-button__icon-bottom').css({ opacity: 1 });
                    button.delay(100).velocity({ opacity: 1 });
                }
            });
        }
    });

    var overlayer = new this.OverlayerManager('overlayer');
    overlayer.run();

    var ajaxOverlayer = new this.AjaxOverlayerManager('overlayer');
    ajaxOverlayer.run();

    var mainmenu = new this.SlideMenu('main-menu', { mode: 'slide-fade', direction: 'right' });
    mainmenu.run();

    this.initializeAnchors({ menu: mainmenu, delay: 100 });

    var bookmarks = new this.BookmarksManager($('.bookmarks-manager').first());
    bookmarks.run();
    bookmarks.launchBookmark(0);

    var categorizedItems = new this.CategorizedItems($('.categorized-items').first());
    categorizedItems.run();

    var detailsList = new this.DetailsList($('.details-list').first());
    detailsList.run();

    return this;
}