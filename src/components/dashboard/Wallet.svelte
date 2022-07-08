<script>
    import Field from "comp/atoms/TextField.svelte";
    import Button from "comp/atoms/Button.svelte";
    import { currencies } from "@/assets/library/options.js";
    import { formatCurrency } from "@/assets/library/CommonFunctions.js";
    import user from "@/store/user.js";
    import Icon from "@iconify/svelte";

    $: symbol = currencies.filter((el) => el.id == $user?.currency)[0]?.symbol;

    function handleClick(params) {}
</script>

<section class="grow col gap-20">
    <h1 class="row pl-20 font-36 weight-300 align-center gap-20">
        <Icon icon="fluent:wallet-16-regular" width="30" />
        <span>Wallet</span>
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
        <a
           href="#/Wallet/send"
            type="button"
            class="row shine w100 pa-20 space-between  shade3"
        >
            <div class="row center gap-20">
                <Icon icon="uil:money-insert" width="30" />
                <div class="col gap-10">
                    <span>Send</span>
                    <span class="font-14 opacity-75">Withdraw money from your account</span>
                </div>
            </div>
            <div class="center h100">
                <Icon icon="fluent:chevron-right-28-regular" width="20" />
            </div>
        </a>
        <hr />
        <a
        href="#/wallet/receive"
            type="button"
            class="row shine w100 pa-20 space-between  shade3"
        >
            <div class="row center gap-20">
                <Icon icon="uil:money-withdraw" width="30" />
                <div class="col gap-10">
                    <span>Receive</span>
                    <span class="font-14 opacity-75">Deposit money into your account</span>
                </div>
            </div>
            <div class="center h100">
                <Icon icon="fluent:chevron-right-28-regular" width="20" />
            </div>
        </a>
        <hr />
        <button
            on:click={handleClick}
            type="button"
            class="row shine w100 pa-20 space-between  shade3"
        >
            <div class="row center gap-20">
                <Icon icon="fluent:history-16-regular" width="30" />
                <div class="col gap-10">
                    <span>Transactions</span>
                    <span class="font-14 opacity-75">Transactions History</span>
                </div>
            </div>
            <div class="center h100">
                <Icon icon="fluent:chevron-right-28-regular" width="20" />
            </div>
        </button>
        <hr />
    </div>
</section>
