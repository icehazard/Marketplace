<script>
    import HowPay from "comp/cart/HowPay.svelte";
    import Item from "comp/cart/Item.svelte";
    import cart from "@/store/cart.js";
    import Icon from "@iconify/svelte";
    import pluralize from "pluralize";
</script>

<section class="col grow gap-50">
    <div class="row weight-300 center">
        <div class="row font-36 grow">
            {$cart.cart.length}
            {pluralize("item", $cart.cart.length)}
            in your cart
        </div>
        <Icon icon="fluent:chevron-left-16-regular" />
        <a href="/#" class="pl-10">Keep shopping</a>
    </div>
    <div class="row gap-50">
        <div class="col gap-20 grow">
            {#if $cart.cart.length == 0}
                <div class="grow text-center font-26 py-50">Your cart is empty.</div>
            {/if}
            {#each $cart.cart as item}
                <Item data={item} />
            {/each}
        </div>
        {#if $cart.cart.length !== 0}
            <div class="col">
                <HowPay />
            </div>
        {/if}
    </div>
</section>

<style>
    section {
        min-height: 600px;
    }
</style>
