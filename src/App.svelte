<script>
	import user from "@/store/user.js";
	import Footer from "./components/toolbars/Footer.svelte";
	import Navbar from "comp/toolbars/navbar/Navbar.svelte";
	import Mobile from "comp/toolbars/Mobile.svelte";
	import Drawer from 'comp/toolbars/drawer/Drawer.svelte'
	import Router from "svelte-spa-router";
	import routes from "./router/index";
	import { fade } from "svelte/transition";
	import { Modals, closeModal } from "svelte-modals";
	import MediaQuery from "@/assets/library/MediaQuery.svelte";
	import { replace } from "svelte-spa-router";
	import { Notifications, acts } from "@tadashi/svelte-notification";
	const socket = new WebSocket("ws://www.localhost:8085");

	function conditionsFailed(event) {
		replace("/signup");
	}

	user.get();
	user.setTheme();
</script>

<section class="col vh100">
	<Navbar />
	<Router {routes} on:conditionsFailed={conditionsFailed} />
	<MediaQuery />
	<Mobile />
	<Footer />
	<Drawer />
	<Notifications />
	<Modals>
		<div
			transition:fade={{ duration: 100 }}
			on:click={() => closeModal()}
			slot="backdrop"
			class="backdrop fixed p-center z-4"
		/>
	</Modals>
</section>

<style>
	.backdrop {
		background: rgba(0, 0, 0, 0.25);
		backdrop-filter: blur(5px);
	}
</style>
