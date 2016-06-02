/* css Zen Garden default style v1.02 */
/* css released under Creative Commons License - http://creativecommons.org/licenses/by-nc-sa/1.0/  */

/* This file based on 'Tranquille' by Dave Shea */
/* You may use this file as a foundation for any new work, but you may find it easier to start from scratch. */
/* Not all elements are defined in this file, so you'll most likely want to refer to the xhtml as well. */

/* Your images should be linked as if the CSS file sits in the same folder as the images. ie. no paths. */


/* basic elements */
var csszengarden = {
	html: {
		margin: 0,
		padding: 0,
	},
	body: { 
		font: '75% georgia, sans-serif',
		lineHeight: 1.88889,
		color: '#555753',
		background: '#fff url(http://csszengarden.com/001/blossoms.jpg) no-repeat bottom right',
		margin: 0, 
		padding: 0
	},

	p: { 
		marginTop: 0, 
		textAlign: 'justify'
	},

	h3: { 
		font: 'italic normal 1.4em georgia, sans-serif',
		letterSpacing: 1,
		marginBottom: 0,
		color: '#7D775C'
	},

	a: { 
		':link': {
			fontWeight: 'bold',
			textDecoration: 'none',
			color: '#B7A5DF'
		},
		':visited': { 
			fontWeight: 'bold',
			textDecoration: 'none',
			color: '#D4CDDC'
		},
		':hover, a:focus, a:active': { 
			textDecoration: 'underline',
			color: '#9685BA'
		}
	},

	abbr: {
		borderBottom: 'none'
	},

	'cl@page-wrapper': { 
		background: 'url(http://csszengarden.com/001/zen-bg.jpg) no-repeat top left',
		padding: '0 175px 0 110px',
		margin: 0,
		position: 'relative'
	},

	'cl@intro': { 
		minWidth: 470,
		width: '100%'
	},

	header: {
		h1: { 
			background: 'transparent url(http://csszengarden.com/001/h1.gif) no-repeat top left',
			marginTop: 10,
			display: 'block',
			width: 219,
			height: 87,
			float: 'left',

			textIndent: '100%',
			whiteSpace: 'nowrap',
			overflow: 'hidden'
		},

		h2: { 
			background: 'transparent url(http://csszengarden.com/001/h2.gif) no-repeat top left',
			marginTop: 58,
			marginBottom: 40,
			width: 200,
			height: 18,
			float: 'right',

			textIndent: '100%',
			whiteSpace: 'nowrap',
			overflow: 'hidden'
		},

		paddingTop: 20,
		height: 87
	},

	'cl@summary': {
		clear: 'both',
		margin: '20px 20px 20px 10px',
		width: 160,
		float: 'left',
		p: {
			font: 'italic 1.1em/2.2 georgia',
			textAlign: 'center'
		}
	},

	'cl@preamble': {
		clear: 'right',
		padding: '0px 10px 0 10px'
	},

	'cl@supporting': {	
		paddingLeft: 10,
		marginBottom: 40
	},

	footer: { 
		textAlign: 'center',

		'a:link, footer a:visited': { 
			marginRight: 20
		}
	},

	'cl@sidebar': {
		marginLeft: 600,
		position: 'absolute',
		top: 0,
		right: 0,
		'cl@wrapper': { 
			font: '10px verdana, sans-serif',
			background: 'transparent url(http://csszengarden.com/001/paper-bg.jpg) top left repeat-y',
			padding: 10,
			marginTop: 150,
			width: 130
		},

		'h3.select': {
			background: 'transparent url(http://csszengarden.com/001/h3.gif) no-repeat top left',
			margin: '10px 0 5px 0',
			width: 97,
			height: 16,
			textIndent: '100%',
			whiteSpace: 'nowrap',
			overflow: 'hidden'
		},
		'h3.archives': { 
			background: 'transparent url(http://csszengarden.com/001/h5.gif) no-repeat top left',
			margin: '25px 0 5px 0',
			width: 57,
			height: 14,
			textIndent: '100%',
			whiteSpace: 'nowrap',
			overflow: 'hidden'
		},
		'h3.resources': { 
			background: 'transparent url(http://csszengarden.com/001/h6.gif) no-repeat top left',
			margin: '25px 0 5px 0',
			width: 63,
			height: 10,
			textIndent: '100%',
			whiteSpace: 'nowrap',
			overflow: 'hidden'
		},

		ul: {
			margin: 0,
			padding: 0
		},

		li: {
			lineHeight: '1.3em',
			background: 'transparent url(http://csszengarden.com/001/cr1.gif) no-repeat top center',
			display: 'block',
			paddingTop: 5,
			marginBottom: 5,
			listStyleType: 'none',

			a: {
				':link': {
					color: '#988F5E'
				},
				':visited': {
					color: '#B3AE94'
				}
			}
		}
	},

	'cl@extra1': {
		background: 'transparent url(http://csszengarden.com/001/cr2.gif) top left no-repeat',
		position: 'absolute',
		top: 40,
		right: 0, 
		width: 148,
		height: 110
	}

};
