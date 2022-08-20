<script>
    import cart from "@/store/cart.js";
    import Icon from "@iconify/svelte";
    import Button from "comp/atoms/Button.svelte";
    import products from "@/store/products.js";
    import { push } from "svelte-spa-router";
    import { formatCurrency } from "@/assets/library/CommonFunctions.js";
    import { openModal } from "svelte-modals";
    import { isOwnShop } from "@/store/shops.js";
    import Price from "comp/modals/listing/Price.svelte";

    function handleClick() {
        cart.addToCart($products.product);
        push("#/cart");
    }
</script>

<div class="shade1 pa-30 curve col gap-20">
 
    {#if $isOwnShop}
    <button
        on:click={() => openModal(Price)}
        class="w-fit-content align-center gap-20 shine curve pa-5"
    >
        <div class="center gap-10 opacity-75">
            <Icon icon="icomoon-free:price-tag" />
            <div>Price</div>
        </div>
        {#if $isOwnShop}
            <Icon icon="fluent:edit-16-regular" width="22" color="var(--primary)" />
        {/if}
    </button>
{:else}
    <div class="opacity-75 row align-center gap-10">
        <Icon icon="icomoon-free:price-tag" />
        <div>Price</div>
    </div>
{/if}
    <div class="row space-between align-center">
        <div class="font-26">{formatCurrency($products?.product?.price) || ""}</div>

        {#if !$isOwnShop}
            <Button primary on:click={handleClick} text="ADD TO CART" />
        {/if}
    </div>
</div>
