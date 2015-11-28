/**
 * Created by michael_brecker on 11/22/15.
 */
define( [ 'marionette', 'logic/LogicView', 'logic/LogicModel' ], function ( Marionette, LogicView, LogicModel ) {

    return Marionette.Controller.extend( {
        initialize : function () {
            this.initializeModel();
            this.initializeViews();

            var centroids = this.generateRandomCentroids( 10 );
            this.view.drawCluster( centroids );

            var dataPoints = this.generateRandomDataPoints( 100 );
            this.view.drawCluster( dataPoints );

            this.listenTo( this.view, 'onStartBtnClicked', this.onStartBtnClicked.bind( this ) );
        },

        initializeModel : function () {
            this.model = new LogicModel();
            this.model.set( 'name', 'Kay' );
        },

        initializeViews : function () {
            this.view = new LogicView( {
                el : '.js-ui-wrapper',
                model : this.model
            } );
            //this.view.canvasRegion.show( this.view );
            this.view.render();
        },

        /**
         * This is triggered when the view detects a click ont he start button
         */
        onStartBtnClicked : function () {
            console.log( 'Controller generating new centroids!' );
            this.view.clearCanvas();
            this.view.drawCluster( this.generateRandomCentroids( Math.random() * 25 + 1 ) );
        },

        /**
         * This returns a random color value in the form rgb(random, random, random)
         *
         * @returns {string}
         */
        generateRandomColor: function () {
            return 'rgb(' + ( Math.floor( Math.random() * 255 + 1 ) ) + ', ' + ( Math.floor( Math.random() * 255 + 1 ) ) + ', '  + ( Math.floor( Math.random() * 255 + 1 ) ) + ')';
        },

        /**
         * Defines a single centroid
         *
         * @param x
         * @param y
         * @param color
         * @returns {{x: *, y: *, radius: number, color: (*|string), dots: Array}}
         */
        centroid : function ( x, y, color ) {
            return {
                x : x,
                y : y,
                radius : this.view.CENTROID_RADIUS,
                color: color || this.generateRandomColor() ,
                dots : []
            }
        },

        /**
         * Defines a single data point
         *
         * @param x
         * @param y
         * @param color
         * @returns {{x: *, y: *, radius: number, color: (*|string)}}
         */
        dataPoint : function ( x, y, color ) {
            return {
                x : x,
                y : y,
                radius : this.view.DOT_RADIUS,
                color : color || this.generateRandomColor()
            }
        },

        /**
         * Initially generates some random centroids
         *
         * @param quantity
         * @returns {Array}
         */
        generateRandomCentroids : function (quantity ) {
            var centroids = [];
            for( var i = 0; i < quantity; i++ ) {
                centroids.push(
                        this.centroid( Math.floor((Math.random() * this.view.CANVAS_WIDTH) + 1), Math.floor((Math.random() * this.view.CANVAS_HEIGHT) + 1) )
                );
            }
            return centroids;
        },

        /**
         * Initially generates some random data points
         *
         * @param quantity
         * @returns {Array}
         */
        generateRandomDataPoints : function (quantity ) {
            var dataPoints = [];
            for( var i = 0; i < quantity; i++ ) {
                dataPoints.push(
                        this.dataPoint( Math.floor((Math.random() * this.view.CANVAS_WIDTH) + 1), Math.floor((Math.random() * this.view.CANVAS_HEIGHT) + 1) )
                );
            }
            return dataPoints;
        }
    });
} );