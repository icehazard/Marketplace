<script>
    import Categories from "#/toolbars/categories/Categories.svelte";
    import Item from "#/listings/Item.svelte";
    import products from "@/store/products.js";
    import { searchList } from "@/assets/js/util";
    import user from "@/store/user";
    import app from "@/store/app";
    
    $: $app.url, updatePage();

    async function updatePage() {
        let url = $app.url.split("/");
        if (url.includes("categories")) $products.productsAll = []
        else products.getAllProducts(true);
    }

</script>
<main class="row container my-50 gap-40 grow">
    <Categories />
    <section class="grow">
        {#if $products.productsAll}
            {#each searchList($products.productsAll, $user.searchNav) as product}
                <Item data={product} />
            {:else}
                <div class="row center pa-20 weight-300 letter-space-1 noResult">
                    No results found
                </div>
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
    .noResult {
        grid-column: 1 / -1;
    }
</style>
