<script>
    import Title from "./Title.svelte";
    import Description from "./Description.svelte";
    import Photos from "./Photos.svelte";
    import Price from "./Price.svelte";
    import Related from "./Related.svelte";
    import Reviews from "./Reviews.svelte";
    import Seller from "./Seller.svelte";
    import Shipping from "./Shipping.svelte";
</script>

<div class="row w100 gap-50 wrap">
    <div class="col grow gap-50">
        <Photos />
        <Reviews />
    </div>
    <div class="col grow gap-50">
        <Title />
        <Price />
        <Description />
        <Shipping />
        <Related />
        <Seller />
    </div>
</div>


