<script>
	import Connect from "./Connect.svelte";
	import Button from "comp/atoms/Button.svelte";
	import Search from "./Search.svelte";
	import Title from "./Title.svelte";
	import Circle from "comp/atoms/Circle.svelte";
	import { mq } from "@/assets/library/MediaQuery.svelte";
	import { clickOutside } from "@/assets/library/CommonFunctions.js";
	import user  from "@/store/user.js";


	
	let showModal = false;

	function toggle() {
		showModal = !showModal;
	}
	function close() {
		showModal = false;
	}
	function logoutFunc() {
		showModal = false;
		user.logout();
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
						<Circle to="messages" icon="ant-design:message-outlined" />
						<Circle to="cart" icon="akar-icons:cart" />
						<Circle to="store/create" icon="fluent:building-shop-16-regular" />
						<Circle to="settings" icon="clarity:settings-line" />
					</div>
				{/if}
			</section>
			<section class="row gap-20 align-center ">
				{#if $mq.lg_ && !$user.username}
					<!-- <Circle to="profile" icon="gg:profile" /> -->
					<!-- <Connect /> -->
					<a class="primary--text" href="#/login">Log In</a>
					<a href="#/signup"><Button text="Sign Up" /></a>
				{/if}
				{#if $mq.lg_ && $user.username}
					<div class="relative row center" use:clickOutside={close}>
						<button class="row center gap-10" on:click={toggle}>
							<span class="">{$user.username}</span>
							<Circle to="" icon="gg:profile" />
						</button>
						{#if showModal}
							<div class="absolute shade1  glass pa-5 w-200 z-2 p-right ">
								<a  on:click={close} href="#/account" class="menuItem w100 center py-10 curve">
									Account
								</a>
								<hr>
								<a  on:click={close} href="#/orders/overview" class="menuItem w100 center py-10 curve">
									Orders
								</a>
								<hr>
								<a on:click={close} href="#/settings" class="menuItem w100 center py-10 curve">
									Settings
								</a>
								<hr>
								<button
									on:click={logoutFunc}
									class="menuItem w100 center py-10 curve"
								>
									Logout
								</button>
							</div>
							
						{/if}
					</div>
				{/if}
				{#if $mq._md}
					<Circle to="profile" icon="eva:menu-fill" />
				{/if}
			</section>
		</div>
	</nav>
</div>

<style>
	nav {
		backdrop-filter: blur(20px);
		background-color: rgba(19, 18, 18, 0.53);
		position: fixed;
		width: 100%;
		height: 60px;
		top: 0;
		z-index: 3;
	}

	.menuItem:hover {
		background-color: rgba(102, 102, 102, 0.53);
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
