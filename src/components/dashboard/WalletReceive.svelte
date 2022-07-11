<script>
    import { formatCurrency, get } from "@/assets/library/CommonFunctions.js";
    import { currencies } from "@/assets/library/options.js";
    import user from "@/store/user.js";
    import Icon from "@iconify/svelte";
    import QRCode from "qrcode";
    import { onMount } from "svelte";

    let el, tooltip;
    let btcAmount = 0.28;
    let address = "bc1q5gs3rr2sgzqlhdykq5lh2ne08aa7304y6jrn9k";


    $: symbol = currencies.find((el) => el.id == $user?.currency)?.symbol;
    $: rate = currencies.find((el) => el.id == "BTC")?.convert;

    function copy() {
        navigator.clipboard.writeText(address);
        tooltip = "Copied!";
    }

    function enter() {
        tooltip = "Click to copy";
    }

    onMount(async () => {
        enter()
        QRCode.toCanvas(el, address);
        address = await get('api/address/BTC')
    });
</script>

<section class="grow col gap-20">
    <h1 class="row pl-20 font-36 weight-300 align-center gap-20">
        <Icon icon="fluent:wallet-16-regular" width="30" />
        <span>
            <a href="#/wallet/overview">WALLET</a>
            <span class="px-10">></span>
            <span>RECEIVE</span>
        </span>
    </h1>
    <div class="row pa-20 gap-20">
        <div class="row center gap-20">
            <Icon icon="logos:bitcoin" width="40" />
            <div class="col gap-10">
                <div class="weight-600">BTC wallet</div>
                <span>{btcAmount} BTC</span>
            </div>
        </div>
        <span class="center font-22"> ≈</span>
        <div class="row center gap-20">
            <span class="font-36">{symbol}</span>
            <div class="col gap-10">
                <div class="weight-600">{$user.currency}</div>
                <span>{formatCurrency(btcAmount * rate)}</span>
            </div>
        </div>
    </div>
    <div class="grow col shade3 curve">
        <div class="row w100 pa-20 space-between shade3">
            <div class="row center gap-20 ">
                <Icon icon="fluent:qr-code-20-regular" width="30" />
                <div class="col gap-10">
                    <span>Your Wallet Address</span>
                    <span class="font-14 opacity-75"
                        >Fund your account by sending bitcoin to your wallet address</span
                    >
                </div>
            </div>
            <button
                on:click={copy}
                on:mouseenter={enter}
                class="col gap-20 center"
                data-tooltip={tooltip}
            >
                <div class="shade2 curve pa-10 row gap-20 align-center">
                    <span>{address} </span>
                    <Icon icon="fluent:copy-16-regular" />
                </div>
            </button>
        </div>
        <div class="center shade2-60 col pa-20 gap-20">
            <canvas bind:this={el} />
            <span class="font-14 opacity-75 align-center gap-10 blue--text">
                <Icon icon="fluent:info-20-regular" width="20" />
                <span>Send only bitcoin to this deposit address.</span>
            </span>
        </div>
        <hr />
    </div>
</section>

<style>
</style>
