<script>
    import { push } from "svelte-spa-router";
    import { formatCurrency } from "@/assets/library/CommonFunctions.js";
    import Icon from "@iconify/svelte";
    import * as timeago from "timeago.js";
    import { onMount } from "svelte";
    import pluralize from "pluralize";
    import orders from "@/store/orders";
    import dayjs from "dayjs";


    export let order = {};
    let el;

    $: src = `http://localhost:8080/api/image/` + order.productPhoto;

    function view() {
        $orders.smMenu = false;
        push(`#/orders/active/${order._id}`);
        orders.clear("chat");
    }

    onMount(() => {
        timeago.render(el);
    });
</script>

<button class="row w100 align-center border py-20 curve shine gap-15 pa-5" on:click={view}>
    <div class="relative">
        <div class="placeholder center">
            {#if order.productPhoto}
                <img {src} alt="" class="w-100 h-100 curve" />
            {:else}
                <Icon icon="carbon:no-image" height="50" color="grey" />
            {/if}
        </div>
    </div>
    <div class="col grow justify-center gap-10 pr-20">
        <div class="row space-between">
            <span>PRODUCT STATUS</span>
            <span class="font-14 opacity-75">
                {order.products.length}
                {pluralize("item", order.products.length)}
            </span>
        </div>
        <span class="opacity-75">{order.shopName} </span>

        <span class="font-12">{order.address}</span>
        <div class="row space-between">
            <span
                class="font-14"
                bind:this={el}
                datetime={order.created_at}
                data-tooltip={dayjs(order.created_at).format("HH:mm DD/MM/YYYY")}
            />
            <span class="font-14 nowrap">Order ID: # {order._id}</span>
        </div>
    </div>
</button>

<style>
    .placeholder {
        height: 100px;
        width: 100px;
    }
</style>
