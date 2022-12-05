<script>
    import products from "@/store/products.js";
    import Item from "#/listing/Item.svelte";
    import { Swiper, SwiperSlide } from "swiper/svelte";
    import { Pagination } from "swiper";
    import "swiper/css";
    import "swiper/css/pagination";
    import "@/assets/css/swiper.css";
</script>

<div class="col gap-10 shade3 pa-20 curve">
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
