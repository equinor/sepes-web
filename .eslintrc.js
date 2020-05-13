module.exports = {
	parser: '@typescript-eslint/parser',
	env: {
		browser: true,
		es6: true
	},
	extends: ['airbnb'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly'
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 2018,
		sourceType: 'module'
	},
	plugins: ['react'],
	rules: {
		'linebreak-style': [
			'error',
			process.env.NODE_ENV === 'prod' ? 'unix' : 'windows'
		],
		'react/jsx-filename-extension': [0],
		'eslint/indent:': 0,
		indent: ['off', 4],
		'no-use-before-define': 'off',
		'react/jsx-one-expression-per-line': 'off',
		'react/jsx-indent': 'off',
		'no-unused-vars': 'warn',
		'arrow-parens': 'warn',
		'react/prop-types': 0,
		'react/jsx-wrap-multilines': 0,
		'comma-dangle': 0,
		'no-tabs': 0,
        'react/jsx-indent-props': 0,
        'object-curly-newline': 0,
        'prefer-template': 0,
        'no-param-reassign': 0,
        'arrow-body-style': 0
	}
};
