<script>
    import products from "@/store/products.js";
    import { isOwnShop } from "@/store/shops.js";
    import Toggle from "comp/atoms/Toggle.svelte";

    let toggler = $products?.product?.status;

    $: {
        toggler, handleClick()
    }
    function handleClick() {
        products.edit({ status: toggler });
    }
</script>

{#if $isOwnShop}
    <div class="shade1 pa-30 curve row gap-50 space-between align-center z-2">
        <Toggle bind:toggle={toggler} />
        <span>Product is {toggler ? "active" : "inactive"}</span>
    </div>
{/if}
