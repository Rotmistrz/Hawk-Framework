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
    this.closeButton = this.container.find('.overlayer__close');

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

            let id = $(this).attr('data-id');

            const current = $('.overlayer-content[data-id=' + id + ']').first();

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

hawk.MoreContentManager = function(id) {
    this.id = id;
    this.moreButton = $('.more-button[data-id=' + this.id + ']');
    this.lessButton = $('.less-button[data-id=' + this.id + ']');

    this.contents = $('.more-content[data-id=' + this.id + ']');

    this.states = {
        hidden: 'hidden',
        visible: 'visible'
    };

    this.options = {
        slideSpeed: 200,
        buttonFadeSpeed: 400
    };

    this.state;

    if(this.moreButton === undefined || this.lessButton === undefined || this.contents === undefined) {
        return false;
    }

    this.show = function() {
        const that = this;

        this.contents.slideDown(that.options.slideSpeed, function() {
            that.moreButton.fadeOut(that.options.buttonFadeSpeed, function() {
                that.lessButton.fadeIn(that.options.buttonFadeSpeed);
            });

            that.state = that.states.visible;
        });
    }

    this.hide = function() {
        const that = this;

        this.contents.slideUp(that.options.slideSpeed, function() {
            that.lessButton.fadeOut(that.options.buttonFadeSpeed, function() {
                that.moreButton.fadeIn(that.options.buttonFadeSpeed);
            });

            that.state = that.states.hidden;
        });
    }

    this.run = function() {
        const that = this;

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
    const contents = $('.more-content');
    const that = this;

    contents.each(function() {
        let id = $(this).attr('data-id');

        let moreContents;

        if(moreContents = new that.MoreContentManager(id)) {
            moreContents.run();
        }
    });
}

hawk.SlideMenu = function(element, options) {
    this.menu = $(element);
    this.wrapper = this.menu.find('> div');

    this.mode;
    this.direction;
    this.state;

    this.states = {
        hidden: 'hidden',
        visible: 'visible'
    };

    this.modes = {
        slideFade: 'slide-fade',
        slide: 'slide'
    };

    this.directions = {
        top: 'top',
        right: 'right',
        bottom: 'bottom',
        left: 'left'
    };

    this.defaultOptions = {
        slideDuration: 500,
        fadeDuration: 200,
        direction: 'top',
        mode: 'slide-fade',
        toggler: $('.menu-toggler'),
        close: this.menu.find('.menu-close')
    };

    this.options = Object.assign(this.defaultOptions, options);

    this.showSlideFade = function() {
        const that = this;

        this.menu.show({
            effect: 'slide',
            duration: that.options.slideDuration,
            direction: that.options.direction,
            complete: function () {
                setTimeout(
                    function() {
                        that.wrapper.animate({ opacity: 1 }, that.options.fadeDuration);
                    },
                    100
                );
            }
        });
    };

    this.hideSlideFade = function() {
        const that = this;

        this.wrapper.animate({ opacity: 0 }, that.options.fadeDuration, function() {
            setTimeout(
                function() {
                    that.menu.hide({
                        duration: that.options.slideDuration,
                        effect: 'slide',
                        direction: that.options.direction
                    });
                },
                200
            );
        });
    };

    this.showSlide = function() {
        const that = this;

        this.menu.show({
            effect: 'slide',
            duration: that.options.slideDuration,
            direction: that.options.direction,
            complete: function () {

            }
        });
    };

    this.hideSlide = function() {
        const that = this;

        that.menu.hide({
            duration: that.options.slideDuration,
            effect: 'slide',
            direction: that.options.direction
        });
    };

    this.run = function() {
        var that = this;

    }
}

hawk.run = function() { 
    if(this.hash.length != 0) {
        this.scrollToElement({ anchor: this.hash + this.anchorSufix, delay: 200 });
    }

    $('.icon-hamburger').click(function() {
        $(this).toggleClass('open');
    });

    this.initializeDropdowns();
    this.initializeMoreContentManagers();

    const overlayer = new this.OverlayerManager('overlayer');
    overlayer.run();
}