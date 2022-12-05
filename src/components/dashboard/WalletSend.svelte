<script>
    import Field from "#/atoms/TextField.svelte";
    import Button from "#/atoms/Button.svelte";
    import { languages, themes, currencies } from "@/assets/js/options.js";
    import { formatCurrency } from "@/assets/js/util.js";
    import user, {totalBalance} from "@/store/user.js";
    import Icon from "@iconify/svelte";

    let btcAmount = $totalBalance;
    let btc = '';
    let address = ''

    $: symbol = currencies.find((el) => el.id == $user?.currency)?.symbol;
    $: rate = currencies.find((el) => el.id == "BTC")?.convert;

    function post(){
        console.log({btc, address})
    }
</script>

<section class="grow col gap-20">
    <h1 class="row pl-20 font-36 weight-300 align-center gap-20">
        <Icon icon="fluent:wallet-16-regular" width="30" />
        <span>
            <a href="/wallet/overview">WALLET</a>
            <span class="px-10">></span>
            <span>SEND</span>
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
    <form on:submit|preventDefault={post} class="grow col shade3 curve">
        <div class="row w100 pa-20 space-between shade3">
            <div class="row center gap-20 ">
                <Icon icon="uil:money-insert" width="30" />
                <div class="col gap-10">
                    <span> Amount to send</span>
                    <span class="font-14 opacity-75">Value in bitcoin to withdraw</span>
                </div>
            </div>
            <div class="row align-center gap-20">
                <div class="opacity-75 font-14 min-max-content ">
                    <span>{formatCurrency(btc * rate)}</span>
                    <span class="ml-10"> ≈ </span>
                </div>
                <Field bind:value={btc} label="0.0 BTC" />
            </div>
        </div>
        <hr />
        <div class="row w100 pa-20 space-between shade3">
            <div class="row center gap-20 ">
                <Icon icon="fluent:qr-code-20-regular" width="30" />
                <div class="col gap-10">
                    <span>Receiving address</span>
                    <span class="font-14 opacity-75">The address funds will be sent to</span>
                </div>
            </div>
            <div class="col">
                <Field bind:value={address} label={`Address(bc1q5gs3rr2sgzqlhdykq5lh2ne08aa7304y6jrn9k)`} />
            </div>
        </div>
        <hr />
        <section class="row space-between align-center pa-20">
            <span class="font-14 opacity-75 align-center gap-10 blue--text">
                <Icon icon="fluent:info-20-regular" width="20" />
                <span>Transactions normally take about 30 to 60 minutes to confirm.</span>
            </span>
            <Button type="submit" text={"SEND"} />
        </section>
    </form>
</section>
