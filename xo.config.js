const xoConfig = require('xo/config/plugins');

module.exports = {
	rules: {
		'comma-dangle': [
			'error',
			'always-multiline',
		],
		'guard-for-in': 'off',
		'import/extensions': [
			'error',
			{
				...xoConfig.rules['import/extensions'][1],
				vue: 'always',
			},
		],
	},
	overrides: [
		{
			files: 'test/*',
			env: 'jest',
		},
	],
};
