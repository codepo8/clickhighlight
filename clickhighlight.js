clickhighlight = function() {
  var classes = {
    nohighlight: 'nohighlight'
  };
  var styles = {
    dimension: '100px',
    duration:  '1s',
    colour:    'rgba( 255, 10, 10, 0.7 )'
  };
  function init( o ) {
    if ( plot ) { plot.parentNode.removeChild(plot); }
    if ( o && o.dimension ) { styles.dimension = o.dimension; }
    if ( o && o.duration ) { styles.duration = o.duration; }
    if ( o && o.colour ) { styles.colour = o.colour; }
    if ( o && o.nohighlight ) { classes.nohighlight  = o.nohighlight; }
    
    var plot = document.createElement( 'div' ),
        pressed = false,
        offset = parseInt( styles.dimension, 10 ) / 2;
        prefix = getprefix( plot );
    if ( prefix !== null ) {
      plot.style.borderRadius = styles.dimension;
      plot.style.background = styles.colour;
      plot.style.pointerEvents = 'none';
      plot.style.width = styles.dimension;
      plot.style.height = styles.dimension;
      plot.style.position = 'absolute';
      plot.style[ prefix + 'Transition' ] = '-' + prefix.toLowerCase() + '-' +
                                            'transform ' + styles.duration;
      plot.style[ prefix + 'Transform' ] = 'scale( 0, 0 )';
      document.body.appendChild( plot );
      document.addEventListener( 'mousedown', function( ev ) {
        var t = ev.target.classList; 
        if ( !t.contains( classes.nohighlight ) ) {
          pressed = true;
          moveplot( ev.pageX, ev.pageY );
          plot.style[ prefix + 'Transform' ] = 'scale( 1, 1 )';
        }
      }, false );
      document.addEventListener( 'mouseup', function( ev ) {
        pressed = false;
        plot.style[ prefix + 'Transform' ] = 'scale( 0, 0 )';
      },  false );
      document.addEventListener( 'mousemove', function( ev ) {
        if ( pressed ) { moveplot( ev.pageX, ev.pageY ); }
      }, false );  
      function moveplot( x, y ) {
        plot.style.left = x - offset + 'px';
        plot.style.top = y - offset + 'px';
      }
    }
  }
  function getprefix(elm) {
    var prefixes = [ 'Moz', 'Webkit', 'Khtml', 'O', 'ms', '' ],
        all = prefixes.length,
        prefix = null;
    while ( all-- ) {
      if ( elm.style[ prefixes[all] + 'Transition' ] !== undefined ) {
        prefix = prefixes[all];
        break;
      }
    }
    return prefix;
  }
  return { init:init };
}();