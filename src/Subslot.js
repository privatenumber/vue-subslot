import emit from './utils/emit';
import filterVnodes from './utils/filter-vnodes';
import createDefineMixin from './create-define-mixin';

const validInt = (val) => !Number.isNaN(parseInt(val, 10));

export default {
	functional: true,
	props: {
		not: {
			type: Boolean,
		},
		element: {
			type: [Object, Array, String],
		},
		offset: {
			type: [String, Number],
			default: 0,
			validator: validInt,
		},
		limit: {
			type: [String, Number],
			validator: validInt,
		},
		vnodes: {
			type: null,
		},
		name: {
			type: String,
			default: 'default',
		},
	},

	render(h, ctx) {
		const { props, parent } = ctx;

		let vnodes;

		// Detect definition
		if (parent.$subslots) {
			vnodes = parent.$subslots[props.name];
		} else {
			vnodes = props.vnodes || parent.$slots.default || [];
		}

		vnodes = filterVnodes({
			vnodes,
			filter: props,
			vm: parent,
		});

		if (!vnodes || vnodes.length === 0) {
			emit(ctx, 'no-match');
			return ctx.slots().default;
		}

		return vnodes;
	},

	/* Static method for mixin */
	define: createDefineMixin,
};
