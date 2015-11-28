/**
 * Created by Kay on 11/24/2015.
 */
define( [ 'jquery', 'marionette' ], function ( $, Marionette ) {
    return Marionette.ItemView.extend( {
        template : function () {
            return '<canvas id="canvas"></canvas><br>' +
                    '<button class="js-iterate-button">Start</button>';
        },

        ui : {
            canvas : '#canvas',
            btnIterate : '.js-iterate-button'
        },

        events : {
            'click @ui.btnIterate' : 'onBtnIterateClicked'
        },

        initialize : function ( options ) {

            this.model = options.model;

            //console.log( 'options', options );
            //console.log( 'this.model', this.model );
            //console.log( 'this.$el', this.$el );

            // UI Element constants
            this.WINDOW_HEIGHT = window.innerHeight;
            this.WINDOW_WIDTH  = window.innerWidth;
            this.CANVAS_HEIGHT = this.WINDOW_HEIGHT - 250;
            this.CANVAS_WIDTH  = this.WINDOW_WIDTH - 50;

            // Circle data
            this.ARC_BEGIN  = 0;
            this.ARC_END    = Math.PI * 2;
            this.CENTROID_RADIUS = 10;
            this.DOT_RADIUS = 5;

            this.bindUIElements();
        },

        /**
         * To initialize the canvas context we need to put the logic in here since
         * it won't exist after being rendered first
         */
        onRender : function () {
            this.canvas = $( '#canvas' )[0];
            this.ctx = this.canvas.getContext( '2d' );
            this.ctx.canvas.height = this.CANVAS_HEIGHT;
            this.ctx.canvas.width  = this.CANVAS_WIDTH;
        },

        /**
         * Deleting the canvas is essential before each iteration
         */
        clearCanvas : function () {
            this.ctx.clearRect( 0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT );
        },

        /**
         * Draw a dot on the canvas with the given parameters
         *
         * @param x
         * @param y
         * @param radius
         * @param color
         */
        draw : function ( x, y, radius, color ) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.arc( x, this.CANVAS_HEIGHT - y, radius, this.ARC_BEGIN, this.ARC_END );
        this.ctx.fill();
        },

        /**
         * Function draws an array of dots on the canvas
         * @param cluster: array of dots
         */
        drawCluster : function ( cluster ) {
            _.each( cluster, function( dot ) {
                this.draw( dot.x, dot.y, dot.radius, dot.color )
            }.bind( this ) );
        },

        /**
         * This is the start button click detection method
         */
        onBtnIterateClicked : function () {
            // Let the controller know the button was clicked
            this.trigger( 'onStartBtnClicked' );
        }

    } );
} );