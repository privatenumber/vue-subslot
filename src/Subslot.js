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
	const _element = Array.isArray(filter.element) ? filter.element : [filter.element];

	_element.forEach((element) => {
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

const createFilter = (strFilter) => {
	let not = false;
	let [element, limit] = strFilter.split(':');
	if (element[0] === '!') {
		not = true;
		element = element.slice(1);
	}

	element = element.split(',');

	return { element, limit, not };
};

const filterVnodes = ({ vnodes, filter, vm }) => {
	const { components, tags } = getWhitelist({
		vm,
		filter,
	});

	vnodes = vnodes.filter((vnode) => {
		const isComponent = (vnode.componentOptions && vnode.componentOptions.Ctor.extendOptions);
		const { tag } = vnode.componentOptions || vnode;

		const elementMatch = (isComponent && components.includes(isComponent)) || (tag && tags.includes(tag));

		return filter.not ? !elementMatch : elementMatch;
	});

	if (filter.limit) {
		vnodes = vnodes.slice(0, filter.limit);
	}

	return vnodes;
};



const key = Symbol('SubSlot');

export default {
	functional: true,
	props: {
		not: {
			type: Boolean,
		},
		element: {
			type: [Array, String],
		},
		limit: {
			type: String,
			validator: val => parseInt(val, 10),
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

	/* Static method */
	slots(def) {
		return {
			$subslots() {
				console.assert(this.$slots, 'Subslot.slots() must be spread into the `computed` hash of the component.');

				const { default: defaultSlot } = this.$slots;

				const subslots = Object.keys(def).reduce((slots, name) => {
					const slotDef = def[name];

					const vnodes = filterVnodes({
						filter: typeof slotDef === 'string' ? createFilter(slotDef) : slotDef,
						vnodes: defaultSlot,
						vm: this,
					});

					vnodes.forEach(vn => remove(slots.default, vn));

					if (vnodes.length) {
						slots[name] = vnodes;
					}

					return slots;
				}, {
					default: defaultSlot.slice(0),
				});

				return subslots;
			},
		};
	},
};
