
var JACSSReader = {

	styles: {},

	measures: [
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

	shortMeasures: [
		'padding',
		'margin'
	],

	unit: 'px',
	delim: '%%BLK%%',
	outputMarkup: false,

	parse: function(o, original, namespace) {
		var _ns,
				prop,
				selectorType,
				r = [],
				ns = namespace ? [namespace] : [];

		for (p in o) {
			if (o.hasOwnProperty(p)) {
				
				prop = this.inflector(p, 'spinal');

				if (o[p] instanceof Array) {
					// Do something with arrays
					r.push(prop + ': ' + o[p].join(' ') + ';');
				}else if (typeof(o[p]) === 'string') {
					r.push(prop + ': ' + o[p] + ';');
				}else if (typeof(o[p]) === 'number') {
					r.push(prop + ': ' + this.isMeasure(prop, o[p]) + ';');
				}else if (typeof(o[p]) === 'function') {
					r.push(prop + ': ' + o[p]());
				}else if (typeof(o[p]) === 'object') {
					if (p) {

						_ns = ns.concat(p);
						blockName = _ns.join(this.delim);
						selectorType = this.identify(p).type;
						objectName = this.delimit(blockName);

						if (eval('original' + objectName)) {
							// If object is in the original object push it to the stack
							ns.push(p);
							blockName = ns.join(this.delim);
						}else{
							// Otherwise it can only be one level up in the parent
							ns.splice(-1, 1, p);
							blockName = ns.join(this.delim);
							selectorType = this.identify(p).type;
						}

						this.styles[blockName] = [];

					}
					this.styles[blockName] = this.parse(o[p], original, blockName);
				}
			}
		}

		return r;
	},

	delimit: function(value) {
		var regex = new RegExp(this.delim, "g");
		return "['" + value.replace(regex, "']['") + "']";
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
				
				identified = this.identify(name);

				selectors += identified.selector + " {\n" + rules + "}\n\n";
			}
		}

		r = (markup) ? selectors.replace(/\n/g, "<br />") : selectors;
		
		return r;
	},

	read: function(o) {
		var r;

		this.parse(o, o);
		r = this.prepare(this.outputMarkup);
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

	reset: function() {
		this.styles = {};
	},

	isMeasure: function(property, value) {
		var r = value;

		if (this.measures.indexOf(property) > -1) {
			r = (value !== 0) ? value + this.unit : value;
		}else if (this.shortMeasures.indexOf(property) > -1) {
			r = ("" + value).replace(/([\d]+)/g, "$&" + this.unit)
		}

		return r;
	},

	identify: function(selector) {
		var r,
				type = 'unknown',
				_selector = selector,
				regex = new RegExp(this.delim, "g");

		if (/id@/g.test(_selector)) {
			type = 'id';
			_selector = _selector.replace(/id@/g, '#');
		}

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

			pseudoRegex = new RegExp(this.delim + "(::?[a-z]+)", "g");
			_selector = _selector.replace(pseudoRegex, "$1");
		}

		if (/^[a-zA-Z]+/.test(selector)) {
			type = 'tag';
		}

		_selector = _selector.replace(regex, ' ');

		return {
			type: type,
			selector: _selector
		};
	},

	inflector: function(s, type) {

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

