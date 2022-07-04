<script>
    import Title from "./Title.svelte";
    import Description from "./Description.svelte";
    import Photos from "./Photos.svelte";
    import Price from "./Price.svelte";
    import Related from "./Related.svelte";
    import Reviews from "../seller/Reviews.svelte";
    import Seller from "./Seller.svelte";
    import Shipping from "./Shipping.svelte";
    import { mq } from "@/assets/library/MediaQuery.svelte";
</script>

<div class="col w100 gap-30 wrap" class:row={$mq.xxl_} >
    <div class="col grow gap-30">
        <Photos />
        <!-- {#if $mq.xxl_}
        <Reviews />
        {/if} -->
    </div>
    <div class="col grow gap-30">
        <Title />
        <Price />
        <Description />
        <Shipping />
        <Related />
        <Seller />
        <!-- {#if $mq._xl}
        <Reviews />
        {/if} -->
    </div>
</div>

<style>


</style>
