<script>
	import Payments from './Payments.svelte';
    import orders from "@/store/orders";
    import dayjs from "dayjs";
    import pluralize from "pluralize";
    import { formatCurrency, tell } from "@/assets/js/util";
    import { mq } from "@/assets/js/MediaQuery.svelte";
    import Icon from "@iconify/svelte";
    import Product from "./Product.svelte";
    import Button from "../atoms/Button.svelte";

    let active = $orders.order.deliveryStatus;
 
    let headings = [
        { text: "Confirmation" },
        { text: "Packing" },
        { text: "In transit" },
        { text: "Delivered" },
    ];
</script>

<div class="shade1 p-bottom col col gap-10  z-2  slow">
    <div class="row shade1 space-btween pa-20 align-center gap-10">
        {#each headings as heading, index}
            <button class="center gap-10">
                <div class="center pa-4 primary round" class:shade4={index > active}>
                    {#if active > index}
                        <Icon icon="fluent:checkmark-16-regular" color="white" />
                    {:else}
                        <div class="w-16 center font-14 weight-300">{index + 1}</div>
                    {/if}
                </div>
                <span class:shade5--text={index !== active}>{heading.text}</span>
            </button>
            {#if index < headings.length - 1}
                <hr class="grow border" />
            {/if}
        {/each}
    </div>
   <Payments />
    <div class="col" class:row={$mq.md_}>
        <div class="col grow">
            <div class="row gap-20 pa-15 align-center">
                <span class="opacity-75 w100" class:w-120={$mq.md_}>Order number </span>
                <span class="font-14 nowrap"># {$orders.order._id}</span>
            </div>
            <hr />
            <div class="row gap-20 pa-15 align-center">
                <span class="opacity-75 w100" class:w-120={$mq.md_}>Customer Name</span>
                <span class="font-14 nowrap"> {$orders.order.name || "No Name Provided"}</span>
            </div>
            <hr />
            <div class="row gap-20 pa-15 align-center">
                <span class="opacity-75 w100" class:w-120={$mq.md_}> Shop name </span>
                <span class="font-14 nowrap">{$orders.order.shop.shopName}</span>
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
                <span class="opacity-75 w100" class:w-120={$mq.md_}>Payment Status</span>
                <span class="font-14 nowrap">{$orders.order.paymentStatus ? "Paid" : "Unpaid"}</span
                >
            </div>
            <hr />
            <div class="row gap-20 pa-15 align-center">
                <span class="opacity-75 w100 " class:w-120={$mq.md_}>Total Price</span>
                <span class="font-14 nowrap">{formatCurrency($orders.order.total)}</span>
            </div>
            <hr />
            <div class="row gap-20 pa-15 align-center">
                <span class="opacity-75 w100" class:w-120={$mq.md_}>Payment type</span>
                <span class="font-14 nowrap">
                    {$orders.order.paymentType}
                </span>
            </div>
            <hr />
            <div class="row gap-20 pa-15 align-center">
                <span class="opacity-75 w100 " class:w-120={$mq.md_}>Mobile Number</span>
                <span class="font-14 nowrap">
                    {$orders.order.phone || "No Number Provided"}
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

    <div class="row pa-15 gap-10 align-center">
        <span class="opacity-75  nowrap"
            >Purchased {pluralize("item", $orders.order.products?.length)}
        </span>
        <span class="font-14 nowrap opacity-75">
            ({$orders.order.products?.length}
            {pluralize("item", $orders.order.products?.length)}) :
        </span>
    </div>
    <div class="gap-20 col pa-20">
        {#each $orders.order.products || [] as product}
            <Product {product} />
        {/each}
    </div>
    <hr />
    <div class="row pa-15 space-between grow h100 align-center">
        <span>Cancel Order?</span>
        <Button text="Cancel" />
    </div>
</div>

<style>
    .round {
        min-width: 25px;
        min-height: 25px;
    }
</style>
