<script>
	import Navbar from "comp/toolbars/navbar/Navbar.svelte";
	import Router from "svelte-spa-router";
	import routes from "./router/index";
</script>

<main>
	<Navbar />
	<Router {routes} />
</main>

<style>
</style>
