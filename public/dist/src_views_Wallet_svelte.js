"use strict";
(self["webpackChunkwebpack"] = self["webpackChunkwebpack"] || []).push([["src_views_Wallet_svelte"],{

/***/ "./src/components/dashboard/Wallet.svelte":
/*!************************************************!*\
  !*** ./src/components/dashboard/Wallet.svelte ***!
  \************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _assets_js_options_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/assets/js/options.js */ "./src/assets/js/options.js");
/* harmony import */ var _assets_js_util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/assets/js/util.js */ "./src/assets/js/util.js");
/* harmony import */ var _store_user_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/store/user.js */ "./src/store/user.js");
/* harmony import */ var _iconify_svelte__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @iconify/svelte */ "./node_modules/@iconify/svelte/dist/Icon.svelte");
/* harmony import */ var C_Users_Seb_Documents_homecode_webpack_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var C_Users_Seb_Documents_homecode_webpack_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");
/* src\components\dashboard\Wallet.svelte generated by Svelte v3.47.0 */






const file = "src\\components\\dashboard\\Wallet.svelte";

function create_fragment(ctx) {
	let section;
	let h1;
	let icon0;
	let t0;
	let span0;
	let t2;
	let div6;
	let div2;
	let icon1;
	let t3;
	let div1;
	let div0;
	let t5;
	let span1;
	let t8;
	let span2;
	let t10;
	let div5;
	let span3;
	let t11;
	let t12;
	let div4;
	let div3;
	let t13_value = /*$user*/ ctx[0].currency + "";
	let t13;
	let t14;
	let span4;
	let t15_value = (0,_assets_js_util_js__WEBPACK_IMPORTED_MODULE_2__.formatCurrency)(/*btc*/ ctx[3] * /*rate*/ ctx[1]) + "";
	let t15;
	let t16;
	let div16;
	let a0;
	let div8;
	let icon2;
	let t17;
	let div7;
	let span5;
	let t19;
	let span6;
	let t21;
	let div9;
	let icon3;
	let t22;
	let hr0;
	let t23;
	let a1;
	let div11;
	let icon4;
	let t24;
	let div10;
	let span7;
	let t26;
	let span8;
	let t28;
	let div12;
	let icon5;
	let t29;
	let hr1;
	let t30;
	let a2;
	let div14;
	let icon6;
	let t31;
	let div13;
	let span9;
	let t33;
	let span10;
	let t35;
	let div15;
	let icon7;
	let t36;
	let hr2;
	let current;

	icon0 = new _iconify_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: {
				icon: "fluent:wallet-16-regular",
				width: "30"
			},
			$$inline: true
		});

	icon1 = new _iconify_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: { icon: "logos:bitcoin", width: "40" },
			$$inline: true
		});

	icon2 = new _iconify_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: { icon: "uil:money-insert", width: "30" },
			$$inline: true
		});

	icon3 = new _iconify_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: {
				icon: "fluent:chevron-right-28-regular",
				width: "20"
			},
			$$inline: true
		});

	icon4 = new _iconify_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: { icon: "uil:money-withdraw", width: "30" },
			$$inline: true
		});

	icon5 = new _iconify_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: {
				icon: "fluent:chevron-right-28-regular",
				width: "20"
			},
			$$inline: true
		});

	icon6 = new _iconify_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: {
				icon: "fluent:history-16-regular",
				width: "30"
			},
			$$inline: true
		});

	icon7 = new _iconify_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: {
				icon: "fluent:chevron-right-28-regular",
				width: "20"
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			section = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("section");
			h1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("h1");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(icon0.$$.fragment);
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			span0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			span0.textContent = "WALLET";
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div6 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			div2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(icon1.$$.fragment);
			t3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			div0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			div0.textContent = "BTC wallet";
			t5 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			span1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			span1.textContent = `${/*btc*/ ctx[3]} BTC`;
			t8 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			span2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			span2.textContent = "≈";
			t10 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div5 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			span3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			t11 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(/*symbol*/ ctx[2]);
			t12 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			div3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			t13 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t13_value);
			t14 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			span4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			t15 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t15_value);
			t16 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div16 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			a0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			div8 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(icon2.$$.fragment);
			t17 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div7 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			span5 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			span5.textContent = "Send";
			t19 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			span6 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			span6.textContent = "Withdraw bitcoin from your account";
			t21 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div9 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(icon3.$$.fragment);
			t22 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			hr0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("hr");
			t23 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			a1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			div11 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(icon4.$$.fragment);
			t24 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div10 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			span7 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			span7.textContent = "Receive";
			t26 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			span8 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			span8.textContent = "Deposit bitcoin into your account";
			t28 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div12 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(icon5.$$.fragment);
			t29 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			hr1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("hr");
			t30 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			a2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("a");
			div14 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(icon6.$$.fragment);
			t31 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div13 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			span9 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			span9.textContent = "Transactions";
			t33 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			span10 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			span10.textContent = "History of Transaction of your bitcoin address";
			t35 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div15 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(icon7.$$.fragment);
			t36 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			hr2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("hr");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span0, file, 15, 8, 584);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(h1, "class", "row pl-20 font-36 weight-300 align-center gap-20");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(h1, file, 13, 4, 452);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div0, "class", "weight-600");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div0, file, 21, 16, 801);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span1, file, 22, 16, 859);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div1, "class", "col gap-10");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div1, file, 20, 12, 759);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div2, "class", "row center gap-20");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div2, file, 18, 8, 660);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span2, "class", "center font-22");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span2, file, 25, 8, 927);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span3, "class", "font-36");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span3, file, 27, 12, 1020);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div3, "class", "weight-600");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div3, file, 29, 16, 1113);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span4, file, 30, 16, 1177);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div4, "class", "col gap-10");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div4, file, 28, 12, 1071);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div5, "class", "row center gap-20");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div5, file, 26, 8, 975);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div6, "class", "row pa-20 gap-20");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div6, file, 17, 4, 620);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span5, file, 39, 20, 1575);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span6, "class", "font-14 opacity-75");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span6, file, 40, 20, 1614);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div7, "class", "col gap-10");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div7, file, 38, 16, 1529);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div8, "class", "row center gap-20");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div8, file, 36, 12, 1419);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div9, "class", "center h100");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div9, file, 43, 12, 1746);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a0, "href", "/wallet/send");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a0, "type", "button");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a0, "class", "row shine w100 pa-20 space-between shade3");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a0, file, 35, 8, 1317);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(hr0, file, 47, 8, 1891);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span7, file, 52, 20, 2170);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span8, "class", "font-14 opacity-75");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span8, file, 53, 20, 2212);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div10, "class", "col gap-10");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div10, file, 51, 16, 2124);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div11, "class", "row center gap-20");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div11, file, 49, 12, 2012);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div12, "class", "center h100");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div12, file, 56, 12, 2343);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a1, "href", "/wallet/receive");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a1, "type", "button");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a1, "class", "row shine w100 pa-20 space-between shade3");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a1, file, 48, 8, 1907);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(hr1, file, 60, 8, 2488);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span9, file, 68, 20, 2800);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(span10, "class", "font-14 opacity-75");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(span10, file, 69, 20, 2847);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div13, "class", "col gap-10");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div13, file, 67, 16, 2754);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div14, "class", "row center gap-20");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div14, file, 65, 12, 2635);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div15, "class", "center h100");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div15, file, 72, 12, 2991);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a2, "href", "/wallet/transactions");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(a2, "class", "row shine w100 pa-20 space-between shade3");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(a2, file, 61, 8, 2504);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(hr2, file, 76, 8, 3136);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(div16, "class", "grow col shade3 curve");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(div16, file, 34, 4, 1272);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(section, "class", "grow col gap-20");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(section, file, 12, 0, 413);
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
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(section, div6);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div6, div2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(icon1, div2, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div2, t3);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div2, div1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div1, div0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div1, t5);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div1, span1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div6, t8);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div6, span2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div6, t10);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div6, div5);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div5, span3);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(span3, t11);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div5, t12);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div5, div4);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div4, div3);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div3, t13);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div4, t14);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div4, span4);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(span4, t15);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(section, t16);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(section, div16);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div16, a0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(a0, div8);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(icon2, div8, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div8, t17);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div8, div7);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div7, span5);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div7, t19);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div7, span6);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(a0, t21);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(a0, div9);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(icon3, div9, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div16, t22);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div16, hr0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div16, t23);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div16, a1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(a1, div11);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(icon4, div11, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div11, t24);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div11, div10);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div10, span7);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div10, t26);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div10, span8);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(a1, t28);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(a1, div12);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(icon5, div12, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div16, t29);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div16, hr1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div16, t30);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div16, a2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(a2, div14);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(icon6, div14, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div14, t31);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div14, div13);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div13, span9);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div13, t33);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div13, span10);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(a2, t35);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(a2, div15);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(icon7, div15, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div16, t36);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(div16, hr2);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (!current || dirty & /*symbol*/ 4) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t11, /*symbol*/ ctx[2]);
			if ((!current || dirty & /*$user*/ 1) && t13_value !== (t13_value = /*$user*/ ctx[0].currency + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t13, t13_value);
			if ((!current || dirty & /*rate*/ 2) && t15_value !== (t15_value = (0,_assets_js_util_js__WEBPACK_IMPORTED_MODULE_2__.formatCurrency)(/*btc*/ ctx[3] * /*rate*/ ctx[1]) + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data_dev)(t15, t15_value);
		},
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(icon0.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(icon1.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(icon2.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(icon3.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(icon4.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(icon5.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(icon6.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(icon7.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(icon0.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(icon1.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(icon2.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(icon3.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(icon4.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(icon5.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(icon6.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(icon7.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(section);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(icon0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(icon1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(icon2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(icon3);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(icon4);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(icon5);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(icon6);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(icon7);
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
	let symbol;
	let rate;
	let $user;
	let $totalBalance;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_store)(_store_user_js__WEBPACK_IMPORTED_MODULE_3__["default"], 'user');
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, _store_user_js__WEBPACK_IMPORTED_MODULE_3__["default"], $$value => $$invalidate(0, $user = $$value));
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_store)(_store_user_js__WEBPACK_IMPORTED_MODULE_3__.totalBalance, 'totalBalance');
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, _store_user_js__WEBPACK_IMPORTED_MODULE_3__.totalBalance, $$value => $$invalidate(4, $totalBalance = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('Wallet', slots, []);
	let btc = $totalBalance;
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Wallet> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({
		currencies: _assets_js_options_js__WEBPACK_IMPORTED_MODULE_1__.currencies,
		formatCurrency: _assets_js_util_js__WEBPACK_IMPORTED_MODULE_2__.formatCurrency,
		user: _store_user_js__WEBPACK_IMPORTED_MODULE_3__["default"],
		totalBalance: _store_user_js__WEBPACK_IMPORTED_MODULE_3__.totalBalance,
		Icon: _iconify_svelte__WEBPACK_IMPORTED_MODULE_4__["default"],
		btc,
		rate,
		symbol,
		$user,
		$totalBalance
	});

	$$self.$inject_state = $$props => {
		if ('btc' in $$props) $$invalidate(3, btc = $$props.btc);
		if ('rate' in $$props) $$invalidate(1, rate = $$props.rate);
		if ('symbol' in $$props) $$invalidate(2, symbol = $$props.symbol);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$user*/ 1) {
			$: $$invalidate(2, symbol = _assets_js_options_js__WEBPACK_IMPORTED_MODULE_1__.currencies.find(el => el.id == $user?.currency)?.symbol);
		}
	};

	$: $$invalidate(1, rate = _assets_js_options_js__WEBPACK_IMPORTED_MODULE_1__.currencies.find(el => el.id == "BTC")?.convert);
	return [$user, rate, symbol, btc];
}

class Wallet extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {});

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "Wallet",
			options,
			id: create_fragment.name
		});
	}
}

if (module && module.hot) {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Wallet);



/***/ }),

/***/ "./src/views/Wallet.svelte":
/*!*********************************!*\
  !*** ./src/views/Wallet.svelte ***!
  \*********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _toolbars_categories_Settings_svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! #/toolbars/categories/Settings.svelte */ "./src/components/toolbars/categories/Settings.svelte");
/* harmony import */ var _dashboard_Wallet_svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! #/dashboard/Wallet.svelte */ "./src/components/dashboard/Wallet.svelte");
/* harmony import */ var C_Users_Seb_Documents_homecode_webpack_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var C_Users_Seb_Documents_homecode_webpack_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");
/* src\views\Wallet.svelte generated by Svelte v3.47.0 */




const file = "src\\views\\Wallet.svelte";

function create_fragment(ctx) {
	let section;
	let categories;
	let t;
	let wallet;
	let current;
	categories = new _toolbars_categories_Settings_svelte__WEBPACK_IMPORTED_MODULE_1__["default"]({ $$inline: true });
	wallet = new _dashboard_Wallet_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]({ $$inline: true });

	const block = {
		c: function create() {
			section = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("section");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(categories.$$.fragment);
			t = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(wallet.$$.fragment);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr_dev)(section, "class", "row container my-50 gap-50 grow");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_location)(section, file, 5, 0, 145);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert_dev)(target, section, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(categories, section, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_dev)(section, t);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(wallet, section, null);
			current = true;
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		i: function intro(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(categories.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(wallet.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(categories.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(wallet.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach_dev)(section);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(categories);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(wallet);
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
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.validate_slots)('Wallet', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Wallet> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({ Categories: _toolbars_categories_Settings_svelte__WEBPACK_IMPORTED_MODULE_1__["default"], Wallet: _dashboard_Wallet_svelte__WEBPACK_IMPORTED_MODULE_2__["default"] });
	return [];
}

class Wallet_1 extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponentDev {
	constructor(options) {
		super(options);
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {});

		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.dispatch_dev)("SvelteRegisterComponent", {
			component: this,
			tagName: "Wallet_1",
			options,
			id: create_fragment.name
		});
	}
}

if (module && module.hot) {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Wallet_1);



/***/ })

}]);
//# sourceMappingURL=src_views_Wallet_svelte.js.map