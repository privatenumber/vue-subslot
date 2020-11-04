const getWhitelist = ({vm, filter}) => {
	let matchAll = false;
	const components = [];
	const tags = [];
	const elements = Array.isArray(filter.element) ? filter.element : [filter.element];

	elements.forEach(element => {
		if (typeof element === 'string') {
			if (element === '*') {
				matchAll = true;
			} else if (element[0] === '@') {
				const component = vm.$options.components[element.slice(1)];
				if (component) {
					components.push(component);
				}
			} else {
				tags.push(element);
			}
		} else {
			components.push(element);
		}
	});

	return {matchAll, components, tags};
};

const filterVnodes = ({vnodes, filter, vm}) => {
	if (filter.element) {
		const {matchAll, components, tags} = getWhitelist({vm, filter});

		vnodes = vnodes.filter(vnode => {
			let hasMatch;
			const {tag} = vnode;

			if (matchAll) {
				hasMatch = tag;
			} else if (tag) {
				const isComponent = (vnode.componentOptions && vnode.componentOptions.Ctor.extendOptions);
				hasMatch = isComponent ? components.includes(isComponent) : tags.includes(tag);
			}

			return filter.not ? !hasMatch : hasMatch;
		});
	}

	if (filter.offset) {
		vnodes = vnodes.slice(filter.offset);
	}

	if (filter.limit) {
		vnodes = vnodes.slice(0, filter.limit);
	}

	return vnodes;
};

export default filterVnodes;
