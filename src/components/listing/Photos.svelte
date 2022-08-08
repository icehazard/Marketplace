<script>
    import logo from "@/assets/images/logo.svg";
    import products from "@/store/products.js";
    import Edit from "comp/atoms/Edit.svelte";
    import Icon from "@iconify/svelte";
    import shops from "@/store/shops";
    import { isOwnProduct } from "@/store/products.js";

   

    let el, picker, image;
    let index = 0;
    let maxPics = 5;

    $: currentImg = Object.values($products?.product?.photos).slice(0, maxPics);
    function openPicker(idx) {
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
            console.log(image);
            await shops.postProductImage(formData, index);
            await products.get();
            let id = $products.products.findIndex((el) => el._id == $products.product._id);
            $products.product = $products.products[id];
            this.load = false;
            picker.files = new DataTransfer().files;
        }, 0);
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
        class="main h-300 w-300"
        on:click={() => openPicker(index)}
    />
    <div class:none={currentImg[index] ? true : false} class="300 shade1 h-400 pa-20" />
    <div class="edit "><Edit /></div>
</button>
<div class="row gap-20 wrap">
    {#each currentImg as _, idx}
        <button on:click={() => switching(idx)}>
            <img
                src={`http://localhost:8080/api/image/` + currentImg[idx]}
                alt=""
                class="w-150 h-150 cover"
            />
        </button>
    {/each}
    {#each Array(maxPics - currentImg.length) as _, idx}
        {#if $isOwnProduct}
            <button
                class="pa-50 curve shade3"
                on:click={() => openPicker(currentImg.length + idx + 1)}
            >
                <Icon icon="fluent:add-circle-16-regular" height="50" color="grey" />
            </button>
        {/if}
    {/each}
</div>

<style>
    .main {
        height: 100%;
        max-height: 400px;
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
</style>
