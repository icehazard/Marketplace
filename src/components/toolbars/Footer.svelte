<script>
    import user from "@/store/user.js";
    import { APP_NAME } from "@/config";
    import { currencies } from "@/assets/js/options.js";
    import { mq } from "@/assets/js/MediaQuery.svelte";

    let path =  window.location.pathname

    $: symbol = currencies.filter((el) => el.id == $user?.currency)[0]?.symbol;

    $: hide = path.includes("/addresses/") || path.includes("/cart");
</script>

{#if !hide ||  $mq.sm_}
<footer class="grow w100 h-200 pa-50 gap-10 col font-14 container mb-40">
    <hr />
    <div class="row wrap gap-20 "class:space-between={$mq.md_} class:center={!$mq.md_}>
        <div class="row  line-height-20 nowrap">
            <button  class="pa-7"> Thailand </button>
            <span  class="pa-7">|</span>
            <span class="pa-7 curve">English (US)</span>
            <span class="pa-7">|</span>
            <a class="pa-7 curve" href="/settings"> {symbol} ({$user.currency}) </a>
        </div>
        <div class="row line-height-20 nowrap">
            <button class="pa-7"> © { APP_NAME }</button>
            <span class="pa-7">|</span>
            <a class="pa-7 curve" href='/terms'>Terms of Use</a>
            <span class="pa-7">|</span>
            <a class="pa-7 curve" href='/policy'>Privacy</a>
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
