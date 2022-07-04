<script>
    import Item from "./Item.svelte";
    import  products  from "@/store/products.js";

    products.get()
</script>

<section class="grow">
    {#if $products.products}
        {#each $products.products as product}
            <Item data={product} />
        {/each}
    {/if}
</section>

<style>
    section {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr));
        gap: 20px;
    }
</style>
