<script>
	import DropDown from "./DropDown.svelte";
	import { push } from "svelte-spa-router";
	import Button from "comp/atoms/Button.svelte";
	import { currencies } from "@/assets/library/options.js";
	import Search from "./Search.svelte";
	import Title from "./Title.svelte";
	import Circle from "comp/atoms/Circle.svelte";
	import { mq } from "@/assets/library/MediaQuery.svelte";
	import {clickOutside, formatCurrency, satoshiToBtcString} from "@/assets/library/CommonFunctions.js";
	import user, { totalBalance } from "@/store/user.js";
	import { isShopActive } from "@/store/user.js";
	import Icon from "@iconify/svelte";
	import Notifications from "./Notifications.svelte";
	import shops from '@/store/shops'

	let showModal = false;
	let showNotifications = false;
	let balance = formatCurrency($totalBalance * rate);
	let balanceBtc = satoshiToBtcString($totalBalance);

	$: rate = currencies.find((el) => el.id == "BTC")?.convert;
	$: $user.currency, (balance = formatCurrency($totalBalance/100000000 * rate)), (balanceBtc = satoshiToBtcString($totalBalance));

	function toggle() {
		showModal = !showModal;
	}
	function close() {
		showModal = false;
	}
	function toggleNotifications() {
		showNotifications = !showNotifications;
	}
	function closeNotifications() {
		showNotifications = false;
	}
	function shopRoute() {
		let url = `#/shops/id/${$shops.id}`
		$isShopActive ? push(url) : push("#/store/create");
	}
</script>

<div class="pb-60">
	<nav class="row">
		<div class="container space-between align-center gap-20">
			<Title />
			<section class="row gap-20 align-center mobile-w100 ">
				<Search />
				{#if $mq.lg_}
					<div class="row gap-10">
						<Circle
							to="orders/active/42"
							tooltip="Messages"
							icon="fluent:text-bullet-list-square-clock-20-regular"
						/>
						<Circle tooltip="Cart" to="cart" icon="akar-icons:cart" />
						<button on:click={shopRoute}>
							<Circle tooltip="Shop Manager" icon="fluent:building-shop-16-regular" />
						</button>
						<div class="relative" use:clickOutside={closeNotifications}>
							<button 	on:click={toggleNotifications}>
								<Circle tooltip="Notifications" icon="fluent:alert-16-regular" />
							</button>
							{#if showNotifications}
							<Notifications />
							{/if}
						</div>
					</div>
				{/if}
			</section>
			<section class="row gap-20 align-center ">
				{#if $mq.lg_}
					<div class="relative row center" use:clickOutside={close}>
						<button
							class="row shine justify-end align-center gap-10 oval  "
							on:click={toggle}
						>
							{#if $user.username}
								{balanceBtc} <br> ≈ {balance}
							{:else}
								<Icon icon="fluent:line-horizontal-3-20-regular" />
							{/if}

							<Circle icon="gg:profile" />
						</button>
						{#if showModal}
							{#if $user.username}
								<DropDown on:click={close} />
							{:else}
								<div class="absolute shade1 col   glass pa-5 w-200 z-2 p-right ">
									<a
										on:click={close}
										href="#/login"
										class="menuItem w100 center py-10 curve shine"
									>
										Login
									</a>
									<hr />
									<a
										on:click={close}
										href="#/signup"
										class="menuItem w100 center py-10 curve shine"
									>
										Register
									</a>
									<hr />
									<a
										on:click={close}
										href="#/store/create"
										class="menuItem w100 center py-10 curve shine"
									>
										Add a listing
									</a>
								</div>
							{/if}
						{/if}
					</div>
				{/if}
				{#if $mq._md}
					<Circle tooltip="Profile" to="account" icon="eva:menu-fill" />
				{/if}
			</section>
		</div>
	</nav>
</div>

<style>
	nav {
		backdrop-filter: blur(20px);
		background-color: var(--navbar);
		position: fixed;
		width: 100%;
		height: 60px;
		top: 0;
		z-index: 3;
	}

	/* .menuItem:hover {
		background-color: rgba(102, 102, 102, 0.53);
	} */

	.oval {
		padding-left: 20px;
		border-radius: 40px;
		border: #dddddd41 solid 1px;
	}

	.oval:hover {
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
	}

	.absolute {
        top: 50px;
    }

	@media only screen and (max-width: 1200px) {
		.mobile-w100 {
			flex-grow: 1;
			flex-basis: 0;
		}
	}
</style>
