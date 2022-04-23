<script>
    import { push } from "svelte-spa-router";
    import logo from "@/assets/images/logo.svg";
    import Rating from 'comp/atoms/Rating.svelte'

    function viewListing() {
        push("#/listing");
    }
</script>

<button class="w-120 h-140 curve col shade1 fast border pa-5" on:click={viewListing}>
    <section class="h-80 center w100">
        <img src={logo} alt="logo" class="h100 py-10" />
    </section>
    <section class="col space-between h100 w100 font-12">
        <span class="ellipsis font-12">Vortex - 150mg</span>
        <span class="weight-600 font-12">$150</span>
        <div class="col ">
            <div class="row center gap-5 nowrap">
                <Rating rating={Math.random() * 5 }/>
                <span>({Math.random() * 1000 | 0})</span>
            </div>
        </div>
    </section>
</button>

<style>
    button:hover,
    button:focus {
        filter: brightness(1.1);
    }
</style>
