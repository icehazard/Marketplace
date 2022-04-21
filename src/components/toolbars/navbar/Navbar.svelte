<script>
	import Connect from "./Connect.svelte";
	import Search from "./Search.svelte";
	import Actions from "./Actions.svelte";
	import logo from "@/assets/images/logo.svg";
	import Icon from "@iconify/svelte";
	import { mq } from "@/assets/library/MediaQuery.svelte";
</script>

<div class="pb-70 mobile-h60">
	<nav class="row mobile-h60">
		<div class="container space-between align-center gap-20">
			<a href="#/" class="h100 row align-center gap-20">
				<img src={logo} alt="logo" class="h100 w-50 slow" />
				{#if $mq.md_}
					<span href="#/" class="font-22 shade5--text nowrap">
						Meta Road
					</span>
				{/if}
			</a>

			<section class="row gap-20 align-center mobile-w100">
				<Search />
				{#if $mq.lg_}
					<Actions />
					<Connect />
				{/if}
				{#if $mq._md}
					<a
						href="#/about"
						class="font-22 border round center pa-10 shade2 fast btn"
					>
						<Icon icon="eva:menu-fill" class="white--text" />
					</a>
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
		height: 70px;
		top: 0;
		z-index: 3;
	}

	.btn:hover{
        background-color: #DF0051;
    }

    .btn:focus-visible{
        outline: solid 1px  #DF0051;
        background-color: #222222;
    }

	@media only screen and (max-width: 1006px) {
		.mobile-w100 {
			width: 100%;
			transition: all 0.2s ease;
		}
	}

	@media only screen and (max-width: 576px) {
		img {
			padding: 0;
			width: 44px;
		}

		.mobile-h60 {
			height: 60px;
		}
	}
</style>
