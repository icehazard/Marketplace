<script>
    import Edit from "./Edit.svelte";
    import Title from "./Title.svelte";
    import Description from "./Description.svelte";
    import Photos from "./Photos.svelte";
    import Price from "./Price.svelte";
    import Related from "./Related.svelte";
    import Seller from "./Seller.svelte";
    import Shipping from "./Shipping.svelte";
    import { mq } from "@/assets/library/MediaQuery.svelte";
    import { onMount } from "svelte";
    import user from "@/store/user.js";

    onMount(() => {
        user.get();
    });
</script>

<div class="col w100 gap-30 wrap" class:row={$mq.xxl_}>
    <div class="col grow gap-30">
        <Photos />
        {#if $mq.xxl_}
            <Edit />
        {/if}
    </div>
    <div class="col grow gap-30">
        {#if $mq._xl}
            <Edit />
        {/if}
        <Title />
        <Price />
        <Description />
        <Shipping />
        <Related />
        <Seller />
    </div>
</div>

<style>
</style>
