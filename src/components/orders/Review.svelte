<script>
    import orders from "@/store/orders";
    import dayjs from "dayjs";
    import pluralize from "pluralize";
    import { formatCurrency } from "@/assets/library/CommonFunctions.js";
    import { mq } from "@/assets/library/MediaQuery.svelte";
    import Contact from "./Contact";
    import user from "@/store/user";
    import Product from "./Product.svelte";
    import Button from "../atoms/Button.svelte";
</script>

<div class="shade1 p-bottom col  z-2  slow">
    <div class="col" class:row={$mq.md_}>
        <div class="col grow">
            <div class="row gap-20 pa-15 align-center">
                <span class="opacity-75 w100" class:w-120={$mq.md_}>Order number </span>
                <span class="font-14 nowrap"># {$orders.order._id}</span>
            </div>
            <hr />
            <div class="row gap-20 pa-15 align-center">
                <span class="opacity-75 w100" class:w-120={$mq.md_}> Shop name </span>
                <span class="font-14 nowrap">{$orders.order.shopName}</span>
            </div>
            <hr />
            <div class="row gap-20 pa-15 align-center">
                <span class="opacity-75 w100 " class:w-120={$mq.md_}>Order Date</span>
                <span class="font-14 nowrap">
                    {dayjs($orders.order.created_at).format("HH:mm DD/MM/YYYY")}
                </span>
            </div>
            <hr />
        </div>
        <div class="col grow">
            <div class="row gap-20 pa-15 align-center">
                <span class="opacity-75  w100" class:w-80={$mq.md_}>Status</span>
                <span class="font-14">STATUS</span>
            </div>
            <hr />
            <div class="row gap-20 pa-15 align-center">
                <span class="opacity-75 w100 " class:w-80={$mq.md_}>Total Price</span>
                <span class="font-14 nowrap">{formatCurrency($orders.order.total)}</span>
            </div>
            <hr />
            <div class="row gap-20 pa-15 align-center">
                <span class="opacity-75 w100" class:w-80={$mq.md_}>Total Items</span>
                <span class="font-14 opacity-75 nowrap">
                    {$orders.order.products?.length}
                    {pluralize("item", $orders.order.products?.length)}
                </span>
            </div>
            <hr />
        </div>
    </div>
    <div class="row gap-20 pa-15">
        <span class="opacity-75 w-120 nowrap">Delivery Address</span>
        <span class="font-14 text-end w100" class:text-end={!$mq.md_} class:w100={!$mq.md_}>
            {$orders.order.address}
        </span>
    </div>
    <hr />
    <div class="row pa-15">
        <span class="opacity-75 w100 nowrap"
            >Purchased {pluralize("item", $orders.order.products?.length)}:</span
        >
    </div>
    <div class="gap-20 col pa-20">
        {#each $orders.order.products || [] as product}
            <Product {product} />
        {/each}
    </div>
    <div class="row pa-15 space-between grow h100 align-center">
        <span>Cancel Order?</span>
        <Button text="Cancel" />
    </div>
</div>

<style>
</style>
