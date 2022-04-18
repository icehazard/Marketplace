<script>
	import Connect from "./Connect.svelte";
	import logo from "@/assets/images/logo.svg";
</script>

<nav class="h-70 row align-center space-between px-20">
	<section class="row h100 align-center gap-20">
		<img src={logo} alt="" class="h100 py-10" />
		<a href="#/home">Home</a>
		<a href="#/about">About</a>
	</section>
	<Connect />
</nav>

<style>
	nav {
		height: 70px;
		backdrop-filter: blur(20px);
		background-color: rgba(19, 18, 18, 0.53);
	}

	a {
		color: rgb(159, 159, 159) !important;
	}
</style>
