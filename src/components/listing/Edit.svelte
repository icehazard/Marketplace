<script>
    import { push } from "svelte-spa-router";
    import products from "@/store/products.js";
    import Icon from "@iconify/svelte";
    import user from "@/store/user.js";

    function handleClick() {
        products.spreadProduct();
        push("#/listing/edit");
    }
</script>

{#if user.isShopActive() && !user.isShopPending()}
<button on:click={handleClick} class="shade1 pa-50 curve col gap-50 center shine font-20">
    <div class="center gap-10">
        <Icon icon="fluent:edit-24-regular" />
        <span> Edit listing</span>
    </div>
</button>

{/if}