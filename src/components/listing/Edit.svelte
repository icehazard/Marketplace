<script>
    import products from "@/store/products.js";
    import { isOwnProduct } from "@/store/products.js";
    import Toggle from "#/atoms/Toggle.svelte";
    import Select from "@/components/atoms/Select.svelte";
    import Icon from "@iconify/svelte";
    import { categories } from "@/assets/js/options.js";

    let toggler = $products.product.status;
    let selectDefault = $products.product.category || "flower";

    function handleClick() {
        products.edit({ status: Number(!toggler) });
    }
    function handleUpdate(e) {
        products.edit({ category: e.detail.id });
    }
</script>

{#if $isOwnProduct}
    <div class="shade1 pa-30 curve col gap-30  z-2">
        <div class="opacity-75 row align-center gap-10">
            <Icon icon="clarity:cog-line" />
            <div>Product settings</div>
        </div>
        <div class="row space-between align-center">
            <span>Product is {toggler ? "active" : "inactive"}</span>
            <Toggle bind:toggle={toggler} on:toggle={handleClick} />
        </div>
        <hr />
        <div class="row space-between align-center">
            <span>Category</span>
            <Select init={selectDefault} items={categories} on:select={handleUpdate} />
        </div>
    </div>
{/if}
