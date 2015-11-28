/**
 * Created by michael_brecker on 11/22/15.
 */
define( [ 'marionette', 'logic/LogicView', 'logic/LogicModel' ], function ( Marionette, LogicView, LogicModel ) {

    return Marionette.Controller.extend( {
        initialize : function () {
            this.initializeModel();
            this.initializeViews();

            var centroids = this.generateCentroids( 10 );
            this.view.drawCluster( centroids );

            this.on( 'onStartBtnClicked', this.onStartBtnClicked.bind( this ) );
        },

        initializeModel : function () {
            this.model = new LogicModel();
            this.model.set( 'name', 'Kay' );
            console.log( 'this.model', this.model );
        },

        initializeViews : function () {
            this.view = new LogicView( {
                el : '.js-ui-wrapper',
                model : this.model
            } );
            //this.view.canvasRegion.show( this.view );
            this.view.render();
        },

        onStartBtnClicked : function () {
            console.log( 'Controller knows!' );
        },

        centroid : function ( x, y ) {
            return {
                x : x,
                y : y,
                radius : this.view.CENTROID_RADIUS,
                color: 'lime',
                dots : []
            }
        },

        dataPoint : function ( x, y ) {
            return {
                x : x,
                y : y,
                radius : this.view.DOT_RADIUS,
                color : 'black'
            }
        },

        generateCentroids : function ( quantity ) {
            var centroids = [];
            for( var i = 0; i < quantity; i++ ) {
                centroids.push(
                        this.centroid( Math.floor((Math.random() * this.view.CANVAS_WIDTH) + 1), Math.floor((Math.random() * this.view.CANVAS_HEIGHT) + 1) )
                );
            }
            return centroids;
        }
    });
} );