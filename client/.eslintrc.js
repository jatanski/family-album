const path = require('path');

module.exports = {
	parser: '@typescript-eslint/parser',
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier/@typescript-eslint',
		'plugin:prettier/recommended',
	],
	plugins: ['react', '@typescript-eslint', 'prettier'],
	env: {
		es6: true,
		node: true,
		browser: true,
	},
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	rules: {
		'no-console': 0,
		'spaced-comment': ['error', 'always', { markers: ['/'] }],
		'import/prefer-default-export': 0,
		'react/prop-types': 0,
		'react/static-property-placement': 0,
		'react/jsx-curly-newline': 0,
		'react/state-in-constructor': 0,
		'react/destructuring-assignment': 0,
		'react/jsx-filename-extension': [2, { extensions: ['.tsx'] }],
		'react/jsx-curly-newline': 0,
		'react/jsx-props-no-spreading': 0,
		'react/jsx-one-expression-per-line': 0,
		'@typescript-eslint/explicit-function-return-type': 0,
		'@typescript-eslint/no-non-null-assertion': 0,
		'@typescript-eslint/no-inferrable-types': 0,
		'@typescript-eslint/no-explicit-any': 0,
		'@typescript-eslint/no-use-before-define': 0,
		'@typescript-eslint/ban-ts-ignore': 0,
		'@typescript-eslint/no-unused-vars': 0
	},
	settings: {
		react: {
			version: 'detect',
		},
		'import/extensions': ['.js', '.ts', '.tsx', '.svg'],
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
		'import/resolver': {
			node: {
				paths: [path.resolve(__dirname, 'src')],
				extensions: ['.js', '.ts', '.tsx'],
			},
		},
	},
};
