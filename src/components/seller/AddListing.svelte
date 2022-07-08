<script>
    import { push } from "svelte-spa-router";
    import products from "@/store/products.js";
    import "@lottiefiles/lottie-player";
    import Item from "comp/listings/Item.svelte";
    let json = "https://assets6.lottiefiles.com/packages/lf20_wpfsuumq.json";

    function AddListing() {
        push("#/store/add");
    }
</script>

<section class="col w100 gap-10">
    <div >Your Products</div>
    <div class="row gap-10 wrapper " >
        <button class="w100  shade1 center relative shine h-300"  on:click={AddListing} >
            <lottie-player autoplay mode="normal" src={json} style="width: 70px"  />
        </button>
        {#each Array(3) as _, i}
            <!-- <button class="w100 h-200 shade1 center shine" on:click={AddListing}>
                <span class="opacity-75 font-14">No Product</span>
            </button> -->
            <Item data={$products.products[i]} />
        {/each}
    </div>
</section>

<style>
    .wrapper {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr));
        gap: 20px;
       
        overflow: hidden;
    }
</style>
