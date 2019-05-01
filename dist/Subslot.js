(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Subslot"] = factory();
	else
		root["Subslot"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./Subslot.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Subslot.js":
/*!********************!*\
  !*** ./Subslot.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nvar remove = function remove(arr, el) {\n  return arr.splice(arr.indexOf(el), 1);\n};\n\nvar getVnodes = function getVnodes(ctx) {\n  if (ctx.props.vnodes) {\n    return ctx.props.vnodes;\n  }\n\n  var defaultSlot = ctx.parent.$slots[\"default\"];\n\n  if (defaultSlot) {\n    return defaultSlot;\n  }\n\n  return [];\n};\n\nvar getWhitelist = function getWhitelist(_ref) {\n  var vm = _ref.vm,\n      filter = _ref.filter;\n  var components = [];\n  var tags = [];\n\n  var _element = Array.isArray(filter.element) ? filter.element : [filter.element];\n\n  _element.forEach(function (element) {\n    if (typeof element === 'string') {\n      if (element[0] === '@') {\n        var component = vm.$options.components[element.slice(1)];\n\n        if (component) {\n          components.push(component);\n        }\n\n        return;\n      }\n\n      tags.push(element);\n      return;\n    }\n\n    components.push(element);\n  });\n\n  return {\n    components: components,\n    tags: tags\n  };\n};\n\nvar emit = function emit(ctx, eventName) {\n  var eventHandler = ctx.listeners[eventName];\n\n  if (typeof eventHandler === 'function') {\n    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n      args[_key - 2] = arguments[_key];\n    }\n\n    eventHandler.apply(void 0, args);\n  }\n};\n\nvar createFilter = function createFilter(strFilter) {\n  var not = false;\n\n  var _strFilter$split = strFilter.split(':'),\n      _strFilter$split2 = _slicedToArray(_strFilter$split, 2),\n      element = _strFilter$split2[0],\n      limit = _strFilter$split2[1];\n\n  if (element[0] === '!') {\n    not = true;\n    element = element.slice(1);\n  }\n\n  element = element.split(',');\n  return {\n    element: element,\n    limit: limit,\n    not: not\n  };\n};\n\nvar filterVnodes = function filterVnodes(_ref2) {\n  var vnodes = _ref2.vnodes,\n      filter = _ref2.filter,\n      vm = _ref2.vm;\n\n  var _getWhitelist = getWhitelist({\n    vm: vm,\n    filter: filter\n  }),\n      components = _getWhitelist.components,\n      tags = _getWhitelist.tags;\n\n  vnodes = vnodes.filter(function (vnode) {\n    var isComponent = vnode.componentOptions && vnode.componentOptions.Ctor.extendOptions;\n\n    var _ref3 = vnode.componentOptions || vnode,\n        tag = _ref3.tag;\n\n    var elementMatch = isComponent && components.includes(isComponent) || tag && tags.includes(tag);\n    return filter.not ? !elementMatch : elementMatch;\n  });\n\n  if (filter.limit) {\n    vnodes = vnodes.slice(0, filter.limit);\n  }\n\n  return vnodes;\n};\n\nvar genSubSlots = function genSubSlots(_ref4) {\n  var sslotDef = _ref4.sslotDef,\n      vnodes = _ref4.vnodes,\n      vm = _ref4.vm;\n\n  if (!vnodes) {\n    return {};\n  }\n\n  return Object.entries(sslotDef).reduce(function (slots, _ref5) {\n    var _ref6 = _slicedToArray(_ref5, 2),\n        name = _ref6[0],\n        def = _ref6[1];\n\n    var filtered = filterVnodes({\n      filter: typeof def === 'string' ? createFilter(def) : def,\n      vnodes: vnodes,\n      vm: vm\n    });\n    filtered.forEach(function (vn) {\n      return remove(slots[\"default\"], vn);\n    });\n\n    if (filtered.length) {\n      slots[name] = filtered;\n    }\n\n    return slots;\n  }, {\n    \"default\": vnodes.slice(0),\n    _original: vnodes\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  functional: true,\n  props: {\n    not: {\n      type: Boolean\n    },\n    element: {\n      type: [Array, String]\n    },\n    limit: {\n      type: String,\n      validator: function validator(val) {\n        return parseInt(val, 10);\n      }\n    },\n    vnodes: {\n      type: null\n    },\n    name: {\n      type: String,\n      \"default\": 'default'\n    }\n  },\n  render: function render(h, ctx) {\n    var props = ctx.props,\n        parent = ctx.parent;\n    var vnodes; // Detect definition\n\n    if (parent.$subslots) {\n      vnodes = parent.$subslots[props.name];\n    } else {\n      vnodes = getVnodes(ctx);\n      vnodes = filterVnodes({\n        vnodes: vnodes,\n        filter: props,\n        vm: parent\n      });\n    }\n\n    if (!vnodes || vnodes.length === 0) {\n      emit(ctx, 'no-match');\n      return ctx.slots()[\"default\"];\n    }\n\n    return vnodes;\n  },\n  define: function define(sslotDef) {\n    function generate() {\n      this.$subslots = genSubSlots({\n        sslotDef: sslotDef,\n        vnodes: this.$slots[\"default\"],\n        vm: this\n      });\n    }\n\n    return {\n      beforeCreate: generate,\n      beforeUpdate: generate\n    };\n  }\n});\n\n//# sourceURL=webpack://Subslot/./Subslot.js?");

/***/ })

/******/ })["default"];
});