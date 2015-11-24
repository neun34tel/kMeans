/**
 * Created by Kay on 11/22/2015.
 */

requirejs.config( {
    paths: {
        'require'   : '../kMeans/bower_components/requirejs/require',
        'underscore': '../kMeans/bower_components/underscore/underscore',
        'jquery'    : '../kMeans/bower_components/jquery/dist/jquery',
        'backbone'  : '../kMeans/bower_components/backbone/backbone',
        'marionette': '../kMeans/bower_components/marionette/lib/backbone.marionette'
    },
    //Remember: only use shim config for non-AMD scripts,
    //scripts that do not already call define(). The shim
    //config will not work correctly if used on AMD scripts,
    //in particular, the exports and init config will not
    //be triggered, and the deps config will be confusing
    //for those cases.
    shim: {
        'require' : {
            exports: 'require'
        },
        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'marionette' : {
            exports : 'Marionette'
        }
    }
} );


require( [ 'require', 'underscore', 'jquery', 'backbone', 'marionette' ], function ( require, underscore , jquery, backbone, marionette ) {
    var _               = underscore;
    var $               = jquery;
    var Backbone        = backbone;
    var Marionette      = marionette;

    var App = new Backbone.Marionette.Application();
    exports = App;
} );