<script>
    import Categories from "comp/toolbars/categories/Categories.svelte";
    import Banner from "comp/seller/Banner.svelte";
    import Reviews from "comp/seller/Reviews.svelte";
    import Featured from "comp/seller/Featured.svelte";
    import Cover from "comp/seller/Cover.svelte";
    import AllItems from "comp/seller/AllItems.svelte";
    import Pending from "comp/seller/Pending.svelte";
    import AddListing from "comp/seller/AddListing.svelte";
    
    import user from "@/store/user.js";
    import { isShopPending, isShopActive } from "@/store/user.js";
    import { onMount } from "svelte";

    onMount(() => {
        user.get();
    });
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
        <Featured />
        <AllItems />
        <Reviews />
    </section>
</main>
