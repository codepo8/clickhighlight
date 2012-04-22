/*
  clickhighlight.js
  Homepage: http://codepo8.github.com/clickhighlight/
  Copyright (c) 2012 Christian Heilmann
  Code licensed under the BSD License:
  http://christianheilmann.com/license.txt
*/
clickhighlight = function() {
  var classes = {
    nohighlight: 'nohighlight'
  };
  var styles = {
    size: '100px',
    duration:  '1s',
    colour:    'rgba( 255, 10, 10, 0.7 )'
  };
  function init( o ) {
    if ( plot ) { plot.parentNode.removeChild(plot); }
    if ( o ) {
      if ( o && o.size ) { styles.size = o.size; }
      if ( o && o.duration ) { styles.duration = o.duration; }
      if ( o && o.colour ) { styles.colour = o.colour; }
      if ( o && o.nohighlight ) { classes.nohighlight  = o.nohighlight; }
    }
    var plot = document.createElement( 'div' ),
        pressed = false,
        offset = parseInt( styles.size, 10 ) / 2;
        prefix = getprefix( plot );

    if ( prefix !== null ) {
      plot.style.borderRadius = styles.size;
      plot.style.background = styles.colour;
      plot.style.pointerEvents = 'none';
      plot.style.width = styles.size;
      plot.style.height = styles.size;
      plot.style.position = 'absolute';
      plot.style[ prefix + 'Transform' ] = 'scale( 0, 0 )';
      plot.style[ prefix + 'Transition' ] = '-' + prefix.toLowerCase() + '-' +
                                            'transform ' + styles.duration;
      document.body.appendChild( plot );

      function down( ev ) {
        var t = ev.target.classList; 
        if ( !t.contains( classes.nohighlight ) ) {
          pressed = true;
          move( ev );
          plot.style[ prefix + 'Transform' ] = 'scale( 1, 1 )';
        }
      };

      function up( ev ) {
        pressed = false;
        plot.style[ prefix + 'Transform' ] = 'scale( 0, 0 )';
      };

      function move( ev ) {
        if ( pressed ) { 
          var x =  ev.pageX, 
              y = ev.pageY;
          plot.style.left = x - offset + 'px';
          plot.style.top = y - offset + 'px';
        }
      };

      document.addEventListener( 'mousedown', down , false );
      document.addEventListener( 'mouseup', up , false );
      document.addEventListener( 'mousemove', move, false );  
      document.addEventListener( 'touchstart', down , false );
      document.addEventListener( 'touchend', up , false );
      document.addEventListener( 'touchmove', move, false );  
    }
  };
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
  };

  return { init:init };
}();