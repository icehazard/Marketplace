<script>
    import Icon from "@iconify/svelte";
    import Button from "comp/atoms/Button.svelte";
    import { mq } from "@/assets/library/MediaQuery.svelte";
    import user from '@/store/user'
    import cart, { sumPriceTotal, sumQtyTotal } from "@/store/cart.js";
    import { formatCurrency } from "@/assets/library/CommonFunctions.js";
    import pluralize from "pluralize";

    $: defaultAddress = $user.addresses.find(el => el.default == true)?.address
</script>

{#if $mq.lg_}
    <div class="w-400">
        <aside class="shade1 w-400 px-20 curve ">
            <div class="col py-20 justify-center space-between gap-20">
                <div class="row align-center gap-10">
                    <Icon icon="fluent:payment-16-regular" width="22" />
                    <div>How you'll pay</div>
                </div>
                <div class="col align-center gap-20">
                    <label class="container"
                        >Bank Transfer
                        <input type="radio" checked="checked" name="radio" />
                        <span class="checkmark" />
                    </label>
                    <label class="container"
                        >Cryptocurrency
                        <input type="radio" checked="checked" name="radio" />
                        <span class="checkmark" />
                    </label>
                </div>
            </div>
            <!-- <hr /> -->
            <div class="col py-20 justify-center space-between gap-20">
                <div class="row align-center gap-10 space-between">
                    <div class="row center gap-10">
                        <Icon icon="fluent:shopping-bag-16-regular" width="22" />
                        <div>{pluralize("Item", $sumQtyTotal)} total</div>
                    </div>
                    <div class="col align-center gap-10">{formatCurrency($sumPriceTotal)}</div>
                </div>
            </div>
            <!-- <hr /> -->
            <div class="col py-20 justify-center space-between gap-20">
                <div class="row align-center gap-10 space-between">
                    <div class="row center gap-10">
                        <Icon icon="carbon:delivery-truck" width="22" />
                        <div>Shipping</div>
                    </div>
                    <div class="col align-center gap-10">{formatCurrency(0)}</div>
                </div>
            </div>
            <div class="row space-between align-center pb-20 pt-10">
                <div class="font-14 weight-300">{defaultAddress}</div>
                <a href="#/addresses/overview">
                    <Icon icon="fluent:edit-16-regular" width="22" color="var(--primary)" />
                </a>
            </div>
            <!-- <hr /> -->
            <div class="col py-20 justify-center space-between gap-20">
                <div class="row align-center gap-10 space-between">
                    <div class="row center gap-10">
                        <Icon icon="fluent:tag-32-regular" width="22" />
                        <div>
                            Total ({$sumQtyTotal}
                            {pluralize("Item", $sumQtyTotal)})
                        </div>
                    </div>
                    <div class="col align-center gap-10">{formatCurrency($sumPriceTotal)}</div>
                </div>
            </div>
            <!-- <hr /> -->
            <div class="py-20 center">
                <a href="#/orders/active/1">
                    <Button text="PROCEED TO CHECKOUT" />
                </a>
            </div>
            <div class="col py-20 font-12 text-center gap-10 opacity-75">
                <p>
                    This total contains an approximate conversion. You will be charged {formatCurrency(
                        $sumPriceTotal
                    )}
                    by the shop.
                </p>
                <p>Local taxes included (where applicable)</p>
            </div>
        </aside>
    </div>
{/if}

<style>
    .container {
        display: block;
        position: relative;
        padding-left: 35px;

        cursor: pointer;
        font-size: 16px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    /* Hide the browser's default radio button */
    .container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }

    /* Create a custom radio button */
    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 20px;
        width: 20px;
        background-color: #eee;
        border-radius: 50%;
    }

    /* On mouse-over, add a grey background color */
    .container:hover input ~ .checkmark {
        background-color: #ccc;
    }

    /* When the radio button is checked, add a blue background */
    .container input:checked ~ .checkmark {
        background-color: #5dc24f;
    }

    /* Create the indicator (the dot/circle - hidden when not checked) */
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    /* Show the indicator (dot/circle) when checked */
    .container input:checked ~ .checkmark:after {
        display: block;
    }

    /* Style the indicator (dot/circle) */
    .container .checkmark:after {
        top: 6px;
        left: 6px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #1a1a1a;
    }
</style>
