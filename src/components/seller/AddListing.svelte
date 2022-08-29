<script>
    import { push } from "svelte-spa-router";
    import shops, { isOwnShop } from "@/store/shops";
    import products from "@/store/products.js";
    import "@lottiefiles/lottie-player";
    import Item from "comp/listings/Item.svelte";

    let json = "https://assets6.lottiefiles.com/packages/lf20_wpfsuumq.json";
    let show = false;

    async function AddListing() {
        $products.product = {
            desc: "",
            name: "",
            photos: {},
            price: "",
            qty: "",
            shopName: "",
        };
        let res = await products.post();
        await products.getAllProducts();
        push(`#/listing/${res.nid}`);
    }

    function toggleShow() {
        show = !show;
    }
</script>

<section class="col w100 gap-20">
    {#if $isOwnShop}
        <div>Your Products</div>
    {/if}
    <div class="row gap-10 wrapper overflow-hidden slow " class:h-300={!show} class:h-620={show}>
        {#if $isOwnShop}
            <button class="w100 shade1 center relative shine h-300" on:click={AddListing}>
                <lottie-player autoplay mode="normal" src={json} style="width: 70px" />
            </button>
        {/if}
        {#each Array(4) as _, i}
            {#if $products.products[i]}
                <Item data={$products.products[i]} />
            {:else}
                <button class="w100 shade1 center shine" on:click={AddListing}>
                    <span class="opacity-75 font-14">No Product</span>
                </button>
            {/if}
        {/each}
    </div>
    {#if $products.products.length > 3}
        <button class="row center blue--text" on:click={toggleShow}>
            {show ? " Show less" : "Show more"}
        </button>
    {/if}
</section>

<style>
    .wrapper {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr));
        gap: 20px;
        overflow: hidden;
    }

    .h-620 {
        height: 620px;
    }
</style>
