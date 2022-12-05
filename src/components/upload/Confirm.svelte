<script>
    import config from "@/config.js";
    import Button from "#/atoms/Button.svelte";
    import { shopValid, active } from "@/store/store.js";
    import { isShopPending } from "@/store/user.js";
    import "@lottiefiles/lottie-player";

    let confirm;
    let msg = "";
    let review = $isShopPending;
    export let submit;

    $: confirm, ($shopValid[4] = validate());

    function submitData() {
        review = true;
        // $active = 0;
        submit();
    }

    function validate() {
        if (!confirm) return true;
        return false;
    }

    // if ($isShopPending) review = true;
</script>

<form class="center col shade3 curve py-50 px-10 pb-100 gap-20">
    <div class="center col w-sm gap-40">
        {#if !review}
            <h1 class="font-36 weight-300">Confirmation</h1>
            <p class="text-center">
                When you make a sale through {config.APP_NAME}, you will be charged a transaction
                fee of 4% of the price you display for each listing. An invoice will be sent every
                month for any purchases.
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
                <Button
                    on:click={submitData}
                    type="button"
                    disable={$shopValid[4]}
                    text="CONTINUE"
                />
            </div>
        </div>
    {/if}
</form>

<style>
</style>
