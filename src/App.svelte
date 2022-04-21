<script>
	import Navbar from "comp/toolbars/navbar/Navbar.svelte";
	import Mobile from "comp/toolbars/navbar/Mobile.svelte";
	import Router from "svelte-spa-router";
	import routes from "./router/index";
	import MediaQuery from '@/assets/library/MediaQuery.svelte' 
	//import Web3 from 'web3/dist/web3.min.js'
	//import store from "@/store/store";
</script>

<main>
	<Navbar />
	<Router {routes} />
	<MediaQuery />
	<Mobile />

</main>

<style>
</style>
