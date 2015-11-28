/**
 * Created by Kay on 11/24/2015.
 */
define( [ 'backbone' ], function ( Backbone ) {
    return Backbone.Model.extend( {
        defaults : {
            centroidCollection : [],
            dataPointCollection : []
        }
    } );
} );
