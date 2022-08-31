<script>
    import Categories from "comp/toolbars/categories/Categories.svelte";
    import Edit from "comp/listing/Edit.svelte";
    import products from "@/store/products";
    import Title from "comp/listing/Title.svelte";
    import Description from "comp/listing/Description.svelte";
    import Photos from "comp/listing/Photos.svelte";
    import Price from "comp/listing/Price.svelte";
    import Related from "comp/listing/Related.svelte";
    import Seller from "comp/listing/Seller.svelte";
    import Shipping from "comp/listing/Shipping.svelte";
    import shops from "@/store/shops.js";
    import user from "@/store/user.js";
    import { mq } from "@/assets/library/MediaQuery.svelte";
    import { onMount } from "svelte";
    import { location } from "svelte-spa-router";

    let loc = $location.split("/");
    loc = loc[loc.length - 1];

    onMount(async () => {
       await products.getProduct(loc);
        shops.get($products.product.shopID);
        user.get();
    });
</script>

<main class="row container my-50 gap-50 grow">
    <Categories />
    <section class="col w100 gap-30 wrap" class:row={$mq.xxl_}>
        <div class="col grow gap-30">
            <Photos />
            {#if $mq.xxl_}
                <Edit />
                <Description />
            {/if}
        </div>
        <div class="col grow gap-30">
            <Title />
            {#if $mq._xl}
                <Edit />
                <Description />
            {/if}
            <Price />
            <Shipping />
            <Related />
            <Seller />
        </div>
    </section>
</main>
