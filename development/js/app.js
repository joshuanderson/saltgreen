(function () {
    'use strict';
    var isDevelopment = true;
    var requireConfig = {
        baseUrl: 'static-assets/js/',
        urlArgs: 't=' + (new Date()).getTime(),
        paths: {
            app: 'app'
        }
    };

    if (isDevelopment) {
        requireConfig.baseUrl = 'development/js/';
        requireConfig.urlArgs = '';
    }

    requirejs.config(requireConfig);

    requirejs([
        'app/main',
        'app/selector',
        'app/preloader',
        'app/events',
        'app/pages',
        'app/nav'
    ], function (Main, Selector, Preloader, Events, Pages, Nav) {
        var Main = new Main(Selector, Preloader, Events, Pages, Nav);
        Main.init();
    });

    })();
