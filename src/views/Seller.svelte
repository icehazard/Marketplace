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
    import { onDestroy } from "svelte";

    $: window.location.path, updatePage();

    async function updatePage() {
        let id = Number(window.location.pathname.split("/").pop());
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
