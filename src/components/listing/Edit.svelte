<script>
    import { push } from "svelte-spa-router";
    import products from "@/store/products.js";
    import Icon from "@iconify/svelte";
    import { isShopPending, isShopActive } from "@/store/user.js";
    import { isOwnShop } from "@/store/shops.js";

    function handleClick() {
        // products.spreadProduct();
        push(`#/store/listing/edit/${$products.product._id}`);
    }
</script>

{#if $isOwnShop}
    <button on:click={handleClick} class="shade1 pa-50 curve col gap-50 center shine font-20 z-2">
        <div class="center gap-10">
            <Icon icon="fluent:edit-24-regular" />
           <span> Edit listing</span>
        </div>
    </button>
{/if}
