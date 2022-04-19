<script>
    import { push } from "svelte-spa-router";
    import logo from "@/assets/images/logo.svg";
    import Rating from "./Rating.svelte";

    function viewListing() {
        push("#/listing");
    }
</script>

<button class="w-300 h-300 curve col" on:click={viewListing}>
    <section class="h-180 center w100">
        <img src={logo} alt="logo" class="h100 py-10" />
    </section>
    <section class="col pa-15  space-between h100 w100">
        <span class="ellipsis">Vortex - 150mg</span>
        <span class="font-18 weight-600">$150</span>
        <div class="row space-between gap-10">
            <div class="row center gap-5 nowrap grow justify-start">
                <Rating />
                <span class="font-14">(323)</span>
            </div>
            <div class=" grow justify-end ellipsis">
                <span class="ellipsis">Mr. iceman</span>
            </div>
        </div>
    </section>
</button>

<style>
    button {
        background-color: #1a1a1a;
        transition: all 150ms ease;
    }

    button:hover,
    button:focus {
        transform: translateY(-1px);
        filter: brightness(1.1);
    }
</style>
