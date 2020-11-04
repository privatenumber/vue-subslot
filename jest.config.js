module.exports = {
	moduleNameMapper: {
		'vue-subslot': '<rootDir>/src/subslot',
	},
	transform: {
		'\\.vue$': 'vue-jest',
		'\\.js$': 'babel-jest',
	},
};
