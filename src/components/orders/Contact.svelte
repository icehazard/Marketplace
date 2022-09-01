<script>
    import { push } from "svelte-spa-router";
    import { formatCurrency } from "@/assets/library/CommonFunctions.js";
    import * as timeago from "timeago.js";
    import { onMount } from "svelte";
    import pluralize from "pluralize";

    export let order = {};
    let el;

    $: src = `http://localhost:8080/api/image/` + order.productPhoto;

    function view() {
        push(`#/orders/active/${order._id}`);
    }

    onMount(() => {
        timeago.render(el);
    });
</script>

<button class="row w100 align-center border py-20 curve shine gap-15 pa-5" on:click={view}>
    <div class="relative">
        <img {src} alt="" class="w-100 h-100 curve" />
        <div class="absolute p-bottom w100 mb-4 h-40 center ">
            <span class="font-14">
                {order.products.length}
                {pluralize("item", order.products.length)}
            </span>
        </div>
    </div>
    <div class="col grow justify-center gap-10 pr-20">
        <span>PRODUCT STATUS</span>
        <span class="opacity-75">{order.shopName} </span>

        <span class="font-12">{order.address}</span>
        <div class="row space-between">
            <span class="font-14" bind:this={el} datetime={order.created_at} />
            <span class="font-14">Order ID: {order._id}</span>
        </div>
    </div>
</button>

<style>
    .absolute {
        backdrop-filter: brightness(0.4) blur(1px);
    }
</style>
