(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.Subslot = factory());
}(this, function () { 'use strict';

	var emit = function emit(ctx, eventName) {
	  var eventHandler = ctx.listeners[eventName];

	  if (typeof eventHandler === 'function') {
	    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	      args[_key - 2] = arguments[_key];
	    }

	    eventHandler.apply(void 0, args);
	  }
	};

	var getWhitelist = function getWhitelist(_ref) {
	  var vm = _ref.vm,
	      filter = _ref.filter;
	  var matchAll = false;
	  var components = [];
	  var tags = [];
	  var elements = Array.isArray(filter.element) ? filter.element : [filter.element];
	  elements.forEach(function (element) {
	    if (typeof element === 'string') {
	      if (element === '*') {
	        matchAll = true;
	      } else if (element[0] === '@') {
	        var component = vm.$options.components[element.slice(1)];

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
	  return {
	    matchAll: matchAll,
	    components: components,
	    tags: tags
	  };
	};

	var filterVnodes = function filterVnodes(_ref2) {
	  var vnodes = _ref2.vnodes,
	      filter = _ref2.filter,
	      vm = _ref2.vm;

	  if (filter.element) {
	    var _getWhitelist = getWhitelist({
	      vm: vm,
	      filter: filter
	    }),
	        matchAll = _getWhitelist.matchAll,
	        components = _getWhitelist.components,
	        tags = _getWhitelist.tags;

	    vnodes = vnodes.filter(function (vnode) {
	      if (matchAll) {
	        return vnode.tag;
	      }

	      var isComponent = vnode.componentOptions && vnode.componentOptions.Ctor.extendOptions;

	      var _ref3 = vnode.componentOptions || vnode,
	          tag = _ref3.tag;

	      var elementMatch = isComponent && components.includes(isComponent) || tag && tags.includes(tag);
	      return filter.not ? !elementMatch : elementMatch;
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

	function _slicedToArray(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
	}

	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}

	function _iterableToArrayLimit(arr, i) {
	  var _arr = [];
	  var _n = true;
	  var _d = false;
	  var _e = undefined;

	  try {
	    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);

	      if (i && _arr.length === i) break;
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) _i["return"]();
	    } finally {
	      if (_d) throw _e;
	    }
	  }

	  return _arr;
	}

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance");
	}

	var arrRemove = function arrRemove(arr, el) {
	  return arr.splice(arr.indexOf(el), 1);
	};

	var arrPtrn = /(.+)\[(\d?)(?::(\d+))?\]$/;

	var createFilter = function createFilter(strFilter) {
	  var not = false;
	  var element;
	  var offset = 0;
	  var limit;

	  if (arrPtrn.test(strFilter)) {
	    strFilter = strFilter.replace(arrPtrn, function (_, _element, _offset, _limit) {
	      element = _element;

	      if (_offset) {
	        offset = _offset;
	      }

	      if (_limit) {
	        limit = _limit;
	      }

	      return '';
	    });
	  } else {
	    var _strFilter$split = strFilter.split(':');

	    var _strFilter$split2 = _slicedToArray(_strFilter$split, 2);

	    element = _strFilter$split2[0];
	    limit = _strFilter$split2[1];
	  }

	  if (element[0] === '!') {
	    not = true;
	    element = element.slice(1);
	  }

	  element = element.split(',');
	  return {
	    element: element,
	    offset: offset,
	    limit: limit,
	    not: not
	  };
	};

	var genSubSlots = function genSubSlots(_ref) {
	  var sslotDef = _ref.sslotDef,
	      vnodes = _ref.vnodes,
	      vm = _ref.vm;

	  if (!vnodes) {
	    return {};
	  }

	  return Object.entries(sslotDef).reduce(function (slots, _ref2) {
	    var _ref3 = _slicedToArray(_ref2, 2),
	        name = _ref3[0],
	        def = _ref3[1];

	    var filtered = filterVnodes({
	      filter: typeof def === 'string' ? createFilter(def) : def,
	      vnodes: vnodes,
	      vm: vm
	    });
	    filtered.forEach(function (vn) {
	      return arrRemove(slots.default, vn);
	    });

	    if (filtered.length) {
	      slots[name] = filtered;
	    }

	    return slots;
	  }, {
	    default: vnodes.slice(0) // _original: vnodes,

	  });
	};

	function createDefineMixin(sslotDef) {
	  function generateSubslots() {
	    this.$subslots = genSubSlots({
	      sslotDef: sslotDef,
	      vnodes: this.$slots.default,
	      vm: this
	    });
	  }

	  return {
	    // TODO: Register Subslot component
	    created: generateSubslots,
	    beforeUpdate: generateSubslots
	  };
	}

	var validInt = function validInt(val) {
	  return !Number.isNaN(parseInt(val, 10));
	};

	var Subslot = {
	  functional: true,
	  props: {
	    not: {
	      type: Boolean
	    },
	    element: {
	      type: [Object, Array, String]
	    },
	    offset: {
	      type: [String, Number],
	      default: 0,
	      validator: validInt
	    },
	    limit: {
	      type: [String, Number],
	      validator: validInt
	    },
	    vnodes: {
	      type: null
	    },
	    name: {
	      type: String,
	      default: 'default'
	    }
	  },
	  render: function render(h, ctx) {
	    var props = ctx.props,
	        parent = ctx.parent;
	    var vnodes; // Detect definition

	    if (parent.$subslots) {
	      vnodes = parent.$subslots[props.name];
	    } else {
	      vnodes = ctx.props.vnodes || ctx.parent.$slots.default || [];
	    }

	    vnodes = filterVnodes({
	      vnodes: vnodes,
	      filter: props,
	      vm: parent
	    });

	    if (!vnodes || vnodes.length === 0) {
	      emit(ctx, 'no-match');
	      return ctx.slots().default;
	    }

	    return vnodes;
	  },

	  /* Static method for mixin */
	  define: createDefineMixin
	};

	return Subslot;

}));
