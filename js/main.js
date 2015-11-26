/**
 * Created by Kay on 11/26/2015.
 */
/**
 * This is the main entry point of ouy application
 */
require.config( {
    paths: {
        underscore: '../bower_components/underscore/underscore',
        jquery    : '../bower_components/jquery/dist/jquery',
        backbone  : '../bower_components/backbone/backbone',
        marionette: '../bower_components/marionette/lib/backbone.marionette'
    }
} );

require ( [ 'app' ], function( App ) {
} );