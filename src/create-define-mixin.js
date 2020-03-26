import arrRemove from './utils/arr-remove';
import filterVnodes from './utils/filter-vnodes';

const arrPtrn = /(.+)\[(\d?)(?::(\d+))?\]$/;
const parseFilterStr = (strFilter) => {
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
		const filterSplit = strFilter.split(':');
		element = filterSplit[0];
		limit = filterSplit[1];
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

const genSubSlots = ({ sslotDef, vnodes, vm }) => {
	if (!vnodes) { return {}; }

	return Object.entries(sslotDef)
		.reduce((slots, entry) => {
			const name = entry[0];
			const def = entry[1];
			const filtered = filterVnodes({
				filter: typeof def === 'string' ? parseFilterStr(def) : def,
				vnodes,
				vm,
			});

			filtered.forEach((vn) => arrRemove(slots.default, vn));

			if (filtered.length) {
				slots[name] = filtered;
			}

			return slots;
		}, {
			default: vnodes.slice(0),
			// _original: vnodes,
		});
};


export default function createDefineMixin(sslotDef) {
	function generateSubslots() {
		this.$subslots = genSubSlots({
			sslotDef,
			vnodes: this.$slots.default,
			vm: this,
		});
	}

	return {
		// TODO: Register Subslot component
		created: generateSubslots,
		beforeUpdate: generateSubslots,
	};
}
