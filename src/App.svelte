<script>
	import { Notifications } from "@tadashi/svelte-notification";
	import { Modals, closeModal } from "svelte-modals";
	import { fade } from "svelte/transition";
	import user from "@/store/user";
	import Footer from "#/toolbars/Footer";
	import Navbar from "#/toolbars/navbar/Navbar";
	import Mobile from "#/toolbars/Mobile";
	import Drawer from "#/toolbars/drawer/Drawer";
	import MediaQuery from "@/assets/js/MediaQuery";
	import RouterView from "@/router/index";
	import Progress from "%/Progress";

	user.get();
	user.setTheme();
</script>

<section class="col vh100" id="app">
	<Progress />
	<Navbar />
	<div class="grow">
		<RouterView />
	</div>
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
