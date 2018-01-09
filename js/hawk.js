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
        delay: 0,
        duration: 800,
        offset: 0
    };

    options = hawk.mergeObjects(defaultOptions, options);

    setTimeout(function(){
        $(options.container).scrollTo(options.anchor, options.duration, {'axis': 'y', 'offset': options.offset, onAfter: function() { options.callback(); } });
    }, options.delay);

    return this;
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

        return this;
    }

    this.setClosed = function() {
        this.state = this.states.closed;

        return this;
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

        return this;
    }

    this.hide = function() {
        var that = this;

        this.container.removeClass(that.options.openClass);
        this.list.velocity("slideUp", {
            duration: that.options.slideSpeed
        });

        this.setClosed();

        return this;
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
            if(that.isOpen()) {
                that.hide();
            }
        });

        return this;
    }
}

hawk.initializeDropdowns = function() {
    var dropdowns = $('.dropdown');
    var that = this;

    dropdowns.each(function() {
        var dropdown = new that.Dropdown($(this));
        dropdown.run();
    });

    return this;
}

hawk.OverlayerManager = function(id, options) {
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

hawk.AjaxOverlayerManager = function(id, options) {
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

hawk.MoreContentManager = function(id, options) {
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

    this.options = hawk.mergeObjects(this.defaultOptions, options);

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

hawk.initializeMoreContentManagers = function(callbacks) {
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
        showCallback: function(menu) {},
        hideCallback: function(menu, hideCall) {
            hideCall();
        }
    };

    this.options = hawk.mergeObjects(this.defaultOptions, options);

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

hawk.CategorizedItems = function(container, options) {
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

    this.options = hawk.mergeObjects(this.defaultOptions, options);

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

                    if(that.options.scrollOnSmallDevice && hawk.w < that.options.smallDeviceWidth) {
                        var containerId = that.contentContainer.attr('id');

                        if(containerId !== undefined) {
                            console.log(containerId);

                            hawk.scrollToElement({ anchor: '#' + containerId });
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
                if(property > hawk.w) {
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

hawk.refresh = function() {
    this.w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    this.h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeigh;

    return this;
}

hawk.run = function() {
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

    this.initializeDropdowns();
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