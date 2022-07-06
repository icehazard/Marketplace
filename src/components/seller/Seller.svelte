<script>
    import Banner from "./Banner.svelte";
    import Reviews from "./Reviews.svelte";
    import AddListing from "./AddListing.svelte";
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
    import { isShopPending, isShopActive } from "@/store/user.js";
    import { onMount } from "svelte";
    import shops from "@/store/shops.js";

    onMount(() => {
        user.get();
    });
</script>

<section class="col grow gap-20">
    <div class="h-400 shade1 curve">
        <img class="curve cover h100 w100" src={$shops.coverPic} alt="" />
    </div>
    <Banner />

    {#if $isShopPending}
        <div class="blue py-50 font-20 center curve blue--text">Account pending verification</div>
    {:else if $isShopActive}
        <AddListing />
    {/if}

    <div class="col gap-10">
        <div>{$products.products.length ? "Featured Products" : ""}</div>
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
    <Reviews />
</section>
