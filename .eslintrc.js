module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: "eslint:recommended",
	excludeFiles: [
		"lib/",
		"node_modules/",
	],
	overrides: [
		{
			files: [
				".eslintrc.{js,cjs}",
			],
			env: {
				node: true,
			},
			parserOptions: {
				sourceType: "script",
			},
		},
	],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	rules: {
		"indent": [
			"error",
			"tab",
		],
		"linebreak-style": [
			"error",
			"windows",
		],
		"quotes": [
			"error",
			"double",
		],
		"semi": [
			"error",
			"always",
		],
		"no-unused-vars": [
			"error",
			{args: "none"},
		],
	},
};
