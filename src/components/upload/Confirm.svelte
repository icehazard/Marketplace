<script>
    import { push } from "svelte-spa-router";
    import Button from "comp/atoms/Button.svelte";
    import { shopValid, active, reset } from "@/store/store.js";
    import "@lottiefiles/lottie-player";

    let confirm;
    let msg = "";

    $: confirm, ($shopValid[4] = validate());

    function validate() {
        if (!confirm) return true;
        return false;
    }

    function next() {
        let msg1 = "You must confirm the terms and conditions";
        if (!confirm) return (msg = msg1);
        push("#/");
        reset();
    }
</script>

<form class="center col shade3 curve py-50 px-10 pb-100 gap-20">
    <div class="center  w-sm gap-40">
        <h1 class="font-36 weight-300">Confirmation</h1>
        <p class="text-center">
            When you make a sale through MetaRoad, you will be charged a transaction fee of 4% of
            the price you display for each listing. An invoice will be sent every month for any
            purchases.
        </p>
        <div class="row w100 text-center">
            <div class="span grow red--text">{msg}</div>
        </div>
        <div class="row gap-10 center">
            <input type="checkbox" bind:checked={confirm} />
            <label for="vehicle1">Accept terms and conditions</label><br />
        </div>
    </div>
    <div class="pt-50  row w-sm  w100  z-2">
        <div class=" center w100">
            <Button on:click={next} type="button" disable={$shopValid[4]} text="CONTINUE" />
        </div>
    </div>
</form>

<style>
</style>
