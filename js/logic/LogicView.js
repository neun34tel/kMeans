/**
 * Created by Kay on 11/24/2015.
 */
define( [ 'marionette' ], function ( Marionette ) {
    return Marionette.LayoutView.extend( {
        el       : '.js-canvas-wrapper',
        template : '<canvas id="canvas"></canvas>',

        regions : {
            canvasRegion : '.js-canvas-region'
        },

        ui : {
            canvas : '#canvas',
            btnIterate : '.js-iterate-button'
        },

        events : {
            'click @ui.btnIterate' : 'onBtnIterateClicked'
        },

        initialize : function () {
            console.log( this.$el );
            this.bindUIElements();
        },

        onBtnIterateClicked : function () {
            console.log( 'This will happen soon enough!' );
        }

    } );
} );