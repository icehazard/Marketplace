<script>
	import Connect from "./Connect.svelte";
	import Search from "./Search.svelte";
	import logo from "@/assets/images/logo.svg";
</script>

<div class="pb-70">
	<nav class="h-70 row">
		<div class="container space-between align-center">
			<section class="row h100 align-center gap-20 ">
				<img src={logo} alt="logo" class="h100 py-10" />
				<span class="font-22">Meta Road</span>
				<a href="#/" class="grey--text">Home</a>
				<a href="#/about">About</a>
			</section>
			<section class="row gap-20 align-center">
				<Search />
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
		top: 0;
		z-index: 3;
	}

	a {
		color: #9f9f9f;
	}
</style>
