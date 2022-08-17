<script>
    import user from "@/store/user.js";
    import { APP_NAME } from "@/config";
    import { currencies } from "@/assets/library/options.js";
    import { mq } from "@/assets/library/MediaQuery.svelte";
    import { push, location } from "svelte-spa-router";

    $: symbol = currencies.filter((el) => el.id == $user?.currency)[0]?.symbol;

    $: hide = $location.includes("/addresses/");
</script>

{#if !hide ||  $mq.sm_}
<footer class="grow w100 h-200 pa-50 gap-20 col font-14 container mb-40">
    <hr />
    <div class="row wrap gap-20 "class:space-between={$mq.md_} class:center={!$mq.md_}>
        <div class="row gap-20 line-height-20 nowrap">
            <button> Thailand </button>
            <span>|</span>
            <button>English (US)</button>
            <span>|</span>
            <a href="#/settings"> {symbol} ({$user.currency}) </a>
        </div>
        <div class="row gap-20 line-height-20 nowrap">
            <button> © { APP_NAME }</button>
            <span>|</span>
            <button>Terms of Use</button>
            <span>|</span>
            <button>Privacy</button>
        </div>
    </div>
</footer>
{:else}
   <div class="h-60"></div>
{/if}
<style>
    hr {
        border: 1px solid #70707054;
    }

    footer {
        max-height: 150px;
        height: 150px;
        bottom: 50px;
    }
</style>
