<script>
    import Field from "comp/atoms/TextField.svelte";
    import Button from "comp/atoms/Button.svelte";
    import { formatCurrency } from "@/assets/library/CommonFunctions.js";
    import user from "@/store/user.js";
    import Select from "./../atoms/Select.svelte";
    import Icon from "@iconify/svelte";
    import QRCode from "qrcode";
    import { onMount } from "svelte";

    let el;
    let address = "bc1q5gs3rr2sgzqlhdykq5lh2ne08aa7304y6jrn9k";

    $: symbol = currencies.filter((el) => el.id == $user?.currency)[0]?.symbol;

    import { languages, themes, currencies } from "@/assets/library/options.js";

    onMount(() => {
        QRCode.toCanvas(el, address);
    });
</script>

<section class="grow col gap-20">
    <h1 class="row pl-20 font-36 weight-300 align-center gap-20">
        <Icon icon="fluent:wallet-16-regular" width="30" />
        <span>
            <a href="#/wallet/overview">Wallet</a>
            <span class="px-10">></span>
            <span>Receive</span>
        </span>
    </h1>
    <div class="row pa-20 gap-20">
        <div class="row center gap-20">
            <Icon icon="logos:bitcoin" width="40" />
            <div class="col gap-10">
                <div class="weight-600">BTC wallet</div>
                <span>0.26 BTC</span>
            </div>
        </div>
        <span class="center font-22"> ≈</span>
        <div class="row center gap-20">
            <span class="font-36">{symbol}</span>
            <div class="col gap-10">
                <div class="weight-600">{$user.currency}</div>
                <span>{formatCurrency(206297)}</span>
            </div>
        </div>
    </div>
    <div class="grow col shade3 curve">
        <div class="row w100 pa-20 space-between shade3">
            <div class="row center gap-20 ">
                <Icon icon="fluent:qr-code-20-regular" width="30" />
                <div class="col gap-10">
                    <span>Your Wallet Address</span>
                    <span class="font-14 opacity-75">Fund your account by sending bitcoin to your Wallet Address</span>
                </div>
            </div>
            <div class="col gap-20 center">
                <span class="shade2 curve pa-10">{address}</span>
                
            </div>
        </div>
        <div class="center shade2-60 col pa-20 gap-20">
            <canvas bind:this={el} />
            <span class="font-14 opacity-75 align-center gap-10 blue--text">
                <Icon icon="fluent:info-20-regular" width="20" />
                <span>Send only Bitcoin to this deposit address.</span>
            </span>
        </div>
        <hr />
    </div>
</section>

<style>

</style>
