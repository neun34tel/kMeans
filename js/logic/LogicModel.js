/**
 * Created by Kay on 11/24/2015.
 */
define( [ 'backbone' ], function ( Backbone ) {
    return Backbone.Model.extend( {
        defaults : {
            id                 : 0,
            iteration          : 0,
            centroidCollection : []
        }
    } );
} );
