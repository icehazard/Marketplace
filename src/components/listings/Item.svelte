<script>
    import Icon from "@iconify/svelte";
    import { push } from "svelte-spa-router";
    import Rating from "comp/atoms/Rating.svelte";
    import products from "@/store/products.js";
    import { slide } from "svelte/transition";
    import { clickOutside } from "@/assets/library/CommonFunctions.js";
    import { formatCurrency } from "@/assets/library/CommonFunctions.js";
    export let data = [];

    let menu = false;

    function viewListing() {
        $products.product = data;
        push(`#/listing/${data._id}`);
    }
    function close() {
        menu = false;
    }
    function toggle() {
        menu = !menu;
    }
    function del() {
        products.del(data._id);
        close();
    }
    function edit() {
        $products.product = data;
        products.spreadProduct();
        push(`#/store/listing/edit/${data._id}`);
        close();
    }
</script>

<button class=" h-300 curve col shade1 fast main" on:click={viewListing}>
    <section class="h-180 center w100 relative overflow-hidden curve-top">
        {#if menu}
            <div
                class="shade1 py-10 absolute p-bottom w100 col z-2 curve-top"
                transition:slide
                use:clickOutside={close}
            >
                <button
                    type="button"
                    class="red--text align-center gap-10 shine pa-10 curve"
                    on:click|stopPropagation={del}
                >
                    <Icon icon="fluent:delete-12-regular" width="20" />
                    <span>Delete</span>
                </button>
                <button type="button" class="align-center gap-10 shine pa-10 curve" on:click|stopPropagation={edit}>
                    <Icon icon="fluent:edit-16-regular" width="20" />
                    <span>Edit</span>
                </button>
            </div>
        {/if}
        <img src={data.imageURL} alt="logo" class="h100" class:darken={menu} />
    </section>
    <hr class="hr w100" />
    <section class="col pa-15  space-between h100 w100">
        <div class="row w100 space-between">
            <span class="ellipsis text-start">{data.name || ""}</span>
            <button class="pa-5 shine round center" on:click|stopPropagation={() => toggle()}>
                <Icon icon="fluent:more-vertical-16-regular" />
            </button>
        </div>
        <span class="weight-600 text-start">{formatCurrency(data.price) || ""}</span>
        <div class="row space-between gap-10 opacity-60">
            <div class="row center gap-5 nowrap grow justify-start">
                <Rating rating={Math.random() * 5} />
                <span class="font-14">({(Math.random() * 1000) | 1})</span>
            </div>
            <div class=" grow justify-end ellipsis">
                <span class="ellipsis ">{data.shopID || ""}</span>
            </div>
        </div>
    </section>
</button>

<style>
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
    .main:hover,
    .main:focus {
        transform: translateY(-1px);
        filter: brightness(1.1);
    }

    .h-180 {
        min-height: 180px;
    }

    .shine:hover {
        background-color: rgba(255, 255, 255, 0.11);
    }

    .darken {
        transition: all 0.3s ease;
    }

    .darken {
        filter: brightness(0.8) blur(8px);
        overflow: hidden;
    }

    @media only screen and (max-width: 576px) {
        button {
            width: 100%;
        }
    }
</style>
