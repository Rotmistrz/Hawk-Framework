<!DOCTYPE html>
<html lang="pl">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="Description" content="" />
        <meta name="Keywords" content="" />
        <meta name="Robots" content="index,follow" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="Author" content="Filip J. Markiewicz" />
        <title>Hawk Framework</title>

        <!--[if lt IE 9]>
            <script src="/js/html5shiv.js"></script>
        <![endif]-->

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
        <script src="//code.jquery.com/ui/1.12.0/jquery-ui.js"></script>
        <script src="/js/jquery.scrollTo.js"></script>
        <script src="/js/retina.js"></script>
        <script src="/js/velocity.js"></script>
        <script src="/js/baguette-box.min.js"></script>

        <link href="https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i&amp;subset=latin-ext" rel="stylesheet" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/css/fonts.css" />
        <link rel="stylesheet" href="/css/animate.css" />
        <link rel="stylesheet" href="/css/hawk.css" />
        <link rel="stylesheet" href="/css/hover.css" />
        <link rel="stylesheet" href="/css/baguette-box.min.css" />
        <link rel="stylesheet" href="/css/main.css" />

        <link rel="icon" href="/img/favicon-192x192.png" sizes="192x192" type="image/png" />
        <link rel="icon" href="/img/favicon-128x128.png" sizes="128x128" type="image/png" />
        <link rel="icon" href="/img/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/img/favicon-16x16.png" sizes="16x16" type="image/png" />
     </head>
     <body>
        <section id="page-loading-layer" class="page-loading-layer"></section>

        <section id="main-menu" class="slide-menu main-menu">
            <div class="slide-menu__inner">
                <nav class="menu">
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <!--<li><a href="#column-layouts">Column layouts</a></li>-->
                        <li><a href="#icons">Icons</a></li>
                        <li><a href="#dropdowns">Dropdowns</a></li>
                        <li><a href="#forms">Forms</a></li>
                        <li><a href="#overlayers">Overlayers</a></li>
                        <li><a href="#more-contents">More contents</a></li>
                        <li><a href="#bookmarks">Bookmarks</a></li>
                        <li><a href="#details-lists">Details lists</a></li>
                        <li><a href="#categorized-items">Categorized items</a></li>
                    </ul>
                </nav>
            </div>
        </section>

        <div id="main-menu-toggler" class="menu-toggler">
            <div class="icon-hamburger icon-hamburger--light">
                <div class="icon-hamburger__inner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div class="icon-hamburger__hover-item"></div>
                    <div class="icon-hamburger__hover-item"></div>
                    <div class="icon-hamburger__hover-item"></div>
                </div>
            </div>
        </div>

        <?php
            require_once 'includes/CodeManager.php';

            $codeManager = new CodeManager('listings');
        ?>

        <div class="site-wrapper">
            <header id="home-anchor" class="site-header">
                <h1 class="site-title">Hawk Framework</h1>
            </header>

            <main class="site-content">
                <section id="icons-anchor" class="site-section section-02">
                    <div class="site-section__layer">
                        <div class="site-section__inner">
                            <header class="section-header">
                                <h2 class="section-title">Icons</h2>
                            </header>

                            <div class="text">
                                <p>
                                This is a set of the most often used icons. Every icon is prepared in three sizes and colours. To use small or large version of icon, you should add a class with <code class="inline-code">--small</code> or <code class="inline-code">--large</code> sufix. If you want to make icon medium or light colour, add... guess what? Yes, of course class with <code class="inline-code">--medium</code> or <code class="inline-code">--light</code> sufix!
                                </p>
                            </div>

                            <section class="site-section__content">
                                <section class="subsection">
                                    <header class="subsection-header">
                                        <h3 class="subsection-title">Hamburger</h3>
                                    </header>

                                    <section class="subsection__content">
                                        <article class="listing">
                                            <div class="listing__wrapper">
                                                <header class="listing__header">
                                                    <h4 class="listing__title">
                                                        <span class="listing__name">Listing 1</span>
                                                        <span class="listing__description">&ndash; icon hamburger</span>
                                                    </h4>
                                                </header>

                                                <section class="listing__code">
                                                    <?php

                                                        echo $codeManager->transformFile('icons/listing-icon-hamburger.html');

                                                    ?>
                                                </section>
                                            </div>
                                        </article>

                                        <ul class="icons">
                                            <li>
                                                <div class="icons__icon-container">
                                                    <div class="wrapper">
                                                        <div>
                                                            <div class="icons__icon icon-hamburger icon-hamburger--small">
                                                                <div class="icon-hamburger__inner">
                                                                    <div></div>
                                                                    <div></div>
                                                                    <div></div>
                                                                    <div class="icon-hamburger__hover"></div>
                                                                    <div class="icon-hamburger__hover"></div>
                                                                    <div class="icon-hamburger__hover"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                                            <li>
                                                <div class="icons__icon-container">
                                                    <div class="wrapper">
                                                        <div>
                                                            <div class="icons__icon icon-hamburger">
                                                                <div class="icon-hamburger__inner">
                                                                    <div></div>
                                                                    <div></div>
                                                                    <div></div>
                                                                    <div class="icon-hamburger__hover"></div>
                                                                    <div class="icon-hamburger__hover"></div>
                                                                    <div class="icon-hamburger__hover"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                                            <li>
                                                <div class="icons__icon-container">
                                                    <div class="wrapper">
                                                        <div>
                                                            <div class="icons__icon icon-hamburger icon-hamburger--large">
                                                                <div class="icon-hamburger__inner">
                                                                    <div></div>
                                                                    <div></div>
                                                                    <div></div>
                                                                    <div class="icon-hamburger__hover"></div>
                                                                    <div class="icon-hamburger__hover"></div>
                                                                    <div class="icon-hamburger__hover"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </section>
                                </section>

                                <section class="subsection">
                                    <header class="subsection-header">
                                        <h3 class="subsection-title">Arrows</h3>
                                    </header>

                                    <section class="subsection__content">
                                        <div class="subsection__row">
                                            <article class="listing">
                                                <div class="listing__wrapper">
                                                    <header class="listing__header">
                                                        <h4 class="listing__title">
                                                            <span class="listing__name">Listing 2</span>
                                                            <span class="listing__description">&ndash; icon arrow left</span>
                                                        </h4>
                                                    </header>

                                                    <section class="listing__code">
                                                        <?php

                                                            echo $codeManager->transformFile('icons/listing-icon-arrow-left.html');

                                                        ?>
                                                    </section>
                                                </div>
                                            </article>

                                            <ul class="icons">
                                                <li>
                                                    <div class="icons__icon-container">
                                                        <div class="wrapper">
                                                            <div>
                                                                <div class="icons__icon icon-arrow icon-arrow--left icon-arrow--small"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>

                                                <li>
                                                    <div class="icons__icon-container">
                                                        <div class="wrapper">
                                                            <div>
                                                                <div class="icons__icon icon-arrow icon-arrow--left"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>

                                                <li>
                                                    <div class="icons__icon-container">
                                                        <div class="wrapper">
                                                            <div>
                                                                <div class="icons__icon icon-arrow icon-arrow--left icon-arrow--large"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>

                                        <div class="subsection__row">
                                            <article class="listing">
                                                <div class="listing__wrapper">
                                                    <header class="listing__header">
                                                        <h4 class="listing__title">
                                                            <span class="listing__name">Listing 3</span>
                                                            <span class="listing__description">&ndash; icon arrow up</span>
                                                        </h4>
                                                    </header>

                                                    <section class="listing__code">
                                                        <?php

                                                            echo $codeManager->transformFile('icons/listing-arrow-up.html');

                                                        ?>
                                                    </section>
                                                </div>
                                            </article>

                                            <ul class="icons">
                                                <li>
                                                    <div class="icons__icon-container">
                                                        <div class="wrapper">
                                                            <div>
                                                                <div class="icons__icon icon-arrow icon-arrow--up icon-arrow--small"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>

                                                <li>
                                                    <div class="icons__icon-container">
                                                        <div class="wrapper">
                                                            <div>
                                                                <div class="icons__icon icon-arrow icon-arrow--up"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>

                                                <li>
                                                    <div class="icons__icon-container">
                                                        <div class="wrapper">
                                                            <div>
                                                                <div class="icons__icon icon-arrow icon-arrow--up icon-arrow--large"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>

                                        <div class="subsection__row">
                                            <article class="listing">
                                                <div class="listing__wrapper">
                                                    <header class="listing__header">
                                                        <h4 class="listing__title">
                                                            <span class="listing__name">Listing 4</span>
                                                            <span class="listing__description">&ndash; icon arrow right</span>
                                                        </h4>
                                                    </header>

                                                    <section class="listing__code">
                                                        <?php

                                                            echo $codeManager->transformFile('icons/listing-arrow-right.html');

                                                        ?>
                                                    </section>
                                                </div>
                                            </article>

                                            <ul class="icons">
                                                <li>
                                                    <div class="icons__icon-container">
                                                        <div class="wrapper">
                                                            <div>
                                                                <div class="icons__icon icon-arrow icon-arrow--right icon-arrow--small"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>

                                                <li>
                                                    <div class="icons__icon-container">
                                                        <div class="wrapper">
                                                            <div>
                                                                <div class="icons__icon icon-arrow icon-arrow--right"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>

                                                <li>
                                                    <div class="icons__icon-container">
                                                        <div class="wrapper">
                                                            <div>
                                                                <div class="icons__icon icon-arrow icon-arrow--right icon-arrow--large"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>

                                        <div class="subsection__row">
                                            <article class="listing">
                                                <div class="listing__wrapper">
                                                    <header class="listing__header">
                                                        <h4 class="listing__title">
                                                            <span class="listing__name">Listing 5</span>
                                                            <span class="listing__description">&ndash; icon arrow down</span>
                                                        </h4>
                                                    </header>

                                                    <section class="listing__code">
                                                        <?php

                                                            echo $codeManager->transformFile('icons/listing-icon-arrow-down.html');

                                                        ?>
                                                    </section>
                                                </div>
                                            </article>

                                            <ul class="icons">
                                                <li>
                                                    <div class="icons__icon-container">
                                                        <div class="wrapper">
                                                            <div>
                                                                <div class="icons__icon icon-arrow icon-arrow--down icon-arrow--small"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>

                                                <li>
                                                    <div class="icons__icon-container">
                                                        <div class="wrapper">
                                                            <div>
                                                                <div class="icons__icon icon-arrow icon-arrow--down"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>

                                                <li>
                                                    <div class="icons__icon-container">
                                                        <div class="wrapper">
                                                            <div>
                                                                <div class="icons__icon icon-arrow icon-arrow--down icon-arrow--large"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </section>
                                </section>

                                <section class="subsection">
                                    <header class="subsection-header">
                                        <h3 class="subsection-title">Trangular arrows</h3>
                                    </header>

                                    <section class="subsection__content">
                                        <div class="subsection__row">
                                            <article class="listing">
                                                <div class="listing__wrapper">
                                                    <header class="listing__header">
                                                        <h4 class="listing__title">
                                                            <span class="listing__name">Listing 6</span>
                                                            <span class="listing__description">&ndash; icon triangular arrow left</span>
                                                        </h4>
                                                    </header>

                                                    <section class="listing__code">
                                                        <?php

                                                            echo $codeManager->transformFile('icons/listing-icon-triangular-arrow-left.html');

                                                        ?>
                                                    </section>
                                                </div>
                                            </article>

                                            <ul class="icons">
                                                <li>
                                                    <div class="icons__icon-container">
                                                        <div class="wrapper">
                                                            <div>
                                                                <div class="icons__icon icon-triangular-arrow-left icon-triangular-arrow-left--small"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>

                                                <li>
                                                    <div class="icons__icon-container">
                                                        <div class="wrapper">
                                                            <div>
                                                                <div class="icons__icon icon-triangular-arrow-left"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>

                                                <li>
                                                    <div class="icons__icon-container">
                                                        <div class="wrapper">
                                                            <div>
                                                                <div class="icons__icon icon-triangular-arrow-left icon-triangular-arrow-left--large"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>

                                        <div class="subsection__row">
                                            <article class="listing">
                                                <div class="listing__wrapper">
                                                    <header class="listing__header">
                                                        <h4 class="listing__title">
                                                            <span class="listing__name">Listing 7</span>
                                                            <span class="listing__description">&ndash; icon triangular arrow up</span>
                                                        </h4>
                                                    </header>

                                                    <section class="listing__code">
                                                        <?php

                                                            echo $codeManager->transformFile('icons/listing-icon-triangular-arrow-up.html');

                                                        ?>
                                                    </section>
                                                </div>
                                            </article>

                                            <ul class="icons">
                                                <li>
                                                    <div class="icons__icon-container">
                                                        <div class="wrapper">
                                                            <div>
                                                                <div class="icons__icon icon-triangular-arrow-up icon-triangular-arrow-up--small"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>

                                                <li>
                                                    <div class="icons__icon-container">
                                                        <div class="wrapper">
                                                            <div>
                                                                <div class="icons__icon icon-triangular-arrow-up"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>

                                                <li>
                                                    <div class="icons__icon-container">
                                                        <div class="wrapper">
                                                            <div>
                                                                <div class="icons__icon icon-triangular-arrow-up icon-triangular-arrow-up--large"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>

                                        <div class="subsection__row">
                                            <article class="listing">
                                                <div class="listing__wrapper">
                                                    <header class="listing__header">
                                                        <h4 class="listing__title">
                                                            <span class="listing__name">Listing 8</span>
                                                            <span class="listing__description">&ndash; icon triangular arrow right</span>
                                                        </h4>
                                                    </header>

                                                    <section class="listing__code">
                                                        <?php

                                                            echo $codeManager->transformFile('icons/listing-icon-triangular-arrow-right.html');

                                                        ?>
                                                    </section>
                                                </div>
                                            </article>

                                            <ul class="icons">
                                                <li>
                                                    <div class="icons__icon-container">
                                                        <div class="wrapper">
                                                            <div>
                                                                <div class="icons__icon icon-triangular-arrow-right icon-triangular-arrow-right--small"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>

                                                <li>
                                                    <div class="icons__icon-container">
                                                        <div class="wrapper">
                                                            <div>
                                                                <div class="icons__icon icon-triangular-arrow-right"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>

                                                <li>
                                                    <div class="icons__icon-container">
                                                        <div class="wrapper">
                                                            <div>
                                                                <div class="icons__icon icon-triangular-arrow-right icon-triangular-arrow-right--large"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>

                                        <div class="subsection__row">
                                            <article class="listing">
                                                <div class="listing__wrapper">
                                                    <header class="listing__header">
                                                        <h4 class="listing__title">
                                                            <span class="listing__name">Listing 9</span>
                                                            <span class="listing__description">&ndash; icon triangular arrow down</span>
                                                        </h4>
                                                    </header>

                                                    <section class="listing__code">
                                                        <?php

                                                            echo $codeManager->transformFile('icons/listing-icon-triangular-arrow-down.html');

                                                        ?>
                                                    </section>
                                                </div>
                                            </article>

                                            <ul class="icons">
                                                <li>
                                                    <div class="icons__icon-container">
                                                        <div class="wrapper">
                                                            <div>
                                                                <div class="icons__icon icon-triangular-arrow-down icon-triangular-arrow-down--small"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>

                                                <li>
                                                    <div class="icons__icon-container">
                                                        <div class="wrapper">
                                                            <div>
                                                                <div class="icons__icon icon-triangular-arrow-down"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>

                                                <li>
                                                    <div class="icons__icon-container">
                                                        <div class="wrapper">
                                                            <div>
                                                                <div class="icons__icon icon-triangular-arrow-down icon-triangular-arrow-down--large"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </section>
                                </section>

                                <section class="subsection">
                                    <header class="subsection-header">
                                        <h3 class="subsection-title">Plus</h3>
                                    </header>

                                    <section class="subsection__content">
                                        <article class="listing">
                                            <div class="listing__wrapper">
                                                <header class="listing__header">
                                                    <h4 class="listing__title">
                                                        <span class="listing__name">Listing 10</span>
                                                        <span class="listing__description">&ndash; icon plus</span>
                                                    </h4>
                                                </header>

                                                <section class="listing__code">
                                                    <?php

                                                        echo $codeManager->transformFile('icons/listing-icon-plus.html');

                                                    ?>
                                                </section>
                                            </div>
                                        </article>

                                        <ul class="icons">
                                            <li>
                                                <div class="icons__icon-container">
                                                    <div class="wrapper">
                                                        <div>
                                                            <div class="icons__icon icon-plus icon-plus--small"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                                            <li>
                                                <div class="icons__icon-container">
                                                    <div class="wrapper">
                                                        <div>
                                                            <div class="icons__icon icon-plus"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                                            <li>
                                                <div class="icons__icon-container">
                                                    <div class="wrapper">
                                                        <div>
                                                            <div class="icons__icon icon-plus icon-plus--large"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </section>
                                </section>

                                <section class="subsection">
                                    <header class="subsection-header">
                                        <h3 class="subsection-title">Plus rotated</h3>
                                    </header>

                                    <section class="subsection__content">
                                        <article class="listing">
                                            <div class="listing__wrapper">
                                                <header class="listing__header">
                                                    <h4 class="listing__title">
                                                        <span class="listing__name">Listing 11</span>
                                                        <span class="listing__description">&ndash; icon plus rotated</span>
                                                    </h4>
                                                </header>

                                                <section class="listing__code">
                                                    <?php

                                                        echo $codeManager->transformFile('icons/listing-icon-plus-rotated.html');

                                                    ?>
                                                </section>
                                            </div>
                                        </article>

                                        <ul class="icons">
                                            <li>
                                                <div class="icons__icon-container">
                                                    <div class="wrapper">
                                                        <div>
                                                            <div class="icons__icon icon-plus icon-plus--small icon-plus--rotated"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                                            <li>
                                                <div class="icons__icon-container">
                                                    <div class="wrapper">
                                                        <div>
                                                            <div class="icons__icon icon-plus icon-plus--rotated"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                                            <li>
                                                <div class="icons__icon-container">
                                                    <div class="wrapper">
                                                        <div>
                                                            <div class="icons__icon icon-plus icon-plus--large icon-plus--rotated"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </section>
                                </section>
                            </section>
                        </div>
                    </div>
                </section>

                <section id="dropdowns-anchor" class="site-section section-03">
                    <div class="site-section__layer">
                        <div class="site-section__inner">
                            <header class="section-header">
                                <h2 class="section-title">Dropdowns</h2>
                            </header>

                            <div class="text">
                                <p>
                                Dropdowns are often used in many cases on websites.
                                </p>
                            </div>

                            <section class="site-section__content">
                                <section class="subsection">
                                    <header class="subsection-header">
                                        <h3 class="subsection-title">Default dropdown</h3>
                                    </header>

                                    <article class="listing">
                                        <div class="listing__wrapper">
                                            <header class="listing__header">
                                                <h4 class="listing__title">
                                                    <span class="listing__name">Listing 12</span>
                                                    <span class="listing__description">&ndash; dropdown &ndash; HTML code</span>
                                                </h4>
                                            </header>

                                            <section class="listing__code">
                                                <?php

                                                    echo $codeManager->transformFile('dropdowns/listing-dropdown.html');

                                                ?>
                                            </section>
                                        </div>
                                    </article>

                                    <article class="listing">
                                        <div class="listing__wrapper">
                                            <header class="listing__header">
                                                <h4 class="listing__title">
                                                    <span class="listing__name">Listing 13</span>
                                                    <span class="listing__description">&ndash; dropdown &ndash; default</span>
                                                </h4>
                                            </header>

                                            <section class="listing__code">
                                                <?php

                                                    echo $codeManager->transformFile('dropdowns/listing-dropdown-js.html');

                                                ?>
                                            </section>
                                        </div>
                                    </article>

                                    <div class="single-dropdown-container">
                                        <section id="exemplary-dropdown" class="dropdown">
                                            <header class="dropdown__header">
                                                <h4 class="dropdown__title">Exemplary dropdown</h4>
                                                <div class="dropdown__icon icon-triangular-arrow-down icon-triangular-arrow-down--small"></div>
                                            </header>

                                            <section class="dropdown__list-container">
                                                <ul class="dropdown__list">
                                                    <li>Lorem ipsum dolor</li>
                                                    <li>Sed tristique massa</li>
                                                    <li>Orci varius natoque penatibus</li>
                                                    <li>Aliquam in mi non dolor</li>
                                                </ul>
                                            </section>
                                        </section>
                                    </div>
                                </section>

                                <section class="subsection">
                                    <header class="subsection-header">
                                        <h3 class="subsection-title">Expanding dropdown</h3>
                                    </header>

                                    <article class="listing">
                                        <div class="listing__wrapper">
                                            <header class="listing__header">
                                                <h4 class="listing__title">
                                                    <span class="listing__name">Listing 14</span>
                                                    <span class="listing__description">&ndash; dropdown &ndash; expanding type</span>
                                                </h4>
                                            </header>

                                            <section class="listing__code">
                                                <?php

                                                    echo $codeManager->transformFile('dropdowns/listing-dropdown-expanding-js.html');

                                                ?>
                                            </section>
                                        </div>
                                    </article>

                                    <div class="single-dropdown-container">
                                        <section id="expanding-dropdown" class="dropdown">
                                            <header class="dropdown__header">
                                                <h4 class="dropdown__title">Expanding dropdown</h4>
                                                <div class="dropdown__icon icon-triangular-arrow-down icon-triangular-arrow-down--small"></div>
                                            </header>

                                            <section class="dropdown__list-container">
                                                <ul class="dropdown__list">
                                                    <li>Lorem ipsum dolor</li>
                                                    <li>Sed tristique massa</li>
                                                    <li>Orci varius natoque penatibus</li>
                                                    <li>Aliquam in mi non dolor</li>
                                                </ul>
                                            </section>
                                        </section>
                                    </div>
                                </section>

                                <section class="subsection">
                                    <header class="subsection-header">
                                        <h3 class="subsection-title">Dropdown with radio buttons</h3>
                                    </header>

                                    <article class="listing">
                                        <div class="listing__wrapper">
                                            <header class="listing__header">
                                                <h4 class="listing__title">
                                                    <span class="listing__name">Listing 15</span>
                                                    <span class="listing__description">&ndash; dropdown with radio buttons</span>
                                                </h4>
                                            </header>

                                            <section class="listing__code">
                                                <?php

                                                    echo $codeManager->transformFile('dropdowns/listing-dropdown-radio.html');

                                                ?>
                                            </section>
                                        </div>
                                    </article>

                                    <article class="listing">
                                        <div class="listing__wrapper">
                                            <header class="listing__header">
                                                <h4 class="listing__title">
                                                    <span class="listing__name">Listing 16</span>
                                                    <span class="listing__description">&ndash; dropdown &ndash; choosable mode</span>
                                                </h4>
                                            </header>

                                            <section class="listing__code">
                                                <?php

                                                    echo $codeManager->transformFile('dropdowns/listing-dropdown-radio-js.html');

                                                ?>
                                            </section>
                                        </div>
                                    </article>

                                    <div class="single-dropdown-container">
                                        <section id="radio-dropdown" class="dropdown">
                                            <header class="dropdown__header">
                                                <h4 class="dropdown__title">Radio dropdown</h4>
                                                <div class="dropdown__icon icon-triangular-arrow-down icon-triangular-arrow-down--small"></div>
                                            </header>

                                            <section class="dropdown__list-container">
                                                <ul class="dropdown__list">
                                                    <li>
                                                        <label class="list-choice-field dropdown-item">
                                                            <input name="dropdown" type="radio" value="0" />

                                                            <div class="list-choice-field__wrapper">
                                                                <div class="list-choice-field__inner">
                                                                    <div class="list-choice-field__description dropdown-item__description">Lorem ipsum dolor</div>
                                                                </div>
                                                            </div>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label class="list-choice-field dropdown-item">
                                                            <input name="dropdown" type="radio" value="1" />

                                                            <div class="list-choice-field__wrapper">
                                                                <div class="list-choice-field__inner">
                                                                    <div class="list-choice-field__description dropdown-item__description">Sed tristique massa</div>
                                                                </div>
                                                            </div>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label class="list-choice-field dropdown-item">
                                                            <input name="dropdown" type="radio" value="2" />

                                                            <div class="list-choice-field__wrapper">
                                                                <div class="list-choice-field__inner">
                                                                    <div class="list-choice-field__description dropdown-item__description">Orci varius natoque penatibus</div>
                                                                </div>
                                                            </div>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label class="list-choice-field dropdown-item">
                                                            <input name="dropdown" type="radio" value="3" />

                                                            <div class="list-choice-field__wrapper">
                                                                <div class="list-choice-field__inner">
                                                                    <div class="list-choice-field__description dropdown-item__description">Aliquam in mi non dolor</div>
                                                                </div>
                                                            </div>
                                                        </label>
                                                    </li>
                                                </ul>
                                            </section>
                                        </section>
                                    </div>
                                </section>
                            </section>

                            <section class="site-section__content">
                                <section class="subsection">
                                    <header class="subsection-header">
                                        <h3 class="subsection-title">General</h3>
                                    </header>

                                    <section class="subsection__content">
                                        <section class="subsection__row">
                                            <div class="text">
                                                <p>
                                                All the constants are available in Hawk.DropdownConstants object properties:
                                                </p>

                                                <ul class="simple-list">
                                                    <li>
                                                        <code class="inline-code">Hawk.DropdownConstants.modes</code>: <span class="variable">PLAIN</span>, <span class="variable">CHOOSABLE</span>
                                                    </li>

                                                    <li>
                                                        <code class="inline-code">Hawk.DropdownConstants.types</code>: <span class="variable">OVERLAYER</span>, <span class="variable">EXPANDING</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </section>
                                        
                                        <section class="subsection__row">
                                            <section class="table properties-table">
                                                <div class="table__wrapper">
                                                    <header class="table__row table__row--header">
                                                        <div class="table__cell properties-table__name-cell">
                                                        Name
                                                        </div>

                                                        <div class="table__cell properties-table__default-value-cell">
                                                        Default value
                                                        </div>

                                                        <div class="table__cell properties-table__description-cell">
                                                        Description
                                                        </div>
                                                    </header>

                                                    <section class="table__row">
                                                        <div class="table__cell properties-table__name-cell">
                                                            <article class="property">
                                                                <section class="property__name">slideSpeed</section>
                                                                <section class="property__type">integer</section>
                                                            </article>
                                                        </div>

                                                        <div class="table__cell properties-table__default-value-cell">
                                                        200
                                                        </div>

                                                        <div class="table__cell properties-table__description-cell">
                                                        Speed of expanding the dropdown (in miliseconds)
                                                        </div>
                                                    </section>

                                                    <section class="table__row">
                                                        <div class="table__cell properties-table__name-cell">
                                                            <article class="property">
                                                                <section class="property__name">mode</section>
                                                                <section class="property__type">PLAIN, CHOOSABLE</section>
                                                            </article>
                                                        </div>

                                                        <div class="table__cell properties-table__default-value-cell">
                                                        PLAIN
                                                        </div>

                                                        <div class="table__cell properties-table__description-cell">
                                                        Dropdown working mode. In <span class="variable">CHOOSABLE</span> mode, the description of radio button will be set as a title of dropdown.
                                                        </div>
                                                    </section>

                                                    <section class="table__row">
                                                        <div class="table__cell properties-table__name-cell">
                                                            <article class="property">
                                                                <section class="property__name">type</section>
                                                                <section class="property__type">OVERLAYER, EXPANDING</section>
                                                            </article>
                                                        </div>

                                                        <div class="table__cell properties-table__default-value-cell">
                                                        OVERLAYER
                                                        </div>

                                                        <div class="table__cell properties-table__description-cell">
                                                        Dropdown working type.
                                                        </div>
                                                    </section>

                                                    <section class="table__row">
                                                        <div class="table__cell properties-table__name-cell">
                                                            <article class="property">
                                                                <section class="property__name">containerClass</section>
                                                                <section class="property__type">string</section>
                                                            </article>
                                                        </div>

                                                        <div class="table__cell properties-table__default-value-cell">
                                                        dropdown
                                                        </div>

                                                        <div class="table__cell properties-table__description-cell">
                                                        name of the container&apos;s class
                                                        </div>
                                                    </section>

                                                    <section class="table__row">
                                                        <div class="table__cell properties-table__name-cell">
                                                            <article class="property">
                                                                <section class="property__name">openClass</section>
                                                                <section class="property__type">string</section>
                                                            </article>
                                                        </div>

                                                        <div class="table__cell properties-table__default-value-cell">
                                                        dropdown--open
                                                        </div>

                                                        <div class="table__cell properties-table__description-cell">
                                                        classname of the open container
                                                        </div>
                                                    </section>

                                                    <section class="table__row">
                                                        <div class="table__cell properties-table__name-cell">
                                                            <article class="property">
                                                                <section class="property__name">choosableModeClass</section>
                                                                <section class="property__type">string</section>
                                                            </article>
                                                        </div>

                                                        <div class="table__cell properties-table__default-value-cell">
                                                        dropdown--choosable
                                                        </div>

                                                        <div class="table__cell properties-table__description-cell">
                                                        name of the container&apos;s class of dropdown working in choosable mode
                                                        </div>
                                                    </section>

                                                    <section class="table__row">
                                                        <div class="table__cell properties-table__name-cell">
                                                            <article class="property">
                                                                <section class="property__name">expandingTypeClass</section>
                                                                <section class="property__type">string</section>
                                                            </article>
                                                        </div>

                                                        <div class="table__cell properties-table__default-value-cell">
                                                        dropdown--expanding
                                                        </div>

                                                        <div class="table__cell properties-table__description-cell">
                                                        name of the container&apos;s class of dropdown working in expanding type
                                                        </div>
                                                    </section>

                                                    <section class="table__row">
                                                        <div class="table__cell properties-table__name-cell">
                                                            <article class="property">
                                                                <section class="property__name">headerClass</section>
                                                                <section class="property__type">string</section>
                                                            </article>
                                                        </div>

                                                        <div class="table__cell properties-table__default-value-cell">
                                                        dropdown__header
                                                        </div>

                                                        <div class="table__cell properties-table__description-cell">
                                                        classname of the header
                                                        </div>
                                                    </section>

                                                    <section class="table__row">
                                                        <div class="table__cell properties-table__name-cell">
                                                            <article class="property">
                                                                <section class="property__name">titleClass</section>
                                                                <section class="property__type">string</section>
                                                            </article>
                                                        </div>

                                                        <div class="table__cell properties-table__default-value-cell">
                                                        dropdown__title
                                                        </div>

                                                        <div class="table__cell properties-table__description-cell">
                                                        classname of the title
                                                        </div>
                                                    </section>

                                                    <section class="table__row">
                                                        <div class="table__cell properties-table__name-cell">
                                                            <article class="property">
                                                                <section class="property__name">listContainerClass</section>
                                                                <section class="property__type">string</section>
                                                            </article>
                                                        </div>

                                                        <div class="table__cell properties-table__default-value-cell">
                                                        dropdown__list-container
                                                        </div>

                                                        <div class="table__cell properties-table__description-cell">
                                                        classname of the list container
                                                        </div>
                                                    </section>

                                                    <section class="table__row">
                                                        <div class="table__cell properties-table__name-cell">
                                                            <article class="property">
                                                                <section class="property__name">listClass</section>
                                                                <section class="property__type">string</section>
                                                            </article>
                                                        </div>

                                                        <div class="table__cell properties-table__default-value-cell">
                                                        dropdown__list
                                                        </div>

                                                        <div class="table__cell properties-table__description-cell">
                                                        classname of the list
                                                        </div>
                                                    </section>
                                                </div>
                                            </section>
                                        </section>
                                    </section>
                                </section>

                                <section class="subsection">
                                    <header class="subsection-header">
                                        <h3 class="subsection-title">Callbacks</h3>
                                    </header>

                                    <section class="table functions-table">
                                        <div class="table__wrapper">
                                            <header class="table__row table__row--header">
                                                <div class="table__cell functions-table__name-cell">
                                                Name
                                                </div>

                                                <div class="table__cell functions-table__parameter-cell">
                                                Arguments
                                                </div>

                                                <div class="table__cell functions-table__description-cell">
                                                Description
                                                </div>
                                            </header>

                                            <section class="table__row">
                                                <div class="table__cell functions-table__name-cell">
                                                    <article class="function">
                                                        <div class="function__name">
                                                        onShow
                                                        </div>

                                                        <div class="function__returned-type">

                                                        </div>
                                                    </article>
                                                </div>

                                                <div class="table__cell functions-table__parameter-cell">
                                                    <article class="function-parameter">
                                                        <div class="function-parameter__name">
                                                        dropdown
                                                        </div>

                                                        <div class="function-parameter__description">
                                                        current dropdown
                                                        </div>
                                                    </article>
                                                </div>

                                                <div class="table__cell functions-table__description-cell">
                                                Executes immediately after the dropdown&apos;s list is shown.
                                                </div>
                                            </section>

                                            <section class="table__row">
                                                <div class="table__cell functions-table__name-cell">
                                                    <article class="function">
                                                        <div class="function__name">
                                                        onHide
                                                        </div>

                                                        <div class="function__returned-type">
                                                        
                                                        </div>
                                                    </article>
                                                </div>

                                                <div class="table__cell functions-table__parameter-cell">
                                                    <article class="function-parameter">
                                                        <div class="function-parameter__name">
                                                        dropdown
                                                        </div>

                                                        <div class="function-parameter__description">
                                                        current dropdown
                                                        </div>
                                                    </article>
                                                </div>

                                                <div class="table__cell functions-table__description-cell">
                                                Executes immediately after the dropdown&apos;s list is hidden.
                                                </div>
                                            </section>

                                            <section class="table__row">
                                                <div class="table__cell functions-table__name-cell">
                                                    <article class="function">
                                                        <div class="function__name">
                                                        onRadioSelected
                                                        </div>

                                                        <div class="function__returned-type">
                                                        
                                                        </div>
                                                    </article>
                                                </div>

                                                <div class="table__cell functions-table__parameter-cell">
                                                    <ul class="function-parameters-list">
                                                        <li>
                                                            <article class="function-parameter">
                                                                <div class="function-parameter__name">
                                                                dropdown
                                                                </div>

                                                                <div class="function-parameter__description">
                                                                current dropdown
                                                                </div>
                                                            </article>
                                                        </li>

                                                        <li>
                                                            <article class="function-parameter">
                                                                <div class="function-parameter__name">
                                                                radio
                                                                </div>

                                                                <div class="function-parameter__description">
                                                                current radio button selected
                                                                </div>
                                                            </article>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div class="table__cell functions-table__description-cell">
                                                Executes when the radio button is selected.
                                                </div>
                                            </section>
                                        </div>
                                    </section>
                                </section>

                                <section class="subsection">
                                    <header class="subsection-header">
                                        <h3 class="subsection-title">Public methods</h3>
                                    </header>

                                    <section class="table functions-table">
                                        <div class="table__wrapper">
                                            <header class="table__row table__row--header">
                                                <div class="table__cell functions-table__name-cell">
                                                Name
                                                </div>

                                                <div class="table__cell functions-table__parameter-cell">
                                                Arguments
                                                </div>

                                                <div class="table__cell functions-table__description-cell">
                                                Description
                                                </div>
                                            </header>

                                            <section class="table__row">
                                                <div class="table__cell functions-table__name-cell">
                                                    <article class="function">
                                                        <div class="function__name">
                                                        show
                                                        </div>

                                                        <div class="function__returned-type">
                                                        Dropdown
                                                        </div>
                                                    </article>
                                                </div>

                                                <div class="table__cell functions-table__parameter-cell">
                                                    
                                                </div>

                                                <div class="table__cell functions-table__description-cell">
                                                Shows the dropdown.
                                                </div>
                                            </section>

                                            <section class="table__row">
                                                <div class="table__cell functions-table__name-cell">
                                                    <article class="function">
                                                        <div class="function__name">
                                                        hide
                                                        </div>

                                                        <div class="function__returned-type">
                                                        Dropdown
                                                        </div>
                                                    </article>
                                                </div>

                                                <div class="table__cell functions-table__parameter-cell">
                                                    
                                                </div>

                                                <div class="table__cell functions-table__description-cell">
                                                Hides the dropdown.
                                                </div>
                                            </section>

                                            <section class="table__row">
                                                <div class="table__cell functions-table__name-cell">
                                                    <article class="function">
                                                        <div class="function__name">
                                                        isOpen
                                                        </div>

                                                        <div class="function__returned-type">
                                                        boolean
                                                        </div>
                                                    </article>
                                                </div>

                                                <div class="table__cell functions-table__parameter-cell">
                                                    
                                                </div>

                                                <div class="table__cell functions-table__description-cell">
                                                Says whether the dropdown is open at this moment or not.
                                                </div>
                                            </section>
                                        </div>
                                    </section>
                                </section>
                            </section>
                        </div>
                    </div>
                </section>

                <section id="overlayers-anchor" class="site-section section-07">
                    <div class="site-section__layer">
                        <div class="site-section__inner">
                            <header class="section-header">
                                <h2 class="section-title">Overlayers</h2>
                            </header>

                            <div class="text">
                                <p>
                                Overlayers are very useful way to present contents.
                                </p>
                            </div>

                            <section class="site-section__content">
                                <article class="listing">
                                    <div class="listing__wrapper">
                                        <header class="listing__header">
                                            <h4 class="listing__title">
                                                <span class="listing__name">Listing 12</span>
                                                <span class="listing__description">&ndash; dropdown &ndash; HTML code</span>
                                            </h4>
                                        </header>

                                        <section class="listing__code">
                                            <?php

                                                echo $codeManager->transformFile('dropdowns/listing-dropdown.html');

                                            ?>
                                        </section>
                                    </div>
                                </article>

                                <div class="button-container">
                                    <button class="button ajax-overlayer-button" data-id="1" data-overlayer-id="1" type="button">See more</button>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>

                <section id="forms-anchor" class="site-section section-04">
                    <div class="site-section__layer">
                        <div class="site-section__inner">
                            <header class="section-header">
                                <h2 class="section-title">Forms</h2>
                            </header>

                            <section class="site-section__content">
                                <form id="form-opinion" class="form" action="/" method="post">
                                    <fieldset class="form__wrapper">
                                        <div class="form__field-container">
                                            <label class="form__field-wrapper">
                                                <input id="form-opinion-name" class="form__field" name="name" type="text" placeholder="Your name" />
                                            </label>
                                        </div>

                                        <div class="form__field-container">
                                            <label class="form__field-wrapper">
                                                <input id="form-opinion-email" class="form__field" name="email" type="text" placeholder="Your e-mail" />
                                            </label>
                                        </div>

                                        <!--<div class="form__field-container">
                                            <section class="dropdown">
                                                <header class="dropdown__header">
                                                    <h1 class="dropdown__title">Choose one or more options</h1>
                                                    <div class="icon icon-triangular-arrow-down icon-triangular-arrow-down--small"></div>
                                                </header>

                                                <ul class="dropdown__list">
                                                    <li>
                                                        <label class="choice-field">
                                                            <input name="checkbox[]" type="checkbox" value="Value 4" />
                                                            <div class="choice-field__inner">
                                                                <div class="choice-field__field-container">
                                                                    <div class="choice-field__field"></div>
                                                                </div>
                                                                <div class="choice-field__description">Aliquam in mi non dolor</div>
                                                            </div>
                                                        </label>
                                                    </li>

                                                    <li>
                                                        <label class="choice-field">
                                                            <input name="checkbox[]" type="checkbox" value="Value 4" />
                                                            <div class="choice-field__inner">
                                                                <div class="choice-field__field-container">
                                                                    <div class="choice-field__field"></div>
                                                                </div>
                                                                <div class="choice-field__description">Lorem ipsum dolor</div>
                                                            </div>
                                                        </label>
                                                    </li>

                                                    <li>
                                                        <label class="choice-field">
                                                            <input name="checkbox[]" type="checkbox" value="Value 4" />
                                                            <div class="choice-field__inner">
                                                                <div class="choice-field__field-container">
                                                                    <div class="choice-field__field"></div>
                                                                </div>
                                                                <div class="choice-field__description">Orci varius natoque penatibus</div>
                                                            </div>
                                                        </label>
                                                    </li>

                                                    <li>
                                                        <label class="choice-field">
                                                            <input name="checkbox[]" type="checkbox" value="Value 4" />
                                                            <div class="choice-field__inner">
                                                                <div class="choice-field__field-container">
                                                                    <div class="choice-field__field"></div>
                                                                </div>
                                                                <div class="choice-field__description">Sed tristique massa</div>
                                                            </div>
                                                        </label>
                                                    </li>
                                                </ul>
                                            </section>
                                        </div>

                                        <div class="form__field-container">
                                            <section class="dropdown">
                                                <header class="dropdown__header">
                                                    <h1 class="dropdown__title">Choose one option</h1>
                                                    <div class="icon icon-triangular-arrow-down icon-triangular-arrow-down--small"></div>
                                                </header>

                                                <ul class="dropdown__list">
                                                    <li>
                                                        <label class="choice-field choice-field--radio">
                                                            <input name="radio" type="radio" value="Value 4" />
                                                            <div class="choice-field__inner">
                                                                <div class="choice-field__field-container">
                                                                    <div class="choice-field__field"></div>
                                                                </div>
                                                                <div class="choice-field__description">Aliquam in mi non dolor</div>
                                                            </div>
                                                        </label>
                                                    </li>

                                                    <li>
                                                        <label class="choice-field choice-field--radio">
                                                            <input name="radio" type="radio" value="Value 4" />
                                                            <div class="choice-field__inner">
                                                                <div class="choice-field__field-container">
                                                                    <div class="choice-field__field"></div>
                                                                </div>
                                                                <div class="choice-field__description">Lorem ipsum dolor</div>
                                                            </div>
                                                        </label>
                                                    </li>

                                                    <li>
                                                        <label class="choice-field choice-field--radio">
                                                            <input name="radio" type="radio" value="Value 4" />
                                                            <div class="choice-field__inner">
                                                                <div class="choice-field__field-container">
                                                                    <div class="choice-field__field"></div>
                                                                </div>
                                                                <div class="choice-field__description">Orci varius natoque penatibus</div>
                                                            </div>
                                                        </label>
                                                    </li>

                                                    <li>
                                                        <label class="choice-field choice-field--radio">
                                                            <input name="radio" type="radio" value="Value 4" />
                                                            <div class="choice-field__inner">
                                                                <div class="choice-field__field-container">
                                                                    <div class="choice-field__field"></div>
                                                                </div>
                                                                <div class="choice-field__description">Sed tristique massa</div>
                                                            </div>
                                                        </label>
                                                    </li>
                                                </ul>
                                            </section>
                                        </div>-->

                                        <div class="form__field-container">
                                            <div class="form__multifields-wrapper">
                                                <div class="form__field-label">
                                                Give your opinion (there is consciously a possibility to select counter-opinions to show usage of multiple-choice options with section that makes sense)
                                                </div>

                                                <label class="choice-field">
                                                    <input name="note[]" type="checkbox" value="well-coded" />
                                                    <div class="choice-field__inner">
                                                        <div class="choice-field__field-container">
                                                            <div class="choice-field__field"></div>
                                                        </div>
                                                        <div class="choice-field__description">It is well-coded.</div>
                                                    </div>
                                                </label>

                                                <label class="choice-field">
                                                    <input name="note[]" type="checkbox" value="badly-coded" />
                                                    <div class="choice-field__inner">
                                                        <div class="choice-field__field-container">
                                                            <div class="choice-field__field"></div>
                                                        </div>
                                                        <div class="choice-field__description">It is badly-coded.</div>
                                                    </div>
                                                </label>

                                                <label class="choice-field">
                                                    <input name="note[]" type="checkbox" value="will-use-it" />
                                                    <div class="choice-field__inner">
                                                        <div class="choice-field__field-container">
                                                            <div class="choice-field__field"></div>
                                                        </div>
                                                        <div class="choice-field__description">I will use it.</div>
                                                    </div>
                                                </label>

                                                <label class="choice-field">
                                                    <input name="note[]" type="checkbox" value="wont-use-it" />
                                                    <div class="choice-field__inner">
                                                        <div class="choice-field__field-container">
                                                            <div class="choice-field__field"></div>
                                                        </div>
                                                        <div class="choice-field__description">I won't use it.</div>
                                                    </div>
                                                </label>

                                                <label class="choice-field">
                                                    <input name="note[]" type="checkbox" value="helpful" />
                                                    <div class="choice-field__inner">
                                                        <div class="choice-field__field-container">
                                                            <div class="choice-field__field"></div>
                                                        </div>
                                                        <div class="choice-field__description">It could be helpful.</div>
                                                    </div>
                                                </label>

                                                <label class="choice-field">
                                                    <input name="note[]" type="checkbox" value="not-helpful" />
                                                    <div class="choice-field__inner">
                                                        <div class="choice-field__field-container">
                                                            <div class="choice-field__field"></div>
                                                        </div>
                                                        <div class="choice-field__description">It isn't helpful.</div>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>

                                        <div class="form__field-container">
                                            <div class="form__multifields-wrapper">
                                                <div class="form__field-label">
                                                What do you generally think about this project?
                                                </div>

                                                <label class="choice-field choice-field--radio">
                                                    <input name="general-opinion" type="radio" value="very-good" tabindex="0" />
                                                    <div class="choice-field__inner">
                                                        <div class="choice-field__field-container">
                                                            <div class="choice-field__field"></div>
                                                        </div>
                                                        <div class="choice-field__description">Very good</div>
                                                    </div>
                                                </label>

                                                <label class="choice-field choice-field--radio">
                                                    <input name="general-opinion" type="radio" value="good" tabindex="0" />
                                                    <div class="choice-field__inner">
                                                        <div class="choice-field__field-container">
                                                            <div class="choice-field__field"></div>
                                                        </div>
                                                        <div class="choice-field__description">Good</div>
                                                    </div>
                                                </label>

                                                <label class="choice-field choice-field--radio">
                                                    <input name="general-opinion" type="radio" value="medium" tabindex="0" />
                                                    <div class="choice-field__inner">
                                                        <div class="choice-field__field-container">
                                                            <div class="choice-field__field"></div>
                                                        </div>
                                                        <div class="choice-field__description">Medium</div>
                                                    </div>
                                                </label>

                                                <label class="choice-field choice-field--radio">
                                                    <input name="general-opinion" type="radio" value="bad" tabindex="0" />
                                                    <div class="choice-field__inner">
                                                        <div class="choice-field__field-container">
                                                            <div class="choice-field__field"></div>
                                                        </div>
                                                        <div class="choice-field__description">Bad</div>
                                                    </div>
                                                </label>

                                                <label class="choice-field choice-field--radio">
                                                    <input name="general-opinion" type="radio" value="very-bad" tabindex="0" />
                                                    <div class="choice-field__inner">
                                                        <div class="choice-field__field-container">
                                                            <div class="choice-field__field"></div>
                                                        </div>
                                                        <div class="choice-field__description">Very bad</div>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>

                                        <div class="form__field-container">
                                            <label class="form__field-wrapper">
                                                <textarea id="message" class="form__field form__field--textarea" name="message" placeholder="Leave wider review"></textarea>
                                            </label>
                                        </div>

                                        <div class="button-container">
                                            <button class="button" type="submit">
                                                <div class="button__inner">Send</div>
                                            </button>
                                        </div>

                                        <div class="form__info-container">
                                            <div class="form__info-wrapper">
                                                <div class="form__info"></div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </form>
                            </section>
                        </div>
                    </div>
                </section>

                <!---
                    <section id="overlayer-anchor" class="site-section section-05">
                    <div class="site-section__layer">
                        <div class="site-section__inner">
                            <header class="section-header">
                                <h2 class="section-title">Overlayers</h2>
                            </header>

                            <section class="site-section__content">
                                <div class="button-container">
                                    <button class="button overlayer-button" data-id="1" data-overlayer-id="1" type="button">See more</button>
                                </div>

                                <div class="overlayer-content" data-id="1">
                                    <article class="article">
                                        <header class="article__header">
                                            <h1 class="article__title">Lorem ipsum dolor sit amet</h1>
                                        </header>

                                        <div class="article__text">
                                            <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque sollicitudin orci nec molestie. Aliquam quis vehicula augue. Vivamus in porta tellus. Curabitur vel mollis diam. Nullam at sodales eros. Integer eu lectus consectetur ante dignissim aliquet. Maecenas varius, ante vel scelerisque faucibus, tellus ex blandit velit, ut molestie turpis mi nec tellus. Curabitur vitae nunc faucibus, bibendum eros sed, consequat sem. Vestibulum pulvinar nunc augue, et fringilla enim accumsan a. Pellentesque rutrum lectus sit amet nisl malesuada viverra. Proin pellentesque quis tellus et accumsan.
                                            </p>
                                            <p>
                                            Vivamus nec gravida dolor, ac ultrices velit. Vivamus massa eros, commodo gravida feugiat vel, consequat non urna. Vivamus felis libero, tincidunt mattis luctus ut, tempor a tellus. Donec et diam iaculis, facilisis felis sed, sodales justo. Sed vel odio sed ligula suscipit dictum vel commodo nisl. Phasellus enim massa, sollicitudin ut libero vitae, ultricies porttitor turpis. Vestibulum elementum ipsum a blandit euismod. Nam id urna lorem. Phasellus hendrerit quam non mauris semper congue. Pellentesque ut finibus enim, et convallis est. Praesent ornare maximus lectus, rutrum hendrerit sem commodo id.
                                            </p>
                                            <p>
                                            Morbi viverra risus turpis, at posuere nunc efficitur ac. Mauris pharetra tempus purus, at tristique tortor suscipit sit amet. Sed tempus, ipsum eget sodales pulvinar, turpis tellus consequat sapien, eu bibendum lectus quam nec diam. Integer est massa, malesuada in finibus pharetra, ornare in ante. Praesent imperdiet pellentesque est a elementum. Sed id mollis dolor, vitae ultricies tortor. Praesent magna massa, finibus eget bibendum id, fermentum a ex. In metus tellus, rutrum scelerisque elementum non, sagittis vel nisl.
                                            </p>
                                            <p>
                                            Nunc a suscipit odio. Curabitur sit amet iaculis nulla, sit amet tristique leo. Maecenas rhoncus aliquet sapien ut imperdiet. Nunc lobortis nulla a nisi hendrerit, a accumsan eros accumsan. Mauris vel mauris arcu. Maecenas aliquet mi ut leo mollis, eu convallis quam pellentesque. Sed vitae accumsan lorem. Nam condimentum laoreet velit at lacinia. Duis pharetra dictum erat at molestie. Sed eu justo sagittis, molestie mi nec, aliquam erat. Nulla lacinia quis felis nec sollicitudin. Morbi nulla neque, gravida at dolor at, blandit gravida nisi. Nunc tincidunt neque ac dolor semper, ut auctor sem viverra. Curabitur egestas convallis enim, vel mollis mauris bibendum lacinia. Mauris dignissim ullamcorper sodales.
                                            </p>
                                        </div>
                                    </article>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
            -->

                <section id="more-contents-anchor" class="site-section section-06">
                    <div class="site-section__layer">
                        <div class="site-section__inner">
                            <header class="section-header">
                                <h2 class="section-title">More contents</h2>
                            </header>

                            <section class="site-section__content">
                                <article class="article">
                                    <header class="article__header">
                                        <h1 class="article__title">Lorem ipsum dolor sit amet</h1>
                                    </header>

                                    <div class="article__text">
                                        <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque sollicitudin orci nec molestie. Aliquam quis vehicula augue. Vivamus in porta tellus. Curabitur vel mollis diam. Nullam at sodales eros. Integer eu lectus consectetur ante dignissim aliquet. Maecenas varius, ante vel scelerisque faucibus, tellus ex blandit velit, ut molestie turpis mi nec tellus. Curabitur vitae nunc faucibus, bibendum eros sed, consequat sem. Vestibulum pulvinar nunc augue, et fringilla enim accumsan a. Pellentesque rutrum lectus sit amet nisl malesuada viverra. Proin pellentesque quis tellus et accumsan.
                                        </p>

                                        <div class="more-content" data-id="1">
                                            <p>
                                            Vivamus nec gravida dolor, ac ultrices velit. Vivamus massa eros, commodo gravida feugiat vel, consequat non urna. Vivamus felis libero, tincidunt mattis luctus ut, tempor a tellus. Donec et diam iaculis, facilisis felis sed, sodales justo. Sed vel odio sed ligula suscipit dictum vel commodo nisl. Phasellus enim massa, sollicitudin ut libero vitae, ultricies porttitor turpis. Vestibulum elementum ipsum a blandit euismod. Nam id urna lorem. Phasellus hendrerit quam non mauris semper congue. Pellentesque ut finibus enim, et convallis est. Praesent ornare maximus lectus, rutrum hendrerit sem commodo id.
                                            </p>
                                            <p>
                                            Morbi viverra risus turpis, at posuere nunc efficitur ac. Mauris pharetra tempus purus, at tristique tortor suscipit sit amet. Sed tempus, ipsum eget sodales pulvinar, turpis tellus consequat sapien, eu bibendum lectus quam nec diam. Integer est massa, malesuada in finibus pharetra, ornare in ante. Praesent imperdiet pellentesque est a elementum. Sed id mollis dolor, vitae ultricies tortor. Praesent magna massa, finibus eget bibendum id, fermentum a ex. In metus tellus, rutrum scelerisque elementum non, sagittis vel nisl.
                                            </p>
                                            <p>
                                            Nunc a suscipit odio. Curabitur sit amet iaculis nulla, sit amet tristique leo. Maecenas rhoncus aliquet sapien ut imperdiet. Nunc lobortis nulla a nisi hendrerit, a accumsan eros accumsan. Mauris vel mauris arcu. Maecenas aliquet mi ut leo mollis, eu convallis quam pellentesque. Sed vitae accumsan lorem. Nam condimentum laoreet velit at lacinia. Duis pharetra dictum erat at molestie. Sed eu justo sagittis, molestie mi nec, aliquam erat. Nulla lacinia quis felis nec sollicitudin. Morbi nulla neque, gravida at dolor at, blandit gravida nisi. Nunc tincidunt neque ac dolor semper, ut auctor sem viverra. Curabitur egestas convallis enim, vel mollis mauris bibendum lacinia. Mauris dignissim ullamcorper sodales.
                                            </p>
                                        </div>

                                        <div class="button-container">
                                            <button class="simple-button more-content-button" data-id="1">
                                                <div class="simple-button__icon-top icon-arrow icon-arrow--up icon-arrow--small">
                                                </div>

                                                <div class="simple-button__inner">
                                                See more
                                                </div>

                                                <div class="simple-button__icon-bottom icon-arrow icon-arrow--down icon-arrow--small">
                                                </div>
                                            </button>
                                            <!--<button class="simple-button more-button simple-button--bottom-icon" data-id="1" type="button">
                                                <div class="simple-button__inner">See more</div>
                                                <div class="simple-button__icon icon-arrow icon-arrow--down icon-arrow--small"></div>
                                            </button>

                                            <button class="simple-button less-button simple-button--top-icon" data-id="1" type="button">
                                                <div class="simple-button__icon icon-arrow icon-arrow--up icon-arrow--small"></div>
                                                <div class="simple-button__inner">See less</div>
                                            </button>-->
                                        </div>
                                    </div>
                                </article>
                            </section>
                        </div>
                    </div>
                </section>

                <section id="bookmarks-anchor" class="site-section section-08">
                    <div class="site-section__layer">
                        <div class="site-section__inner">
                            <header class="section-header">
                                <h2 class="section-title">Bookmarks</h2>
                            </header>

                            <section class="site-section__content">
                                <section class="bookmarks-manager">
                                    <section class="bookmarks-manager__bookmarks-container">
                                        <ul class="bookmarks-manager__bookmarks">
                                            <li class="bookmarks-manager__bookmark-container">
                                                <div class="bookmarks-manager__bookmark simple-bookmark">
                                                    <div class="simple-bookmark__number">
                                                    01
                                                    </div>

                                                    Lorem ipsum
                                                </div>

                                                <div class="bookmarks-manager__bookmark-content">
                                                    <div class="text">
                                                        <p>
                                                        Lorem ipsum dolor sit amet mauris ac orci viverra quis, aliquam eros egestas sit amet dolor. Quisque eu augue egestas turpis. Pellentesque suscipit pede tortor et nisl pede, pulvinar felis, ullamcorper in, tristique magna arcu, dapibus sit amet quam. Nam enim. Mauris tempor enim non placerat porttitor. Phasellus a laoreet viverra diam vel lorem. Nam dolor sit amet leo. Pellentesque dapibus vel, magna.
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>

                                            <li class="bookmarks-manager__bookmark-container">
                                                <div class="bookmarks-manager__bookmark simple-bookmark">
                                                    <div class="simple-bookmark__number">
                                                    02
                                                    </div>
                                                    
                                                    Dolor sit amet
                                                </div>

                                                <div class="bookmarks-manager__bookmark-content">
                                                    <div class="text">
                                                        <p>
                                                        Nullam justo. Curabitur imperdiet, lorem quam ut magna ornare interdum, diam neque tristique vitae, placerat vehicula viverra. Cras non nonummy lacinia arcu vel quam hendrerit purus. Sed in faucibus justo. Donec a dolor sit amet ultricies neque ut urna. Cras adipiscing elit. Nullam dapibus eu, pulvinar velit.
                                                        </p>

                                                        <p>
                                                        Nullam justo. Curabitur imperdiet, lorem quam ut magna ornare interdum, diam neque tristique vitae, placerat vehicula viverra. Cras non nonummy lacinia arcu vel quam hendrerit purus. Sed in faucibus justo. Donec a dolor sit amet ultricies neque ut urna. Cras adipiscing elit. Nullam dapibus eu, pulvinar velit.
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>

                                            <li class="bookmarks-manager__bookmark-container">
                                                <div class="bookmarks-manager__bookmark simple-bookmark">
                                                    <div class="simple-bookmark__number">
                                                    03
                                                    </div>
                                                    
                                                    Mauris ac orci viverra
                                                </div>

                                                <div class="bookmarks-manager__bookmark-content">
                                                    <div class="text">
                                                        <p>
                                                        Cras tempus rutrum vel, purus. Sed dignissim. Pellentesque eget sapien enim non enim ac augue nec turpis egestas. Cras adipiscing non, lacus. In purus non placerat quam. Nunc varius vehicula. Aliquam sed est neque, congue eu, facilisis eget, vestibulum ipsum feugiat in, libero. Aliquam eget pede urna fringilla mollis. Cras ut metus. Maecenas eget urna. Pellentesque habitant morbi tristique in, odio.
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>

                                            <li class="bookmarks-manager__bookmark-container">
                                                <div class="bookmarks-manager__bookmark simple-bookmark">
                                                    <div class="simple-bookmark__number">
                                                    04
                                                    </div>
                                                    
                                                    Vestibulum vel risus
                                                </div>

                                                <div class="bookmarks-manager__bookmark-content">
                                                    <div class="text">
                                                        <p>
                                                        Morbi tincidunt. Nullam erat augue, vel neque vel hendrerit sollicitudin eu, facilisis faucibus orci vitae urna. Aenean sed wisi quis arcu. Sed dignissim. Aliquam orci. Vestibulum vel risus. Donec eleifend ut, lobortis venenatis, pulvinar mollis, purus dolor in aliquam at, auctor scelerisque, ante ipsum dolor urna eu pede cursus dignissim tempor, pulvinar mollis.
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </section>

                                    <section class="bookmarks-manager__content-container">
                                        <div class="bookmarks-manager__content-wrapper">
                                            <div id="bookmarks-content" class="bookmarks-manager__content">

                                            </div>
                                        </div>
                                    </section>
                                </section>
                            </section>
                        </div>
                    </div>
                </section>

                <section id="details-lists-anchor" class="site-section section-09">
                    <div class="site-section__layer">
                        <div class="site-section__inner">
                            <header class="section-header">
                                <h2 class="section-title">Details lists</h2>
                            </header>

                            <section class="site-section__content">
                                <ul class="details-list">
                                    <li class="details-list__item">
                                        <div class="details-list__title">
                                            Lorem ipsum dolor sit amet
                                            <div class="details-list__arrow icon-arrow icon-arrow--down icon-arrow--small"></div>
                                        </div>

                                        <div class="details-list__content">
                                        Fusce iaculis mi. Nam laoreet condimentum, dapibus nisl. Curabitur interdum augue. Donec molestie nulla ut tortor. Nulla nunc faucibus orci orci, blandit libero.
                                        </div>
                                    </li>

                                    <li class="details-list__item">
                                        <div class="details-list__title">
                                            Donec rutrum posuere elementum
                                            <div class="details-list__arrow icon-arrow icon-arrow--down icon-arrow--small"></div>
                                        </div>

                                        <div class="details-list__content">
                                        Proin vel massa. Ut blandit, dui pulvinar sem in lacus pretium pellentesque. Proin venenatis pede. Aliquam gravida elit. Mauris ultrices. Nunc vehicula. Integer eu viverra enim fringilla vel, luctus sagittis.
                                        </div>
                                    </li>

                                    <li class="details-list__item">
                                        <div class="details-list__title">
                                            Cum sociis natoque penatibus
                                            <div class="details-list__arrow icon-arrow icon-arrow--down icon-arrow--small"></div>
                                        </div>

                                        <div class="details-list__content">
                                        Duis blandit eu, tortor. Vivamus nec libero. Proin ultrices magna. Integer nonummy condimentum nunc. Fusce ullamcorper. Nam lectus bibendum a, dolor. Aliquam auctor euismod. Nulla posuere. Vestibulum ligula. Vivamus fermentum ultrices posuere cubilia Curae, Donec eleifend in, gravida ornare.
                                        </div>
                                    </li>

                                    <li class="details-list__item">
                                        <div class="details-list__title">
                                            Quisque et orci ut ante
                                            <div class="details-list__arrow icon-arrow icon-arrow--down icon-arrow--small"></div>
                                        </div>

                                        <div class="details-list__content">
                                        Vivamus diam tempor elit est, et lacus nibh, dictum enim. Pellentesque dapibus ac, laoreet sapien. Vestibulum ante ipsum primis in nunc. Sed sit amet enim. Phasellus sem. Pellentesque felis.
                                        </div>
                                    </li>

                                    <li class="details-list__item">
                                        <div class="details-list__title">
                                            Phasellus fermentum, enim eu ipsum
                                            <div class="details-list__arrow icon-arrow icon-arrow--down icon-arrow--small"></div>
                                        </div>

                                        <div class="details-list__content">
                                        Lorem ipsum primis in tellus et interdum dapibus in, consequat et, placerat velit malesuada augue odio a dictum sapien massa imperdiet orci luctus quis, feugiat mattis vel, magna. Phasellus fermentum, enim eu ipsum.
                                        </div>
                                    </li>

                                    <li class="details-list__item">
                                        <div class="details-list__title">
                                            Sed et pede id pharetra velit
                                            <div class="details-list__arrow icon-arrow icon-arrow--down icon-arrow--small"></div>
                                        </div>

                                        <div class="details-list__content">
                                        Donec commodo, odio eget lectus eget elit purus, consectetuer tellus consectetuer adipiscing tortor, fermentum odio. Donec fermentum odio. Morbi tellus dolor sapien magna fringilla purus lorem, pretium nec, eros. Aliquam ut leo. Aenean bibendum vel, hendrerit purus sit.
                                        </div>
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </div>
                </section>

                <section id="categorized-items-anchor" class="site-section site-section--full-width section-10">
                    <div class="site-section__layer">
                        <div class="site-section__inner">
                            <header class="section-header">
                                <h2 class="section-title">Categorized items</h2>
                            </header>

                            <section class="site-section__content">
                                <section class="categorized-items">
                                    <section class="categorized-items__categories-container">
                                        <ul class="categorized-items__categories">
                                            <li data-category-id="all">
                                            All the beauty
                                            </li>

                                            <li data-category-id="0">
                                            Front
                                            </li>

                                            <li data-category-id="1">
                                            Backwards
                                            </li>

                                            <li data-category-id="2">
                                            Nudes
                                            </li>
                                        </ul>
                                    </section>

                                    <section id="categorized-items-content" class="categorized-items__contents-container">
                                        <div class="categorized-items__contents">
                                            <ul class="boxes baguette-box">
                                                <li class="categorized-items__item cat-0">
                                                    <a class="box" href="/img/women/woman-00.jpg">
                                                        <div class="box__layer" style="background-image: url('/img/women/woman-00-thumbnail.jpg')">

                                                        </div>

                                                        <div class="box__layer-02">

                                                        </div>
                                                    </a>
                                                </li>

                                                <li class="categorized-items__item cat-0">
                                                    <a class="box" href="/img/women/woman-01.jpg">
                                                        <div class="box__layer" style="background-image: url('/img/women/woman-01-thumbnail.jpg')">

                                                        </div>

                                                        <div class="box__layer-02">

                                                        </div>
                                                    </a>
                                                </li>

                                                <li class="categorized-items__item cat-1">
                                                    <a class="box" href="/img/women/woman-08.jpg">
                                                        <div class="box__layer" style="background-image: url('/img/women/woman-08-thumbnail.jpg')">

                                                        </div>

                                                        <div class="box__layer-02">

                                                        </div>
                                                    </a>
                                                </li>

                                                <li class="categorized-items__item cat-0">
                                                    <a class="box" href="/img/women/woman-02.jpg">
                                                        <div class="box__layer" style="background-image: url('/img/women/woman-02-thumbnail.jpg')">

                                                        </div>

                                                        <div class="box__layer-02">

                                                        </div>
                                                    </a>
                                                </li>

                                                <li class="categorized-items__item cat-1">
                                                    <a class="box" href="/img/women/woman-09.jpg">
                                                        <div class="box__layer" style="background-image: url('/img/women/woman-09-thumbnail.jpg')">

                                                        </div>

                                                        <div class="box__layer-02">

                                                        </div>
                                                    </a>
                                                </li>

                                                <li class="categorized-items__item cat-0 cat-1">
                                                    <a class="box" href="/img/women/woman-10.jpg">
                                                        <div class="box__layer" style="background-image: url('/img/women/woman-10-thumbnail.jpg')">

                                                        </div>

                                                        <div class="box__layer-02">

                                                        </div>
                                                    </a>
                                                </li>

                                                <li class="categorized-items__item cat-0">
                                                    <a class="box" href="/img/women/woman-03.jpg">
                                                        <div class="box__layer" style="background-image: url('/img/women/woman-03-thumbnail.jpg')">

                                                        </div>

                                                        <div class="box__layer-02">

                                                        </div>
                                                    </a>
                                                </li>

                                                <li class="categorized-items__item cat-1">
                                                    <a class="box" href="/img/women/woman-11.jpg">
                                                        <div class="box__layer" style="background-image: url('/img/women/woman-11-thumbnail.jpg')">

                                                        </div>

                                                        <div class="box__layer-02">

                                                        </div>
                                                    </a>
                                                </li>

                                                <li class="categorized-items__item cat-0">
                                                    <a class="box" href="/img/women/woman-04.jpg">
                                                        <div class="box__layer" style="background-image: url('/img/women/woman-04-thumbnail.jpg')">

                                                        </div>

                                                        <div class="box__layer-02">

                                                        </div>
                                                    </a>
                                                </li>

                                                <li class="categorized-items__item cat-0 cat-1">
                                                    <a class="box" href="/img/women/woman-12.jpg">
                                                        <div class="box__layer" style="background-image: url('/img/women/woman-12-thumbnail.jpg')">

                                                        </div>

                                                        <div class="box__layer-02">

                                                        </div>
                                                    </a>
                                                </li>

                                                <li class="categorized-items__item cat-1">
                                                    <a class="box" href="/img/women/woman-13.jpg">
                                                        <div class="box__layer" style="background-image: url('/img/women/woman-13-thumbnail.jpg')">

                                                        </div>

                                                        <div class="box__layer-02">

                                                        </div>
                                                    </a>
                                                </li>

                                                <li class="categorized-items__item cat-1">
                                                    <a class="box" href="/img/women/woman-14.jpg">
                                                        <div class="box__layer" style="background-image: url('/img/women/woman-14-thumbnail.jpg')">

                                                        </div>

                                                        <div class="box__layer-02">

                                                        </div>
                                                    </a>
                                                </li>

                                                <li class="categorized-items__item cat-0">
                                                    <a class="box" href="/img/women/woman-05.jpg">
                                                        <div class="box__layer" style="background-image: url('/img/women/woman-05-thumbnail.jpg')">

                                                        </div>

                                                        <div class="box__layer-02">

                                                        </div>
                                                    </a>
                                                </li>

                                                <li class="categorized-items__item cat-0">
                                                    <a class="box" href="/img/women/woman-06.jpg">
                                                        <div class="box__layer" style="background-image: url('/img/women/woman-06-thumbnail.jpg')">

                                                        </div>

                                                        <div class="box__layer-02">

                                                        </div>
                                                    </a>
                                                </li>

                                                <li class="categorized-items__item cat-0">
                                                    <a class="box" href="/img/women/woman-07.jpg">
                                                        <div class="box__layer" style="background-image: url('/img/women/woman-07-thumbnail.jpg')">

                                                        </div>

                                                        <div class="box__layer-02">

                                                        </div>
                                                    </a>
                                                </li>
                                            </ul>

                                            <div class="categorized-items__no-items">
                                            There are no items in this category.
                                            </div>
                                        </div>
                                    </section>
                                </section>
                            </section>
                        </div>
                    </div>
                </section>
            </main>

            <footer class="site-footer">
                <div class="site-footer__inner">
                    <div class="text">
                        <p>
                        Copyright 2017 by Filip Markiewicz.
                        </p>
                        <p>
                        <a href="http://filipmarkiewicz.pl">www.filipmarkiewicz.pl</a>
                        </p>
                        <p>
                        Code is available under MIT license.
                        </p>
                        <p>
                        I will be grateful if you keep the note about me and my framework in code.
                        </p>
                    </div>
                </div>
            </footer>
        </div>

        <section id="overlayer" class="overlayer" data-overlayer-id="1">
            <div class="overlayer__inner">
                <section class="overlayer__content">

                </section>

                <section class="overlayer__spinner-layer">
                    <div class="wrapper">
                        <div>
                            <i class="fa fa-spinner fa-spin" aria-hidden="true"></i>
                        </div>
                    </div>
                </section>

                <div class="overlayer__close">
                    <div class="icon-cross icon-cross--rotated icon-cross--large">
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </section>

        <script src="/js/hawk.js"></script>
        <script src="/js/main.js"></script>
     </body>
</html>