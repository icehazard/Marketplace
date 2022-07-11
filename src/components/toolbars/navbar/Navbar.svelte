<script>
	import DropDown from "./DropDown.svelte";
	import { push } from "svelte-spa-router";
	import Button from "comp/atoms/Button.svelte";
	import Search from "./Search.svelte";
	import Title from "./Title.svelte";
	import Circle from "comp/atoms/Circle.svelte";
	import { mq } from "@/assets/library/MediaQuery.svelte";
	import { clickOutside } from "@/assets/library/CommonFunctions.js";
	import user from "@/store/user.js";
	import { isShopActive } from "@/store/user.js";
	import Icon from "@iconify/svelte";

	let showModal = false;

	function toggle() {
		showModal = !showModal;
	}
	function close() {
		showModal = false;
	}
	function shopRoute() {
		$isShopActive ? push("#/seller") : push("#/store/create");
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
							to="messages"
							tooltip="Messages"
							icon="ant-design:message-outlined"
						/>
						<Circle tooltip="Cart" to="cart" icon="akar-icons:cart" />
						<button on:click={shopRoute}>
							<Circle tooltip="Shop Manager" icon="fluent:building-shop-16-regular" />
						</button>
						<!-- <Circle
							tooltip="Settings"
							to="settings"
							icon="fluent:settings-16-regular"
						/> -->
					</div>
				{/if}
			</section>
			<section class="row gap-20 align-center ">
				<!-- {#if $mq.lg_ && !$user.username}
					<button class="row shine justify-end align-center gap-10 oval shadow">
						<Icon icon="fluent:line-horizontal-3-20-regular" />
						<Circle to="profile" icon="gg:profile" />
					</button>
				{/if} -->
				{#if $mq.lg_}
					<div class="relative row center" use:clickOutside={close}>
						<button
							class="row shine justify-end align-center gap-10 oval  "
							on:click={toggle}
						>
							{#if $user.username}
								{$user.username}
							{:else}
								<Icon icon="fluent:line-horizontal-3-20-regular" />
							{/if}

							<Circle icon="gg:profile" />
						</button>
						<!-- <button class="row center gap-10" on:click={toggle}>
							<span class="">{$user.username}</span>
							<Circle tooltip="Profile" to="" icon="gg:profile" />
						</button> -->
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

	@media only screen and (max-width: 1200px) {
		.mobile-w100 {
			flex-grow: 1;
			flex-basis: 0;
		}
	}
</style>
