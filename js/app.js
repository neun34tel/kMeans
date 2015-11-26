/**
 * Created by Kay on 11/22/2015.
 */
define ( [ 'underscore', 'jquery', 'backbone', 'marionette', 'logic/index' ], function ( underscore , jquery, backbone, marionette, logicIndex ) {
    var _               = underscore;
    var $               = jquery;
    var Backbone        = backbone;
    var Marionette      = marionette;
    var LogicIndex      = logicIndex;

    var App = new Backbone.Marionette.Application();



    return App;
} );