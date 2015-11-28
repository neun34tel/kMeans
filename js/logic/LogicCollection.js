/**
 * Created by Kay on 11/28/2015.
 */
define( [ 'backbone', 'logic/LogicModel' ], function ( Backbone, LogicModel ) {
    return Backbone.Collection.extend( {
        model : LogicModel
    } );
} );