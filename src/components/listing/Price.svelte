<script>
    import Icon from "@iconify/svelte";
    import Button from "comp/atoms/Button.svelte";
    import products from "@/store/products.js";
    import { push } from "svelte-spa-router";



    function handleClick() {
        push("#/cart");
    }
</script>

<div class="shade1 pa-50 curve col gap-20">
    <div class="opacity-75 row align-center gap-10">
        <Icon icon="icomoon-free:price-tag" />
        <div>Price</div>
    </div>
    <div class="row space-between align-center">
        <div class="font-26">${$products?.product?.price || ''}</div>
        <Button on:click={handleClick} text="ADD TO CART" />
    </div>
</div>
