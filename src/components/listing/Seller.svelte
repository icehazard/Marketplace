<script>
    import Icon from "@iconify/svelte";
    import Item from "./Item.svelte";
    import { Swiper, SwiperSlide } from "swiper/svelte";
    import { Pagination } from "swiper";
    import "swiper/css";
    import "swiper/css/pagination";
    import "@/assets/css/swiper.css";
</script>

<div class="shade1 pa-50 curve col gap-20 ">
    <div class="opacity-75 row align-center gap-10">
        <Icon icon="fluent:production-24-regular" />
        <div>Related products</div>
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
            <SwiperSlide><Item /></SwiperSlide>
            <SwiperSlide><Item /></SwiperSlide>
            <SwiperSlide><Item /></SwiperSlide>
            <SwiperSlide><Item /></SwiperSlide>
            <SwiperSlide><Item /></SwiperSlide>
            <SwiperSlide><Item /></SwiperSlide>
            <SwiperSlide><Item /></SwiperSlide>
            <SwiperSlide><Item /></SwiperSlide>
            <SwiperSlide><Item /></SwiperSlide>
        </Swiper>
    </div>
</div>

<style>


</style>
