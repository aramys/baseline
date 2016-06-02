// if the module has no dependencies, the above pattern can be simplified to
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.UnitProperties = factory();
  }
}(this, function () {

  function UnitProperties(config) {

    if (typeof(config) === 'object') {
      for (opt in config) {
        if (this.config.hasOwnProperty(opt)) {
          this.config[opt] = config[opt];
        }
      }
    }

  } 

  UnitProperties.prototype = {

    config: {
      unit: 'px',
    },

    units: [
      '%',
      'cm', 
      'em',
      'in',     
      'mm', 
      'pc',
      'pt', 
      'px',
      'rem',
      'vh',
      'vmax',
      'vmin',
      'vw'
    ],

    normal: [
      'width',
      'height',
      'min-width',
      'max-width',
      'font-size',
      'top',
      'right',
      'bottom',
      'left',
      'padding-top',
      'padding-bottom',
      'padding-left',
      'padding-right',
      'margin-top',
      'margin-bottom',
      'margin-left',
      'margin-right',
      'letter-spacing',
      'border-radius',
      'text-indent'
    ],

    shorthand: [
      'padding',
      'margin'
    ],

    prefixes: [
      {
        vendor: 'ie',
        prefix: '-ms-'
      },
      {
        vendor: 'firefox',
        prefix: '-moz-'
      },
      {
        vendor: 'webkit',
        prefix: '-webkit-'
      },
      {
        vendor: 'opera',
        prefix: '-o-'
      }
    ],

    vendor: {
      'animation': ['webkit'],
      'box-direction': ['webkit'],
      'box-orient': ['webkit'],
      'box-pack': ['webkit'],
      'box-reflect': ['webkit'],
      'column-count': ['webkit', 'firefox'],
      'filter': ['webkit', 'ie'],
      'flex-pack': ['ie'],
      'flex-direction': ['webkit', 'ie'],
      'flow-from': ['webkit', 'firefox'],
      'flow-into': ['webkit', 'firefox'],
      'font-feature-settings': ['webkit', 'firefox'],
      'hyphens': ['webkit', 'ie', 'firefox'],
      'justify-content': [],
      'opacity': [],
      'object-fit': ['opera'],
      'transform': ['webkit', 'firefox'],
      'mask-image': ['webkit'],
      'word-break': []
    },

    checkProperty: function(property, value) {
      var r = value;

      if (this.normal.indexOf(property) > -1) {
        r = (value !== 0) ? value + this.config.unit : value;
      }else if (this.shorthand.indexOf(property) > -1) {
        r = ("" + value).replace(/([\d]+)/g, "$&" + this.config.unit)
      }

      return r;
    }

  };

  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.
  return UnitProperties;

}));