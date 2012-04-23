/*
  clickhighlight.js
  Homepage: http://codepo8.github.com/clickhighlight/
  Copyright (c) 2012 Christian Heilmann
  Code licensed under the BSD License:
  http://christianheilmann.com/license.txt
*/
clickhighlight = function() {
  
  function init(o) {
    if (plot) { plot.parentNode.removeChild(plot); }

    var plot = document.createElement('div'),
        size     = (o && o.size)     || '100px',
        duration = (o && o.duration) || '1s',
        colour   = (o && o.colour)   || 'rgba(255, 10, 10, 0.7)',
        noclickclass = (o && o.nohighlight) || 'nohighlight',
        pressed = false,
        offset = parseInt(size, 10) / 2;
        prefix = getprefix(plot);

    if (prefix !== null) {
      plot.style.borderRadius = size;
      plot.style.background = colour;
      plot.style.pointerEvents = 'none';
      plot.style.width = size;
      plot.style.height = size;
      plot.style.position = 'absolute';
      plot.style[prefix + 'Transform'] = 'scale(0, 0)';
      plot.style[prefix + 'Transition'] = '-' + prefix.toLowerCase() + '-' +
                                            'transform ' + duration;
      document.body.appendChild(plot);

      function down(ev) {
        var t = ev.target.classList; 
        if (!t.contains(noclickclass)) {
          pressed = true;
          move(ev);
          plot.style[prefix + 'Transform'] = 'scale(1, 1)';
        }
      };

      function up(ev) {
        pressed = false;
        plot.style[prefix + 'Transform'] = 'scale(0, 0)';
      };

      function move(ev) {
        if (pressed) { 
          var x = ev.pageX, 
              y = ev.pageY;
          plot.style.left = x - offset + 'px';
          plot.style.top = y - offset + 'px';
        }
      };

      document.addEventListener('mousedown', down , false);
      document.addEventListener('mouseup', up , false);
      document.addEventListener('mousemove', move, false);
      /* TODO 
      document.addEventListener('touchstart', down , false);
      document.addEventListener('touchend', up , false);
      document.addEventListener('touchmove', move, false);  
      */
    }
  };
  
  function getprefix(elm) {
    var prefixes = ['Moz', 'Webkit', 'Khtml', 'O', 'ms', ''],
        all = prefixes.length,
        prefix = null;
    while (all--) {
      if (elm.style[ prefixes[ all ] + 'Transition' ] !== undefined) {
        prefix = prefixes[all];
        break;
      }
    }
    return prefix;
  };

  return { init:init };
}();