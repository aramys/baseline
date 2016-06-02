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
    root.Inflector = factory();
  }
}(this, function () {

  function Inflector(config) {

    if (typeof(config) === 'object') {
      for (opt in config) {
        if (this.config.hasOwnProperty(opt)) {
          this.config[opt] = config[opt];
        }
      }
    }

  }

  Inflector.prototype = {

    config: {},

    convert: function(s, type) {

      var r = s;

      switch(type) {
        case 'array':
        case 'dot':
        case 'camel':
        case 'snake':
        case 'spinal':
        case 'space':
          r = this[type](s);
          break;
      }

      return r;

    },

    array: function(s) {
      var r = s.replace(/([A-Z0-9])/g, function(match) {
        return "']['" + match.toLowerCase();
      });

      return "['" + r.replace(/([\-_])/g, "']['") + "']";
    },

    dot: function(s) {
      var r = s.replace(/([A-Z0-9])/g, function(match) {
        return '.' + match.toLowerCase();
      });

      return r.replace(/([\-_])/g, '.');
    },

    camel: function(s) {
      return s.replace(/(\-|_)(.{1})/g, function(match, p1, p2) {
        return p2.toUpperCase();
      });
    },

    snake: function(s) {
      var r = s.replace(/([A-Z0-9])/g, function(match) {
        return '_' + match.toLowerCase();
      });

      return r.replace(/[\-]/g, function(match) {
        return '_';
      });
    },

    spinal: function(s) {
      var r = s.replace(/([A-Z0-9])/g, function(match) {
        return '-' + match.toLowerCase();
      });

      return r.replace(/[_]/g, function(match) {
        return '-';
      });
    },

    space: function(s) {
      var r = s.replace(/([A-Z0-9])/g, function(match) {
        return ' ' + match.toLowerCase();
      });

      return r.replace(/([\-_])/g, ' ');
    }

  };

  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.
  return Inflector;

}));