<script>
	import user from "@/store/user.js";
	import Footer from "./components/toolbars/Footer.svelte";
	import Navbar from "comp/toolbars/navbar/Navbar.svelte";
	import Mobile from "comp/toolbars/navbar/Mobile.svelte";
	import Router from "svelte-spa-router";
	import routes from "./router/index";
	import MediaQuery from "@/assets/library/MediaQuery.svelte";
	import { replace } from "svelte-spa-router";
	const socket = new WebSocket("ws://www.localhost:8085");

	socket.onopen = (e) => {
		console.log("opened");
		socket.send("There is, a house, in south phuket. they callllllllll it the grow house");
	};

	socket.onmessage = function (event) {
		console.log("got message", event);
	};

	function conditionsFailed(event) {
		replace("/login");
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
</section>
