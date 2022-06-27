<script>
    import { push } from "svelte-spa-router";
    import "@lottiefiles/lottie-player";

    function AddListing() {
        push("#/listing/create");
    }
</script>

<section class="col w100 gap-10">
    <div>Add Product</div>
    <div class="row gap-10 wrapper">
        <button class="box shade1 center" on:click={AddListing}>
            <lottie-player
                autoplay
                mode="normal"
                src="https://assets6.lottiefiles.com/packages/lf20_wpfsuumq.json"
                style="width: 70px"
            />
        </button>
        <button class="box shade1 center" on:click={AddListing}>Add listing</button>
        <button class="box shade1 center" on:click={AddListing}>Add listing</button>
        <button class="box shade1 center" on:click={AddListing}>Add listing</button>
    </div>
</section>

<style>
    .box {
        width: 100%;
        height: 200px;
    }

    .wrapper {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr));
        gap: 20px;
        max-height: 200px;
        overflow: hidden;
    }
</style>
