<script>
	import Router from "svelte-spa-router";
	import routes from "./router/index";
</script>

<main>
	<ul>
		<li><a href="#/home">Home</a></li>
		<li><a href="#/about">About</a></li>
	</ul>

	<Router {routes} />
</main>

<style>

</style>
