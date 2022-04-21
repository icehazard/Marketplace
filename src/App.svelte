<script>
	import Navbar from "comp/toolbars/navbar/Navbar.svelte";
	import Router from "svelte-spa-router";
	import routes from "./router/index";
	//import Web3 from 'web3/dist/web3.min.js'
</script>

<main>
	<Navbar />
	<Router {routes} />
</main>

<style>
</style>
