<script>
    import Field from "comp/atoms/TextField.svelte";
    import Button from "comp/atoms/Button.svelte";
    import { formatCurrency } from "@/assets/library/CommonFunctions.js";
    import user from "@/store/user.js";
    import Select from "./../atoms/Select.svelte";
    import Icon from "@iconify/svelte";

    $: symbol = currencies.filter((el) => el.id == $user?.currency)[0]?.symbol;

    import { languages, themes, currencies } from "@/assets/library/options.js";
</script>

<section class="grow col gap-20">
    <h1 class="row pl-20 font-36 weight-300 align-center gap-20">
        <Icon icon="fluent:wallet-16-regular" width="30" />
        <span>
            <a href="#/wallet/overview">Wallet</a>
            <span class="px-10">></span>
            <span>Send</span>
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
                <Icon icon="uil:money-insert" width="30" />
                <div class="col gap-10">
                    <span> Amount to send</span>
                    <span class="font-14 opacity-75">Amount to send</span>
                </div>
            </div>
            <div class="row align-center gap-20">
                <div class="opacity-75 font-14 min-max-content ">
                    <span> {formatCurrency(206297)}</span>
                    <span class="ml-10"> ≈ </span>
                </div>
                <Field label="Amount to send" />
            </div>
        </div>
        <hr />
        <div class="row w100 pa-20 space-between shade3">
            <div class="row center gap-20 ">
                <Icon icon="fluent:qr-code-20-regular" width="30" />
                <div class="col gap-10">
                    <span>Receiving address</span>
                    <span class="font-14 opacity-75">Receiving address</span>
                </div>
            </div>
            <div class="col">
                <Field label="Receiving address" />
            </div>
        </div>
        <hr />
        <section class="row space-between align-center pa-20">
            <span class="font-14 opacity-75 align-center gap-10 blue--text">
                <Icon icon="fluent:info-20-regular" width="20" />
                <span>Every sale results in a maintainence fee</span>
            </span>
            <Button type="submit" text={"SEND"} />
        </section>
    </div>
</section>
