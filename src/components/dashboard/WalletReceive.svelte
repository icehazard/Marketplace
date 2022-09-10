<script>
    import { formatCurrency, get } from "@/assets/js/util.js";
    import { currencies } from "@/assets/js/options.js";
    import { Shadow } from 'svelte-loading-spinners'
    import user, {totalBalance} from "@/store/user.js";
    import Icon from "@iconify/svelte";
    import QRCode from "qrcode";
    import { onMount } from "svelte";

    let el, tooltip, tooltipCopy;
    let btcAmount = $totalBalance;

    $: symbol = currencies.find((el) => el.id == $user?.currency)?.symbol;
    $: rate = currencies.find((el) => el.id == "BTC")?.convert;

    async function copy() {
        await navigator.clipboard.writeText($user.address);
        tooltip = "Copied!";
    }
    function tooltipDefault() {
        tooltip = "Click to copy";
        tooltipCopy = "New address"
    }
    function generateQR() {
        QRCode.toCanvas(el, $user.address);
    }
    async function getAddress() {
        $user.address = '';
        tooltipCopy = "Generating..."
        await user.getAddress();
        user.get()
        generateQR();
        tooltipDefault();
    }

    onMount(async () => {
        generateQR();
        if (!$user.address) getAddress();
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
            <button on:click={copy} on:mouseenter={tooltipDefault} class="col gap-20 center">
                <div class="shade2 curve pa-10 row gap-20 align-center shine">
                    <span data-tooltip={tooltip}>{$user.address} </span>
                    <button data-tooltip={tooltip}>
                        <Icon icon="fluent:copy-16-regular" />
                    </button>
                    <button on:click|stopPropagation={getAddress} data-tooltip={tooltipCopy}>
                        <Icon icon="codicon:refresh" />
                    </button>
                </div>
            </button>
        </div>
        <div class="center shade2-60 col pa-20 gap-20">
            {#if !$user.address}
            <div class="absolute">
             <Shadow size="60" color="#3ea6ff"  unit="px" duration="1s"></Shadow>
            </div>
             {/if}
            <canvas class:hidden={!$user.address} bind:this={el} />
           
            <span class="font-14 opacity-75 align-center gap-10 blue--text">
                <Icon icon="fluent:info-20-regular" width="20" />
                <span>Send only bitcoin to this deposit address.</span>
            </span>
        </div>
        <hr />
    </div>
</section>
