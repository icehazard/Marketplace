<script>
    import Categories from "comp/toolbars/categories/Categories.svelte";
    import Item from "comp/listings/Item.svelte";
    import products from "@/store/products.js";

    products.getAllProducts(true);
</script>

<main class="row container my-50 gap-40 grow">
    <Categories />
    <section class="grow">
        {#if $products.productsAll}
            {#each $products.productsAll as product}
                    <Item data={product} />
            {/each}
        {/if}
    </section>
</main>

<style>
    section {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr));
        gap: 20px;
    }
</style>
