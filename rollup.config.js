import babel from 'rollup-plugin-babel';
import {terser} from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';

const isProd = process.env.NODE_ENV === 'production';

const rollupConfig = {
	input: 'src/subslot.js',
	plugins: [
		babel(),
		isProd && terser(),
		isProd && filesize(),
	],
	output: {
		dir: 'dist',
		format: 'umd',
		name: 'Subslot',
	},
};

export default rollupConfig;
