<script>
    import Categories from "#/toolbars/categories/Categories.svelte";
    import Banner from "#/seller/Banner.svelte";
    import Reviews from "#/seller/Reviews.svelte";
    import Cover from "#/seller/Cover.svelte";
    import Pending from "#/seller/Pending.svelte";
    import AddListing from "#/seller/AddListing.svelte";
    import shops from "@/store/shops.js";
    import user from "@/store/user.js";
    import app from "@/store/app";
    import products from "@/store/products.js";
    import { isShopPending, isShopActive } from "@/store/user.js";
    import { onDestroy } from "svelte";

    $: $app.url, updatePage();

    async function updatePage() {
        if ($app.loading) return;
        let id = Number($app.url.split("/").pop());
        user.get();
        products.get();
        if (id) shops.get(id);
    }

    onDestroy(() => shops.reset());
</script>

<main class="row container my-50 gap-50 grow">
    <Categories />
    <section class="col grow gap-50">
        <div class="col gap-10">
            <Cover />
            <Banner />
        </div>
        {#if $isShopPending}
            <Pending />
        {:else if $isShopActive}
            <AddListing />
        {/if}
        <!-- <Reviews /> -->
    </section>
</main>
