<script>
    import AddListing from "./AddListing.svelte";
    import Icon from "@iconify/svelte";
    import Item from "../listing/Item.svelte";
    import { Swiper, SwiperSlide } from "swiper/svelte";
    import { Pagination } from "swiper";
    import "swiper/css";
    import "swiper/css/pagination";
    import "@/assets/css/swiper.css";
    import Listing from "comp/listings/Listings.svelte";
    import products from "@/store/products.js";
    import "@lottiefiles/lottie-player";
    import user from "@/store/user.js";
    import { onMount } from "svelte";

    onMount(() => {
        user.get();
    });
</script>

<section class="col grow gap-30">
    <div class="h-400 shade1 curve">
        <img
            class="curve"
            src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/banner-close-up-of-growing-bud-claudio-valdes.jpg"
            alt=""
        />
    </div>
    <div class="row gap-30 shade1 pa-20 curved">
        <div class="w-100 h-100 shade3">
            <img
                src="https://images.weedmaps.com/deliveries/000/079/195/avatar/original/1634606312-logo.jpg"
                alt=""
            />
        </div>
        <div class="col space-between grow font-14">
            <h1 class="font-26">BeautyBreadWoodshop</h1>
            <div>Furniture with soul, Timeless design built for all time</div>
            <div class="weight-300 opacity-75">Washington, United States</div>
            <div class="opacity-80">163 Sales 5 out of 5 stars</div>
        </div>
        <div class="col center gap-10">
            <div class="w-70 h-70 shade3 round overflow-hidden">
                <img
                    src="https://static.wixstatic.com/media/3e3819_92129268ce534f0ab9c128f3aa25115a~mv2.png"
                    alt=""
                />
            </div>
            <div class="weight-600 opacity-75">Contact</div>
        </div>
    </div>

    {#if user.isShopPending()}
        <div class="info py-50 font-18 center curve">Account pending verification</div>
    {:else if user.isShopActive()}
        <AddListing />
    {/if}



    <div class="col gap-10">
        <div>Featured items</div>
        <div class="row gap-10 ">
            <Swiper
                slidesPerView={"auto"}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
            >
                {#each $products.products as product}
                    <SwiperSlide>
                        <Item data={product} />
                    </SwiperSlide>
                {/each}
            </Swiper>
        </div>
    </div>
    <div class="gap-10 col">
        <div>All Items</div>
        <Listing />
    </div>
</section>

<style>
    img {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
</style>
