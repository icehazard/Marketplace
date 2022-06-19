<script>
    import Icon from "@iconify/svelte";
    import Button from "comp/atoms/Button.svelte";
    import { product } from "@/store/products.js";
    import { addToCart } from "@/store/cart.js";
    import { push } from "svelte-spa-router";



    function handleClick() {
        push("#/cart");
        addToCart($product)
    }
</script>

<div class="shade1 pa-50 curve col gap-20">
    <div class="opacity-75 row align-center gap-10">
        <Icon icon="icomoon-free:price-tag" />
        <div>Price</div>
    </div>
    <div class="row space-between align-center">
        <div class="font-26">${$product.price}</div>
        <Button on:click={handleClick} text="ADD TO CART" />
    </div>
</div>
