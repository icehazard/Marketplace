<script>
    import Icon from "@iconify/svelte";
    import Item from "./Item.svelte";
    import { Swiper, SwiperSlide } from "swiper/svelte";
    import { Pagination } from "swiper";
    import products from "@/store/products.js";
    import "swiper/css";
    import "swiper/css/pagination";
    import "@/assets/css/swiper.css";
</script>

<div class="shade1 pa-50 curve col gap-20 ">
    <div class="opacity-75 row align-center gap-10">
        <Icon icon="ant-design:shop-filled" />
        <div>More from Seller</div>
    </div>
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

<style>
</style>
