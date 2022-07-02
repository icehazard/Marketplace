<script>
    import { push } from "svelte-spa-router";
    import Button from "comp/atoms/Button.svelte";
    import { shopValid, active, address, shopName, shopType, bankName, bankAccName, bankAccNr, reset } from "@/store/store.js";
    import "@lottiefiles/lottie-player";
    import { onDestroy } from "svelte";
    import {WEBPACK_URL} from "@/config";
    import {token_} from "@/store/user";

    let confirm;
    let msg = "";
    let review = false;

    $: confirm, ($shopValid[4] = validate());

    function validate() {
        if (!confirm) return true;
        return false;
    }

    async function submitShopForApproval() {
        let msg1 = "You must confirm the terms and conditions";
        if (!confirm) return (msg = msg1);

        let res = await fetch(`http://${WEBPACK_URL}/api/shop`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                token: $token_,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({address: $address, name: $shopName, type: $shopType, bankName: $bankName,
                bankAccName: $bankAccName, bankAccNr: $bankAccNr}),
        });
        review = true;
    }

    onDestroy(() => {
        if (review) reset();
    });
</script>

<form class="center col shade3 curve py-50 px-10 pb-100 gap-20">
    <div class="center col w-sm gap-40">
        {#if !review}
            <h1 class="font-36 weight-300">Confirmation</h1>
            <p class="text-center">
                When you make a sale through MetaRoad, you will be charged a transaction fee of 4%
                of the price you display for each listing. An invoice will be sent every month for
                any purchases.
            </p>
            {#if msg}
                <div class="row w100 text-center">
                    <div class="span grow red--text">{msg}</div>
                </div>
            {/if}
            <div class="row gap-10 center">
                <input type="checkbox" bind:checked={confirm} />
                <label for="vehicle1">Accept terms and conditions</label><br />
            </div>
        {/if}
        {#if review}
            <lottie-player
                autoplay
                speed="0.5"
                mode="normal"
                src="https://assets5.lottiefiles.com/packages/lf20_unfd16a1.json"
                style="width: 150px; height: 150px;"
            />

            <div class="row">
                <h1 class="font-36 weight-300">Shop pending approval</h1>
            </div>
            <div class="col gap-10">
                <p class="font-20 text-center ">
                    Shop is pending review. It will become activated after review.
                </p>
                <p class="font-18 text-center weight-300">
                    An email will be sent to you when the shop becomes approved.
                </p>
                <p class="font-18 text-center weight-300 opacity-75">
                    Shop is usually approved within 10 minutes
                </p>
            </div>
        {/if}
    </div>
    {#if !review}
        <div class="pt-50  row w-sm  w100  z-2">
            <div class=" center w100">
                <Button on:click={submitShopForApproval} type="button" disable={$shopValid[4]} text="CONTINUE" />
            </div>
        </div>
    {/if}
</form>

<style>
</style>
