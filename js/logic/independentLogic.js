/**
 * Created by Kay on 11/24/2015.
 */
require( [ 'underscore', 'jquery' ], function ( underscore , jquery ) {

    const WINDOW_HEIGHT = window.innerHeight;
    const WINDOW_WIDTH  = window.innerWidth;
    const CANVAS_HEIGHT = WINDOW_HEIGHT - 250;
    const CANVAS_WIDTH  = WINDOW_WIDTH - 50;

    const ARC_BEGIN  = 0;
    const ARC_END    = Math.PI * 2;

    const CENTROID_RADIUS = 5;
    const DOT_RADIUS = 2;

    var _               = underscore;
    var $               = jquery;
    var canvas = $( '#canvas' )[0];
    var ctx = canvas.getContext( '2d' );

    ctx.canvas.height = CANVAS_HEIGHT;
    ctx.canvas.width  = CANVAS_WIDTH;

    generateCentroids = function ( quantity ) {
        var centroids = [];
        for( var i = 0; i < quantity; i++ ) {
            centroids.push(
                    centroid( Math.floor((Math.random() * CANVAS_WIDTH) + 1), Math.floor((Math.random() * CANVAS_HEIGHT) + 1) )
            );
        }
        return centroids;
    };

    centroid = function ( x, y ) {
        return {
            x : x,
            y : y,
            radius : CENTROID_RADIUS,
            color: 'lime',
            dots : []
        }
    };

    dataPoint = function ( x, y ) {
        return {
            x : x,
            y : y,
            radius : DOT_RADIUS,
            color : 'black'
        }
    };

    drawCluster = function ( cluster ) {
        _.each( cluster, function( dot ) {
            draw( dot.x, dot.y, dot.radius, dot.color )
        } );
    };

    // draw a point on the canvas with x and y as its coordinates
    draw = function ( x, y, radius, color ) {
        ctx.beginPath();
        ctx.fillStyle = color ;
        ctx.arc( x, CANVAS_HEIGHT - y, radius, ARC_BEGIN, ARC_END );
        ctx.fill();
    };

    var centroids = generateCentroids( 5 );

    drawCluster( centroids );

} );