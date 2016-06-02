var baseline = {

	'.app': {
		margin: 0,
		padding: 10,
		
		ul: {
			listStyleType: 'circle'
		},
		
		h1: {
			fontSize: 21
		},

		'.content': {
			'font-size': 18,
			'&.red': {
				color: function() { return '#f00'; },
				height: function() { return 30; },
				'.wide': function() { 
					return {
						width: '100%'
					}; 
				}
			}
		},

		'.section': {
			width: '50%',
			float: 'left',
			label: {
				display: 'block',
				fontSize: 16,
				fontWeight: 'bold',
				padding: '10px 0'
			},
			'textarea': {
				padding: 10,
				border: 'none',
				fontSize: 16,
				height: 300,
				border: '1px solid #33ccff',
				boxSizing: 'border-box',
				width: '98%'
			}
		},

		'.btn': {
			background: '#333',
			fontSize: 14,
			border: '1px solid #ccc',
			borderRadius: 5,
			color: '#eee'
		}
		
	},

	'@media ...ios': {

	}

};
