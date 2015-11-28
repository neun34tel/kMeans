/**
 * Created by michael_brecker on 11/22/15.
 *
 * Implements the logic for K-Means
 */
define( [ 'marionette', 'logic/LogicView', 'logic/LogicModel', 'logic/LogicCollection' ], function ( Marionette, LogicView, LogicModel, LogicCollection ) {

    return Marionette.Controller.extend( {
        initialize : function () {
            this.initializeModel();
            this.initializeCollection();
            this.initializeViews();

            this.centroidCollection = this.generateRandomCentroids( 15 );
            this.dataPointCollection = this.generateRandomDataPoints( 1000 );

            this.listenTo( this.view, 'onStartBtnClicked', this.onStartBtnClicked.bind( this ) );

            this.prepare();
        },

        initializeModel : function () {
            this.model = new LogicModel();
        },

        initializeCollection : function () {
            this.collection = new LogicCollection();
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
            return 'rgb(' + ( Math.floor( Math.random() * 255 + 1 ) ) + ', '
                          + ( Math.floor( Math.random() * 255 + 1 ) ) + ', '
                          + ( Math.floor( Math.random() * 255 + 1 ) ) + ')';
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
                        this.centroid( Math.floor( ( Math.random() * this.view.CANVAS_WIDTH ) + 1),
                                       Math.floor( ( Math.random() * this.view.CANVAS_HEIGHT ) + 1 ) )
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
                        this.dataPoint( Math.floor((Math.random() * this.view.CANVAS_WIDTH) + 1),
                                        Math.floor((Math.random() * this.view.CANVAS_HEIGHT) + 1) )
                );
            }
            return dataPoints;
        },

        /**
         * At first, every data point needs to be assigned to a cluster
         * After that, we can iterate
         */
        prepare : function () {
            this.initializeCluster();
            this.view.drawCluster( this.centroidCollection );
            this.iterationComplete();
        },

        /**
         * Assign all data points a centroid
         */
        initializeCluster : function () {
            _.each( this.dataPointCollection, function ( dataPoint )  {
                var index = this.returnClusterIndex( this.centroidCollection, dataPoint );
                this.centroidCollection[ index ].dots.push( dataPoint );
            }.bind( this ) );
        },

        /**
         * Next iteration step
         */
        iteration : function () {
            //TODO: iterate
        },

        /**
         * Save our model to the collection
         */
        iterationComplete : function () {
            this.model.set( 'centroidCollection', this.centroidCollection );
            this.collection.add( this.model );
            console.log( 'this.collection', this.collection );
        },

        /**
         * Calculates the Euclidean Distance between two dots
         *
         * @param centroid
         * @param dot
         */
        calculateEuclideanDistance : function ( centroid, dot ) {
            // See https://en.wikipedia.org/wiki/Euclidean_distance for reference:
            return Math.sqrt( Math.pow( ( centroid.x - dot.x ), 2) + Math.pow( ( centroid.y - dot.y ), 2 ) );
        },

        /**
         * Push data point its corresponding centroid cluster
         *
         * @param centroidCollection
         * @param dataPoint
         */
        returnClusterIndex : function ( centroidCollection, dataPoint ) {
            var distance = this.calculateEuclideanDistance( centroidCollection[0], dataPoint );
            var centroidIndex = 0;
            _.each( centroidCollection, function ( centroid, index ) {
                if( index == 0 ) {
                    return; // Calculated that already, it's our initial value
                }
                // Calculate Euclidean Distance for the data point for each centroid
                var euclid = this.calculateEuclideanDistance( centroid, dataPoint );
                // if currently calculated distance is smaller than the last, save the new data
                if( euclid < distance ) {
                    distance = euclid;
                    centroidIndex = index;
                }
            }.bind( this ) );
            // Push our data point to the corresponding centroid's cluster
            //centroidCollection[ centroidIndex ].dots.push( dataPoint );
            return centroidIndex;
        }
    });
} );