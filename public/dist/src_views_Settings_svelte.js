"use strict";
(self["webpackChunkwebpack"] = self["webpackChunkwebpack"] || []).push([["src_views_Settings_svelte"],{

/***/ "./src/components/dashboard/SettingsComp.svelte":
/*!******************************************************!*\
  !*** ./src/components/dashboard/SettingsComp.svelte ***!
  \******************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _store_user_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/store/user.js */ "./src/store/user.js");
/* harmony import */ var _components_atoms_Select_svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/atoms/Select.svelte */ "./src/components/atoms/Select.svelte");
/* harmony import */ var _iconify_svelte__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @iconify/svelte */ "./node_modules/@iconify/svelte/dist/Icon.svelte");
/* harmony import */ var _assets_js_options_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/assets/js/options.js */ "./src/assets/js/options.js");
/* harmony import */ var C_Users_Seb_Documents_homecode_webpack_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var C_Users_Seb_Documents_homecode_webpack_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");
/* src\components\dashboard\SettingsComp.svelte generated by Svelte v3.47.0 */


const { console: console_1 } = svelte_internal__WEBPACK_IMPORTED_MODULE_0__.globals;




const file = "src\\components\\dashboard\\SettingsComp.svelte";

function create_fragment(ctx) {
	let section;
	let h1;
	let icon0;
	let t0;
	let span0;
	let t2;
	let div12;
	let div3;
	let div1;
	let icon1;
	let t3;
	let div0;
	let span1;
	let t5;
	let span2;
	let t7;
	let div2;
	let select0;
	let t8;
	let hr0;
	let t9;
	let div7;
	let div5;
	let icon2;
	let t10;
	let div4;
	let span3;
	let t12;
	let span4;
	let t14;
	let div6;
	let select1;
	let t15;
	let hr1;
	let t16;
	let div11;
	let div9;
	let icon3;
	let t17;
	let div8;
	let span5;
	let t19;
	let span6;
	let t21;
	let div10;
	let select2;
	let t22;
	let hr2;
	let current;

	icon0 = new _iconify_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]({
			props: {
				icon: "fluent:settings-16-regular",
				width: "30"
			},
			$$inline: true
		});

	icon1 = new _iconify_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]({
			props: {
				icon: "fluent:translate-16-regular",
				width: "30"
			},
			$$inline: true
		});

	select0 = new _components_atoms_Select_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: {
				init: /*$user*/ ctx[0].lang,
				items: _assets_js_options_js__WEBPACK_IMPORTED_MODULE_4__.languages
			},
			$$inline: true
		});

	select0.$on("select", selectedLanguage);

	icon2 = new _iconify_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]({
			props: {
				icon: "fluent:currency-dollar-euro-16-regular",
				width: "30"
			},
			$$inline: true
		});

	select1 = new _components_atoms_Select_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: {
				init: /*$user*/ ctx[0].currency,
				items: _assets_js_options_js__WEBPACK_IMPORTED_MODULE_4__.currencies
			},
			$$inline: true
		});

	select1.$on("select", /*selectedCurrency*/ ctx[1]);

	icon3 = new _iconify_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]({
			props: {
				icon: "fluent:dark-theme-20-filled",
				width: "30"
			},
			$$inline: true
		});

	select2 = new _components_atoms_Select_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({
			props: {
				init: /*$user*/ ctx[0].theme,
				items: _assets_js_options_js__WEBPACK_IMPORTED_MODULE_4__.themes
			},
			$$inline: true
		});

	select2.$on("select", /*selectedThemes*/ ctx[2]);

	const block = {
		c: function create() {
			section = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("section");
			h1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("h1");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(icon0.$$.fragment);
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			span0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			span0.textContent = "SETTINGS";
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div12 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			div3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			div1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(icon1.$$.fragment);
			t3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			span1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			span1.textContent = "Language";
			t5 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			span2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			span2.textContent = "Change your prefered language";
			t7 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(select0.$$.fragment);
			t8 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			hr0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("hr");
			t9 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div7 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			div5 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(icon2.$$.fragment);
			t10 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			span3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			span3.textContent = "Currency";
			t12 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			span4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			span4.textContent = "Change your prefered currency";
			t14 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div6 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(select1.$$.fragment);
			t15 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			hr1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("hr");
			t16 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div11 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			div9 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(icon3.$$.fragment);
			t17 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div8 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			span5 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			span5.textContent = "Theme";
			t19 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			span6 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			span6.textContent = "Change between light and dark mode";
			t21 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div10 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(select2.$$.fragment);
			t22 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			hr2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("hr");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span0, file, 22, 8, 705);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(h1, "class", "row pl-20 font-36 weight-300 align-center gap-20");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(h1, file, 20, 4, 571);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span1, file, 29, 20, 1020);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span2, "class", "font-14 opacity-75");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span2, file, 30, 20, 1064);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div0, "class", "col gap-10");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div0, file, 28, 16, 974);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div1, "class", "row center gap-20");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div1, file, 26, 12, 853);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div2, "class", "col");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div2, file, 33, 12, 1191);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div3, "class", "row w100 pa-20 space-between shade3");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div3, file, 25, 8, 788);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(hr0, file, 37, 8, 1347);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span3, file, 42, 20, 1606);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span4, "class", "font-14 opacity-75");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span4, file, 43, 20, 1650);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div4, "class", "col gap-10");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div4, file, 41, 16, 1560);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div5, "class", "row center gap-20");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div5, file, 39, 12, 1428);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div6, "class", "col");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div6, file, 46, 12, 1777);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div7, "class", "row w100 pa-20 space-between shade3");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div7, file, 38, 8, 1363);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(hr1, file, 50, 8, 1938);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span5, file, 55, 20, 2186);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span6, "class", "font-14 opacity-75");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span6, file, 56, 20, 2226);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div8, "class", "col gap-10");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div8, file, 54, 16, 2140);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div9, "class", "row center gap-20");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div9, file, 52, 12, 2019);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div10, "class", "col");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div10, file, 59, 12, 2358);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div11, "class", "row w100 pa-20 space-between shade3");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div11, file, 51, 8, 1954);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(hr2, file, 63, 8, 2510);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div12, "class", "grow col shade3 curve");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div12, file, 24, 4, 743);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(section, "class", "grow col gap-20");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(section, file, 19, 0, 532);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, section, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(section, h1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(icon0, h1, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(h1, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(h1, span0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(section, t2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(section, div12);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div12, div3);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div3, div1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(icon1, div1, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div1, t3);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div1, div0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div0, span1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div0, t5);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div0, span2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div3, t7);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div3, div2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(select0, div2, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div12, t8);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div12, hr0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div12, t9);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div12, div7);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div7, div5);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(icon2, div5, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div5, t10);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div5, div4);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div4, span3);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div4, t12);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div4, span4);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div7, t14);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div7, div6);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(select1, div6, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div12, t15);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div12, hr1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div12, t16);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div12, div11);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div11, div9);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(icon3, div9, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div9, t17);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div9, div8);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div8, span5);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div8, t19);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div8, span6);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div11, t21);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div11, div10);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(select2, div10, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div12, t22);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div12, hr2);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const select0_changes = {};
			if (dirty & /*$user*/ 1) select0_changes.init = /*$user*/ ctx[0].lang;
			select0.$set(select0_changes);
			const select1_changes = {};
			if (dirty & /*$user*/ 1) select1_changes.init = /*$user*/ ctx[0].currency;
			select1.$set(select1_changes);
			const select2_changes = {};
			if (dirty & /*$user*/ 1) select2_changes.init = /*$user*/ ctx[0].theme;
			select2.$set(select2_changes);
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(icon0.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(icon1.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(select0.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(icon2.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(select1.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(icon3.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(select2.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(icon0.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(icon1.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(select0.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(icon2.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(select1.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(icon3.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(select2.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(section);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(icon0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(icon1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(select0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(icon2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(select1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(icon3);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(select2);
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

function selectedLanguage(item) {
	console.log("🚀 ~ selectedLanguage ~ item", item.detail);
}

function instance($$self, $$props, $$invalidate) {
	let $user;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_store)(_store_user_js__WEBPACK_IMPORTED_MODULE_1__["default"], 'user');
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, _store_user_js__WEBPACK_IMPORTED_MODULE_1__["default"], $$value => $$invalidate(0, $user = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('SettingsComp', slots, []);

	function selectedCurrency(item) {
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_store_value)(_store_user_js__WEBPACK_IMPORTED_MODULE_1__["default"], $user.currency = item.detail.id, $user);
	}

	function selectedThemes(item) {
		_store_user_js__WEBPACK_IMPORTED_MODULE_1__["default"].setTheme(item.detail.id);
	}

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<SettingsComp> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({
		user: _store_user_js__WEBPACK_IMPORTED_MODULE_1__["default"],
		Select: _components_atoms_Select_svelte__WEBPACK_IMPORTED_MODULE_2__["default"],
		Icon: _iconify_svelte__WEBPACK_IMPORTED_MODULE_3__["default"],
		languages: _assets_js_options_js__WEBPACK_IMPORTED_MODULE_4__.languages,
		themes: _assets_js_options_js__WEBPACK_IMPORTED_MODULE_4__.themes,
		currencies: _assets_js_options_js__WEBPACK_IMPORTED_MODULE_4__.currencies,
		selectedCurrency,
		selectedLanguage,
		selectedThemes,
		$user
	});

	return [$user, selectedCurrency, selectedThemes];
}

class SettingsComp extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {});

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "SettingsComp",
			options,
			id: create_fragment.name
		});
	}
}

if (module && module.hot) {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SettingsComp);



/***/ }),

/***/ "./src/views/Settings.svelte":
/*!***********************************!*\
  !*** ./src/views/Settings.svelte ***!
  \***********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _toolbars_categories_Settings_svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! #/toolbars/categories/Settings.svelte */ "./src/components/toolbars/categories/Settings.svelte");
/* harmony import */ var _dashboard_SettingsComp_svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! #/dashboard/SettingsComp.svelte */ "./src/components/dashboard/SettingsComp.svelte");
/* harmony import */ var C_Users_Seb_Documents_homecode_webpack_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var C_Users_Seb_Documents_homecode_webpack_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");
/* src\views\Settings.svelte generated by Svelte v3.47.0 */




const file = "src\\views\\Settings.svelte";

function create_fragment(ctx) {
	let section;
	let categories;
	let t;
	let settings;
	let current;
	categories = new _toolbars_categories_Settings_svelte__WEBPACK_IMPORTED_MODULE_1__["default"]({ $$inline: true });
	settings = new _dashboard_SettingsComp_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({ $$inline: true });

	const block = {
		c: function create() {
			section = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("section");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(categories.$$.fragment);
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(settings.$$.fragment);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(section, "class", "row container my-50 gap-50 grow");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(section, file, 7, 4, 163);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, section, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(categories, section, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(section, t);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(settings, section, null);
			current = true;
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(categories.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(settings.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(categories.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(settings.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(section);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(categories);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(settings);
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
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('Settings', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Settings> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({ Categories: _toolbars_categories_Settings_svelte__WEBPACK_IMPORTED_MODULE_1__["default"], Settings: _dashboard_SettingsComp_svelte__WEBPACK_IMPORTED_MODULE_2__["default"] });
	return [];
}

class Settings_1 extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {});

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "Settings_1",
			options,
			id: create_fragment.name
		});
	}
}

if (module && module.hot) {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Settings_1);



/***/ })

}]);
//# sourceMappingURL=src_views_Settings_svelte.js.map