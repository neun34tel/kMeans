/**
 * Created by Kay on 11/26/2015.
 */
/**
 * This is the main entry point of our application
 */
require.config( {
    paths: {
        underscore : '../bower_components/underscore/underscore',
        jquery     : '../bower_components/jquery/dist/jquery',
        backbone   : '../bower_components/backbone/backbone',
        marionette : '../bower_components/marionette/lib/backbone.marionette',
        paralleljs : '../bower_components/paralleljs/lib/parallel'
    }
} );

require ( [ 'app' ], function( App ) {
} );