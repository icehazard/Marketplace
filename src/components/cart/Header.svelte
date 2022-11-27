<script>
    import cart from "@/store/cart.js";
    import Icon from "@iconify/svelte";
    import pluralize from "pluralize";
    import { mq } from "@/assets/js/MediaQuery.svelte";

    function back() {
        $cart.smList = false;
    }
</script>

<div class="row weight-300 center">
    <h1 class="row font-36 grow weight-300">
        {$cart.cart.length}
        {pluralize("item", $cart.cart.length)}
        in your cart
    </h1>
    <Icon icon="fluent:chevron-left-16-regular" />
    {#if $cart.smList && !$mq.lg_}
        <button class="pl-10" on:click={back}>Back to cart</button>
    {:else}
        <a href="/#" class="pl-10">Keep shopping</a>
    {/if}
</div>

<style>
    @media only screen and (max-width: 576px) {
        h1 {
            font-size: 24px;
        }
    }
</style>
