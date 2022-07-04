<script>
    import { push } from "svelte-spa-router";
    import products from "@/store/products.js";
    import Icon from "@iconify/svelte";

    function handleClick() {
        products.spreadProduct();
        push("#/listing/edit");
    }
</script>

<button on:click={handleClick} class="shade1 pa-50 curve col gap-50 center shine font-20">
    <div class="center gap-10">
        <Icon icon="fluent:edit-24-regular" />
        <span> Edit listing</span>
    </div>
</button>
