"use strict";
(self["webpackChunkwebpack"] = self["webpackChunkwebpack"] || []).push([["src_components_atoms_Select_svelte"],{

/***/ "./src/components/atoms/Select.svelte":
/*!********************************************!*\
  !*** ./src/components/atoms/Select.svelte ***!
  \********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _iconify_svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @iconify/svelte */ "./node_modules/@iconify/svelte/dist/Icon.svelte");
/* harmony import */ var _assets_js_util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/assets/js/util.js */ "./src/assets/js/util.js");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var C_Users_Seb_Documents_homecode_webpack_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var C_Users_Seb_Documents_homecode_webpack_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");
/* src\components\atoms\Select.svelte generated by Svelte v3.47.0 */





const file = "src\\components\\atoms\\Select.svelte";

function add_css(target) {
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_styles)(target, "svelte-g67fxb", "input.svelte-g67fxb{outline:1px solid rgba(255, 255, 255, 0)}input.svelte-g67fxb:focus-visible{outline:1px solid rgba(255, 255, 255, 0.6)}.bank-search-box.svelte-g67fxb:focus-visible{background-color:rgba(100, 100, 100, 0.5)}.bank-search-box.svelte-g67fxb:hover{background-color:rgba(100, 100, 100, 0.4)}.icon.svelte-g67fxb{top:13px}.menu.svelte-g67fxb{top:50px}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VsZWN0LnN2ZWx0ZSIsIm1hcHBpbmdzIjoiQUEwRkksbUJBQUssQ0FBQyxBQUNGLE9BQU8sQ0FBRSxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQzdDLENBQUMsQUFDRCxtQkFBSyxjQUFjLEFBQUMsQ0FBQyxBQUNqQixPQUFPLENBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxBQUMvQyxDQUFDLEFBRUQsOEJBQWdCLGNBQWMsQUFBQyxDQUFDLEFBQzVCLGdCQUFnQixDQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEFBQzlDLENBQUMsQUFFRCw4QkFBZ0IsTUFBTSxBQUFDLENBQUMsQUFDcEIsZ0JBQWdCLENBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQUFDOUMsQ0FBQyxBQUVELEtBQUssY0FBQyxDQUFDLEFBQ0gsR0FBRyxDQUFFLElBQUksQUFDYixDQUFDLEFBRUQsbUJBQUssQ0FBQyxBQUNGLEdBQUcsQ0FBRSxJQUFJLEFBQ2IsQ0FBQyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJTZWxlY3Quc3ZlbHRlIl19 */");
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[14] = list[i];
	return child_ctx;
}

// (67:4) {#if showSearch}
function create_if_block(ctx) {
	let div;
	let t;
	let each_value = /*filteredItems*/ ctx[0];
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_argument)(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	let if_block = /*filteredItems*/ ctx[0].length == 0 && create_if_block_1(ctx);

	const block = {
		c: function create() {
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			if (if_block) if_block.c();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div, "class", "menu w30 shade2 curve overlay absolute w100 z-3 shadow svelte-g67fxb");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div, file, 67, 8, 1980);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div, t);
			if (if_block) if_block.m(div, null);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*handleWindowKeyDown, select, filteredItems*/ 145) {
				each_value = /*filteredItems*/ ctx[0];
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_each_argument)(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div, t);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (/*filteredItems*/ ctx[0].length == 0) {
				if (if_block) {
					
				} else {
					if_block = create_if_block_1(ctx);
					if_block.c();
					if_block.m(div, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_each)(each_blocks, detaching);
			if (if_block) if_block.d();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(67:4) {#if showSearch}",
		ctx
	});

	return block;
}

// (69:12) {#each filteredItems as b}
function create_each_block(ctx) {
	let button;
	let div;
	let t_value = /*b*/ ctx[14].name + "";
	let t;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			button = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("button");
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t_value);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div, "class", "center");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div, file, 79, 20, 2582);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(button, "class", "row align-center px-20 py-15 bank-search-box curve w100 slow svelte-g67fxb");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(button, "onwindowkeydown", /*handleWindowKeyDown*/ ctx[7]);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(button, file, 69, 16, 2106);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, button, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(button, div);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div, t);

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(
					button,
					"click",
					function () {
						if ((0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.is_function)(/*select*/ ctx[4](/*b*/ ctx[14]))) /*select*/ ctx[4](/*b*/ ctx[14]).apply(this, arguments);
					},
					false,
					false,
					false
				);

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*filteredItems*/ 1 && t_value !== (t_value = /*b*/ ctx[14].name + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(button);
			mounted = false;
			dispose();
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(69:12) {#each filteredItems as b}",
		ctx
	});

	return block;
}

// (83:12) {#if filteredItems.length == 0}
function create_if_block_1(ctx) {
	let span;

	const block = {
		c: function create() {
			span = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			span.textContent = "No results";
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span, "class", "center pa-20");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span, file, 83, 16, 2727);
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, span, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(span);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(83:12) {#if filteredItems.length == 0}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let div2;
	let div1;
	let input;
	let t0;
	let div0;
	let icon;
	let t1;
	let clickOutside_action;
	let current;
	let mounted;
	let dispose;

	icon = new _iconify_svelte__WEBPACK_IMPORTED_MODULE_1__["default"]({
			props: {
				icon: "fluent:chevron-up-down-20-regular"
			},
			$$inline: true
		});

	let if_block = /*showSearch*/ ctx[2] && create_if_block(ctx);

	const block = {
		c: function create() {
			div2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			div1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			input = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("input");
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(icon.$$.fragment);
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			if (if_block) if_block.c();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(input, "autocomplete", "off");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(input, "name", "name");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(input, "type", "text");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(input, "class", "borderStrong gap-10 curve align-center px-20 h-40 mobile-w100 shade2 w100 slow svelte-g67fxb");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(input, "placeholder", "Select a option");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(input, file, 53, 8, 1470);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div0, "class", "center cursor-pointer absolute icon p-right pr-10 svelte-g67fxb");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div0, file, 62, 8, 1794);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div1, "class", "");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div1, file, 52, 4, 1446);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div2, "class", "relative");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div2, file, 46, 0, 1312);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, div2, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div2, div1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div1, input);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_input_value)(input, /*searchInput*/ ctx[1]);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div1, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div1, div0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(icon, div0, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div2, t1);
			if (if_block) if_block.m(div2, null);
			current = true;

			if (!mounted) {
				dispose = [
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(input, "input", /*input_input_handler*/ ctx[10]),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(input, "keydown", /*search*/ ctx[3], false, false, false),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.action_destroyer)(clickOutside_action = _assets_js_util_js__WEBPACK_IMPORTED_MODULE_2__.clickOutside.call(null, div2, /*closePicker*/ ctx[6])),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(div2, "click", /*openPicker*/ ctx[5], false, false, false),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen_dev)(div2, "keyup", /*handleWindowKeyDown*/ ctx[7], false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*searchInput*/ 2 && input.value !== /*searchInput*/ ctx[1]) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_input_value)(input, /*searchInput*/ ctx[1]);
			}

			if (/*showSearch*/ ctx[2]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(div2, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(div2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(icon);
			if (if_block) if_block.d();
			mounted = false;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.run_all)(dispose);
		}
	};

	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('Select', slots, []);
	const dispatch = (0,svelte__WEBPACK_IMPORTED_MODULE_3__.createEventDispatcher)();
	let { items = [] } = $$props;
	let { init = "" } = $$props;
	let filteredItems = items;
	let searchInput = "";
	let showSearch = false;

	function search(key) {
		let filter = searchInput;
		if (!filter || !filter.length) closePicker();

		$$invalidate(0, filteredItems = filter && filter.length
		? items.filter(filterFunc)
		: items);

		$$invalidate(2, showSearch = true);
		return filteredItems;
	}

	function filterFunc(item) {
		return item.name.toLowerCase().includes(searchInput.toLowerCase());
	}

	function select(item) {
		closePicker();
		dispatch("select", item);
		$$invalidate(1, searchInput = item.name);
	}

	function openPicker() {
		$$invalidate(2, showSearch = !showSearch);
	}

	function closePicker() {
		$$invalidate(2, showSearch = false);
	}

	function handleWindowKeyDown(event) {
		if (event.key === "Escape") closePicker();
	}

	function initValue() {
		let item = items.filter(el => el.id == init);
		if (item.length == 0) return;
		$$invalidate(1, searchInput = item[0].name);
	}

	initValue();
	const writable_props = ['items', 'init'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Select> was created with unknown prop '${key}'`);
	});

	function input_input_handler() {
		searchInput = this.value;
		$$invalidate(1, searchInput);
	}

	$$self.$$set = $$props => {
		if ('items' in $$props) $$invalidate(8, items = $$props.items);
		if ('init' in $$props) $$invalidate(9, init = $$props.init);
	};

	$$self.$capture_state = () => ({
		Icon: _iconify_svelte__WEBPACK_IMPORTED_MODULE_1__["default"],
		clickOutside: _assets_js_util_js__WEBPACK_IMPORTED_MODULE_2__.clickOutside,
		createEventDispatcher: svelte__WEBPACK_IMPORTED_MODULE_3__.createEventDispatcher,
		dispatch,
		items,
		init,
		filteredItems,
		searchInput,
		showSearch,
		search,
		filterFunc,
		select,
		openPicker,
		closePicker,
		handleWindowKeyDown,
		initValue
	});

	$$self.$inject_state = $$props => {
		if ('items' in $$props) $$invalidate(8, items = $$props.items);
		if ('init' in $$props) $$invalidate(9, init = $$props.init);
		if ('filteredItems' in $$props) $$invalidate(0, filteredItems = $$props.filteredItems);
		if ('searchInput' in $$props) $$invalidate(1, searchInput = $$props.searchInput);
		if ('showSearch' in $$props) $$invalidate(2, showSearch = $$props.showSearch);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		filteredItems,
		searchInput,
		showSearch,
		search,
		select,
		openPicker,
		closePicker,
		handleWindowKeyDown,
		items,
		init,
		input_input_handler
	];
}

class Select extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, { items: 8, init: 9 }, add_css);

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "Select",
			options,
			id: create_fragment.name
		});
	}

	get items() {
		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set items(value) {
		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get init() {
		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set init(value) {
		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

if (module && module.hot) {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Select);



/***/ })

}]);
//# sourceMappingURL=src_components_atoms_Select_svelte.js.map