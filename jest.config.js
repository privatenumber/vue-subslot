module.exports = {
	moduleNameMapper: {
		'vue-subslot': '<rootDir>/src/subslot',
	},
	moduleFileExtensions: [
		'js',
		'vue',
	],
	transform: {
		'\\.vue$': 'vue-jest',
		'\\.js$': 'babel-jest',
	},
	snapshotSerializers: [
		'jest-serializer-vue',
	],
};
