<script>
    import Categories from "comp/toolbars/categories/Categories.svelte";
    import Edit from "comp/listing/Edit.svelte";
    import products from '@/store/products'
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

    onMount(async () => {
        user.get();
        //await products.get();
        await shops.get($products.product.shopID);
    });
</script>

<main class="row container my-50 gap-50 grow">
    <Categories />
    <section class="col w100 gap-30 wrap" class:row={$mq.xxl_}>
        <div class="col grow gap-30">
            <Photos />
            {#if $mq.xxl_}
                <Description />
            {/if}
        </div>
        <div class="col grow gap-30">
            <Title />
            {#if $mq._xl}
                <Description />
            {/if}
            <Price />
            <Shipping />
            <Related />
            <Seller />
        </div>
    </section>
</main>
