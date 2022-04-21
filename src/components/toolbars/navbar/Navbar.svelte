<script>
	import Connect from "./Connect.svelte";
	import Search from "./Search.svelte";
	import Actions from "./Actions.svelte";
	import logo from "@/assets/images/logo.svg";
</script>

<div class="pb-70">
	<nav class="row">
		<div class="container space-between align-center">
			<a href="#/" class="h100 row align-center gap-20">
				<img src={logo} alt="logo" class="h100 py-10" />
				<a href="#/" class="font-22 shade5--text">Meta Road</a>
			</a>
			<section class="row gap-20 align-center">
				<Search />
				<Actions />
				<Connect />
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
		height: 70px;
		top: 0;
		z-index: 3;
	}
</style>
