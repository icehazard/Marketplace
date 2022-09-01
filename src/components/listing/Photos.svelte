<script>
    import logo from "@/assets/images/logo.svg";
    import products from "@/store/products.js";
    import Edit from "comp/atoms/Edit.svelte";
    import Icon from "@iconify/svelte";
    import shops from "@/store/shops";
    import { isOwnProduct } from "@/store/products.js";

    import { Swiper, SwiperSlide } from "swiper/svelte";
    import { Pagination } from "swiper";

    import "swiper/css";
    import "swiper/css/pagination";
    import "@/assets/css/swiper.css";

    let el, picker, image;
    let index = 0;
    let maxPics = 5;
    let newval = false;

    $: currentImg = current();

    function current() {
        try {
            return Object.values($products?.product?.photos).slice(0, maxPics);
        } catch {
            return [];
        }
    }

    function openPicker(idx, val) {
        newval = val;
        if (!$isOwnProduct) return;
        index = idx;
        picker.click();
    }

    function switching(idx) {
        index = idx;
    }

    async function upload(e) {
        image.src = URL.createObjectURL(e.target.files.item(0));
        let formData = new FormData(el);
        this.load = true;
        setTimeout(async () => {
            let id = $products.productsAll.findIndex((el) => el._id == $products.product._id);
            let highest = 0;
            for (let x of Object.keys($products.product.photos)) {
                if (x > highest) highest = x;
            }
            highest = Number(highest) + 1;
            let idx = newval ? highest : Object.keys($products.productsAll[id].photos)[index];
            console.log("🚀 ~ idx", idx);
            await shops.postProductImage(formData, idx);
            await products.getAllProducts();
            $products.product = $products.productsAll[id];
            this.load = false;
            picker.files = new DataTransfer().files;
        }, 0);
    }
    async function del() {
        let formData = new FormData(el);
        let id = $products.products.findIndex((el) => el._id == $products.product._id);
        // console.log("🚀 ~ id", $products.products[id])
        let keys = Object.keys($products.products[id].photos);
        await shops.deleteProductImage(formData, Number(keys[index]));
        await products.get();
        $products.product = $products.products[id];
    }
</script>

<button class="shade1 curve center relative">
    <form bind:this={el} class="none" enctype="multipart/form-data">
        <input type="file" on:change={upload} name="avatar" bind:this={picker} />
    </form>

    <img
        src={`http://localhost:8080/api/image/` + currentImg[index]}
        class:none={currentImg[index] ? false : true}
        class:own={$isOwnProduct}
        alt=""
        bind:this={image}
        class="main h-300 w-300 w100"
        on:click={() => openPicker(index, false)}
    />
    <span
        class="absolute shade2 shadow curve font-14 w-50 h-30 ma-10 center w100 p-top p-left nopointer nowrap"
    >
        {index + 1} / {currentImg.length}
    </span>
    {#if $isOwnProduct}
        <button class="absolute p-top p-right pa-10 red--text " on:click={del}>
            <Icon icon="fluent:delete-12-regular" width="20" />
        </button>
    {/if}

    <div class:none={currentImg[index] ? true : false} class="300 shade1 h-400 pa-20" />
    <div class="edit "><Edit /></div>
</button>
<div class="curve col gap-20 ">
    <div class="row gap-10 ">
        <Swiper
            slidesPerView={"auto"}
            spaceBetween={10}
            pagination={{
                clickable: true,
            }}
            modules={[Pagination]}
        >
            {#each currentImg as _, idx}
                <SwiperSlide>
                    <button on:click={() => switching(idx)}>
                        <img
                            src={`http://localhost:8080/api/image/` + currentImg[idx]}
                            alt=""
                            class="w-150 h-150 cover "
                        />
                    </button>
                </SwiperSlide>
            {/each}

            {#each Array(maxPics - currentImg.length) as _, idx}
                {#if $isOwnProduct}
                    <SwiperSlide>
                        <button
                            class="pa-50 curve shade3 "
                            on:click={() => openPicker(currentImg.length + idx, true)}
                        >
                            <Icon icon="fluent:add-circle-16-regular" height="50" color="grey" />
                        </button>
                    </SwiperSlide>
                {:else}
                    <SwiperSlide>
                        <div class="pa-50 curve shade3">
                            <Icon icon="carbon:no-image" height="50" color="grey" />
                        </div>
                    </SwiperSlide>
                {/if}
            {/each}
        </Swiper>
    </div>
</div>

<style>
    .main {
        height: 100%;
        max-height: 400px;
        min-height: 400px;
        width: 100%;
        object-fit: cover;
        transition: all 0.3s ease;
    }

    .own:hover {
        backdrop-filter: brightness(0.5);
        filter: brightness(0.5);
    }
    button:hover .edit {
        opacity: 1;
    }

    .edit {
        opacity: 0;
        transition: all 0.2s ease-out;
        position: absolute;
        pointer-events: none;
    }
    button {
        overflow: hidden;
    }

    .w-150 {
        min-width: 150px;
    }
</style>
