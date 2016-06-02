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
    root.Interpreter = factory();
  }
}(this, function () {

  function Interpreter(config) {

    if (typeof(config) === 'object') {
      for (opt in config) {
        if (this.config.hasOwnProperty(opt)) {
          this.config[opt] = config[opt];
        }
      }
    }

  }

  Interpreter.prototype = {

    config: {
      delim: '%%BLK%%'
    },

    delimit: function(value) {
      var regex = new RegExp(this.config.delim, "g");
      return "['" + value.replace(regex, "']['") + "']";
    },

    build: function(tags) {
      var r;

      if (tags instanceof Array) {

      }else if (typeof(tags) === 'string') {

      }

    },

    identify: function(selector) {
      var r,
          ampRegex,
          pseudoRegex,
          type = 'unknown',
          _selector = selector,
          regex = new RegExp(this.config.delim, "g");      

      if (/cl@\-?[_a-zA-Z]+[_a-zA-Z0-9-]*/.test(_selector)) {
        type = 'class';
        _selector = _selector.replace(/cl@/g, '.');
      }

      if (/@media/.test(_selector)) {
        type = 'media';
      }

      if (/[\s]{0,1}::?[a-z]+/g.test(_selector)) {
        type = 'pseudo';
        _selector = _selector.replace(/[\s]{0,1}(::?[a-z]+)/g, "$1");

        pseudoRegex = new RegExp(this.config.delim + "(::?[a-z]+)", "g");
        _selector = _selector.replace(pseudoRegex, "$1");
      }

      if (/[\s]{0,1}&\.?[_a-zA-Z]+[_a-zA-Z0-9-]*/g.test(_selector)) {
        type = 'class';

        ampRegex = new RegExp(this.config.delim + "[\s]{0,1}&(\.?)", "g");
        _selector = _selector.replace(ampRegex, "$1");
      } 

      if (/^<.*?>/g.test(selector)) {
        type = 'tag';
      }

      _selector = _selector.replace(regex, ' ');

      return {
        type: type,
        selector: _selector
      };
    }

  };

  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.
  return Interpreter;

}));