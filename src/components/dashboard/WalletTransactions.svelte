<script>
    import { currencies } from "@/assets/library/options.js";
    import { formatCurrency } from "@/assets/library/CommonFunctions.js";
    import { push } from 'svelte-spa-router';
    import user from "@/store/user.js";
    import Icon from "@iconify/svelte";

    let btcAmount = 0.28;

    $: symbol = currencies.find((el) => el.id == $user?.currency)?.symbol;
    $: rate = currencies.find((el) => el.id == "BTC")?.convert;

    function handleClick(){
        push('#/orders/view/42')
    }
</script>

<section class="grow col gap-20">
    <h1 class="row pl-20 font-36 weight-300 align-center gap-20">
        <Icon icon="fluent:wallet-16-regular" width="30" />
        <span>
            <a href="#/wallet/overview">WALLET</a>
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

    <div class="grow col shade3 curve">
        <div class="row pa-20 shade3  w100 align-center gap-10">
            <Icon icon="fluent:search-16-regular" width="20" />
            <input type="text" placeholder="Search for a order" />
        </div>
        <hr />
        <div class="col w100 ">
            <button on:click={handleClick} class="grid shine w100 pa-20 space-between  shade3">
                <span class="row gap-10 justify-start align-center">
                    <div class="imgWrapper center">
                        <Icon icon="fluent:image-32-regular" />
                    </div>
                    <span>Thai seed bank</span>
                </span>
                <span>12 Items</span>
                <span>1,583 THB</span>
                <span class="info--text">Processing Order</span>
                <span>21/06/2022</span>
                <div class="justify-end">
                    <Icon icon="fluent:chevron-right-28-regular" width="20" />
                </div>
            </button>
            <hr />
        </div>
        <div class="col w100 ">
            <button on:click={handleClick} class="grid shine w100 pa-20 space-between  shade3">
                <span class="row gap-10 justify-start align-center">
                    <div class="imgWrapper center">
                        <Icon icon="fluent:image-32-regular" />
                    </div>
                    <span>Oaseeds</span>
                </span>
                <span>2 Items</span>
                <span>183 THB</span>
                <span class="warning--text">In Transit</span>
                <span>25/06/2022</span>
                <div class="justify-end">
                    <Icon icon="fluent:chevron-right-28-regular" width="20" />
                </div>
            </button>
            <hr />
        </div>
        <div class="col w100 ">
            <button on:click={handleClick} class="grid shine w100 pa-20 space-between  shade3">
                <span class="row gap-10 justify-start align-center">
                    <div class="imgWrapper center">
                        <Icon icon="fluent:image-32-regular" />
                    </div>
                    <span>MetaRoadGrows</span>
                </span>
                <span>6 Items</span>
                <span>1183 THB</span>
                <span class='success--text'>Delivered</span>
                <span>05/05/2022</span>
                <div class="justify-end">
                    <Icon icon="fluent:chevron-right-28-regular" width="20" />
                </div>
            </button>
            <hr />
        </div>
        <div class="col w100 ">
            <button on:click={handleClick} class="grid shine w100 pa-20 space-between  shade3">
                <span class="row gap-10 justify-start align-center">
                    <div class="imgWrapper center">
                        <Icon icon="fluent:image-32-regular" />
                    </div>
                    <span>MetaRoadGrows</span>
                </span>
                <span>6 Items</span>
                <span>1183 THB</span>
                <span class='error--text'>Cancelled</span>
                <span>05/05/2022</span>
                <div class="justify-end">
                    <Icon icon="fluent:chevron-right-28-regular" width="20" />
                </div>
            </button>
            <hr />
        </div>
    </div>
</section>

<style>
    .grid {
        display: grid;
        grid-template-columns: 2fr 2fr 2fr 2fr 2fr 1fr;
    }

    span {
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .imgWrapper {
        min-width: 20px;
    }
</style>
