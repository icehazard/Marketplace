<script>
    import { push } from "svelte-spa-router";
    import Rating from "comp/atoms/Rating.svelte";
    import { formatCurrency } from "@/assets/library/CommonFunctions.js";
    import Icon from "@iconify/svelte";
    export let data = [];

    function viewListing() {
        push("#/listing");
    }
</script>

<button class=" h-250 w-250 curve col shade1 fast" on:click={viewListing}>
    <section class="h-150 center w100">
        {#if Object.keys(data.photos).length}
            <img
                src={`http://localhost:8080/api/image/` + Object.values(data.photos).slice(0, 1)}
                alt="logo"
                class="h100"
            />
        {:else}
            <Icon icon="carbon:no-image" height="50" color="grey" />
        {/if}
    </section>
    <hr class="hr w100" />
    <section class="col pa-15  space-between h100 w100">
        <span class="ellipsis text-start">{data.name ? data.name : "No name set"}</span>
        <span class="weight-600 text-start">{formatCurrency(data.price ? data.price : 0.0)}</span>
        <div class="row space-between gap-10 opacity-60">
            <div class="row center gap-5 nowrap grow justify-start">
                <Rating rating={Math.random() * 5} />
                <span class="font-14">({(Math.random() * 1000) | 1})</span>
            </div>
            <div class=" grow justify-end ellipsis">
                <span class="ellipsis ">{data.shopName || ""}</span>
            </div>
        </div>
    </section>
</button>

<style>
    button:hover,
    button:focus {
        filter: brightness(1.1);
    }

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
    .h-150 {
        min-height: 150px;
    }
</style>
