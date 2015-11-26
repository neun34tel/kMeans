/**
 * Created by michael_brecker on 11/22/15.
 */
define( [ 'marionette', 'logic/LogicView' ], function ( Marionette, LogicView ) {
    return Marionette.Controller.extend( {
        initialize : function () {
            this.initializeViews();
        },

        initializeViews : function () {
            this.view = new LogicView();
            this.view.canvasRegion.show( new LogicView() );
            this.view.render();
        }
    } );
} );