<script>
    import Categories from "comp/toolbars/categories/Categories.svelte";
    import Banner from "comp/seller/Banner.svelte";
    import Reviews from "comp/seller/Reviews.svelte";
    import Cover from "comp/seller/Cover.svelte";
    import Pending from "comp/seller/Pending.svelte";
    import AddListing from "comp/seller/AddListing.svelte";

    import shops from "@/store/shops.js";
    import user from "@/store/user.js";
    import products from "@/store/products.js";
    import { isShopPending, isShopActive } from "@/store/user.js";

    export let params = {};
    shops.get(params.id);
    user.get();
    products.get();

    $: if (params.id) {
        shops.get(params.id);
    }
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
        <Reviews />
    </section>
</main>
