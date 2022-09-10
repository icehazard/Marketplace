<script>
    import products from "@/store/products.js";
    import Edit from "comp/atoms/Edit.svelte";
    import Icon from "@iconify/svelte";
    import shops from "@/store/shops";
    import { isOwnProduct } from "@/store/products.js";
    import { notify } from "@/assets/js/util.js";
    import { Swiper, SwiperSlide } from "swiper/svelte";
    import { Pagination } from "swiper";

    import "swiper/css";
    import "swiper/css/pagination";
    import "@/assets/css/swiper.css";

    let el, picker, image;
    let index = 0;
    let maxPics = 5;
    let newval = false;

    $: currentImg = Object.values($products?.product?.photos || []).slice(0, maxPics);
    $: currentImg, checkIndex();
    $: index, checkIndex();

    function checkIndex() {
        if (index + 1 <= currentImg.length) return;
        index = currentImg.length - 1;
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
        console.log('a')
        image.src = URL.createObjectURL(e.target.files.item(0));
        let formData = new FormData(el);
        this.load = true;
        let id = $products.productsAll.findIndex((el) => el._id == $products.product._id);
        let highest = 0;
        for (let x of Object.keys($products.product.photos)) {
            if (x > highest) highest = x;
        }
        highest = Number(highest) + 1;
        let idx = newval ? highest : Object.keys($products.productsAll[id].photos)[index];
        let res = await shops.postProductImage(formData, idx);
        if (res.photo) notify(1, "You have successfully uploaded a picture");
        else notify(0, "Upload unsuccessfull");
        await products.getAllProducts();
        await products.get();
        $products.product = $products.productsAll[id];
        index = currentImg.length;
        this.load = false;
        picker.files = new DataTransfer().files;
    }
    async function del() {
        let formData = new FormData(el);
        let id = $products.products.findIndex((el) => el._id == $products.product._id);
        let keys = Object.keys($products.products[id].photos);
        let res = await shops.deleteProductImage(formData, Number(keys[index]));
        if (res == 200) notify(1, "Product picture deleted");
        else notify(0, "Could not delete the picture");
        await products.get();
        await products.getAllProducts();
        $products.product = $products.products[id];
    }
</script>

<div class="shade1 curve center relative h-400" >
    <form bind:this={el} class="none" enctype="multipart/form-data">
        <input type="file" on:change={upload} name="avatar" bind:this={picker} />
    </form>
    <img
        src={`http://localhost:8080/api/image/` + currentImg[index]}
        class:none={currentImg[index] ? false : true}
        class:own={$isOwnProduct}
        alt=""
        bind:this={image}
        class="main w-300 w100 h-400"
    />

    {#if currentImg.length == 0}
    <Icon icon="carbon:no-image" height="50" color="grey" />
    {/if}
    {#if currentImg.length > 0}
        <span
            class="absolute shade2 shadow curve font-14 w-50 h-30 ma-10 center w100 p-top p-left nopointer nowrap"
        >
            {index + 1} / {currentImg.length}
        </span>
    {/if}

    {#if $isOwnProduct && currentImg.length > 0}
        <button class="absolute p-top p-right pa-10 red--text " on:click={del}>
            <Icon icon="fluent:delete-12-regular" width="20" />
        </button>
    {/if}
    <!-- <div class="edit "><Edit /></div> -->
</div>
<div class="curve col gap-20 ">
    <div class="row gap-10 ">
        <Swiper
            slidesPerView={"auto"}
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
                            class="w-150 h-150 cover"
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

    /* .own:hover {
        backdrop-filter: brightness(0.5);
        filter: brightness(0.5);
    } */
    /* button:hover .edit {
        opacity: 1;
    }

    .edit {
        opacity: 0;
        transition: all 0.2s ease-out;
        position: absolute;
        pointer-events: none;
    } */
    button {
        overflow: hidden;
    }

    .w-150 {
        min-width: 150px;
    }

    .h-400 {
        min-height: 400px;
    }
</style>
