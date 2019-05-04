const remove = (arr, el) => arr.splice(arr.indexOf(el), 1);

const getVnodes = (ctx) => {
	if (ctx.props.vnodes) { return ctx.props.vnodes; }

	const { default: defaultSlot } = ctx.parent.$slots;
	if (defaultSlot) { return defaultSlot; }

	return [];
};

const getWhitelist = ({ vm, filter }) => {
	const components = [];
	const tags = [];
	const elements = Array.isArray(filter.element) ? filter.element : [filter.element];

	elements.forEach((element) => {
		if (typeof element === 'string') {
			if (element[0] === '@') {
				const component = vm.$options.components[element.slice(1)];
				if (component) {
					components.push(component);
				}
				return;
			}
			tags.push(element);
			return;
		}

		components.push(element);
	});

	return { components, tags };
};

const emit = (ctx, eventName, ...args) => {
	const eventHandler = ctx.listeners[eventName];
	if (typeof eventHandler === 'function') {
		eventHandler(...args);
	}
};

const arrPtrn = /(.+)\[(\d+)(?::(\d+))?\]$/;
const createFilter = (strFilter) => {
	let not = false;
	let element;
	let offset = 0;
	let limit;

	if (arrPtrn.test(strFilter)) {
		strFilter = strFilter.replace(arrPtrn, (_, _element, _offset, _limit) => {
			element = _element;
			if (_offset) { offset = _offset; }
			if (_limit) { limit = _limit; }
			return '';
		});
	} else {
		[element, limit] = strFilter.split(':');
	}

	if (element[0] === '!') {
		not = true;
		element = element.slice(1);
	}

	element = element.split(',');

	return {
		element, offset, limit, not,
	};
};

const filterVnodes = ({ vnodes, filter, vm }) => {
	const { components, tags } = getWhitelist({ vm, filter });

	vnodes = vnodes.filter((vnode) => {
		const isComponent = (vnode.componentOptions && vnode.componentOptions.Ctor.extendOptions);
		const { tag } = vnode.componentOptions || vnode;

		const elementMatch = (
			(isComponent && components.includes(isComponent))
			|| (tag && tags.includes(tag))
		);

		return filter.not ? !elementMatch : elementMatch;
	});

	if (filter.offset) {
		vnodes = vnodes.slice(filter.offset);
	}

	if (filter.limit) {
		vnodes = vnodes.slice(0, filter.limit);
	}

	return vnodes;
};

const genSubSlots = ({ sslotDef, vnodes, vm }) => {
	if (!vnodes) { return {}; }

	return Object.entries(sslotDef)
		.reduce((slots, [name, def]) => {
			const filtered = filterVnodes({
				filter: typeof def === 'string' ? createFilter(def) : def,
				vnodes,
				vm,
			});

			filtered.forEach(vn => remove(slots.default, vn));

			if (filtered.length) {
				slots[name] = filtered;
			}

			return slots;
		}, {
			default: vnodes.slice(0),
			_original: vnodes,
		});
};

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
			validator: val => !Number.isNaN(parseInt(val, 10)),
		},
		limit: {
			type: [String, Number],
			validator: val => !Number.isNaN(parseInt(val, 10)),
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
			vnodes = getVnodes(ctx);
			vnodes = filterVnodes({
				vnodes,
				filter: props,
				vm: parent,
			});
		}

		if (!vnodes || vnodes.length === 0) {
			emit(ctx, 'no-match');
			return ctx.slots().default;
		}

		return vnodes;
	},

	define(sslotDef) {
		function generate() {
			this.$subslots = genSubSlots({
				sslotDef,
				vnodes: this.$slots.default,
				vm: this,
			});
		}

		return {
			beforeCreate: generate,
			beforeUpdate: generate,
		};
	},
};
