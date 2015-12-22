/**
 * Created by michael_brecker on 11/22/15.
 *
 * Implements the logic for K-Means
 */
define( [ 'marionette', 'logic/LogicView', 'logic/LogicModel', 'logic/LogicCollection', 'underscore' ], function ( Marionette, LogicView, LogicModel, LogicCollection, _ ) {

    return Marionette.Controller.extend( {

        /**
         * Initialize the application's logic
         */
        initialize : function () {
            this.DEV_OUTPUT = false;

            this.INITIAL_CENTROIDS  = 10;
            this.INITIAL_DATAPOINTS = 15000;

            this.initializeModel();
            this.initializeCollection();
            this.initializeViews();

            this.centroidCollection = this.generateRandomCentroids( this.INITIAL_CENTROIDS );
            this.dataPointCollection = this.generateRandomDataPoints( this.INITIAL_DATAPOINTS );

            this.running = true; // condition for while loop that iterates

            this.listenTo( this.view, 'onStartBtnClicked', this.onStartBtnClicked.bind( this ) );

            this.prepare();
        },

        /**
         * Initialization of the model
         */
        initializeModel : function () {
            this.model = new LogicModel();
        },

        /**
         * Initialization of the model collection
         */
        initializeCollection : function () {
            this.collection = new LogicCollection();
        },

        /**
         * Initialization of the view
         */
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
            this.print( 'Controller generating new centroids!' );
            this.iteration();
            //this.view.clearCanvas();
            //this.view.drawCluster( this.generateRandomCentroids( Math.random() * 25 + 1 ) );
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
                color: color || this.generateRandomColor(),
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
            this.pushClustersInitially();
            this.view.drawCluster( this.centroidCollection );
            this.iterationComplete();
        },

        /**
         * Assign all data points a centroid for the first time (data points not sorted to clusters, yet)
         */
        pushClustersInitially : function () {
            _.each( this.dataPointCollection, function ( dataPoint )  {
                var index = this.returnClusterIndex( this.centroidCollection, dataPoint );
                this.centroidCollection[ index ].dots.push( dataPoint );
            }.bind( this ) );
        },

        /**
         * Assign all data points a centroid (when each centroid already has data points assigned)
         */
        pushClusters : function () {
            this.dataPointCollection = [];
            _.each( this.centroidCollection, function( centroid, index ) {
                _.each( centroid.dots , function ( dataPoint ) {
                    this.dataPointCollection.push( dataPoint );
                }.bind( this ) );
                // TODO: remove .dots from this.centroidCollcetion, otherwise it will grow (concatenation) with each iteration
                // which is not what we want (we want to replace it!)
                this.centroidCollection[ index ].dots = []; // Centroid will get new data points later, so reset it for now
            }.bind( this ) );
            this.print( 'this.dataPointCollection', this.dataPointCollection );
            _.each( this.dataPointCollection, function ( dataPoint )  {
                var index = this.returnClusterIndex( this.centroidCollection, dataPoint );
                dataPoint.color = this.centroidCollection[ index ].color;
                this.centroidCollection[ index ].dots.push( dataPoint );
            }.bind( this ) );
        },

        /**
         * Calculate the new centroid of a cluster
         */
        calculateCentroidOfCluster : function ( cluster ) {
            // TODO: calculate arithmetic mean of a cluster
        },

        /**
         * Next iteration step
         */
        iteration : function () {
            var x = 0;
            var interval = setInterval( function () {
                x += 1;
                //debugger;
                this.updateCentroids(); // Update our model for the next iteration step
                this.model.set( 'id', this.model.get( 'iteration' ) + 1 ); // we are in the next iteration
                this.model.set( 'iteration', this.model.get( 'iteration' ) + 1 ); // we are in the next iteration
                this.pushClusters();
                if( ! this.checkForFinished() && x < 50 ) {
                    //debugger;
                    this.view.clearCanvas();
                    this.view.drawCluster( this.centroidCollection );
                    this.iterationComplete();
                }
                else {
                    alert( 'Done optimizing!' );
                    this.running = false;
                    clearInterval( interval );
                    this.view.disableBtn();
                }
            }.bind( this ), 250 );
            //while( this.running && x < 50 ) {

            //}
        },

        /**
         * Put new centroids in the model
         * using the arithmetic mean to calculate them
         */
        updateCentroids : function () {
            //debugger;
            var centroids = this.model.get( 'centroidCollection' );
            this.print( 'centroids before', centroids );
            _.each( centroids, function ( centroid, index ) {
                var meanX = 0;
                var meanY = 0;
                _.each( centroid.dots, function ( dot ) {
                    meanX += dot.x;
                    meanY += dot.y;
                } );
                // var centroidX = meanX / centroid.dots.length;
                // var centroidY = meanY / centroid.dots.length;
                var centroidX = Math.floor( meanX / centroid.dots.length );
                var centroidY = Math.floor( meanY / centroid.dots.length );
                this.centroidCollection[ index ].x = centroidX;
                this.centroidCollection[ index ].y = centroidY;
            }.bind( this ) );
            this.print( 'centroids', this.centroidCollection );
        },

        /**
         * Check if the algorithm converged
         */
        checkForFinished : function () {
            // TODO: is that logic correct here?!
            var stepBefore = this.model.get( 'iteration' ) - 1;
            //debugger;
            //return this.collection.models[ stepBefore ].centroidCollection === this.centroidCollection;
        },

        /**
         * Save our model to the collection
         */
        iterationComplete : function () {
            this.model.set( 'centroidCollection', this.centroidCollection );
            this.collection.add( this.model );
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
        },

        /**
         * Function handles console output depending on dev flag
         */
        print : function ( string, variable ) {
            if ( this.DEV_OUTPUT === true ) {
                console.log( string, variable );
            }
        }
    });
} );