<script>
    import products from "@/store/products.js";
    import { isOwnShop } from "@/store/shops.js";
    import Toggle from "comp/atoms/Toggle.svelte";
    import Icon from "@iconify/svelte";

    let toggler = $products.product.status;

    function handleClick() {
        products.edit({ status: Number(!toggler) });
    }
</script>

{#if $isOwnShop}
    <div class="shade1 pa-30 curve col gap-30  z-2">
        <div class="opacity-75 row align-center gap-10">
            <Icon icon="clarity:cog-line" />
            <div>Product settings</div>
        </div>
        <div class="row space-between align-center">
            <Toggle bind:toggle={toggler} on:toggle={handleClick} />
            <span>Product is {toggler ? "active" : "inactive"}</span>
        </div>
    </div>
{/if}
