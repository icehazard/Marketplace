<script>
	import Connect from "./Connect.svelte";
	import Search from "./Search.svelte";
	import Title from "./Title.svelte";
	import Circle from "comp/atoms/Circle.svelte";
	import { mq } from "@/assets/library/MediaQuery.svelte";
</script>

<div class="pb-60">
	<nav class="row">
		<div class="container space-between align-center gap-20">
			<Title />
			<section class="row gap-20 align-center mobile-w100 ">
				<Search />
				{#if $mq.lg_}
					<div class="row gap-10">
						<Circle to="about" icon="ant-design:message-outlined" />
						<Circle to="about" icon="akar-icons:cart" />
						<Circle to="about" icon="clarity:settings-line" />
					</div>
				{/if}
			</section>
			<section class="row gap-20 align-center ">
				{#if $mq.lg_}
					<Circle to="about" icon="gg:profile" />
					<Connect />
				{/if}
				{#if $mq._md}
					<Circle to="about" icon="eva:menu-fill" />
				{/if}
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
		height: 60px;
		top: 0;
		z-index: 3;
	}

	@media only screen and (max-width: 1200px) {
		.mobile-w100 {
			flex-grow: 1;
			flex-basis: 0;
		}
	}
</style>
