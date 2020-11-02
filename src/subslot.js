import emit from './utils/emit';
import filterVnodes from './utils/filter-vnodes';
import createDefineMixin from './create-define-mixin';

const validInt = value => !Number.isNaN(Number.parseInt(value, 10));

const Subslot = {
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
		const {props, parent} = ctx;

		let vnodes;

		// Detect definition
		vnodes = parent.$subslots ? parent.$subslots[props.name] : props.vnodes || parent.$slots.default || [];

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

export default Subslot;
