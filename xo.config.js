const xoConfig = require('xo/config/plugins');

module.exports = {
	extensions: ['vue'],
	extends: [
		'plugin:vue/recommended',
	],
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
		{
			files: '**/*.vue',
			rules: {
				'import/no-anonymous-default-export': ['error', {
					allowObject: true,
				}],
				'unicorn/filename-case': ['error', {
					cases: {
						pascalCase: true,
					},
				}],
			},
		},
	],
};
