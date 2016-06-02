// if the module has no dependencies, the above pattern can be simplified to
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['Inflector', 'UnitProperties', 'Interpreter'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(
      require('Inflector'),
      require('UnitProperties'),
      require('Interpreter')
    );
  } else {
    // Browser globals (root is window)
    root.Converter = factory(root.Inflector, root.UnitProperties);
  }
}(this, function (Inflector, UnitProperties) {

  function Converter(config) {

    if (typeof(config) === 'object') {
      for (opt in config) {
        if (this.config.hasOwnProperty(opt)) {
          this.config[opt] = config[opt];
        }
      }
    }

  }

  Converter.prototype = {

    config: {
      outputMarkup: false,
      formatStylesheet: false
    },

    styles: {},
    markup: '',

    inflector: new Inflector(),
    interpreter: new Interpreter(),
    unitProperties: new UnitProperties(),

    parse: function(o, original, namespace) {
      var _ns,
          prop,
          domTree,
          identified,
          selectorType,
          r = [],
          ns = namespace ? [namespace] : [];

      for (p in o) {
        if (o.hasOwnProperty(p)) {
          
          prop = this.inflector.convert(p, 'spinal');

          if (o[p] instanceof Array) {
            // Do something with arrays
            r.push(prop + ': ' + o[p].join(' ') + ';');
          }else if (typeof(o[p]) === 'string') {
            r.push(prop + ': ' + o[p] + ';');
          }else if (typeof(o[p]) === 'number') {
            r.push(prop + ': ' + this.unitProperties.checkProperty(prop, o[p]) + ';');
          }else if (typeof(o[p]) === 'function') {
            o[p] = o[p]();
            r.push(prop + ': ' + o[p]);
          }else if (typeof(o[p]) === 'object') {
            if (p) {

              _ns = ns.concat(p);
              identified = this.interpreter.identify(p);
              blockName = _ns.join(this.interpreter.config.delim);
              selectorType = identified.type;
              objectName = this.interpreter.delimit(blockName);

              if (eval('original' + objectName)) {
                // If object is in the original object push it to the stack
                ns.push(p);
                blockName = ns.join(this.interpreter.config.delim);
              }else{
                // Otherwise it can only be one level up in the parent
                ns.splice(-1, 1, p);
                blockName = ns.join(this.interpreter.config.delim);
                selectorType = this.interpreter.identify(p).type;
              }

              this.styles[blockName] = [];

            }
            this.styles[blockName] = this.parse(o[p], original, blockName);
          }
        }
      }

      return r;
    },

    prepare: function(markup) {
      var rules,
          identified,
          selectors = '',
          r = '';

      for (name in this.styles) {
        if (name && this.styles.hasOwnProperty(name)) {
          rules = '';
          for (i=0,ii=this.styles[name].length;i<ii;i++) {
            if (markup) {
              rules += "&nbsp;&nbsp;";
            }else{
              rules += "  ";
            }
            rules += this.styles[name][i] + "\n";
          }
          
          identified = this.interpreter.identify(name);

          selectors += identified.selector + " {\n" + rules + "}\n\n";
        }
      }

      r = (markup) ? selectors.replace(/\n/g, "<br />") : selectors;
      
      return r;
    },

    read: function(o) {
      var r;

      this.parse(o, o);
      r = this.prepare(this.config.outputMarkup);
      this.reset();

      return r;
    },

    run: function(o, id) {
      var i = 0,
          r = this.read(o),
          s = document.getElementById(id);

      if (!s) {
        s = document.createElement('style');
        s.setAttribute('type', 'text/css');
        s.id = (id) ? id : 'jacss-' + i;
        document.getElementsByTagName('head')[0].appendChild(s);
      }else if (/^jacss\-\d+/.test(id)) {
        s.id.replace(/^jacss\-(\d+)/, function(match) {
          return parseInt(match, 10) + 1;
        });
      }

      return s.innerHTML = r;
    },

    draw: function(id) {
      var s;

      if (this.markup.length) {
        
        if (id) {
          s = document.getElementById(id);
        }

        if (!s) {
          s = document.createDocumentFragment();
          document.getElementsByTagName('body')[0].appendChild(s);
        }

        s.innerHTML = this.markup;

      }

    },

    reset: function() {
      this.styles = {};
    }

  };

  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.
  return Converter;

}));