<script>
    import { push } from "svelte-spa-router";
    import logo from "@/assets/images/logo.svg";
    import Rating from "./Rating.svelte";

    function viewListing() {
        push("#/listing");
    }
</script>

<button class="w-300 h-300 curve col shade1 fast" on:click={viewListing}>
    <section class="h-180 center w100">
        <img src={logo} alt="logo" class="h100 py-10" />
    </section>
    <hr class="hr w100">
    <section class="col pa-15  space-between h100 w100">
        <span class="ellipsis text-start">Vortex - 150mg</span>
        <span class="weight-600 text-start">$150</span>
        <div class="row space-between gap-10 opacity-60">
            <div class="row center gap-5 nowrap grow justify-start">
                <Rating />
                <span class="font-14">(323)</span>
            </div>
            <div class=" grow justify-end ellipsis">
                <span class="ellipsis ">Mr. iceman</span>
            </div>
        </div>
    </section>
</button>

<style>
    button:hover,
    button:focus {
        transform: translateY(-1px);
        filter: brightness(1.1);
    }
</style>
