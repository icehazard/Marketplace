<script>
	import user from "@/store/user.js";
	import Footer from "./components/toolbars/Footer.svelte";
	import Navbar from "comp/toolbars/navbar/Navbar.svelte";
	import Mobile from "comp/toolbars/Mobile.svelte";
	import Drawer from "comp/toolbars/drawer/Drawer.svelte";
	import { fade } from "svelte/transition";
	import { Modals, closeModal } from "svelte-modals";
	import MediaQuery from "@/assets/js/MediaQuery.svelte";
	import { Notifications} from "@tadashi/svelte-notification";
	import RouterView from "@/router/index.svelte";

	user.get();
	user.setTheme();
</script>

<section class="col vh100">
	<Navbar />
	<RouterView />
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
