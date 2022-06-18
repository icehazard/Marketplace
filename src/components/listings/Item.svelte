<script>
    import { push } from "svelte-spa-router";
    import logo from "@/assets/images/logo.svg";
    import Rating from "comp/atoms/Rating.svelte";
    import { product } from "@/store/products.js";
    export let data = [];

    function viewListing() {
        product.set(data);
        push("#/listing");
    }
</script>

<button class="w-300 h-300 curve col shade1 fast" on:click={viewListing}>
    <section class="h-180 center w100">
        <img src={data.image} alt="logo" class="h100" />
    </section>
    <hr class="hr w100" />
    <section class="col pa-15  space-between h100 w100">
        <span class="ellipsis text-start">{data.title}</span>
        <span class="weight-600 text-start">$ {data.price}</span>
        <div class="row space-between gap-10 opacity-60">
            <div class="row center gap-5 nowrap grow justify-start">
                <Rating rating={Math.random() * 5} />
                <span class="font-14">({(Math.random() * 1000) | 1})</span>
            </div>
            <div class=" grow justify-end ellipsis">
                <span class="ellipsis ">Mr. iceman</span>
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

    .h-180{
        min-height: 180px;
    }

    @media only screen and (max-width: 576px) {
        button {
            width: 100%;
        }
    }
</style>
