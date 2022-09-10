<script>
    import cart from "@/store/cart.js";
    import Icon from "@iconify/svelte";
    import Button from "comp/atoms/Button.svelte";
    import products from "@/store/products.js";
    import { push } from "svelte-spa-router";
    import { formatCurrency } from "@/assets/js/util.js";
    import { openModal } from "svelte-modals";
    import { isOwnShop } from "@/store/shops.js";
    import Price from "comp/modals/listing/Price.svelte";
    import Quantity from "comp/modals/listing/Quantity.svelte";
    import CartNewShop from "comp/modals/listing/CartNewShop.svelte";
    import { acts } from "@tadashi/svelte-notification";

    let noStock = {
        mode: "danger",
        message: `Out of stock`,
        lifetime: 2,
    };

    let added = {
        mode: "success",
        message: `Added ${$products.product.name} to your cart`,
        lifetime: 2,
    };

    $: inStock = Number($products.product.qty) > 0;

    function handleClick(redirect) {
        if (!inStock) return acts.add(noStock);
        if ($cart.cart.length > 0) {
            let currentCartShop = $cart.cart[0].shopName;
            let newCartShop = $products.product.shopName;

            if (currentCartShop == newCartShop) {
                cart.addToCart($products.product);
                if (redirect) push("#/cart");
                else acts.add(added);
            } else openModal(CartNewShop, { product: $products.product });
        } else {
            cart.addToCart($products.product);
            if (redirect) push("#/cart");
        }
    }
</script>

<div class="shade1 pa-30 curve col gap-20">
    {#if $isOwnShop}
        <div class="row space-between">
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
            <button
                on:click={() => openModal(Quantity)}
                class="w-fit-content align-center gap-20 shine curve pa-5"
            >
                <div class="center gap-10 opacity-75">
                    <Icon icon="ic:round-production-quantity-limits" />
                    <div>Stock</div>
                </div>
                {#if $isOwnShop}
                    <Icon icon="fluent:edit-16-regular" width="22" color="var(--primary)" />
                {/if}
            </button>
        </div>
    {:else}
        <div class="row space-between">
            <div class="opacity-75 row align-center gap-10">
                <Icon icon="icomoon-free:price-tag" />
                <div>Price</div>
            </div>
            <div class="center gap-10 opacity-75">
                <Icon icon="ic:round-production-quantity-limits" />
                <div>Stock</div>
            </div>
        </div>
    {/if}
    <div class="row space-between align-center">
        <div class="font-26">
            {formatCurrency($products.product.price ? $products.product.price : 0.0)}
        </div>

        {#if !inStock}
            <div class="red--text">Out of stock</div>
        {/if}

        <div class="font-22">
            {$products.product.qty || 0}
            <span class="font-14 opacity-75">G</span>
        </div>
    </div>
    {#if !$isOwnShop}
        <div class="row gap-20">
            <Button primary={inStock} on:click={() => handleClick(false)} text="ADD TO CART" />
            <Button on:click={() => handleClick(true)} text="BUY NOW" />
        </div>
    {/if}
</div>
