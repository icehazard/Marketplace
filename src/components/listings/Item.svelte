<script>
    import Icon from "@iconify/svelte";
    import { push } from "svelte-spa-router";
    import logo from "@/assets/images/logo.svg";
    import Rating from "comp/atoms/Rating.svelte";
    import products from "@/store/products.js";
    export let data = [];

    function viewListing() {
        $products.product = data;
        push("#/listing");
    }
</script>

<button class=" h-300 curve col shade1 fast" on:click={viewListing}>
    <section class="h-180 center w100">
        <img src={data.imageURL} alt="logo" class="h100" />
    </section>
    <hr class="hr w100" />
    <section class="col pa-15  space-between h100 w100">
        <div class="row w100 space-between">
            <span class="ellipsis text-start">{data.name || ''}</span>
            <button class="pa-5 shine curve center" on:click|stopPropagation={() => products.del(data._id)}>
                <Icon icon="mdi:delete" />
            </button>
        </div>
        <span class="weight-600 text-start">$ {data.price || ""}</span>
        <div class="row space-between gap-10 opacity-60">
            <div class="row center gap-5 nowrap grow justify-start">
                <Rating rating={Math.random() * 5} />
                <span class="font-14">({(Math.random() * 1000) | 1})</span>
            </div>
            <div class=" grow justify-end ellipsis">
                <span class="ellipsis ">{data.shopID || ''}</span>
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
    button:hover,
    button:focus {
        transform: translateY(-1px);
        filter: brightness(1.1);
    }

    .h-180 {
        min-height: 180px;
    }

    .shine:hover {
        background-color: rgba(255, 255, 255, 0.11);
    }

    @media only screen and (max-width: 576px) {
        button {
            width: 100%;
        }
    }
</style>
