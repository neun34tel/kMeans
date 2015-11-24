/**
 * Created by Kay on 11/24/2015.
 */
require( [ 'js/app', 'js/logic/index' ], function ( app, logicIndex ) {
    var app             = app;
    var LogicController = logicIndex;

    var LogicModule     = app.module( 'Logic' );

    LogicModule.addInitializer( function ( options ) {
        var controller = new LogicController( options );
    } );

    exports = LogicModule;
} );