<script>
    import HowPay from "comp/cart/HowPay.svelte";
    import Item from "comp/cart/Item.svelte";
    import { cart } from "@/store/cart.js";
    import Icon from "@iconify/svelte";
</script>

<section class="col grow gap-50">
    <div class="row weight-300 center">
        <div class="row font-36  grow">{$cart.length} item in your cart</div>
        <Icon icon="fluent:chevron-left-16-regular" />
        <a href="/#" class="pl-10">Keep shopping</a>
    </div>
    <div class="row gap-50">
        <div class="col gap-20 grow">
            {#if $cart.length == 0}
                <div class="grow text-center font-26 py-50">Your cart is empty.</div>
            {/if}
            {#each $cart as item}
                <Item data={item} />
            {/each}
        </div>
        <div class="col">
            <HowPay />
        </div>
    </div>
</section>
